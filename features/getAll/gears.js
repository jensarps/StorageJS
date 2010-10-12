storage.getAll = function(){
	var all = [];
	
	var rs = this.db.execute('SELECT * FROM ' + this.tableName);
	var index = 0;
	while (rs.isValidRow() && rs.fieldCount() > 1) {
		all.push({key: rs.fieldByName('key'), value: rs.fieldByName('value')});
		rs.next();
	}
	rs.close();
	
	return all;
};