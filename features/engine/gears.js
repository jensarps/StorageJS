// The initGears method is Copyright 2007, Google Inc.


var storage = {
		
	engine: "gears",
	
	dbName: 'SJSDatabase',
	
	tableName: 'SJSStorageTable',
	
	db: null,
	
	init: function(){
		this.initGears();
		this.db = google.gears.factory.create('beta.database');
		this.db.open(this.dbName);
		this.db.execute('CREATE TABLE IF NOT EXISTS ' + this.tableName + ' ( key TEXT PRIMARY KEY, value TEXT )');
	},
	
	get: function(key){
		var rs = this.db.execute('SELECT value FROM ' + this.tableName + ' WHERE key = ?', [key]);
		var value = null;
		if(rs.isValidRow() && rs.fieldCount() > 0) {
			value = rs.field(0);
		}
		rs.close();
		return value;
	},
	
	set: function(key, value){
		if(this.get(key) === null){ // no such key present, insert
			this.db.execute('INSERT INTO ' + this.tableName + ' values (?, ?)', [key, value]);
		}else{ // update
			this.db.execute('UPDATE ' + this.tableName + ' SET value = ? WHERE key = ?', [value, key]);
		}
	},
	
	remove: function(key){
		this.db.execute('DELETE FROM ' + this.tableName + ' WHERE key = ?', [key]);
	},
	
	initGears: function(){
	  if (window.google && google.gears) {
	    return;
	  }

	  var factory = null;

	  // Firefox
	  if (typeof GearsFactory != 'undefined') {
	    factory = new GearsFactory();
	  } else {
	    // IE
	    try {
	      factory = new ActiveXObject('Gears.Factory');
	      // privateSetGlobalObject is only required and supported on IE Mobile on
	      // WinCE.
	      if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
	        factory.privateSetGlobalObject(this);
	      }
	    } catch (e) {
	      // Safari
	      if ((typeof navigator.mimeTypes != 'undefined')
	           && navigator.mimeTypes["application/x-googlegears"]) {
	        factory = document.createElement("object");
	        factory.style.display = "none";
	        factory.width = 0;
	        factory.height = 0;
	        factory.type = "application/x-googlegears";
	        document.documentElement.appendChild(factory);
	        if(factory && (typeof factory.create == 'undefined')) {
	          // If NP_Initialize() returns an error, factory will still be created.
	          // We need to make sure this case doesn't cause Gears to appear to
	          // have been initialized.
	          factory = null;
	        }
	      }
	    }
	  }

	  // *Do not* define any objects if Gears is not installed. This mimics the
	  // behavior of Gears defining the objects in the future.
	  if (!factory) {
	    return;
	  }

	  // Now set up the objects, being careful not to overwrite anything.
	  //
	  // Note: In Internet Explorer for Windows Mobile, you can't add properties to
	  // the window object. However, global objects are automatically added as
	  // properties of the window object in all browsers.
	  if (!window.google) {
	    google = {};
	  }

	  if (!google.gears) {
	    google.gears = {factory: factory};
	  }

	}
};

storage.init();
