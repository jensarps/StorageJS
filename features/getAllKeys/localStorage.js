storage.getAllKeys = function(){
	var keys = [],
		i = 0,
		m = localStorage.length;
	for(; i < m; i++){
		keys.push(localStorage.key(i));
	}
	return keys;
};