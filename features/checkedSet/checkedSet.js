(function(){
	var oldSet = storage.set;
	
	storage.set = function(key, value){
		oldSet(key, value);
		return storage.get(key) == value;
	};
	
})();
