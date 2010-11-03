storage.getAllKeys = function(){
	//	summary:
	//		Retrieves all keys currently
	//		present in storage.
	//	description:
	//		`getAllKeys` will collect all
	//		keys that are stored and return an
	//		array of keys. If the storage
	//		is empty, it will return an empty
	//		array.
	//	feature:
	//		getAllKeys
	//	example:
	//	|	var keys = storage.getAllKeys();
	//	|	console.log(keys);
	//	|	// output could be:
	//	|	// ['someKey']
	var keys = [],
		i = 0,
		m = localStorage.length;
	for(; i < m; i++){
		keys.push(localStorage.key(i));
	}
	return keys; // Array
};