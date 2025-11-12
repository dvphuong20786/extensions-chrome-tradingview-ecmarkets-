var _ecmarkets1 = "ecmarkets";
var _ecmarkets2 = "accountManage";

var webSubDomain = "";
var webFullUrl = "";
$(window).load(function (e) {
	
	
	// if (webSubDomain.toUpperCase().indexOf(_tradingview1.toUpperCase()) == -1 &&
	// 	webSubDomain.toUpperCase().indexOf(_thuviensach1.toUpperCase()) == -1) { return; }
	 
	webSubDomain = window.location.origin;
	webFullUrl = window.location.href;
	 
	 
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

		$.ajax({
			url:AddFile_Reports(),
			success:function(){
 
				$.ajax({
					url:runHandleEvent_Reports(),
					success:function(){  
						// $("#acc_member_level").show();
					}
				});

			}
		}); 
	} 

});


var list_exclude = ["11009398", "11011359"];
var count = 150;
//----------------AUTO FORM IP ADDRESS-----------------
function runHandleEvent_Quanlytaikhoan_cm_markets(t){
 
	setTimeout(() => {
		let _listAccValue = $(".tmd-layout.main-layout .base-main-container .tmd-tabs-content-holder .tmd-spin-container .tmd-row .tmd-col");

		let numbers = [];
		let elements = []; 
		// let oddElements = [];
		let accounts = [];
		let sodus = [];

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
			 
					if (list_exclude.includes(idText)) {
						// if (idText == "11009398" || idText == "11011359") {
						$(_listAccValue[index]).css({"display": "none"});
					}
					accounts.push(idText);
				}

				let _soduElment =  $(element).find(" > div > div > div:first-child > div:first-child > div.overflow-ellipsis > span:first-child"); 
				let _sodu = 0;
				if (_soduElment.length > 0) { 
					 
					let _sodu1 = $(_soduElment).text().trim(); 
					let digits = _sodu1.replace(/[^\d]/g, ''); //=> "3110402"
				
					if(Number(digits) >= 0) {  
						try{
							_sodu = digits.slice(0, digits.length - 4);
						}catch(e){
							_sodu = 0; 
						} 
						sodus.push(_sodu);
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
			
			let _giatrigoc;
			 
			accounts.forEach(element => {   
				if(element == "82008837" || element == 82008837) {
					_giatrigoc = 150;
				}
				else if(element == "82007108" || element == 82007108) {
					_giatrigoc = 149;
				}
			});
			 
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
				let a = $(".tmd-tabs.tmd-tabs-top.tmd-tabs-card.normal-card-tabs").append("<div id='tonglai' class='tonglai' onclick='document.querySelector(`#i-phone-13-14-5`).style.display = `block`'>"+_tonglai+"</div>");  
			}
			
			luucookiesodu(accounts, sodus);
			updatePopup(accounts, sodus);

			if(count >= 0) {
				count--;
			}else {
				window.location.reload();
			}
			runHandleEvent_Quanlytaikhoan_cm_markets(4000);
		}
		else {
			runHandleEvent_Quanlytaikhoan_cm_markets(1000);
		}
	}, t);
}

function updatePopup(accounts, sodus) {

	let _total = 0;
	let _giatrigoc= 0;
	let _today = getDateToday();

	accounts.forEach(element => {   
		if(element == "82008837") {
			_giatrigoc = 150;
		}
		else if(element == "82007108") {
			_giatrigoc = 150;
		}
	});

	for (let index = 0; index < accounts.length; index++) {
		let acc = accounts[index];
		let sod = sodus[index];

		if(sod <= 0) continue;
 		
		let elma = $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc + " ._330._sodungay, " +
					 "#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc + " ._330._" +_today.replaceAll("/", "_"));
		if(elma.length > 0) {
			$(elma).text(sod - _giatrigoc);
			_total = _total + (sod - _giatrigoc);
		}
	}
	$("#i-phone-13-14-5  .frame-1171276543 .more").text(_total);
	$("#i-phone-13-14-5  .tongconglai").text(_total);
	$("#i-phone-13-14-5  .master-ruma2").text(_today);


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
 

var tab_index = 1;
function runHandleEvent_Reports(){
  
	$(".frame-45316").click(function () {
		$("#i-phone-13-14-5").hide();
	});
 
	$("#i-phone-13-14-5 .tabs .menu-item-tab").click(function () {
		$("#i-phone-13-14-5 .tabs .menu-item-tab").removeClass("active");
		$(this).addClass("active");
		tab_index = $(this).attr('tab-index');
		
		if(tab_index == 1) {
			// loadDataCookie_days();
		} else if (tab_index == 2) {
			loadDataCookie_weeks();
		} else if (tab_index == 3) {
			loadDataCookie_Months();
		} else if (tab_index == 4) {
			loadDataCookie_Years();
		}
	});

	if(tab_index == 1) {
		loadDataCookie_days(); 
	} else if (tab_index == 2) {
		loadDataCookie_weeks();
	} else if (tab_index == 3) {
		loadDataCookie_Months();
	} else if (tab_index == 4) {
		loadDataCookie_Years();
	} 
	
	loadImage();

	$("#i-phone-13-14-5 .glass-material").click(function() {
		let t = $(this).find(".frame-1171276545");
		if ($(t).is(":visible")) $(t).hide(); 
		else { 
			$(".frame-1171276545").hide(); 
			$(t).css("display", "flex"); 
		}
	});
}

function loadDataCookie_days() {
	let _today = getDateToday();
	let days = getRemainingDaysToStartOfMonth();

	let accounts = getCookie("accounts_days_" + _today);
	let sodus = getCookie("sodus_days_" + _today);
	let _accounts = [];
	let _sodus = [];

	if(accounts != null ) _accounts = accounts.split(',');
	if(sodus != null ) _sodus = sodus.split(',');

	

	let _giatrigoc= 0;
	_accounts.forEach(element => {   
		if(element == "82008837") {
			_giatrigoc = 150;
		}
		else if(element == "82007108") {
			_giatrigoc = 149;
		}
	});

	// console.log('loadDataCookie', accounts, sodus, _giatrigoc);

	

	let _total = 0;
	for (let index = _accounts.length - 1; index >= 0 ; index--) {
		let _acc = _accounts[index];
		let _sodu = _sodus[index];

		if (list_exclude.includes(_acc)) continue;
		if (_sodu <= 0) continue;
 
		let html = `<div class="glass-material" id='`+_acc+`'>
              <div class="music">
                <div class="frame-1171276105">
                  <img
                    class="z-2416572476752-a-594-f-9852-ae-78-b-64-c-12-c-277-bba-6-a-3-c-36 avata1"
                    src=""
                  />
                  <div class="frame-3">
                    <div class="c-u-o">`+_acc+`</div>
                    <div class="frame-1171276104">
                      <div class="master-ruma">` + _today + `</div>
                      <div class="ellipse-1"></div>
                      <div class="_3-30">3:30</div>
                    </div>
                  </div>
                </div>
                <div class="component-42">
                  <div class="_330 _sodungay">`+(_sodu - _giatrigoc)+`</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
					  <path d="M16.1935 2.79117C17.691 2.90312 19.0986 3.5488 20.1603 4.61079C20.7429 5.19307 21.2051 5.88445 21.5205 6.64543C21.8358 7.4064 21.9982 8.22206 21.9982 9.04579C21.9982 9.86952 21.8358 10.6852 21.5205 11.4462C21.2051 12.2071 20.7429 12.8985 20.1603 13.4808L12.7103 20.9308C12.6173 21.0245 12.5067 21.0989 12.3849 21.1497C12.263 21.2005 12.1323 21.2266 12.0003 21.2266C11.8683 21.2266 11.7376 21.2005 11.6157 21.1497C11.4938 21.0989 11.3832 21.0245 11.2903 20.9308L3.84028 13.4808C2.71509 12.3635 2.05506 10.8613 1.99308 9.27681C1.9311 7.69231 2.47178 6.14318 3.50625 4.94138C4.54072 3.73957 5.99213 2.97435 7.5682 2.79983C9.14427 2.6253 10.7279 3.05443 12.0003 4.00079C13.2081 3.10845 14.696 2.67923 16.1935 2.79117Z" fill="#DAA519"/>
				</svg>
                </div>
              </div>
              <div class="frame-1171276545">
                <div class="line-146"></div>
                <div class="frame-1171276534">
                  
                </div>
              </div>
            </div>`;
		$("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542").prepend(html); 
		_total = _total + (_sodu - _giatrigoc);
		 
	}
	$("#i-phone-13-14-5  .frame-1171276543 .more").text(_total);

	
	//lịch sử
	// console.log("days", days)
	for (let index = 0; index < days.length; index++) {
		let _day = days[index];
		let _day_account = getCookie("accounts_days_" + _day);
		let _day_sodu = getCookie("sodus_days_" + _day);
		
		let _day_accounts = [];
		let _day_sodus = [];
		

		if(_day_account == null) continue;
		else { 
			_day_accounts = _day_account.split(',');
			_day_sodus = _day_sodu.split(',');
		}
 

		for (let a = 0; a < _day_accounts.length; a++) {
			let acc = _day_accounts[a];
			let sod = _day_sodus[a];
			if (sod <= 0) continue;
			let _sod =  (sod - _giatrigoc);
 
			let elma = $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc + " .frame-1171276534");
			if(elma.length > 0) {
				 let _elmenthtml = `<div class="frame-1171276529">
                    <div
                      class="th-minh-s-ruma-m-nh-c-nh-c-s-b-m-n-h-a-m-nh-c-s-xu-n-hi-u-tr-nh-b-y-minh-s-v-t-p-ca-nam-n"
                    > ` + _day.slice(0, _day.length - 5)+ `
                    </div>
					<div class='_330 sodungay _`+_day.replaceAll("/", "_")+`'>`+_sod+`</div>
                  </div>`; 
				  $(elma).append(_elmenthtml);
			}
		} 
	}
}
 

function AddFile_Reports(){


	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let div = document.createElement('div');
			div.classList.add("reports_acc");
			div.innerHTML = this.responseText;
			
			$("body").prepend(div);
			//document.body.insertBefore(div, document.body.firstChild); 
		} else {
			// console.log('readyState: ' + this.readyState);
		}
	};
	xhttp.open("GET", chrome.runtime.getURL("/quanlyaccount_cm_markets_reports.html"), true);
	xhttp.send(); 
}

var img1, img2, img3, img4;
var img_ex0, img_ex1, img_ex2, img_ex3;
function loadImage(){
	img1 = chrome.runtime.getURL("/images/avata1.png");
	img2 = chrome.runtime.getURL("/images/avata2.png"); 
	img3 = chrome.runtime.getURL("/images/bg.png");
	img4 = chrome.runtime.getURL("/images/mask-group0.svg");
	// img_ex0 = chrome.runtime.getURL("/images/app/mask-group0.png");
	// img_ex1 = chrome.runtime.getURL("/images/app/ex1.png");
	// img_ex2 = chrome.runtime.getURL("/images/app/ex2.png");
	// img_ex3 = chrome.runtime.getURL("/images/app/ex3.png");

	// $("#acc_member_level .member_labelcheckbox .is_start, #acc_member_level .member_labelcheckbox .is_start_boss").attr("src", img1);
	$("#i-phone-13-14-5 .avata1").attr("src", img1);
	$("#i-phone-13-14-5 .avata2").attr("src", img2);
	$("#i-phone-13-14-5 .backgroundImage3").attr("src", img3);
	$("#i-phone-13-14-5 .mask-group.image4").attr("src", img4);
 
}

function luucookiesodu(accounts, sodus){

	let _today = getDateToday();
	let _month = getDateMonth();
	let _year = getDateYear();

	setCookie("accounts_days_" + _today, accounts, 1000);
	setCookie("sodus_days_" + _today, sodus, 1000);

	
	// console.log('luucookiesodu',"sodus_days_" + _today, _today, getCookie("sodus_days_" + _today), getCookie("accounts_days_" + _today))
	// let valuesodumonth = getCookie("sodus_month_" + _month);
	// if(valuesodumonth  == null) setCookie("sodus_month_" + _month, sodus, 1000);
	// else {
	// 	valuesodumonth.each(function(index, element) { });
	// }

}


 
function loadDataCookie_weeks(){
	
}
function loadDataCookie_Months(){
	
}
function loadDataCookie_Years(){
	
}
		 


function getDateToday(){
	let today = new Date();
	return str_date =  today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
}
function getDateMonth(){
	let today = new Date();
	return str_date =  (today.getMonth()+1) + "/" + today.getFullYear();
}
function getDateYear(){
	let today = new Date();
	return str_date =  today.getFullYear();
}


 

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


// lấy full các ngày trong tháng
function getDaysInMonth(month, year) {
  const days = [];
  const date = new Date(year, month - 1, 1); // month tính từ 0
  const lastDay = new Date(year, month, 0).getDate(); // lấy số ngày trong tháng

  for (let day = 1; day <= lastDay; day++) {
    const d = String(day).padStart(2, '0');
    const m = String(month).padStart(2, '0');
    days.push(`${d}/${m}/${year}`);
  }

  return days;
}
// const listDays = getDaysInMonth(11, 2025);
// console.log(listDays);		 //["01/11/2025", "02/11/2025", "03/11/2025", ..., "30/11/2025"]



//Nếu bạn chỉ muốn từ ngày hiện tại trở đi (ví dụ từ 13/11/2025 đến hết tháng):
function getRemainingDaysToStartOfMonth(fromDate = new Date()) {
  const days = [];
  const month = fromDate.getMonth() + 1;
  const year = fromDate.getFullYear();

  // lặp ngược từ ngày hiện tại về ngày 1
  for (let d = fromDate.getDate(); d >= 1; d--) {
    days.push(`${String(d).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`);
  }

  return days;
}
// console.log(getRemainingDaysInMonth(new Date("2025-11-13")));  	//["13/11/2025", "14/11/2025", "15/11/2025", ..., "30/11/2025"]
// console.log(getRemainingDaysInMonth();				//["13/11/2025", "14/11/2025", "15/11/2025", ..., "30/11/2025"]
