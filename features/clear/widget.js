storage.clear = function(){
	for(var i = 0, m = this.keys.length; i < m; i++){
		widget.setPreferenceForKey(null, this.keys[i]);
	}
	this.keys = [];
	this.saveKeyMap();
};