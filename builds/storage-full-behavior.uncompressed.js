


/*********FILE**********
/features/engine/behavior.js
********************/


var storage = {
		
	engine: "behavior",
	
	store: null,
	
	storeName: '__StorageJS_BehaviorStorage',
	
	init: function(){
		this.store = this._createStore();
		this.store.load(this.storeName);
	},
	
	_createStore: function() {
        var storeNode = document.createElement('link');
        storeNode.id = this.storeName + 'Node'
        storeNode.style.display = 'none';
        
        document.getElementsByTagName('head')[0].appendChild(storeNode);
        storeNode.addBehavior('#default#userdata');
        
        return storeNode;
	},
	
	get: function(key){
		return this.store.getAttribute(key);
	},
	
	set: function(key, value){
		this.store.setAttribute(key, value);
		this.store.save(this.storeName);
	},
	
	remove: function(key){
		this.store.removeAttribute(key);
		this.store.save(this.storeName);
	}
};

storage.init();



/*********FILE**********
/features/clear/behavior.js
********************/


storage.clear = function(){
	var attributes = this.store.XMLDocument.documentElement.attributes;
	for(var i = 0, m = attributes.length; i < m; i++){
		this.store.removeAttribute(attributes[0].name);
	}
	this.store.save(this.storeName);
};



/*********FILE**********
/features/getAll/behavior.js
********************/


storage.getAll = function(){
	var all = [];
	var attributes = this.store.XMLDocument.documentElement.attributes;
	for(var i = 0, m = attributes.length; i < m; i++){
		all.push({key: attributes[i].name, value: attributes[i].value });
	}
	return all;
};



/*********FILE**********
/features/getAllKeys/behavior.js
********************/


storage.getAllKeys = function(){
	var keys = [];
	var attributes = this.store.XMLDocument.documentElement.attributes;
	for(var i=0, m = attributes.length; i<m; i++){
		keys.push(attributes[i].name);
	}
	return keys;
};
