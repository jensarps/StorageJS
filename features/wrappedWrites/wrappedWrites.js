(function(){
	var oldSet = storage.set;
	
	storage.set = function(key, value){
		var result = false;
		try{
			result = oldSet(key, value);
		}catch(e){
		}
		return result;
	};
	
	var oldRemove = storage.remove;
	
	storage.remove = function(key, value){
		var result = false;
		try{
			oldRemove(key, value);
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
				oldClear(key, value);
				result = true;
			}catch(e){
			}
			return result;
		};
	}
	
})();