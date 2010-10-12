storage.getAll = function(){
	var all = [],
		i = 0,
		m = localStorage.length,
		key;
	for(; i < m; i++){
		key = localStorage.key(i);
		all.push({ key: key, value: this.get(key)});
	}
	return all;
};