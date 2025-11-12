// form view website 
$(window).load(function (e) {
	
	let _auto1 = "cmanga", 
		_auto_member1 = "member",
		_auto_member2 = "level",
		_market = "market";
	let _auto = window.location.origin;			//www.example.com
	if (_auto.toUpperCase().indexOf(_auto1.toUpperCase()) == -1){ return; }	//check domain
	
	
	//-------------------------------
	let _pathname = window.location.pathname;			//  /products/search.php
	
	if ((_auto + _pathname) == "https://cmanganew.com/" ){ // https://cmanganew.com/ 
		 
		//---------reading chapter
 
		$.ajax({
			url:AddFile_ChatText(),
			success:function(){
				
				$.ajax({
					url:runHandleEvent_ChatText(),
					success:function(){
						$("#zapper_auto_rewards").show();
					}
				});

			}
		});
	}

});


//----------------AUTO READING CHAPTER-----------------
function runHandleEvent_ChatText(){

	loadImage_ChatText();
  
	$("#zapper_auto_rewards #_btnChatText").click(function () {

		if($(this).is(":checked")){
			setCookie("BTN_CHAT_TEXT", true, 30);
			setCookie("VALUE_CHAT_TEXT", $('#_ChatText').val(), 30);
			setCookie("CHAT_COUNT", 1, 30);
			runCHAT_TEXT();
		}
		else {
			setCookie("BTN_CHAT_TEXT", false, 30);
			setCookie("VALUE_CHAT_TEXT", $('#_ChatText').val(), 30);
			clearTimeout(_runCHAT_TEXT);
		}

    });

	$("#zapper_auto_rewards #_hide").click(function () {
 
		$("#zapper_auto_rewards #_hide img").hide();
		let hide_status = $(this).attr("status");

		if (hide_status == "1"){
			$("#zapper_auto_rewards").animate({ height: w_ex0 });
			$("#zapper_auto_rewards #_hide .ex0").show();
			$(this).attr("status", 0);
		}
		else { 
			$("#zapper_auto_rewards").animate({ height: 150 });
			$("#zapper_auto_rewards #_hide .ex1").show();
			$(this).attr("status", 1);
		} 

    });
 
}

var img1, img2, img3;
var img_ex0, img_ex1, img_ex2;  
function loadImage_ChatText(){

	img1 = chrome.runtime.getURL("/images/not-running.png");
	img2 = chrome.runtime.getURL("/images/running.png"); 
	img3 = chrome.runtime.getURL("/images/loading.gif");
	img_ex0 = chrome.runtime.getURL("/images/app/ex0.png");
	img_ex1 = chrome.runtime.getURL("/images/app/ex1.png");
	img_ex2 = chrome.runtime.getURL("/images/app/ex2.png");



	$("#zapper_auto_rewards #_hide .ex0").attr("src", img_ex0);
	$("#zapper_auto_rewards #_hide .ex1").attr("src", img_ex1);
	$("#zapper_auto_rewards #_hide .ex2").attr("src", img_ex2).show();

	try{
		let _val_chat_text = getCookie("VALUE_CHAT_TEXT").trim();
		$('#_ChatText').val(_val_chat_text);
	}catch(e){ }
	
	let _btnChat = getCookie("BTN_CHAT_TEXT"); 
	if (_btnChat == "true"){ 
		$("#zapper_auto_rewards #_btnChatText").attr('checked','checked');
		runCHAT_TEXT();
	} 
}

function AddFile_ChatText(){

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let div = document.createElement('div');
			div.innerHTML = this.responseText;
			document.body.insertBefore(div, document.body.firstChild);
		} else {
			console.log('readyState: ' + this.readyState);
		}
	};
	xhttp.open("GET", chrome.runtime.getURL("/cmanga-chat-text.html"), true);
	xhttp.send();

}



var _runCHAT_TEXT;
var _countsecond = 302;
var _chatGuild = 1;
function runCHAT_TEXT(){
	try{

		let _chattext = $('#_ChatText').val().trim();
		$('#chat_text').val(_chattext);
		// $('#chat_text').focus();
 
		var simulatedEvent = new KeyboardEvent("keypress", {keyCode: 13, which: 13});
		document.getElementById("chat_text").dispatchEvent(simulatedEvent);

		setTimeout(() => { 
			$(".chat_control button[chanel='global']").click();
			$('#chat_text').val(_chattext);
			document.getElementById("chat_text").dispatchEvent(simulatedEvent);

			setTimeout(() => { 
				$(".chat_control button[chanel='market']").click();
				$('#chat_text').val(_chattext);
				document.getElementById("chat_text").dispatchEvent(simulatedEvent);
				
				_chatGuild++;
				if (_chatGuild == 1){
					
					setTimeout(() => { 
						$(".chat_control button[chanel='recruit']").click();
						$('#chat_text').val(_chattext);
						document.getElementById("chat_text").dispatchEvent(simulatedEvent);
	
						let _chatcount = TryParseInt(getCookie("CHAT_COUNT"),0) + 1;
						setCookie("CHAT_COUNT", _chatcount, 30);
	
						$('#_tientrinhchat').text('('+_chatcount+')');
						$('#chat_text').val("");
					}, 500);
				}else if (_chatGuild > 1){
					_chatGuild = (_chatGuild >= 5)? 0: _chatGuild;

					let _chatcount = TryParseInt(getCookie("CHAT_COUNT"),0) + 1;
					setCookie("CHAT_COUNT", _chatcount, 30);

					$('#_tientrinhchat').text('('+_chatcount+')');
					$('#chat_text').val("");
				}
				 
			}, 500); 
		}, 500);
		
		_runCHAT_TEXT = setTimeout(() => {
			runCHAT_TEXT();
		}, TryParseInt($('#_time').val(),0) * 1000);
 

	} catch(e){ 
		$("#zapper_auto_rewards_logDaily").prepend('<span class="error">'+e.message+' </span>'); 
		_runCHAT_TEXT = setTimeout(() => {
			runCHAT_TEXT();
		}, TryParseInt($('#_time').val(),0) * 1000);

	} 
 
	//.chat_control button[chanel='global']
	//.chat_control button[chanel='market']
	//.chat_control button[chanel='recruit']
}
 


function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}


//----------------EVENT LISTENER-----------------
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
 


// Cookies
function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";               

    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removeCookie(name) {
    createCookie(name, "", -1);
}