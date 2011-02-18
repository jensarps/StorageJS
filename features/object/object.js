;(function(){
	
	storage.getObject = function(/* String */ key, /* Function? */ parse){
		//	summary:
		//		Retrieves an object from storage.
		//	description:
		//		With `storage.getObject` you can retrieve
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
		//	|	var valueObj = storage.getObject('someKey');
		parse = parse || JSON.parse;
		return parse(this.get(key));
	};
	
	storage.setObject = function(/* String */ key, /* Object */ value, /* Funtion? */ stringify){
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
		//		engine
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
		//	|	storage.setObject('someKey', 'someObject');
		stringify = stringify || JSON.stringify;
		return this.set(key, stringify(value));
	};
	
})();