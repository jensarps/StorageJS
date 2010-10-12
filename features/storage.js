var storage = {
	
	engine: null,
	
	addEngine: function(engineName, mixin){
		for(var prop in mixin){
			storage[prop] = mixin[prop];
		}
		this.engine = engineName;
		
		this.init && this.init();
	}
};