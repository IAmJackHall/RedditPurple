// Cleans out the Storage every 24 hours
(function(){
	var Save = chrome.storage.sync;
	var time = Date.now();
	var EXPIRATION_DATE = 1000 * 60 * 60 * 24 * 2; // 2 Days;
	Save.get('lastStoredTime', function(res){
		var lastStoredTime = res.lastStoredTime || Date.now();
		var result = time - lastStoredTime;
		// If the last time this was set is greater
		// Than the expiration time OR there is no last stored 
		// Time. Remove PostsArray and set a new date
		if (result >= EXPIRATION_DATE || !res.lastStoredTime){
			Save.remove('PostsArray');
			Save.set({'lastStoredTime': Date.now()});
		}
	})
}())