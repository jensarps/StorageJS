;(function(){
	
	storage.getObject = function(/* String */ key, /* Function? */ parse){
		parse = parse || JSON.parse;
		return parse(this.get(key));
	};
	
	storage.setObject = function(/* String */ key, /* Object */ value, /* Funtion? */ stringify){
		stringify = stringify || JSON.stringify;
		return this.set(key, stringify(value));
	};
	
})();