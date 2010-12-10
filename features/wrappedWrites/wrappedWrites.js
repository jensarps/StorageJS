(function(){
	var oldSet = storage.set;
	
	storage.set = function(key, value){
		var result = false;
		try{
			oldSet.call(storage, key, value);
			result = true;
		}catch(e){
		}
		return result;
	};
	
	var oldRemove = storage.remove;
	
	storage.remove = function(key, value){
		var result = false;
		try{
			oldRemove.call(storage, key, value);
			result = true;
		}catch(e){
		}
		return result;
	};
	
	if(storage.clear){
		var oldClear = storage.clear;
		
		storage.clear = function(key, value){
			var result = false;
			try{
				oldClear.call(storage, key, value);
				result = true;
			}catch(e){
			}
			return result;
		};
	}
	
})();