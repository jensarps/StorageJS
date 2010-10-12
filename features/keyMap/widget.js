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
