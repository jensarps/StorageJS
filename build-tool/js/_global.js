//
//	Make console.log work when debug is turned on.
//	Implement console.error
//
if (typeof console=="undefined"){
	var console = {
		_log:function(){
			var out = [];
			for (var i=0, l=arguments.length, arg; i<l; i++){
				arg = arguments[i];
				if (arg && typeof arg["length"]!="undefined"){
					out.push(""+arg);
				} else if (typeof arg=="object"){
					for (var key in arg){
						if (typeof arg[key]=="function") continue;
						out.push(key+": "+arg[key]+"\n");
					}
				} else {
					out.push(arg);
				}
			}
			print(out.join("    "));
		},
		log:function(){
			if (!config.isVerbose) return;
			this._log.apply(this, arguments);
		},
		error:function(){
			this._log.apply(this, arguments);
		}
	}
};

var defaultCmdLineParameters = [
	{
		name:"isVerbose",
		help:"Shall debug messages be shown?",
		exampleValues:["true", "yes", "false", "no"]
	},
	{
		name:"profile",
		help:"The set of features that shall be built for.",
		exampleValues:["kitchensink", "oo-only"]
	},
	{
		name:"platform",
		help:"The platform to build for.",
		exampleValues:["android", "iphone", "nokia-wrt", "blackberry4.6"]
	},
	{
		name:"help",
		help:"Print the help for this command."
	}
];








var util = {
	endInSlash:function(path){
		return path.substr(-1)!="/" ? path+"/" : path;
	},
	
	_loadJsonFile:function(fileName, throwError){
		var ret = null;
		try{
			eval("ret = "+readFile(fileName));
		}catch(e){
			if (typeof throwError=="undefined" || throwError!=false){
				console.error("ERROR: reading file '" + fileName + "' at line "+ e.lineNumber);
				for (var key in e){ if (typeof e[key]!="function") console.error(key, ((""+e[key]).length>100 ? e[key].substr(0, 100)+"..." : e[key])) }
			}
		}
		return ret;
	},
	
	_loadTextFile:function(fileName, throwError){
		var ret = null;
		try{
			ret = readFile(fileName);
		}catch(e){
			if (typeof throwError=="undefined" || throwError!=false){
				console.error("ERROR: reading file '" + fileName);
				for (var key in e){ if (typeof e[key]!="function") console.error(key, ((""+e[key]).length>100 ? e[key].substr(0, 100)+"..." : e[key])) }
			}
		}
		return ret;
	},
}

// Our mini dojo ... API compatible for the features we use :)
// Would like to build this set as we need it down here using embedJS some day ... will be possible, just needs the time to do it :)
globalNamespace = this;
var dojo = {
	hitch:function(scope, method){
		return function(){ return scope[method].apply(scope, arguments || []); };
	},
	declare:function(name, parent, klass){
		globalNamespace[name] = klass["constructor"] || function(){};
		var ref = globalNamespace[name];
		for (var prop in klass){
			if (prop=="constructor") continue;
			ref.prototype[prop] = klass[prop];
		}
	},
};


var cmdLine = {
	
	parameters:{},
	
	config:{},
	
	setup:function(args, config){
		// summary: Call this first, to verify required params and print help, etc.
		// args: Array The parameters passed to this script.
		// config: Object The configuration of how to call the command.
		this.parameters = this._parseParameters(args);
		this.config = config;
		// Sort the parameters first by "required=true" and then by name.
		this.config.parameters.sort(function(a,b){ return a.required!=b.required ? (a.required?-1:1) : (a.name>b.name) });
		var errors = {
			missingParameters:[]
		};
		for (var i=0, l=config.parameters.length, p; i<l; i++){
			p = config.parameters[i];
			if (p.required && typeof this.parameters[p.name]=="undefined"){
				errors.missingParameters.push(p.name);
			}
		}
		
		if (this.parameters.help){
			this.printHelp();
			quit();
		}
		if (errors.missingParameters.length){
			console.error("ERROR, Missing parameter!\nThe following parameter(s) are required to run this command:\n", "  "+ errors.missingParameters.join("\n  "));
			console.error();
			this.printHelp();
			quit();
		}
	},
	
	printHelp:function(){
		var params = this.config.parameters;
		for (var i=0, l=params.length, p; i<l; i++){
			p = params[i];
			console.error("  "  + p.name + (p.required?" - This parameter is required!":""));
			console.error("    "  + p.help);
			var numExampleValues = typeof p.exampleValues=="undefined" ? 0 : p.exampleValues.length;
			console.error("    Example usages:");
			if (numExampleValues){
				for (var j=0; j<numExampleValues; j++){
					console.error("      " + p.name + "=" + p.exampleValues[j]);
				}
			} else {
				console.error("      " + p.name);
			}
		}
	},
	
	getBoolean:function(value){
		var falseValues = ["0", "false", "no", "null"];
		return falseValues.indexOf(value)!=-1 ? false : true;
	},
	
	_parseParameters:function(params){
		// summary: Take apart the params and return key-value pairs.
		var ret = {};
		for (var i=0, l=params.length, p; i<l; i++){
			p = params[i];
			var valueStart = p.indexOf("="); // Find the "="
			if (valueStart==-1){
				ret[p] = true;
			} else {
				ret[p.substr(0, valueStart)] = p.substr(valueStart+1);
			}
		}
		return ret;
	}
}


var config = {
	// summary: The config object, which contains all the config data and logic.
	
	// This is the config data as we read it from the config file
	// of the project we are just building.
	rawData:null,
	
	// Shall debug messages be shown?
	isVerbose:false,
	
	// The directory where the "build-config.json" lies
	// all paths in rawData are relative to this directory.
	rootDirectory:"",
	
	// The profile we use, e.g. "kitchensink".
	profile:"",
	
	// The list of features, just some strings that are needed to resolve the deps.
	features:[],
	
	platformsDirectory:"",
	platformFile:"",
	
	sourceDirectory:"",

	loadData:function(file){
		this.rawData = util._loadJsonFile(file);
		// We rely on the directory to use "/"!!! may fail on windows!
		this.rootDirectory = file.split("/").slice(0, -1).join("/");
	},
	
	setValues:function(params){
		var d = this.rawData;
		var defaults = d.defaults;
		this.isVerbose = typeof params.isVerbose=="undefined" ? d.isVerbose : cmdLine.getBoolean(params.isVerbose);
		this.profile = params.profile || defaults.profile;
		this.features = d.profiles[this.profile];
		this.setValue("platform", params.platform || defaults.platform);
		this.sourceDirectory = util.endInSlash(this.rootDirectory + "/" + d.paths.source);
		this.buildDirectory = util.endInSlash(this.rootDirectory + "/" + d.paths.build);
	},
	
	setValue:function(key, value){
		var d = this.rawData;
		if (key=="platform"){
			this.platformsDirectory = util.endInSlash(this.rootDirectory + "/" + d.paths.platforms);
			this.platformFile = this.platformsDirectory + value + ".json";
		}
	},
	
	getBuildFilenamePrefix:function(profile, platform){
		var ret = this.rawData.build.fileName;
		// Replace ${PROFILE} and ${PLATFORM}.
		ret = ret.replace("${PROFILE}", profile).replace("${PLATFORM}", platform);
		ret = this.buildDirectory + ret;
		return ret;
	},
};

importPackage(java.io); // So we can use FileWriter, FileReader.
importPackage(java.util);
var file = {
	
	appendFile:function(fromFileName, toFileName){
		var r = new Scanner(new FileReader(fromFileName));
		var w = new FileWriter(toFileName, true); // 2nd param true, means append new stuff.
		w.write("\n\n\n/*********FILE**********\n"
				+ fromFileName.replace(config.rootDirectory, "")
				+ "\n********************/\n\n\n");
		var text;
		// repeat until all lines is read
		while (r.hasNextLine()){
			w.write(r.nextLine()+"\n");
		}
		w.close(); // Make sure to flush, thats what close() does, otherwise we loose lines :).
	},
	
	write:function(fileName, content){
		var f = new FileWriter(fileName);
		f.write(content);
		f.close();
	},
	
	exists:function(fileName){
		return new File(fileName).exists();
	},
};