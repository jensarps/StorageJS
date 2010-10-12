


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
/../features/engine/widget.js
********************/


storage.addEngine('widget',{
	
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
});
