storage.keys = [];
	
storage.ensureKeyInMap = function(key){
	if(!this.hasKeyInMap(key)){
		this.keys.push(key);
		this.saveKeyMap();
	}
};
	
storage.hasKeyInMap = function(key){
	for(var i = 0, m = this.keys.length; i< m; i++){
		if(key === this.keys[i]){
			return true;
		}
	}
	return false;
};
	
storage.removeKeyFromMap = function(key){
	var newKeys = [];
	for(var i = 0, m = this.keys.length; i< m; i++){
		if(key !== this.keys[i]){
			newKeys.push(key);
		}
	}
	this.keys = newKeys;
	this.saveKeyMap();
};
	
storage.stringifyArray = function(data){
	if(typeof JSON != 'undefined' && JSON.stringify){
		return JSON.stringify(data);
	}
	var string = '';
	for(var i = 0, m = data.length; i < m; i++){
		string += item + ':sjs-k:';
	}
	string = string.substring(0,string.length - 8);
	return string;
};
	
storage.parseString = function(string){
	if(typeof JSON  != 'undefined' && JSON.parse){
		return JSON.parse(string);
	}
	var data = string.split(':sjs-k:');
	return data;
};
