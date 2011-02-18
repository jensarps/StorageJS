(function(oldSet){
	
	storage.set = function(key, value){
		oldSet.call(storage, key, value);
		return storage.get(key) == value;
	};
	
})(storage.set);
