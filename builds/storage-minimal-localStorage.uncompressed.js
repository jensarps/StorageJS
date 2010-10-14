


/*********FILE**********
/features/engine/localStorage.js
********************/


var storage = {
		
	engine: "localStorage",
	
	get: function(key){
		return localStorage.getItem(key);
	},
	
	set: function(key, value){
		localStorage.setItem(key, value);
	},
	
	remove: function(key){
		localStorage.removeItem(key);
	}
};
