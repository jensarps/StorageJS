var test = {
	
	resultsNode: document.getElementById('results'),
	
	tests: 0,
	
	failures: 0,
	
	log: function(msg, result){
		this.tests++;
		if(!result){
			this.failures++;
		}
		this.resultsNode.innerHTML += ( '<div>' + msg + ': ' + ( result ? 'success' : 'failure' ) + '</div>');
	},
	
	done: function(){
		this.log("All done. " + this.tests + " Tests, " + this.failures + " Failures", this.failures === 0);
	}
	
};

function runTests(){
	
	var value, testValue, testValue2, 
		nullValue = storage.engine == "widget" ? "" : null, // Widget Prefs store returns empty string as null value.
		getNewValue = function(){ return (+new Date()) + ""; };
	
	// get/set
	value = getNewValue();
	storage.set('test-key',value);
	testValue = storage.get('test-key');
	test.log('testing set/get', value === testValue);

	// remove
	storage.remove('test-key');
	testValue = storage.get('test-key');
	test.log('testing remove', testValue === nullValue);
	
	// clear
	value = getNewValue();
	storage.set('test-key',value);
	storage.set('test-key-2',value);
	
	storage.clear();
	testValue = storage.get('test-key');
	testValue2 = storage.get('test-key-2');
	test.log('testing clear', testValue === nullValue && testValue2 === nullValue);
	
	// getAll
	value = getNewValue();
	storage.set('test-key',value);
	storage.set('test-key-2',value);

	var all = storage.getAll();
	test.log('testing getAll', 
		all.length === 2 &&
		(
			all[0].key === 'test-key' &&
			all[0].value === value &&
			all[1].key === 'test-key-2' &&
			all[1].value === value
		) ||
		(
			all[1].key === 'test-key' &&
			all[1].value === value &&
			all[0].key === 'test-key-2' &&
			all[0].value === value
		)
	);
	
	// getAllKeys
	var allKeys = storage.getAllKeys();
	test.log('testing getAllKeys', 
		all.length === 2 &&
		(
			allKeys[0] === 'test-key' &&
			allKeys[1] === 'test-key-2'
		) ||
		(
			allKeys[1] === 'test-key' &&
			allKeys[0] === 'test-key-2'
		)
	);
	
	// done!
	test.done();

}
