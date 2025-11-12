// form view popup

 
window.onload = function () {
 
	$("#zapper_auto_rewards #_daily, #zapper_auto_rewards #_weekly").click(function () {

		if(!$(this).is(":checked")){ return false; }

		console.log("popup daily checked click");

		//CALL TO BACKGROUND
		//chrome.extension.getBackgroundPage().process_call_auto();

		

		//CALL TO CONTENT
		chrome.tabs.query({}, tabs => {
			tabs.forEach(tab => {
			chrome.tabs.sendMessage(tab.id, {msg: "CALL_AUTO", ACC_AUTO_TYPE: "DAILY" });
		  });
		});


		//var newWindow = window.open('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html', '_blank');
		// if (newWindow) {
		// 	//Browser has allowed it to be opened
		// 	setTimeout(function() {
		// 		newWindow.focus();
		// 		newWindow.location.href = newWindow.location.href.replace(/[\?#].*|$/, "/?q=new_value");
		// 	}, 1000);
			
		// } else {
		// 	//Browser has blocked it
		// 	alert('Please allow popups for this website');
		// } 

    });   
}


var coinClickCount = 0;
function findData(){

	coinClickCount = coinClickCount + 1;

	$("#clickCount").val(coinClickCount); 
		
	chrome.extension.getBackgroundPage().process_call_auto();
}


function showSelectAcc(accindex, accname){
	$("#thamso1").val(accindex);
	$("#thamso2").val(accname);
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	 
		if (request.msg == 'RUN_REWARDS') {
			console.log("popup RUN_REWARDS");
			showSelectAcc(request.ACC_INDEX, request.ACC_NAME);


			//var newWindow = window.open('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html', '_blank');
			// if (newWindow) {
			// 	//Browser has allowed it to be opened
			// 	setTimeout(function() {
			// 		newWindow.focus();
			// 		newWindow.location.href = newWindow.location.href.replace(/[\?#].*|$/, "/?q=new_value");
			// 	}, 1000);
				
			// } else {
			// 	//Browser has blocked it
			// 	alert('Please allow popups for this website');
			// }
		}
		else if (request.msg == 'msg_background') {
			console.log("popup - > " + request.msg_background);
		}
		else if (request.msg == 'SEND_LOG') {
			if (request.ACC_AUTO_TYPE == 'DAILY') {
				$("#zapper_auto_rewards_logDaily").append(request.ACC_LOG);
			}
		}
	}
);

 
 
 
 $("a.bookmark").click(function(e){
    e.preventDefault(); // this will prevent the anchor tag from going the user off to the link
    var bookmarkUrl = this.href;
    var bookmarkTitle = this.title;
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) { 
            alert("This function is not available in Google Chrome. Click the star symbol at the end of the address-bar or hit Ctrl-D (Command+D for Macs) to create a bookmark.");      
    }else if (window.sidebar) { // For Mozilla Firefox Bookmark
        window.sidebar.addPanel(bookmarkTitle, bookmarkUrl,"");
    } else if( window.external || document.all) { // For IE Favorite
        window.external.AddFavorite( bookmarkUrl, bookmarkTitle);          
    } else if(window.opera) { // For Opera Browsers
        $("a.bookmark").attr("href",bookmarkUrl);
        $("a.bookmark").attr("title",bookmarkTitle);
        $("a.bookmark").attr("rel","sidebar");
    } else { // for other browsers which does not support
         alert('Your browser does not support this bookmark action');
         return false;
    }
});
 


