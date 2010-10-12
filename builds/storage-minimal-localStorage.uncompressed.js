


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
