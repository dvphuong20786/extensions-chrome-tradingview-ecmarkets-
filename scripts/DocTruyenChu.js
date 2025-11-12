// form view website
var _truyenchu1 = "docln",
	_truyenchu2 = "truyenyy",
	_truyenchu3 = "aspnetzero";
$(window).load(function (e) {
	
	
	let truyenchu = window.location.origin;
	if (truyenchu.toUpperCase().indexOf(_truyenchu1.toUpperCase()) == -1 
	 && truyenchu.toUpperCase().indexOf(_truyenchu2.toUpperCase()) == -1
	 && truyenchu.toUpperCase().indexOf(_truyenchu3.toUpperCase()) == -1){ return; }
	
	console.log(truyenchu + " running style đọc truyện!");
	 
	
	$.ajax({
		url:includesFileCss(),
		success:function(){  }
	});

}); 

function includesFileCss(){


	var xhttp_doctruyen = new XMLHttpRequest();
	xhttp_doctruyen.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			let _att = document.createAttribute("type"); 
			_att.value = "text/css";
			
			var _style = document.createElement('style');
			_style.innerHTML = this.responseText;
			_style.setAttributeNode(_att);
			
			document.body.insertBefore(_style, document.body.firstChild);
		} else {
			console.log('readyState: ' + this.readyState);
		}
	};
	xhttp_doctruyen.open("GET", chrome.runtime.getURL("styles/DocTruyenChu.css"), true);
	xhttp_doctruyen.send();

}



chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.msg == 'CALL_AUTO') {
			console.log("content CALL_AUTO"); 
			if (request.ACC_AUTO_TYPE == 'DAILY') {
				$("#zapper_auto_rewards #_daily").prop('checked', true);

				//code here

			}

		}
	}
);

