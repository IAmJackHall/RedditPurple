var EXPIRATION_LIMIT = 2;


if (!Cookies.get('jack-data')){
	Cookies.set('jack-data', [], {expires: EXPIRATION_LIMIT});
}
// Runs through all the existing Ids and sets them to purple
function setPurple(){
	var data = typeof arguments[0] == 'object' ? arguments[0] : Cookies.getJSON('jack-data');
	for (var i = 0; i < data.length; i++){
		var id = data[i];
		var el = document.getElementById(id);
		// If the video exists on this page
		if (el){
			el.querySelector('p.title a').style.color = "#551a8b"
		}	
	}
}
// This will be called as new buttons appear
NodeWatch.watchSelector('.expando-button', function(el){
	var id = el.parentElement.parentElement.id
	var master_data = Cookies.getJSON('jack-data');
	// If the id is already stored
	if (master_data.indexOf(id) >= 0) {
		el.previousSibling.querySelector('a').style.color = "#551a8b"

	// Otherwise attach an event listener
	} else {
		el.addEventListener('click', function(){
			var data = Cookies.getJSON('jack-data');
			data.push(id);
			Cookies.set('jack-data', data, {expires: EXPIRATION_LIMIT});
			el.previousSibling.querySelector('a').style.color = "#551a8b"
		})
	}
});
DomReady.ready(function(){
	setPurple();
})