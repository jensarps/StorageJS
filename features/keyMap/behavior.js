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
