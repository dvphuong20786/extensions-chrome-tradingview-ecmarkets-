$(window).load(function (e) {

	console.log("navigation-content.js: is running!");
	
	 
	//const tab = getCurrentTab();
	
	
	//chrome.scripting.executeScript({
	//	target: {tabId: tab.id},
	//	files: ['scripts/content.js']
	//});
	
	//chrome.tabs.executeScript({
    //   file: 'scripts/content.js'
    //});

	var origin = window.location.origin;
	console.log(origin);
	$.getScript('scripts/content.js', function() {
		console.log('Load was performed.');
	});	
	console.log(origin);
});



const getCurrentTab = async function () {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}