var args = Array.prototype.slice.call(arguments);
var _jsToolsPath = environment["user.dir"] + "/" + args[0];
load(_jsToolsPath + "/_global.js");

// Command config
cmdLine.setup(args.slice(2), {
	parameters:defaultCmdLineParameters
});

// Handle config stuff
config.loadData(args[1]);
config.setValues(cmdLine.parameters);
//console.log('config = ', config);

load(_jsToolsPath + "/FileList.js");

// Output
var files = new FileList().get(config.platformFile, config.features, config.sourceDirectory);
print(config.sourceDirectory + files.join(" "+config.sourceDirectory));
