var Save = chrome.storage.sync;
var PostsArray;
// Grab our data;
Save.get('PostsArray', function(res){
	PostsArray = res.PostsArray || [];
	NodeWatch.watchSelector('.expando-button', function(el){
		// IDs of each newly found link;
		var id = el.parentElement.parentElement.id

		// If the id has already been stored
		if (PostsArray.indexOf(id) >= 0){
			setPurple(id);

		// Otherwise Add an event Listener
		} else {
			el.addEventListener('click', function(){
				PostsArray.push(id);
				Save.set({'PostsArray': PostsArray}, function(){
					setPurple(id);
				})
			})
		}
	})
})

DomReady.ready(function(){
	setPurple();
})

// This will keep the Data variable updated as you make changes
chrome.storage.onChanged.addListener(function(changes, namespace){
	for (key in changes){
		var change = changes[key];
		console.log(key)
		if (key == 'PostsArray'){
			PostsArray = change.newValue;
			console.log(change.newValue);
		}
	}
})


// Make dem links purple
function setPurple(){
	if (typeof arguments[0] == 'string'){
		var el = document.getElementById(arguments[0]);
		if (el){
			el.querySelector('p.title a').style.color = "#551a8b";
		} 
	// Otherwise run through the whole shebang
	} else {
		for (var i = 0; i < PostsArray.length; i++){
			var id = PostsArray[i];
			var el = document.getElementById(id);
			// If the link still exists on this page
			// Reaction to RES never ending page
			if (el){
				el.querySelector('p.title a').style.color = "#551a8b"
			}	
		}
	}
}