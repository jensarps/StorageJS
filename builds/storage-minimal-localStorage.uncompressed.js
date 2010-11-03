


/*********FILE**********
/features/engine/localStorage.js
********************/


var storage = {
		
	engine: "localStorage",
	
	get: function(/*String*/ key){
		//	summary:
		//		Retrieves a value from storage.
		//	description:
		//		With `storage.get` you can retrieve
		//		a previously stored item from the storage.
		//		If there is no item associated with the
		//		given key, `get` will return `null`.
		//	feature:
		//		engine
		//	key: String
		//		The key to look up in the storage.
		//	example:
		//	|	var value = storage.get('someKey');
		return localStorage.getItem(key); // String
	},
	
	set: function(/*String*/ key, /*String*/ value){
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
		//	value: String
		//		The value to store.
		//	example:
		//	|	storage.set('someKey', 'someValue');
		localStorage.setItem(key, value);
	},
	
	remove: function(/*String*/ key){
		//	summary:
		//		Removes a key/value pair from the
		//		storage.
		//	description:
		//		`remove` deletes the key/value pair
		//		that is associated with the given key,
		//		and frees up the storage space used
		//		by this pair.
		//		If there is no entry for the given
		//		key, nothing happens.
		//		Returns nothing.
		//	feature:
		//		engine
		//	key: String
		//		The key that identifies the pair.
		//	example:
		//	|	storage.remove('someKey');
		localStorage.removeItem(key);
	}
};
