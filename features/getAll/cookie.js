storage.getAll = function(){
	var all = [];
	for(var key in this.store){
		all.push({ key: key, value: this.get(key)});
	}
	return all;
};