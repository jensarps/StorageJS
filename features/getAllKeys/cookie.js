storage.getAllKeys = function(){
	var keys = [];
	for(var key in this.store){
		keys.push(key)
	}
	return keys;
};