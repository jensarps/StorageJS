(function(oldSet, oldGet, oldClear){
	
	storage.set = function(key, value){
		var result = false;
		try{
			result = oldSet.call(storage, key, value);
			result = (result === false) ? false : true;
		}catch(e){
		}
		return result;
	};
	
	storage.remove = function(key, value){
		var result = false;
		try{
			oldRemove.call(storage, key, value);
			result = true;
		}catch(e){
		}
		return result;
	};
	
	if(oldClear){
		
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
	
})(storage.set, storage.get, storage.clear);