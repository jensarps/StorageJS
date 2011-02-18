;(function(oldSet, oldGet){
	
	storage.get = function(/* String */ key, /* Function? */ parse){
		//	summary:
		//		Retrieves an object from storage.
		//	description:
		//		With `storage.get` you can retrieve
		//		a previously stored object from the storage.
		//		If there is no item associated with the
		//		given key, `getObject` will return `null`.
		//	feature:
		//		object
		//	key: String
		//		The key to look up in the storage.
		//	parse: Function?
		//		A parse method that consumes a JSON string
		//		and returns a JavaScript object. If no parse
		//		method is given, the JSON.parse method is
		//		used.
		//	example:
		//	|	var valueObj = storage.get('someKey');
		return (parse || JSON.parse)(oldGet.call(storage, key));
	};
	
	storage.set = function(/* String */ key, /* Object */ value, /* Funtion? */ stringify){
		//	summary:
		//		Stores a key/value pair in the storage.
		//	description:
		//		Tries to store the given value under
		//		the given key. Depending on the used
		//		storage engine, an exception may be
		//		raised during the process if the
		//		operation fails.
		//		If there is already a value stored
		//		with the same key, the old value is
		//		repleaced with the new one.
		//		Returns nothing.
		//	feature:
		//		object
		//	key: String
		//		The unique key to store the value under.
		//		This key is the identifier of the value,
		//		and can be used to retrieve the value
		//		later on.
		//	value: Object
		//		The value to store.
		//	stringify: Function?
		//		A stringify method that consumes a JavaScript
		//		object and returns a JSON string. If no
		//		stringify method is given, the JSON.stringify
		//		method is used.
		//	example:
		//	|	storage.set('someKey', 'someObject');
		return oldSet.call(storage, key, (stringify || JSON.stringify)(value));
	};
	
})(storage.get, storage.set);