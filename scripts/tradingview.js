// form view website
var _tradingview1 = "tradingview";
var _thuviensach1 = "thuviensach";
var _thuviensach2 = "/truyen-tranh/";
var _hoctienganh1 = "eltngl.com/api/"

var webSubDomain = "";
var webFullUrl = "";
$(window).load(function (e) {
	
	
	// if (webSubDomain.toUpperCase().indexOf(_tradingview1.toUpperCase()) == -1 &&
	// 	webSubDomain.toUpperCase().indexOf(_thuviensach1.toUpperCase()) == -1) { return; }
	
	
	 
	
	webSubDomain = window.location.origin;
	webFullUrl = window.location.href;
	

	if (webSubDomain.toUpperCase().indexOf(_tradingview1.toUpperCase()) >= 0) { 
		$.ajax({
			url:runHandleEvent_Popup_tradingview(),
			success:function(){
				// $("#_SUPPORT_MARKET").show();
			}
		});
		console.log(webSubDomain + " running extension tradingview!");
	}

	// console.log(webSubDomain.toUpperCase().indexOf(_thuviensach2.toUpperCase()), webFullUrl, window.location.href)
	if (webSubDomain.toUpperCase().indexOf(_thuviensach1.toUpperCase()) >= 0 && 
		webFullUrl.toUpperCase().indexOf(_thuviensach2.toUpperCase()) >= 0) { 
		$.ajax({
			url:runHandleEvent_Popup_truyenchu(),
			success:function(){
				// $("#_SUPPORT_MARKET").show();
			}
		});

		$.ajax({
			url:includesFileCss(),
			success:function(){  }
		}); 

		removeHtml_Popup(); 
		console.log(webSubDomain + _thuviensach2 + " running extension thuviensach!");
		
	}
	else if (webSubDomain.toUpperCase().indexOf(_thuviensach1.toUpperCase()) >= 0 && 
			 webFullUrl.toUpperCase().indexOf(_thuviensach2.toUpperCase()) == -1) {
		$.ajax({
			url:runHandleEvent_Popup_truyenchu2(),
			success:function(){
				// $("#_SUPPORT_MARKET").show();
			}
		});

		// $.ajax({
		// 	url:includesFileCss(),
		// 	success:function(){  }
		// }); 

		// removeHtml_Popup(); 
		console.log(webSubDomain + " running extension thuviensach!");
	}

	 
	if (webFullUrl.toUpperCase().indexOf(_hoctienganh1.toUpperCase()) >= 0) { 
		$.ajax({
			url:runHandleEvent_Popup_eltngl(),
			success:function(){
				// $("#_SUPPORT_MARKET").show();
			}
		});

		$.ajax({
			url:includesFileCssEltngl(),
			success:function(){  }
		}); 
		console.log(webSubDomain + " running extension "+_hoctienganh1+"!");
	}
	

});

//----------------AUTO FORM IP ADDRESS-----------------
function runHandleEvent_Popup_tradingview(){

	setTimeout(() => {
		//  check Popup

		let _popup = $("#overlap-manager-root div[data-dialog-name=gopro]");
		if (_popup.length > 0) {
			_popup.each(function(index, element) {
				let htmlContent = $(element).html();
				if (htmlContent && htmlContent.trim() !== "") {
					// console.log(htmlContent);
					$(element).html(""); // xóa nội dung của phần tử này
					console.log(webSubDomain + " extension remove popup " + index + "!");
				}
			});
		}
 
		runHandleEvent_Popup_tradingview();
		
	}, 1000);
	// loadImage_MARKET();

	// $("#profile_div .market_filter").append("<button id='_btnSupportSearch'>Search</button>");

	// $("#_SUPPORT_MARKET #_hide").click(function () {

	// 	$("#_SUPPORT_MARKET #_hide img").hide();
	// 	let hide_status = $(this).attr("status");

	// 	if (hide_status == "1"){
	// 		$("#_SUPPORT_MARKET, #_form_xemthem_value_market").animate({ height: w_ex0 });
	// 		$("#_SUPPORT_MARKET #_hide .ex0").show();
	// 		$(this).attr("status", 0);
 
	// 	}
	// 	else {
	// 		$("#_SUPPORT_MARKET, #_form_xemthem_value_market").animate({ height: w_ex2 });
	// 		$("#_SUPPORT_MARKET #_hide .ex2").show();
	// 		$(this).attr("status", 1);
	// 	}

    // });

	// $("#_SUPPORT_MARKET_SEARCH, #_btnSupportSearch").click(function () {

	// 	let _status = $(this).attr("status");
	// 	if(_status != "1"){
	// 		// alert(1)
	// 		$(this).attr("status", 1);
	// 		$("#_SUPPORT_MARKET .member_labelcheckbox .is_start").attr("src", img2);
	// 		$("#_SUPPORT_MARKET .line").removeClass("active");
	// 		$("#_SHOW_LOG").text("");
	// 		btnSearch();
	// 	}
	// 	else{
	// 		// alert(0)
	// 		$(this).attr("status", 0);
	// 		$("#_SUPPORT_MARKET .member_labelcheckbox .is_start").attr("src", img1);
	// 		$("#_SUPPORT_MARKET .line").removeClass("active"); 
			
	// 	}
    // });

	// $("#_COPY_DATA").click(function () {
	// 	copyToClipboard($("#_SHOW_LOG").html());
	// });

	// $("#_xemthem_market").click(function () {

	// 	$("#_xemthem_market img").hide();
	// 	let _xemthemstatus = $(this).attr("status");

	// 	if (_xemthemstatus == "0"){	//open
	// 		$("._SUPPORT_MARKET_WARP").animate({ width: 680 });
	// 		$("#_xemthem_market .ex3").show();
	// 		$(this).attr("status", 1); 
	// 	}
	// 	else {	//close
	// 		$("._SUPPORT_MARKET_WARP").animate({ width: 150 }); 
	// 		$("#_xemthem_market .ex4").show();
	// 		$(this).attr("status", 0); 
	// 	} 
    // });
		
}

function runHandleEvent_Popup_truyenchu(){

	setTimeout(() => {
		//  check Popup 
		let _thuviensach = $("#floatcenter");
		if (_thuviensach.length > 0) {
			_thuviensach.remove();
			// $(_thuviensach).html(""); 
			console.log(webSubDomain + _thuviensach2 + " extension remove popup!");
		}

		let _field = $("#primary > fieldset, #primary > section, #primary > form, #primary > div");
		if (_field.length > 0) {
			_field.each(function(index, element) {
				let htmlContent = $(element).html();
				if (htmlContent && htmlContent.trim() !== "") {
					// console.log(htmlContent);
					$(element).remove(); // xóa nội dung của phần tử này
					console.log(webSubDomain + _thuviensach2 + " extension remove element " + index + "!");
				}
			});
		}

		let _field_p = $("#primary > p");
		if (_field_p.length > 0) {
			for (let index = 1; index < _field_p.length; index++) {
				const element = _field_p[index];
				let htmlContent = $(element).html();
				if (htmlContent && htmlContent.trim() !== "" && index != (_field_p.length - 4)) {
					// console.log(htmlContent);
					$(element).html(""); // xóa nội dung của phần tử này
					console.log(webSubDomain + _thuviensach2 + " extension remove element p " + index + "!");
				}
			} 
			 
		}

		runHandleEvent_Popup_truyenchu();
		
	}, 1000);
	 
}


function runHandleEvent_Popup_truyenchu2(){

	setTimeout(() => {
		//  check Popup 
		let _thuviensach = $("#floatcenter");
		if (_thuviensach.length > 0) {
			_thuviensach.remove();
			// $(_thuviensach).html(""); 
			console.log(webSubDomain + " extension remove popup!");
		}

		runHandleEvent_Popup_truyenchu2();
		
	}, 1000);
	 
}



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
	xhttp_doctruyen.open("GET", chrome.runtime.getURL("styles/tradingview.css"), true);
	xhttp_doctruyen.send();

}

function includesFileCssEltngl(){


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
	xhttp_doctruyen.open("GET", chrome.runtime.getURL("styles/Eltngl.css"), true);
	xhttp_doctruyen.send();
	console.log('Eltngl.css');
}


function removeHtml_Popup(){
	let _popup = $("#page #content div.section.row");
		if (_popup.length > 0) {
			_popup.each(function(index, element) {
				let htmlContent = $(element).html();
				if (htmlContent && htmlContent.trim() !== "") { 
					$(element).html(""); // xóa nội dung của phần tử này
				}
			});
		}
}

const log = (...a)=> { console.log(a.join(' ') + '\n')}
function runHandleEvent_Popup_eltngl(){

	//toolbar
	eltngl_toolbar();

	

	return;
	// const log = (...a)=> { console.log(a.join(' ') + '\n')}
	try {
		printPageArea(undefined,".pages .page");
	} catch (error) {
		log('❌', error);
	}
		
}

var countLoad = 0;
function printPageArea(areaID, areaClass){

	if(countLoad >= 20) return;

    var printBody;
	var printContent;
	

	var iframe = document.querySelector("iframe");
	var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

	if(areaID && iframeDoc) printContent = iframeDoc.getElementById(areaID);
	else if(areaClass && iframeDoc) printContent = iframeDoc.querySelector(areaClass);
	printBody = iframeDoc.querySelector("html");

 

	if(printContent && printBody.innerHTML) {
		setTimeout(() => {

			 //document.querySelector('#log').textContent += a.join(' ') + '\n';

			// if(areaID && iframeDoc) printContent = iframeDoc.getElementById(areaID);
			// else if(areaClass && iframeDoc) printContent = iframeDoc.querySelector(areaClass);
			

			var WinPrint = window.open('', '1123', 'width=900,height=650');
			WinPrint.document.write(printBody.innerHTML);
			WinPrint.document.close();
			WinPrint.focus();
			WinPrint.print();
			// WinPrint.close();

			// JSPM.JSPrintManager.license_url = "https://jsprintmanager.azurewebsites.net/licenses/jsprintmanager";
			// JSPM.JSPrintManager.auto_reconnect = true;
    		// JSPM.JSPrintManager.start("https://jspmblazorserver.azurewebsites.net/licenses/jsprintmanager");

			// JSPM.JSPrintManager.WS.onStatusChanged = function () {
			// 	const s = JSPM.JSPrintManager.websocket_status;
			// 	if (s === JSPM.WSStatus.Open)       	log('✅ JSPM: Open (đã kết nối)');
			// 	else if (s === JSPM.WSStatus.Closed)	log('❌ JSPM: Closed (chưa cài/chưa chạy App?)');
			// 	else if (s === JSPM.WSStatus.Blocked)	log('⛔ JSPM: Blocked (App đang chặn website này)');
			// 	else                                 	log('ℹ️ JSPM status:', s);
			// };

		 
				
		}, 4000); 
	}
	else {
		
		setTimeout(() => {
			countLoad++;
			try {
				printPageArea(areaID, areaClass);
			} catch (error) {
				log('❌', error);
			} 
		}, 1000);
	}
    
}

var countLoad_toolbar = 0;
var toolbarContent;
var toolbartInput;
function eltngl_toolbar() {
	if(countLoad_toolbar >= 10) return;
 
	
	var pages_wrapperContent;

	var ibody = document.querySelector("body");
	if(ibody) {
		ibody.style.height = "98vh";
		ibody.style.overflow = "hidden";
	}

	var iframe = document.querySelector("iframe");
	var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
	var toolbartmp1;
	var toolbartmp2;
	var toolbartmp3;
	var toolbartmp4s;
	var toolbartmp5;
	var toolbartmp6s;
	var toolbartmp7;
	

	if(iframeDoc) {
		toolbarContent = iframeDoc.querySelector("body.isEbook .contentblock .book .toolbar"); 
		pages_wrapperContent = iframeDoc.querySelector("body.isEbook .contentblock .book .pages-wrapper"); 
		bodyPages = iframeDoc.querySelector("body.isEbook .contentblock .book .pages-wrapper .pages"); 
		
		// toolbartmp1 = iframeDoc.querySelector("body.isEbook .contentblock .book .toolbar .toggle-wrapper-book-buttons"); 
		// toolbartmp2 = iframeDoc.querySelector("body.isEbook .contentblock .toolbar .toolbar-content");  
		// toolbartmp3 = iframeDoc.querySelector("body.isEbook .contentblock .toolbar .group:first-child"); 
		// toolbartmp4s = iframeDoc.querySelectorAll("body.isEbook .contentblock .toolbar .group"); 
		// toolbartmp5 = iframeDoc.querySelector("body.isEbook .contentblock .toolbar .group.toc-and-pagi");  
		// toolbartmp6s= iframeDoc.querySelectorAll("body.isEbook .contentblock .toolbar .group.pagination .btn");  
		// toolbartmp7 = iframeDoc.querySelector("body.isEbook .contentblock .toolbar .group.pagination");  
		if(toolbarContent) {
			toolbartmp1 = toolbarContent.querySelector(".toggle-wrapper-book-buttons"); 
			toolbartmp2 = toolbarContent.querySelector(".toolbar-content");  
			toolbartmp3 = toolbarContent.querySelector(".group:first-child"); 
			toolbartmp4s = toolbarContent.querySelectorAll(".group"); 
			toolbartmp5 = toolbarContent.querySelector(".group.toc-and-pagi");  
			toolbartmp6s= toolbarContent.querySelectorAll(".group.pagination .btn");  
			toolbartmp7 = toolbarContent.querySelector(".group.pagination");  
			toolbartmp7 = toolbarContent.querySelector(".group.pagination");  
			toolbartInput = toolbarContent.querySelector(".group.toc-and-pagi input");  
		}
		
	}
	if(toolbarContent 
		&& toolbartmp1
		&& toolbartmp2
		&& toolbartmp3
		&& toolbartmp4s
		&& toolbartmp5
		&& toolbartmp6s
		&& toolbartmp7
	) { 

		// toolbarContent.style.height = "90%";
		// toolbarContent.style.top = "20px"; 
		// toolbarContent.style.right = "-16px"; 
		toolbarContent.style.transform = "scale(0.6)";
		toolbarContent.style.boxShadow = "none";

		pages_wrapperContent.style.padding = "0"; 
		// pages_wrapperContent.style.paddingLeft = "15px"; 
		// pages_wrapperContent.style.right = "46px"; 

		bodyPages.style.boxShadow = "none";

		//toolbar temp
		toolbarContent.style.height = "auto";
		toolbarContent.style.top = "auto"; 
		toolbarContent.style.right = "28vw";
		toolbarContent.style.bottom = "16px";
		toolbarContent.style.width = "660px";
		pages_wrapperContent.style.right = "0px"; 
		
		toolbartmp1.style.display = "none";
		toolbartmp2.style.flexDirection = "row";
		toolbartmp2.style.height = "auto";
		toolbartmp2.style.alignItems = "flex-start";
		toolbartmp2.style.justifyContent = "center";
		toolbartmp3.style.flexDirection = "row";
		toolbartmp3.style.justifyContent = "center";
		toolbartmp3.style.alignItems = "flex-start";
		toolbartmp3.style.width = "100vw";
		toolbartmp5.style.display = "flex";
		toolbartmp5.style.alignItems = "center";
		toolbartmp7.style.padding = "0px";
		toolbartmp7.style.paddingTop = "5px";
		toolbartmp7.style.alignItems = "center";
  

		toolbartmp4s.forEach(element => {
			element.style.height = "48px";
		});
		toolbartmp6s.forEach(element => {
			element.style.marginBottom = "0px";
		});

		console.clear();
		log('✅ toolbar');

		
		iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
		iframeDoc.addEventListener("keydown", function (e) {
			// log('⛔ keydown'); 
			// Kiểm tra Ctrl + P
			if (e.ctrlKey  && e.key.toLowerCase() === "p") { 
				// e.preventDefault(); // chặn hành động in mặc định 
				// có thể gọi hàm in riêng hoặc xử lý logic khác tại đây
				handleAction();
				// if(!isProcessing) {
				// 	toolbarContent.style.display = "none";
				// 	log('⛔ ctrl + p'); 
				// }
			}
			// if (e.key.toLowerCase() === "p") {  
			// 		toolbarContent.style.display = "none";
			// 		log('⛔ ctrl + p p'); 
			// }
		});

		
		// Bắt click chuột trái
		iframeDoc.addEventListener("click", function (e) {
			if (e.button === 0) { // 0 = chuột trái, 1 = giữa, 2 = phải 
				handleActionClick();
				// if(!isProcessingClick)
				// {
				// 	toolbarContent.style.display = "block";
				// 	log('❌ℹ️ click'); 
				// }	
			}
		});

		
		
	}
	else {
		setTimeout(() => {
			countLoad_toolbar++;
			try {
				eltngl_toolbar();
			} catch (error) {
				console.clear();
				console.log(error);
				log('❌', error);
			} 
		}, 1000);
	}
	
	// var printBody = iframeDoc.querySelector("html");
}


var isProcessing = false;
function handleAction(msg) {
	if (isProcessing) return; // đang chạy thì bỏ qua
      	
	isProcessing = true;  
	toolbarContent.style.display = "none";
	log('⛔ ctrl + p Page:' + toolbartInput.value); 

	// reset sau 500ms (tùy chỉnh thời gian)
	setTimeout(() => {
	isProcessing = false;
	// console.log("isProcessing = false")
	}, 1200);
}

var isProcessingClick = false;
function handleActionClick(msg) {
	if (isProcessingClick || isProcessing) return; // đang chạy thì bỏ qua

	isProcessingClick = true; 
	toolbarContent.style.display = "block";
	log('❌ℹ️ click'); 

	setTimeout(() => {
	isProcessingClick = false; 
	}, 800);
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



