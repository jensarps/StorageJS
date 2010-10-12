


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
/../features/engine/localStorage.js
********************/


storage.addEngine('localStorage',{
	
	get: function(key){
		return localStorage.getItem(key);
	},
	
	set: function(key, value){
		localStorage.setItem(key, value);
	},
	
	remove: function(key){
		localStorage.removeItem(key);
	}
});



/*********FILE**********
/../features/clear/localStorage.js
********************/


storage.clear = function(){
	localStorage.clear();
};



/*********FILE**********
/../features/getAll/localStorage.js
********************/


storage.getAll = function(){
	var all = [],
		i = 0,
		m = localStorage.length,
		key;
	for(; i < m; i++){
		key = localStorage.key(i);
		all.push({ key: key, value: this.get(key)});
	}
	return all;
};



/*********FILE**********
/../features/getAllKeys/localStorage.js
********************/


storage.getAllKeys = function(){
	var keys = [],
		i = 0,
		m = localStorage.length;
	for(; i < m; i++){
		keys.push(localStorage.key(i));
	}
	return keys;
};
