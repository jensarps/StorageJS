var storage = {
		
	engine: "widget",
	
	get: function(key){
		return widget.preferenceForKey(key) || null;
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
