storage.getAll = function(){
	var all = [];
	for(var i = 0, m = this.keys.length; i < m; i++){
		all.push({key: this.keys[i], value: this.get(this.keys[i])});
	}
	return all;
};