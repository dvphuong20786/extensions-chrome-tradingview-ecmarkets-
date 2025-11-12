var _ecmarkets1 = "ecmarkets";
var _ecmarkets2 = "accountManage";

var webSubDomain = "";
var webFullUrl = "";
$(window).load(function (e) {
	
	
	// if (webSubDomain.toUpperCase().indexOf(_tradingview1.toUpperCase()) == -1 &&
	// 	webSubDomain.toUpperCase().indexOf(_thuviensach1.toUpperCase()) == -1) { return; }
	 
	webSubDomain = window.location.origin;
	webFullUrl = window.location.href;
	 
	 
	// console.log(webSubDomain.toUpperCase().indexOf(_thuviensach2.toUpperCase()), webFullUrl, window.location.href)
	if (webSubDomain.toUpperCase().indexOf(_ecmarkets1.toUpperCase()) >= 0 && 
		webFullUrl.toUpperCase().indexOf(_ecmarkets2.toUpperCase()) >= 0) { 
		$.ajax({ 
			url:runHandleEvent_Quanlytaikhoan_cm_markets(1000),
			success:function(){
				includesFileCss_ecmarkets()
			}
		});
		console.clear();
		console.log("✅ " + _ecmarkets1 + _ecmarkets2 + " running extension ecmarkets!");  
	} 

});


//----------------AUTO FORM IP ADDRESS-----------------
function runHandleEvent_Quanlytaikhoan_cm_markets(t){
 
	setTimeout(() => {
		let _listAccValue = $(".tmd-layout.main-layout .base-main-container .tmd-tabs-content-holder .tmd-spin-container .tmd-row .tmd-col");

		let numbers = [];
		let elements = []; 
		// let oddElements = [];

		// ✅ Thu thập giá trị số và phần tử tương ứng
		if (_listAccValue.length > 1) {
			console.log("✅ running markets!");  

			_listAccValue.each(function(index, element) {

				let _value = $(element).find(".overflow-ellipsis .ar-lang-direction-reverse"); 
				if (_value.length > 0) {

					let valText = _value.text().trim().replace("+", "");
					let num = parseFloat(valText);

					if (!isNaN(num)) {
						numbers.push(num);
						elements.push(_value);
					} 
				}
				let _accdefault =  $(element).find("header span");
				if (_accdefault.length > 0) { 
					
					let idText = _accdefault.text().trim();
			 
					if (idText == "11009398" || idText == "11011359") {
						$(_listAccValue[index]).css({"display": "none"});
					}
				}
			});

			// ✅ Tìm giá trị chuẩn (xuất hiện nhiều nhất)
			let freq = {};
			numbers.forEach(n => {
				let key = n.toFixed(2); // làm tròn để nhóm cho chuẩn
				freq[key] = (freq[key] || 0) + 1;
			});

			// ✅ Giá trị chuẩn = giá trị xuất hiện nhiều nhất
			const threshold = 500; // ✅ chỉnh ngưỡng lệch ở đây
			let baseValue = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
 
			_listAccValue.each((i, el) => {
				let diff = Math.abs(numbers[i] - baseValue);
				let firstdiv = $(el).children("div").first();
				if (diff > threshold && numbers[i] != 0) { 
					$(firstdiv).addClass("olechchuan");
					$(elements[i]).addClass("valuelechchuan");
					// oddElements.push($(firstdiv)); 
				} else {
					$(firstdiv).removeClass("olechchuan"); 
					$(elements[i]).removeClass("valuelechchuan");
				}

				
			});
  
			
			// thêm số lãi đang có:
			let _listvalue = $(".tmd-layout.main-layout .base-main-container .tmd-tabs-content-holder .tmd-spin-container .tmd-row " + 
								".tmd-col > div > div > div:first-child > div:first-child > div.overflow-ellipsis > span:first-child");
			let _detectAccs = $(".tmd-layout.main-layout .base-main-container .tmd-tabs-content-holder .tmd-spin-container .tmd-row .tmd-col header span:first-child")
			let _giatrigoc= 0;
			_detectAccs.each(function(index, element) {  
				// console.log(element)
				let v = $(element).text().trim();
				if(v == "82008837") {
					_giatrigoc = 150;
				}
				else if(v == "82007108") {
					_giatrigoc = 149;
				}
			});
			// console.log("_giatrigoc", _giatrigoc);
			let _tonglai = 0;
			_listvalue.each(function(index, element) { 
				let _value = $(element).text().trim(); 
				let digits = _value.replace(/[^\d]/g, ''); //=> "3110402"

				if(Number(digits) > 0) {  
					let last4 = 0;
					try{
						last4 = digits.slice(0, digits.length - 4) - _giatrigoc; // "311" - 300 
					}catch(e){
						last4 = 0; 
					}
					_tonglai = _tonglai + Number(last4);
					// console.log(last4, _tonglai)

					let pLai = $(element).parent().find('.lai');
					if(pLai.length > 0) {
						$(pLai).text(last4);
					}
					else  {
						$(element).parent().append("<span class='lai'>"+last4+"</span>"); 
					} 
				}
			});

			// Tổng lãi: 
			let _element_tonglai = $(".tmd-tabs.tmd-tabs-top.tmd-tabs-card.normal-card-tabs .tonglai");
			if(_element_tonglai.length > 0) {
				$(_element_tonglai).text(_tonglai);
			}
			else {
				let a = $(".tmd-tabs.tmd-tabs-top.tmd-tabs-card.normal-card-tabs").append("<div class='tonglai'>"+_tonglai+"</div>"); 
 
			}
			
			
			// console.log("Base value:", baseValue, numbers.filter(n => Math.abs(n - baseValue) > threshold));
 
			runHandleEvent_Quanlytaikhoan_cm_markets(4000);
		}
		else {
			runHandleEvent_Quanlytaikhoan_cm_markets(1000);
		}
	}, t);
}

function includesFileCss_ecmarkets(){

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
			// console.log('readyState: ' + this.readyState);
		}
	};
	xhttp_doctruyen.open("GET", chrome.runtime.getURL("styles/ecmarkets.css"), true);
	xhttp_doctruyen.send();

}
 