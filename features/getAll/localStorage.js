storage.getAll = function(){
	//	summary:
	//		Retrieves all stored key/value
	//		pairs currently present in
	//		storage.
	//	description:
	//		`getAll` will collect everything
	//		that is stored and return an
	//		array of objects. If the storage
	//		is empty, it will return an empty
	//		array.
	//	feature:
	//		getAll
	//	example:
	//	|	var all = storage.getAll();
	//	|	console.log(all);
	//	|	// output could be:
	//	|	// [{key: 'someKey', value: 'someValue'}]
	var all = [],
		i = 0,
		m = localStorage.length,
		key;
	for(; i < m; i++){
		key = localStorage.key(i);
		all.push({ key: key, value: this.get(key)});
	}
	return all; // Array
};