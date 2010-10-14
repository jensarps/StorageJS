var storage = {
		
	engine: "cookie",
	
	cookieName: 'StorageJSCookie',
	
	store: {},
	
	init: function(){
		this.readStoreFromCookie();
	},
	
	get: function(key){
		return this.store[key] || null;
	},
	
	set: function(key, value){
		this.store[key] = value;
		this.updateCookie();
	},
	
	remove: function(key){
		delete this.store[key];
		this.updateCookie();
	},
	
	updateCookie: function(){
		var cookieString = this.stringify(this.store);
		var c = document.cookie;
		var props = {
			expires: 100
		}
		// this is a shameless theft from dojo.
		var exp = props.expires;
		if(typeof exp == "number"){ 
			var d = new Date();
			d.setTime(d.getTime() + exp*24*60*60*1000);
			exp = props.expires = d;
		}
		if(exp && exp.toUTCString){ props.expires = exp.toUTCString(); }

		var value = encodeURIComponent(cookieString);
		var updatedCookie = this.cookieName + "=" + value, propName;
		for(propName in props){
			updatedCookie += "; " + propName;
			var propValue = props[propName];
			if(propValue !== true){ updatedCookie += "=" + propValue; }
		}
		document.cookie = updatedCookie;
	},
	
	readStoreFromCookie: function(){
		var c = document.cookie;
		var matches = c.match(new RegExp("(?:^|; )" + this.cookieName + "=([^;]*)"));
		var data = matches ? this.parse(decodeURIComponent(matches[1])) : {};
		
		this.store = data;
	},
	
	stringify: function(data){
		if(typeof(JSON) != 'undefined' && JSON.stringify){
			return JSON.stringify(data);
		}
		var string = '';
		for(var item in this.store){
			string += item + ':sjs-kv:' + this.store[item] + ':sjs-i:';
		}
		string = string.substring(0,string.length - 8);
		return string;
	},
	
	parse: function(string){
		if(typeof(JSON) != 'undefined' && JSON.parse){
			return JSON.parse(string);
		}
		var data = {};
		var pairs = string.split(':sjs-i:');
		for(var i=0, m=pairs.length ,kv; i<m; i++){
			kv = pairs[i].split(':sjs-kv:');
			data[kv[0]] = kv[1];
		}
		return data;
	}
};

storage.init();
