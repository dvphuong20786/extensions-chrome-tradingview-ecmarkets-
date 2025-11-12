// form view website
$( document ).ajaxSend(function( event, jqxhr, settings ) {
	//$("#_formIpAddress_logDaily").prepend("ajaxSend: " + settings.url + "<br>");
});
// $( document ).ajaxComplete(function( event, xhr, settings ) {
// 	$("#_formIpAddress_logDaily").prepend("ajaxComplete: " +settings.url + "<br>");
// });


$(window).load(function (e) {
	
	let _auto1 = "cmanga", 
		_ip_auto_member = "member",
		_ip_auto_level = "level",
		_ip_market = "market";
	let _auto = window.location.origin;			//www.example.com
	if (_auto.toUpperCase().indexOf(_auto1.toUpperCase()) == -1){ return; }	//check domain
	
	
	//-------------------------------
	let _pathname = window.location.pathname;			//  /products/search.php
	if (_pathname.toUpperCase().indexOf(_ip_auto_member.toUpperCase()) !== -1 
	 && _pathname.toUpperCase().indexOf(_ip_auto_level.toUpperCase()) !== -1){

		$.ajax({
			url:AddFile_LoginIpAddress(),
			success:function(){
				
				$.ajax({
					url:runHandleEvent_IPADDRESS(),
					success:function(){
						$("#_formIpAddress").show();
					}
				});

			}
		}); 
	} 
});
 
function AddFile_LoginIpAddress(){

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let div = document.createElement('div');
			div.classList.add("_LoginIpAddress");
			div.innerHTML = this.responseText;
			
			document.body.insertBefore(div, document.body.firstChild);
			
		} else {
			console.log('ip-address readyState: ' + this.readyState);
		}
	};
	xhttp.open("GET", chrome.runtime.getURL("/ipAddress.html"), true);
	xhttp.send();

}

//----------------AUTO FORM IP ADDRESS-----------------
function runHandleEvent_IPADDRESS(){
  
	setdefaultcookie();
	loadImage_FROMIPADDRESS();
	loadText();


	loginDiemDanh();
	logoutDiemDanh();

 
	$("#_formIpAddress #_START_IP_ADDRESS").click(function () {

		if($(this).is(":checked")){
			if(_iphople){
				let _list_ip = getCookie("IP_ADDRESS_LIST");
				_list_ip = _list_ip + myiplocation + ",";
				setCookie("IP_ADDRESS_LIST", _list_ip, 1);
				
				let _html_ip = replaceAll(_list_ip,",","<br>");
				$("#diachidasudung").html(_html_ip);
				$("#_count_ip").text(_html_ip.split(',').length); 
				_ipCountExists = 0; 
				$("#_formIpAddress_logDaily").text("");
			}
			setCookie("IS_CHECKED_LOAD_GETIP", true, 90);
			checkIPaddress();
		}
		else{
			setCookie("IS_CHECKED_LOAD_GETIP", false, 90); 
			clearTimeout(_checkIPaddress_timeout); 
 		} 
    });
 
	$("#_formIpAddress #_hide").click(function () {
  
		$("#_formIpAddress #_hide img").hide();
		let hide_status = $(this).attr("status");

		if (hide_status == "1"){
			$("#_formIpAddress, #_form_xemthem_boss").animate({ height: w_ex0 });
			$("#_formIpAddress #_hide .ex0").show();
			$(this).attr("status", 0);
 
		}
		else { 
			$("#_formIpAddress, #_form_xemthem_boss").animate({ height: w_ex2 });
			$("#_formIpAddress #_hide .ex2").show();
			$(this).attr("status", 1); 
		}

    });
 
	$(".checkin .nutdiemdanh").click(function () {
		
		// let _list_ip = getCookie("IP_ADDRESS_LIST");
		// _list_ip = _list_ip + myiplocation + ",";
		// setCookie("IP_ADDRESS_LIST", _list_ip, 1);
		setTimeout(() => { // định nghĩa handle event 
			$(".popup_content.popup_center_important .yes_no button.yes").click(function () {
				setTimeout(() => {
					let _list_ip = getCookie("IP_ADDRESS_LIST");
					_list_ip = _list_ip + myiplocation + ",";
					setCookie("IP_ADDRESS_LIST", _list_ip, 1);
					setCookie("login_step", "step1_logout", 1);

					
					let _html_ip = replaceAll(_list_ip,",","<br>");
					$("#diachidasudung").html(_html_ip);
					$("#_count_ip").text(_html_ip.split(',').length);
					_ipCountExists = 0;
					$("#_formIpAddress_logDaily").text("");

					$(".checkin .nutdiemdanh").hide();

					document.getElementById("_formIpAddress_dangxuat").click();

				}, 1500);
			}); 
		}, 2000);
		
	}); 
	
	$("#_formIpAddress #_removeIP").click(function () {

		if (myiplocation != ""){
		 
			let _list_ip = getCookie("IP_ADDRESS_LIST");
				_list_ip = _list_ip + myiplocation + ",";
				setCookie("IP_ADDRESS_LIST", _list_ip, 1);
		}
	}); 
 
	checkIPaddress();
}

var _checkIPaddress_timeout;
function checkIPaddress(){
 

	if(_ipCountExists > 0) {  $("#_formIpAddress .IP_LOGIN_OK").hide(); }
	else{ $("#_formIpAddress .IP_LOGIN_OK").show(); }

	getMyIpAddress().then(() => runningIPADDRESS());
	
}


var _iphople = false; 
var _ipCountExists = 0;
var _ipCountNew = 0;
var _tmp_ip_change = "";
function runningIPADDRESS(){


	let _list_ip = getCookie("IP_ADDRESS_LIST");
	_iphople = false;
	if(myiplocation != "" && _list_ip.indexOf(myiplocation) == -1){
 
		_iphople = true;
		_ipCountExists = 0;
		_ipCountNew++;
		$(".checkin button:nth-of-type(2)").removeClass("fail");
		$("#_formIpAddress_logDaily").html(myiplocation + ' ('+_ipCountNew+')');


		if (getCookie("login_step") == "step1" && _ipCountNew >= 2){
			//automatic diemdanh
			diemdanhv1();
		}
		else
		{
			// $("#_formIpAddress_logDaily").prepend(getCookie("login_step") + ' ('+_ipCountNew+')');
		}

		_checkIPaddress_timeout = setTimeout(() => {
			checkIPaddress();
		}, 1000); 

	}else if (myiplocation != "" && _list_ip.indexOf(myiplocation) !== -1){
		if(_tmp_ip_change != myiplocation){
			_ipCountExists = 0;
			_tmp_ip_change = myiplocation;
		}
		_ipCountExists++;
		_ipCountNew = 0;
		$("#_formIpAddress_logDaily").prepend('<span class="error"><b><u>'+ myiplocation +'</u></b> <span style="font-size:11px">ĐÃ SỬ DỤNG ('+_ipCountExists+')</span></span><br>');
		
		_checkIPaddress_timeout = setTimeout(() => {
			checkIPaddress();
		}, 1000); 
		
	}else{
		_checkIPaddress_timeout = setTimeout(() => {
			checkIPaddress();
		}, 1000); 
	}
}
var myiplocation = "";
function getMyIpAddress(){
 
	// $("#acc_member_level_logDaily").prepend($('#popup_content .g-recaptcha iframe').length + ", " +
	// $('#popup_content .g-recaptcha iframe body').length + "<br>");

	if(!$("#_formIpAddress #_START_IP_ADDRESS").is(":checked")){
		return new Promise(function(resolve, reject){ reject("ok"); }); 
	}

	try{  
		$("#_formIpAddress .line.step1").addClass("active").removeClass("finish");
		return new Promise(function(resolve, reject){
			
			$.getJSON("https://api.ipify.org/?format=json", function(e) { 
				myiplocation = e.ip; 
				resolve(myiplocation);	//reject("error");
				$("#_formIpAddress .line.step1").removeClass("active").addClass("finish");
			});

		});
		
	}catch(e){ 
		return new Promise(function(resolve, reject){ resolve(e.message); }); 
	}
}


var _iplocation_default = "171.229.251.180,14.224.132.5,";
var _user_default = //"dvphuong,dvphuong10,dvpgame,dvpgame10,diemdanh,diemdanh10,oaoaoa,oaoaoa10," +
					"dvphuong,dvphuong1,dvphuong2,dvphuong3,dvphuong4,dvphuong5," +
					"dvphuong6,dvphuong7,dvphuong8,dvphuong9,dvphuong10,dvphuong11," +
					"dvpgame,dvpgame1,dvpgame2,dvpgame3,dvpgame4,dvpgame5,"+
					"dvpgame6,dvpgame7,dvpgame8,dvpgame9,dvpgame10,dvpgame11,"+
					"dvpgame12,dvpgame13,"+
					"diemdanh,diemdanh1,diemdanh2,diemdanh3,diemdanh4,diemdanh5,"+
					"diemdanh6,diemdanh7,diemdanh8,diemdanh9,diemdanh10,diemdanh11,"+
					"oaoaoa,oaoaoa1,oaoaoa2,oaoaoa3,oaoaoa4,oaoaoa5,"+
					"oaoaoa6,oaoaoa7,oaoaoa8,oaoaoa9,oaoaoa10,oaoaoa11";
var _pass_word_login = "123123";
function setdefaultcookie(){
	
	let today = new Date();
	let str_date =  today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();

	let _ngay_diem_danh = getCookie("NGAY_DIEM_DANH");
	if (_ngay_diem_danh == null || _ngay_diem_danh != str_date) {
		
		setCookie("NGAY_DIEM_DANH", str_date, 1);
		setCookie("IP_ADDRESS_LIST", _iplocation_default, 1);
		setCookie("USER_LOGIN_DIEMDANH",_user_default,1);  
	}
	
	let _isChecked = getCookie("IS_CHECKED_LOAD_GETIP");
	if (_isChecked == null){
		setCookie("IS_CHECKED_LOAD_GETIP",true,1000); 
	}
}

function loadText(){

	$(".checkin button:nth-of-type(2)").addClass("nutdiemdanh fail").attr('id', '_diemdanhv2_tudong_auto');
	let _list_ip = getCookie("IP_ADDRESS_LIST");
	let _html_ip = replaceAll(_list_ip,",","<br>");
	$("#diachidasudung").html(_html_ip);
	$("#_count_ip").text(_list_ip.split(',').length - 3);
	$("#_max_account").text(_user_default.split(',').length);
	$(".label_datetime_checkin").text(getCookie("NGAY_DIEM_DANH"));
	try{
		if(getCookie("IS_CHECKED_LOAD_GETIP")=="true"){ 
			$("#_formIpAddress #_START_IP_ADDRESS").attr('checked','checked');
			$("#level_module_function").css("opacity",0); 
		}else{
			$("#level_module_function").css("opacity",0.1);
		}
	}catch(e){ }



	try{
		let objCheckin = $(".checkin");
		if(objCheckin.length > 0){ 
			let _positionDiemDanh = $(objCheckin).offset();
			let w_checkin = $(objCheckin).width();
			let h_checkin = $(objCheckin).height();
			$("._LoginIpAddress").css({"left": _positionDiemDanh.left + w_checkin, "top": _positionDiemDanh.top + h_checkin });
			 
		} 
		else{
			let objLogin = $("header .top .div_middle .right ul li:nth-of-type(3) button");
			if (objLogin.length > 0){
				let _positionDiemDanh = $(objLogin).offset();
				let w_checkin = $(objLogin).width();
				let h_checkin = $(objLogin).height();
				$("._LoginIpAddress").css({"left": _positionDiemDanh.left + w_checkin + 20, "top": _positionDiemDanh.top + h_checkin });
			}
		}

		if(getCookie("IS_CHECKED_LOAD_GETIP")=="true"){
			$("._LoginIpAddress").css({"left": "45%", "top": "50px" });
		}
	}catch(e){}

}

var img1, img2, img3;
var img_ex0, img_ex1, img_ex2, img_ex3, w_ex0 = 38, w_ex1 = 245, w_ex2 = 350;  
function loadImage_FROMIPADDRESS(){


	img1 = chrome.runtime.getURL("/images/not-running.png");
	img2 = chrome.runtime.getURL("/images/running.png"); 
	img3 = chrome.runtime.getURL("/images/loading.gif");
	img_ex0 = chrome.runtime.getURL("/images/app/ex0.png");
	img_ex1 = chrome.runtime.getURL("/images/app/ex1.png");
	img_ex2 = chrome.runtime.getURL("/images/app/ex2.png");
	img_ex3 = chrome.runtime.getURL("/images/app/ex3.png");

	$("#_formIpAddress .member_labelcheckbox .is_start").attr("src", img1);
	$("#_formIpAddress .line .is_running").attr("src", img3);

	$("#_formIpAddress #_hide .ex0").attr("src", img_ex0);
	$("#_formIpAddress #_hide .ex1").attr("src", img_ex1);
	$("#_formIpAddress #_hide .ex2").attr("src", img_ex2).show();

	$("#_formIpAddress .line .img_hide .ex3").attr("src", img_ex0).show();
	$("#_formIpAddress .line .img_hide .ex4").attr("src", img_ex3);
}


function loginDiemDanh(){
	
	$("#_LOGIN_DIEMDANH").click(function () {

		let _diemdanh_checked = $(this).is(":checked");

		if (_diemdanh_checked){
  
			if (_ipCountExists > 0) { return false; } 

			let objmember = $(".profile .member_profile .member_info .name"); // objmember.length > 0: dang login
			if (objmember.length > 0) { return false; }

			//get user login
			let _user_login_list = getCookie("USER_LOGIN_DIEMDANH").split(','); 
			if(_user_login_list.length <= 0){ return false; }

			let objLogin = $("header .top .div_middle .right ul li:nth-of-type(3) button");
			if (objLogin.length > 0){
				$(objLogin).attr("id", "_thuchienlogindiemdanh");
				document.getElementById("_thuchienlogindiemdanh").click();
				
				login_action(_user_login_list);
			}
		} 
	});
}

function login_action(_user_login_list){  
		setTimeout(() => {
				let _btnlogin = $("#popup_content .popup_content.popup_center_important .yes_no button.yes.module_login");
			 
				$("#login_username").val(_user_login_list[0]);
				$("#login_password").val(_pass_word_login);
	
				$(_btnlogin).attr("id","_btndiemdanhlogin_action");
				try{
					setCookie("login_step", "step1", 1);
					document.getElementById("_btndiemdanhlogin_action").click();
				}catch(e){
					login_action(_user_login_list);
				}
		}, 1000);  
}

function diemdanhv1(){
	setTimeout(() => {
		try{ 
			$("#_formIpAddress_logDaily").prepend('PopupCapcha');		//Show popup capcha 
			//$(".checkin button:nth-of-type(2)").attr("id","_diemdanhv2_tudong_auto");
			document.getElementById("_diemdanhv2_tudong_auto").click();
			setCookie("login_step", "step1_run", 1);

			setTimeout(() => {
				capchaVerify();
			}, 4000);
		}catch(e){
			// $("#_formIpAddress_logDaily").prepend('<span class="error"> showPopupCapcha </span>');
			diemdanhv1();
		}
	}, 1000);	
}

function capchaVerify(){
	setTimeout(() => {
		try{
			//.rc-anchor-content .rc-inline-block .rc-anchor-center-container .rc-anchor-center-item.rc-anchor-checkbox-holder #recaptcha-anchor
			//.rc-anchor-content .rc-inline-block .rc-anchor-center-container #recaptcha-anchor-label

			// $("#_formIpAddress_logDaily").prepend('step1_capchaVerify'); 
			  
			// $('#popup_content .g-recaptcha iframe body #rc-anchor-container .rc-anchor-content').attr('id', '_clickcapcha');
			// document.getElementById("_clickcapcha").click();

			// document.getElementById("recaptcha-anchor").click();
			// document.getElementById("recaptcha-anchor-label").click();
			//document.getElementById("recaptcha-anchor-label-span").click();

			let _positionCapcha = $('#popup_content .g-recaptcha').position();
			$(_positionCapcha).click();
			$('body').mousemove(function (event) {
				// $(this).css({
				// 	position: 'relative',
				// 	left: (event.pageX - _positionCapcha.left - 22) + 'px',
				// 	top: (event.pageY - _positionCapcha.top - 35) + 'px'
				// })
				// .click();
 

			});

		 


			setCookie("login_step", "step1_capchaVerify", 1);

			setTimeout(() => {
				//diemdanhv2();
			}, 4000);
		}catch(e){
			$("#_formIpAddress_logDaily").prepend('<span class="error"> step1_capchaVerify </span>');
			capchaVerify();
		}
	}, 1000);	
}

function diemdanhv2(){

	setTimeout(() => {
		try{
			
			$("#popup_content .popup_content.popup_center_important .yes_no button.yes").attr("id", "_ddv3");
			document.getElementById("_ddv3").click();

			
		}catch(e){
			$("#_formIpAddress_logDaily").prepend('<span class="error">'+ e.message +'</span>' + "<br>");
			diemdanhv2();
		}
	}, 1000);	
	
}

function logoutDiemDanh(){ 
	$("#_formIpAddress_dangxuat, #_LOGOUT_DIEMDANH").click(function () {

		let _status = $(this).attr("status");
		if(_status == "0"){
			
			$(this).attr("status", 1);
			$("#_formIpAddress .member_labelcheckbox .is_start").attr("src", img2);
			$("#_formIpAddress .line").removeClass("active");
		 

			let objLogout = $(".profile > div[target='member_control'].hidden_div ul li:nth-of-type(5) a");
			if (objLogout.length > 0){

				try{
					_user_default_list = getCookie("USER_LOGIN_DIEMDANH");
					let _userArr = _user_default_list.split(',');
					if(_userArr.length > 0){
						_user_default_list =  _user_default_list.replace(_userArr[0]+",","");
						setCookie("USER_LOGIN_DIEMDANH", _user_default_list, 1);
					}
				}catch(e){}
				

				$(objLogout).attr("id","_HO_TRO_DANG_XUAT");
				document.getElementById("_HO_TRO_DANG_XUAT").click();
			}

		}
		else{
			
			$(this).attr("status", 0);
			$("#_formIpAddress .member_labelcheckbox .is_start").attr("src", img1);
			$("#_formIpAddress .line").removeClass("active"); 
		}
    });
}


String.prototype.toDate = function(format)
{
  var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
  var normalizedFormat= format.replace(/[^a-zA-Z0-9]/g, '-');
  var formatItems     = normalizedFormat.split('-');
  var dateItems       = normalized.split('-');

  var monthIndex  = formatItems.indexOf("MM");
  var dayIndex    = formatItems.indexOf("dd");
  var yearIndex   = formatItems.indexOf("yyyy");
  var hourIndex     = formatItems.indexOf("hh");
  var minutesIndex  = formatItems.indexOf("mm");
  var secondsIndex  = formatItems.indexOf("ss");

  var today = new Date();

  var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
  var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
  var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

  var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
  var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
  var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

  return new Date(year,month,day,hour,minute,second);
};


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

// setCookie("test","test",1); // to create new cookie
// getCookie("test"); // to retrive data from cookie
// removeCookie("test"); // will delete that cookie

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, _replace) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), _replace);
}