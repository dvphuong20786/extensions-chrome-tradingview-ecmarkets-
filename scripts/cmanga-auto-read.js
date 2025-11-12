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
	
	if (_pathname.toUpperCase().indexOf(_auto_member1.toUpperCase()) == -1 
	 && _pathname.toUpperCase().indexOf(_auto_member2.toUpperCase()) == -1
	 && _pathname.toUpperCase().indexOf(_market.toUpperCase()) == -1
	 && (_auto + _pathname) != "https://cmanganew.com/" ){ // https://cmanganew.com/ 
		 
		//---------reading chapter
		console.log(_auto + " auto reading chapter!");
		$.ajax({
			url:AddFile_ReadingChapter(),
			success:function(){
				
				$.ajax({
					url:runHandleEvent_ReadingChapter(),
					success:function(){
						$("#zapper_auto_rewards").show();
					}
				});

			}
		});
	}

});


//----------------AUTO READING CHAPTER-----------------
function runHandleEvent_ReadingChapter(){

	loadImage_ReadingChapter();

	eventHandlePage();

	$("#zapper_auto_rewards #_daily").click(function () {

		if($(this).is(":checked")){
			_readingchapter_count_chap = 0;			
			$("#_block_screen").show();
			repeatRunningReward();
		}
		else{
			$("#_block_screen").hide();
			clearTimeout(_readingchapter_settimeout);  
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
function loadImage_ReadingChapter(){

	img1 = chrome.runtime.getURL("/images/not-running.png");
	img2 = chrome.runtime.getURL("/images/running.png"); 
	img3 = chrome.runtime.getURL("/images/loading.gif");
	img_ex0 = chrome.runtime.getURL("/images/app/ex0.png");
	img_ex1 = chrome.runtime.getURL("/images/app/ex1.png");
	img_ex2 = chrome.runtime.getURL("/images/app/ex2.png");


	$("#zapper_auto_rewards #_hide .ex0").attr("src", img_ex0);
	$("#zapper_auto_rewards #_hide .ex1").attr("src", img_ex1);
	$("#zapper_auto_rewards #_hide .ex2").attr("src", img_ex2).show();

}

function AddFile_ReadingChapter(){


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
	xhttp.open("GET", chrome.runtime.getURL("/ReadingChapter.html"), true);
	xhttp.send();

}

function eventHandlePage(){
	 
	$(document).keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which); 
		if(keycode == '32'){
			let _ads_click = document.getElementById('google_adsen_mask');
			_ads_click.click();

			setTimeout(() => {
				_ads_click.click();
				
				setTimeout(() => {
					$("#zapper_auto_rewards #_daily").click();
				}, 500);
				
			}, 500);
			 
		}
	  });
}

var _readingchapter_count_chap = 0;
var _readingchapter_settimeout;
var _readingchapter_time = 40;
function repeatRunningReward(){
	
	if (_readingchapter_count_chap < 22){ _readingchapter_count_chap = _readingchapter_count_chap + 1; }
	else{  return;  }

	_readingchapter_time = TryParseInt($("#_time").val(),0);
	$("#_block_screen").css({ "height": $(document).height() });
	
	try {
		// if (_readingchapter_count_chap % 2 == 0){
		// 	$('html').animate({ scrollTop: $(document).height()*0.8 }, 0);  
		// }
		
		$('#zapper_auto_rewards_logDaily').text("Count Chapter: " + _readingchapter_count_chap);
		ReadChap();
	} catch (ex) { }
 
	_readingchapter_settimeout = setTimeout(() => {
		repeatRunningReward();
	}, _readingchapter_time * 1000);
}

var slowmotion = 2000;
function ReadChap(){
		
		//Check Daily auto
		console.log("checkbox is(':checked') = " + $("#zapper_auto_rewards #_daily").is(":checked"));
		
		let objNext = $(".chapter_control .div_middle .middle button:not(.control_chapter_0).next_chapter");
		if (objNext.length > 0){
			$(objNext).attr("id", "_auto_reading_next_chapter");
			document.getElementById("_auto_reading_next_chapter").click();
		}
		else{alert("het chap")}
		/*
		//Sys.Application.add_load(LoadSecurityUrlFunction); //hệ thống js add và chạy luôn hàm
		//kiểm tra trang đã load hết js xong

		//scroll xuống dưới cùng
		$('html').animate({ scrollTop: $(document).height() }, slowmotion); 
		
		var s = setTimeout(() => { 
		
			var h = $(document).height() - ($(document).height()*0.2);
			$('html').animate({ scrollTop: h }, slowmotion);
		
		}, slowmotion); 
		//scroll lên trên khoảng 300px
	    */
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