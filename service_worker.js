

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



