storage.getAllKeys = function(){
	var keys = [];
	var attributes = this.store.XMLDocument.documentElement.attributes;
	for(var i=0, m = attributes.length; i<m; i++){
		keys.push(attributes[i].name);
	}
	return keys;
};