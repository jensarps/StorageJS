storage.getAllKeys = function(){
	var keys = [];
	
	var rs = this.db.execute('SELECT key FROM ' + this.tableName);
	var index = 0;
	while (rs.isValidRow() && rs.fieldCount() > 0) {
		keys.push(rs.field(0));
		rs.next();
	}
	rs.close();
	
	return keys;
};