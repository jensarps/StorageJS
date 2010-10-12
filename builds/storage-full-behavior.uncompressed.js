


/*********FILE**********
/../features/storage.js
********************/


var storage = {
	
	engine: null,
	
	addEngine: function(engineName, mixin){
		for(var prop in mixin){
			storage[prop] = mixin[prop];
		}
		this.engine = engineName;
		
		this.init && this.init();
	}
};



/*********FILE**********
/../features/engine/behavior.js
********************/


storage.addEngine('behavior',{
	
	store: null,
	
	storeName: '__StorageJS_BehaviorStorage',
	
	init: function(){
		this.store = this._createStore();
		this.store.load(this.storeName);
	},
	
	_createStore: function() {
        var storeNode = document.createElement('link');
        storeNode.id = this.storeName + 'Node'
        storeNode.style.display = 'none';
        
        document.getElementsByTagName('head')[0].appendChild(storeNode);
        storeNode.addBehavior('#default#userdata');
        
        return storeNode;
	},
	
	get: function(key){
		return this.store.getAttribute(key);
	},
	
	set: function(key, value){
		this.ensureKeyInMap(key);
		this.store.setAttribute(key, value);
		this.store.save(this.storeName);
	},
	
	remove: function(key){
		this.removeKeyFromMap(key);
		this.store.removeAttribute(key);
		this.store.save(this.storeName);
	},
	
	/* -- stubs for keymap feature -- */
	
	ensureKeyInMap: function(){},
	
	removeKeyFromMap: function(){}
});



/*********FILE**********
/../features/keyMap/generic.js
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
/../features/keyMap/behavior.js
********************/


storage.saveKeyMap = function(){
	var value = this.stringifyArray(this.keys);
	this.store.setAttribute('sjs-keymap', value);
	this.store.save(this.storeName);
};
	
storage.loadKeyMap = function(){
	var keyString = this.store.getAttribute('sjs-keymap');
	var keys = ( typeof keyString.length != 'undefined'  && keyString.length > 0 ) ? this.parseString(keyString) : [];
	this.keys = keys;
};

storage.loadKeyMap();



/*********FILE**********
/../features/clear/behavior.js
********************/


storage.clear = function(){
	for(var i = 0, m = this.keys.length; i < m; i++){
		this.store.removeAttribute(this.keys[i]);
	}
	this.keys = [];
	this.saveKeyMap(); // This also saves the store.
};



/*********FILE**********
/../features/keyMap/generic.js
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
/../features/keyMap/behavior.js
********************/


storage.saveKeyMap = function(){
	var value = this.stringifyArray(this.keys);
	this.store.setAttribute('sjs-keymap', value);
	this.store.save(this.storeName);
};
	
storage.loadKeyMap = function(){
	var keyString = this.store.getAttribute('sjs-keymap');
	var keys = ( typeof keyString.length != 'undefined'  && keyString.length > 0 ) ? this.parseString(keyString) : [];
	this.keys = keys;
};

storage.loadKeyMap();



/*********FILE**********
/../features/getAll/keymapped.js
********************/


storage.getAll = function(){
	var all = [];
	for(var i = 0, m = this.keys.length; i < m; i++){
		all.push({key: this.keys[i], value: this.get(this.keys[i])});
	}
	return all;
};



/*********FILE**********
/../features/keyMap/generic.js
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
/../features/keyMap/behavior.js
********************/


storage.saveKeyMap = function(){
	var value = this.stringifyArray(this.keys);
	this.store.setAttribute('sjs-keymap', value);
	this.store.save(this.storeName);
};
	
storage.loadKeyMap = function(){
	var keyString = this.store.getAttribute('sjs-keymap');
	var keys = ( typeof keyString.length != 'undefined'  && keyString.length > 0 ) ? this.parseString(keyString) : [];
	this.keys = keys;
};

storage.loadKeyMap();



/*********FILE**********
/../features/getAllKeys/keymapped.js
********************/


storage.getAllKeys = function(){
	return this.keys;
};
