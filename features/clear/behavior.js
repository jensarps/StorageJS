storage.clear = function(){
	var attributes = this.store.XMLDocument.documentElement.attributes;
	for(var i = 0, m = attributes.length; i < m; i++){
		this.store.removeAttribute(attributes[0].name);
	}
	this.store.save(this.storeName);
};
