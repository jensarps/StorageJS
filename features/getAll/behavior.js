storage.getAll = function(){
	var all = [];
	var attributes = this.store.XMLDocument.documentElement.attributes;
	for(var i = 0, m = attributes.length; i < m; i++){
		all.push({key: attributes[i].name, value: attributes[i].value });
	}
	return all;
};