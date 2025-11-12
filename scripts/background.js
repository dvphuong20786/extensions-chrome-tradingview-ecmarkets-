// connect to database

/*
---------------------- // Manifest V2
// background.js
chrome.tabs.executeScript({
  file: 'content-script.js'
});

// content-script.js
alert('File test alert');


// background.js
chrome.browserAction.onClicked.addListener(tab => { … });
chrome.pageAction.onClicked.addListener(tab => { … });
----------------------End--


---------------------- // Manifest V3
// background.js
async function getCurrentTab() { //code here }
let tab = await getCurrentTab();

chrome.scripting.executeScript({
  target: {tabId: tab.id},
  files: ['content-script.js']
});
// content-script.js
alert('File test alert');


// background.js
chrome.action.onClicked.addListener(tab => { … });
----------------------End--

*/
window.setTimeout(function() {
	
	//alert('background.js getVND!');
	/*
	  var obj = $(".css-tsk0hl");
	  if(obj.length > 0){
		  
		  alert($(obj[i]).find(".css-1q1sp11 .css-11db165 .css-4ptx7h .css-1m1f8hn").val());
		  console.log(_vnd);
	  }else{
		  alert("VND hello!");
	  }
	*/

}, 1000);



	
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.msg == 'RUN_REWARDS') {

			console.log("background RUN_REWARDS");
			chrome.runtime.sendMessage({ msg: "msg_background", msg_background: "background RUN_REWARDS"});
		}
	}
);


function process_call_auto() { 
	console.log("background process_call_auto");
	alert("background process_call_auto");
	chrome.runtime.sendMessage({ msg: "CALL_AUTO", ACC_AUTO_TYPE: "DAILY" });
}



 