// form view website

$(window).load(function (e) {
	
    //document.title = "Auto Read";  
	console.log("content.js: is running!");
	//Rewards
	//appendHTMLtocontent();  
	
	//AddFileVaoPageWeb();
	//OpenNewTabExtension();
	
	
	$.ajax({
		url:AddFileVaoPageWeb(),
		success:function(){
			
			$.ajax({
				url:runHandleEvent(),
				success:function(){
				    $("#zapper_auto_rewards").show();
				}
			});

		}
	});
	  
});


function runHandleEvent(){
	
	loadImage();

	$("#zapper_auto_rewards #_daily").click(function () {

		if($(this).is(":checked")){
			count_chap = 0;			
			$("#_block_screen").show();
			repeatRunningReward();
		}
		else{
			$("#_block_screen").hide();
			clearTimeout(v_settimeout);  
		}
  
    });  
	
	$("#acc_member_level #_hide").click(function () {

		$("#acc_member_level #_hide img").hide();
		let hide_status = $(this).attr("status");

		if (hide_status == "2"){
			$("#acc_member_level").animate({ height: w_ex0 });
			$("#acc_member_level #_hide .ex0").show();
			$(this).attr("status", 0);
		}
		else if (hide_status == "1"){
			$("#acc_member_level").animate({ height: w_ex2 });
			$("#acc_member_level #_hide .ex2").show();
			$(this).attr("status", 2);
		}
		else { 
			$("#acc_member_level").animate({ height: w_ex1 });
			$("#acc_member_level #_hide .ex1").show();
			$(this).attr("status", 1);
		} 
    });
 
	
}

var img1, img2, img3;
var img_ex0, img_ex1, img_ex2, w_ex0 = 38, w_ex1 = 245, w_ex2 = 445;  
function loadImage(){
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

function appendHTMLtocontent() {
	var _htm = '<div class="notify success" id="zapper_auto_rewards" style="width: 300px; position: fixed; height: 80px; right: 35%; top: 0; z-index: 100; background-color: #1ba1e2; color: #ffffff; display: block; margin: 0.3125rem; padding: 0.625rem;padding-right: 4px;">' +
		'	<span class="notify-closer"></span>' +
		'				<span class="notify-title" style="font-weight: 500; font-size: 1rem; display: block; margin-right: 20px;">Rewards Logs</span>' +
		'				<span class="notify-title" style="font-weight: 500; font-size: 12px; display: block; margin-right: 20px; float:right; text-decoration: underline; cursor: pointer;"' +
		'					  id="_hide" >hide</span>' +
		'				<span class="notify-title" style="font-size: 13px; display: block; margin-right: 20px;">' +
							'<input type="checkbox" id="_daily" name="_daily" value="1">' +
							'<label for="_daily"> Auto daily quest</label> &nbsp;&nbsp;&nbsp;&nbsp;' + 
		'				</span>' +
		'				<span class="notify-text" style="font-weight: 500; font-size: .875rem; display: block; margin-right: 20px;">' +
		'					<div id="zapper_auto_rewards_logDaily" style="font-size: 11px;overflow-y:auto;height:30px;"></div>' +
		'				</span>' +
		'			</div>';
	$("body").append(_htm);  
}


var count_chap = 0;
var v_settimeout;
var _time = 40;
function repeatRunningReward(){
	
	if (count_chap <= 25){ count_chap = count_chap + 1; }
	else{  return;  }

	_time = $("#_time").val();
	$("#_block_screen").css({ "height": $(document).height() });
	
	try {
		if (count_chap % 2 == 0){
			$('html').animate({ scrollTop: $(document).height()*0.8 }, 0);  
		}
		$('#zapper_auto_rewards_logDaily').text("Count Chapter: " + count_chap);
		//$('#log2').text("Count :" + count_chap);
		
		ReadChap();
	} catch (ex) { }
 
	v_settimeout = setTimeout(() => {
		repeatRunningReward();
	}, _time * 1000);
}

var slowmotion = 2000;
function ReadChap(){
		
		//Check Daily auto
		console.log("checkbox is(':checked') = " + $("#zapper_auto_rewards #_daily").is(":checked"));
		
		
		//Sys.Application.add_load(LoadSecurityUrlFunction); //hệ thống js add và chạy luôn hàm
		//kiểm tra trang đã load hết js xong
		
		
		//scroll xuống dưới cùng
		$('html').animate({ scrollTop: $(document).height() }, slowmotion); 
		
		var s = setTimeout(() => { 
		
			var h = $(document).height() - ($(document).height()*0.2);
			$('html').animate({ scrollTop: h }, slowmotion);
		
		}, slowmotion);
		
		//scroll lên trên khoảng 300px
}



var totalAcc = 0;
var selectAcc = 0;
var nameAcc ="";
function switchAccount(){

	$(".sidebar__account").click();
	if($(".dropdown_list").length == 0){
		setTimeout(() => {
			switchAccount();
		}, 1000);
	}
	else{
		//console.log("Chọn acc: " + (selectAcc + 1));
		if(totalAcc == 0) totalAcc = $(".account_item.wallet").length;

		if (totalAcc <= selectAcc){  
			var _log = "<br />----finish auto daily reward----<br />";
			$("#zapper_auto_rewards_logDaily").append(_log); 										//show log content
			chrome.runtime.sendMessage({ msg: "SEND_LOG", ACC_LOG: _log, ACC_AUTO_TYPE: "DAILY"});  //send popup
			resetForm();
			return;
		}

		//select acc
		var objacc = $(".account_item.wallet");
		$(objacc[selectAcc]).find(".account_item_wallet").click();

		nameAcc = $(objacc[selectAcc]).find(".editAddress_item_address").text();
		var _log = "<br />" + (selectAcc + 1) + ". " + " Run Account: " + nameAcc;
		$("#zapper_auto_rewards_logDaily").append(_log);											//show log content
		chrome.runtime.sendMessage({ msg: "SEND_LOG", ACC_LOG: _log, ACC_AUTO_TYPE: "DAILY"}); 		//send popup
		selectAcc = selectAcc + 1;

		//run acc
		setTimeout(() => {
			runAccountdaily($(objacc[selectAcc]));

			//next acc
			setTimeout(() => {
				switchAccount();
			}, 1000); 

		}, 1000); 
	}
}

function runAccountdaily(acc){

	var cards = $(".cards__list .card__item");
	var isdaily = false;

	for(var i = 0; i < cards.length; i++){
		var tit = $(cards[i]).find(".reward__card__type").text().toUpperCase();
		if (tit == ""){
			isdaily = true;

			//$(cards[i]).find(".card__item__body button:not(.button--disabled)")

			if($(cards[i]).find(".card__item__body button.button--disabled").length > 0){
				var _log = "(<span style='color: red'>disable</span>)";
				$("#zapper_auto_rewards_logDaily").append(_log);										//show log content
				chrome.runtime.sendMessage({ msg: "SEND_LOG", ACC_LOG: _log, ACC_AUTO_TYPE: "DAILY"}); 	//send popup
			}
			if($(cards[i]).find(".card__item__body button:not(.button--disabled)").length> 0){
				var _log = "(<span style='color: green'>ok</span>)";
				$("#zapper_auto_rewards_logDaily").append(_log);										//show log content
				chrome.runtime.sendMessage({ msg: "SEND_LOG", ACC_LOG: _log, ACC_AUTO_TYPE: "DAILY"}); 	//send popup
				//$(cards[i]).find(".card__item__body button:not(.button--disabled)").click();
			}

			//send message
			chrome.runtime.sendMessage({ msg: "RUN_REWARDS", ACC_INDEX: selectAcc, ACC_NAME: nameAcc});

		}
	}

	if (!isdaily){ 
		setTimeout(() => {
			runAccountdaily(acc); 
		}, 1000); 

	}else{}
}


function AddFileVaoPageWeb(){


	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var div = document.createElement('div');
			div.innerHTML = this.responseText;
			document.body.insertBefore(div, document.body.firstChild);
		} else {
			console.log('readyState: ' + this.readyState);
		}
	};
	xhttp.open("GET", chrome.runtime.getURL("/content.html"), true);
	xhttp.send(); 
}

function OpenNewTabExtension (){

	window.open(chrome.runtime.getURL("/contentlog.html"), '_blank').focus(); 
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

