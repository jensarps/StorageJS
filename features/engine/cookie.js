storage.addEngine('cookie',(function() {
	var cookieName = 'StorageJSCookie',
			store = {};
	
	function updateCookie() {
		var cookieString = stringify(store);
		var c = document.cookie;
		var props = {
			expires: 100
		};
		// this is a shameless theft from dojo.
		var exp = props.expires;
		if(typeof exp == "number"){ 
			var d = new Date();
			d.setTime(d.getTime() + exp*24*60*60*1000);
			exp = props.expires = d;
		}
		if(exp && exp.toUTCString){ props.expires = exp.toUTCString(); }

		var value = encodeURIComponent(cookieString);
		var updatedCookie = cookieName + "=" + value, propName;
		for(propName in props){
			updatedCookie += "; " + propName;
			var propValue = props[propName];
			if(propValue !== true){ updatedCookie += "=" + propValue; }
		}
		document.cookie = updatedCookie;
	}
	
	function readStoreFromCookie() {
		var c = document.cookie;
		var matches = c.match(new RegExp("(?:^|; )" + cookieName + "=([^;]*)"));
		store = matches ? parse(decodeURIComponent(matches[1])) : {};
	}
	
	function stringify(data){
		if(typeof(JSON) != 'undefined' && JSON.stringify){
			return JSON.stringify(data);
		}
		var string = '';
		for(var item in store){
			string += item + ':sjs-kv:' + store[item] + ':sjs-i:';
		}
		string = string.substring(0,string.length - 8);
		return string;
	}

	function parse(string){
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

	return {
		init: function(){
			readStoreFromCookie();
		},

		get: function(key){
			return store[key] || null;
		},

		set: function(key, value){
			store[key] = value;
			updateCookie();
		},

		remove: function(key){
			delete store[key];
			updateCookie();
		}
	};
	
})());
