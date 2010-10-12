storage.clear = function(){
	for(var i = 0, m = this.keys.length; i < m; i++){
		this.store.removeAttribute(this.keys[i]);
	}
	this.keys = [];
	this.saveKeyMap(); // This also saves the store.
};
