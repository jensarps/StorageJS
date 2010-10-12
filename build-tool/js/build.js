var args = Array.prototype.slice.call(arguments);
var _jsToolsPath = environment["user.dir"] + "/" + args[0];
load(_jsToolsPath + "/_global.js");

// Command config
cmdLine.setup(args.slice(2), {
	parameters:defaultCmdLineParameters.concat([
		{
			name:"platforms",
			help:"A comma-separated list of platforms you want to build for, if not given the defaults are used.",
			exampleValues:["android", "ios,android,blackberry"]
		},
		{
			name:"uncompressed",
			help:"Shall the uncompressed files be generated too? This overrides the value from the config file.",
			exampleValues:["true", "yes", "false", "no"]
		}
	])
});

// Handle config stuff
config.loadData(args[1]);
config.setValues(cmdLine.parameters);
//console.log('config = ', config);

load(_jsToolsPath + "/FileList.js");

// Output

//
//	Find out the platforms we want to build for.
//	1) Either they are given as the parameter "platforms" or
//	2) we search the platformsDirectory for all the ".json" files and
//	use them.
//
var allPlatforms = [];
if (cmdLine.parameters.platforms){ // 1)
	var _platforms = cmdLine.parameters.platforms.split(",");
	for (var i=0, l=_platforms.length, p; i<l; i++){
		p = _platforms[i];
		if (file.exists(config.platformsDirectory + p + ".json")){
			allPlatforms.push(p);
		} else {
			console.error("Warning: Platform file '" + p + ".json' doesn't exist (should be in '" + config.platformsDirectory + "').");
		}
	}
} else { // 2) 
	// Find all platform files.
	importPackage(java.io); // So we can use File.
	var files = new File(config.platformsDirectory).list();
	for (var i=0, l=files.length, f; i<l; i++){
		f = ""+files[i]; // By default Java doesnt give us a string :( - make it one
		if (f.substr(-5)==".json"){
			allPlatforms.push(f.substr(0, f.length-5));
		}
	}
}

//
//	Go through all the platforms and create the build.
//	That means run the set of files through a compressor and
//	create the uncompressed files, using some simple java stuff, if configured so.
//
var uncompressed = typeof cmdLine.parameters.uncompressed=="undefined" ? config.rawData.build.generateUncompressedFiles : cmdLine.getBoolean(cmdLine.parameters.uncompressed);
for (var i=0, l=allPlatforms.length, p; i<l; i++){
	p = allPlatforms[i];
	config.setValue("platform", p);
	var files = new FileList().get(config.platformFile, config.features, config.sourceDirectory);
	var filesWithFullPath = files.map(function(f){ return config.sourceDirectory + f });
	
	// Compress and write file in the build directory.
// TODO enable hooking other compressors in here ...
	var args = {
		// Very strange way of passing the params to shrinksafe, if you know it better
		// please fix it. Best would be importing the java class I guess and calling it directly in here
		// ... if I have more time ... help welcome!!!!!!
		args:[
			"-jar",
			_jsToolsPath +"/../shrinksafe.jar",
		].concat(filesWithFullPath), // Add the full path to the js files.
		output:""
	};
	runCommand("java", args);
	var buildFileNamePrefix = config.getBuildFilenamePrefix(config.profile, p);
	print("Writing built file for '" + p + "' to " + buildFileNamePrefix.replace(config.rootDirectory, "") + ".js");
	file.write(buildFileNamePrefix + ".js", args.output);
	
	// Create uncompressed source file, if configured to do so.
	if (uncompressed){
		var fileName = buildFileNamePrefix + ".uncompressed.js";
		print("Writing uncompressed file for '" + p + "' to " + fileName.replace(config.rootDirectory, ""));
		file.write(fileName, ""); // Make sure the empty file exists!
		for (var j=0, l1=filesWithFullPath.length; j<l1; j++){
			file.appendFile(filesWithFullPath[j], fileName);
		}
	}
}
