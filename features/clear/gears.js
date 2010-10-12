storage.clear = function(){
	this.db.execute('DELETE FROM ' + this.tableName);
};