


/*********FILE**********
/features/engine/widget.js
********************/


var storage = {
		
	engine: "widget",
	
	get: function(key){
		return widget.preferenceForKey(key);
	},
	
	set: function(key, value){
		this.ensureKeyInMap(key);
		widget.setPreferenceForKey(value, key);
	},
	
	remove: function(key){
		this.removeKeyFromMap(key);
		widget.setPreferenceForKey(null, key);
	},
	
	/* -- stubs for keymap feature -- */
	
	ensureKeyInMap: function(){},
	
	removeKeyFromMap: function(){}
};



/*********FILE**********
/features/keyMap/generic.js
********************/


storage.keys = [];
	
storage.ensureKeyInMap = function(key){
	if(!this.hasKeyInMap(key)){
		this.keys.push(key);
		this.saveKeyMap();
	}
};
	
storage.hasKeyInMap = function(key){
	for(var i = 0, m = this.keys.length; i< m; i++){
		if(key === this.keys[i]){
			return true;
		}
	}
	return false;
};
	
storage.removeKeyFromMap = function(key){
	var newKeys = [];
	for(var i = 0, m = this.keys.length; i< m; i++){
		if(key !== this.keys[i]){
			newKeys.push(key);
		}
	}
	this.keys = newKeys;
	this.saveKeyMap();
};
	
storage.stringifyArray = function(data){
	if(typeof JSON != 'undefined' && JSON.stringify){
		return JSON.stringify(data);
	}
	var string = '';
	for(var i = 0, m = data.length; i < m; i++){
		string += item + ':sjs-k:';
	}
	string = string.substring(0,string.length - 8);
	return string;
};
	
storage.parseString = function(string){
	if(typeof JSON  != 'undefined' && JSON.parse){
		return JSON.parse(string);
	}
	var data = string.split(':sjs-k:');
	return data;
};



/*********FILE**********
/features/keyMap/widget.js
********************/


storage.saveKeyMap = function(){
	var value = this.stringifyArray(this.keys);
	widget.setPreferenceForKey(value, 'sjs-keymap');
};
	
storage.loadKeyMap = function(){
	var keyString = widget.preferenceForKey('sjs-keymap');
	var keys = keyString.length && keyString.length > 0 ? this.parseString(keyString) : [];
	this.keys = keys;
};

storage.loadKeyMap();



/*********FILE**********
/features/clear/widget.js
********************/


storage.clear = function(){
	for(var i = 0, m = this.keys.length; i < m; i++){
		widget.setPreferenceForKey(null, this.keys[i]);
	}
	this.keys = [];
	this.saveKeyMap();
};



/*********FILE**********
/features/getAll/keymapped.js
********************/


storage.getAll = function(){
	var all = [];
	for(var i = 0, m = this.keys.length; i < m; i++){
		all.push({key: this.keys[i], value: this.get(this.keys[i])});
	}
	return all;
};



/*********FILE**********
/features/getAllKeys/keymapped.js
********************/


storage.getAllKeys = function(){
	return this.keys;
};
