

var _giatrigoc = 150; // vốn mặc định 1 acc
var _taikhoan002_1 = 200; // vốn mặc định 1 acc
var _taikhoan002_2 = 300; // vốn mặc định 1 acc

var auto_login = false;	// tự động login ?  false = không, true = có
	var staySecond = 300; // 5*60; // --> nếu bị logout 5' sau login lại 
	var username = 'dvphuong.dev@gmail.com';
	var password = 'Dichoide123';

var xem_online = true; // xem dữ liệu online ? false = không, true = có
	var source = "phuongdv";  // source nơi lưu trữ data: google firebase
	var source_url = "https://phuongdv-theodoi-default-rtdb.firebaseio.com"; 
	// "https://thienquang-theodoi-default-rtdb.firebaseio.com/"; 

	var source1 = "dvphuong";  // source nơi lưu trữ data: google firebase
	var source1_url = "https://dvphuong-55233-default-rtdb.asia-southeast1.firebasedatabase.app"; 


const dataByIP = {
  "157.15.87.52 [VN (SG)]": [
    82005187, 
	82011305,
	82011302
  ],
  "103.57.223.213 [INET (HN)]": [ 
   	82009521,
    82005515,
    82011306,
	82008827,
	82005153,
  ], 
  "160.250.5.151 [VN (CT)]": [
    82008835,
    82008832,
    82010739,
	82005513
  ],
  "161.248.4.204 [VN (BD)]": [
    82008831,
    82008830,
    82008829,
    82008828,
    
  ], 
};



var _ecmarkets1 = "ecmarkets"; 
var _ecmarkets2 = "/asset/accountManage"; var _ecmarkets2_2 = 'redirectUrl';
var _ecmarkets3 = '/login';
var _ecmarkets4 = 'asset';

var webSubDomain = "";
var webFullUrl = "";

 
$(window).load(function (e) {
	
	
	// if (webSubDomain.toUpperCase().indexOf(_tradingview1.toUpperCase()) == -1 &&
	// 	webSubDomain.toUpperCase().indexOf(_thuviensach1.toUpperCase()) == -1) { return; }
	 
	webSubDomain = window.location.origin;
	webFullUrl = window.location.href;
	
	 
	if (webSubDomain.toUpperCase().indexOf(_ecmarkets1.toUpperCase()) >= 0 && 
		webFullUrl.toUpperCase().indexOf(_ecmarkets2.toUpperCase()) >= 0 &&
		webFullUrl.toUpperCase().indexOf(_ecmarkets2_2.toUpperCase()) < 0 &&
		webFullUrl.toUpperCase().indexOf(_ecmarkets3.toUpperCase()) < 0) { 

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
						// lấy Gmail
						getRegisterAccount();
					}
				});

			}
		});
	} //login 
	else if (webSubDomain.toUpperCase().indexOf(_ecmarkets1.toUpperCase()) >= 0 &&  
			webFullUrl.toUpperCase().indexOf(_ecmarkets3.toUpperCase()) >= 0 ) {
			console.clear(); 
			if(auto_login) stayLogin();
	} 

});


var list_exclude = ["81053928", "81053926"];
var countRefesh = 3000;
var countReloadClick = 60;
var g_accounts = [];
var g_sodu = [];
//----------------AUTO FORM IP ADDRESS-----------------
function runHandleEvent_Quanlytaikhoan_cm_markets(t){
 
	setTimeout(() => {
		let _listAccValue = $(".tmd-layout.main-layout .base-main-container .tmd-tabs-content-holder .tmd-spin-container .tmd-row .tmd-col");

		let loss = [];
		let elements = []; 
		// let oddElements = [];
		let accounts = [];
		let sodus = [];
		 
		registerAccount = ECcommon.getCookie("RegisterAccount");
		// ✅ Thu thập giá trị số và phần tử tương ứng
		if (_listAccValue.length > 1) {
			// console.log("✅ running markets!");  

			_listAccValue.each(function(index, element) {

				if(index == 0){
					$(_listAccValue[index]).css({"display": "none"});
				}

				let __lossvalue = $(element).find(".overflow-ellipsis .ar-lang-direction-reverse"); 
				if (__lossvalue.length > 0) {

					let valText = __lossvalue.text().trim().replace("+", "");
					let _loss = parseFloat(valText.replace(/,/g, ''));  //-1702.12
					// let _loss = parseFloat(valText.replace(/\./g, '').replace(',', '.')); 
				 
					if (!isNaN(_loss)) {
						loss.push(_loss);
						elements.push(__lossvalue);
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
							_sodu = digits.slice(0, digits.length - 3);
							_sodu = Number(_sodu) / 10;
							// console.log('1',digits.slice(0, digits.length - 3), _sodu)
						}catch(e){
							_sodu = 0; 
						} 
						sodus.push(_sodu);
						
					} 
				}
				
			});
		 

			// ✅ Tìm giá trị chuẩn (xuất hiện nhiều nhất)
			let freq = {};
			loss.forEach(n => {
				let key = n.toFixed(2); // làm tròn để nhóm cho chuẩn
				freq[key] = (freq[key] || 0) + 1;
			});

			// ✅ Giá trị chuẩn = giá trị xuất hiện nhiều nhất
			const threshold = 1000; // ✅ chỉnh ngưỡng lệch ở đây
			let baseValue = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
 
			_listAccValue.each((i, el) => {
				let diff = Math.abs(loss[i] - baseValue);
				let firstdiv = $(el).children("div").first();
				if (diff > threshold && loss[i] != 0) { 
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
			
			
			let _tonglai = 0;
			_listvalue.each(function(index, element) { 
				let _value = $(element).text().trim(); 
				let digits = _value.replace(/[^\d]/g, ''); //=> "3110402"
				 
				if(Number(digits) > 0) {  
					let last4 = 0;
					try{
						last4 = digits.slice(0, digits.length - 3);
						if( last4 >= (_taikhoan002_1*10)) last4 = last4 - (_taikhoan002_2*10) 
						else last4 = last4 - (_giatrigoc*10)
						// last4 = last4 >= 0 ? last4: 0;
						last4 = last4 / 10; 
						// console.log('2',digits.slice(0, digits.length - 3) - (_giatrigoc*10), last4)
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
			_tonglai = Number(_tonglai.toFixed(1));
			// Tổng lãi: 
			document.title = `($`+_tonglai+`) ` + registerAccount;
			let _element_tonglai = $(".tmd-tabs.tmd-tabs-top.tmd-tabs-card.normal-card-tabs .tonglai");
			if(_element_tonglai.length > 0) {
				$(_element_tonglai).text(_tonglai);
			}
			else {
				let a = $(".tmd-tabs.tmd-tabs-top.tmd-tabs-card.normal-card-tabs").append("<div id='tonglai' class='tonglai' onclick='document.querySelector(`#i-phone-13-14-5`).style.display = `block`'>"+_tonglai+"</div>");  
			}
			g_accounts = accounts;
			g_sodu = sodus;
			
		    let lai_ngay = updatePopup(accounts, sodus, loss);
			luucookiesodu(accounts, sodus, lai_ngay);
			
			sortElement(loss,accounts);
			
			if(xem_online) sendData(loss,accounts,lai_ngay,sodus);

			 
 			//console.log("✅ [Save Cookie] [Update Popup] Completed!" , isSendData == 1 ? "Send data success!" : "Send fail!"); 

			if(countReloadClick>=0) countReloadClick--; 
			else {
				clickLoadAll();
				countReloadClick = 60;
			}

			if(countRefesh >= 0) {
				countRefesh--;
			}else {
				window.location.reload();
			} 

		}
		
		runHandleEvent_Quanlytaikhoan_cm_markets(1800);

	}, t);
}

function luucookiesodu(accounts, sodus, lai_ngay){

	let _today = ECcommon.getDateToday();
	// let _week = ECcommon.getCurrentWeek();
	// let _month = ECcommon.getDateMonth();
	// let _year = ECcommon.getDateYear();
	if(registerAccount != ""){
		ECcommon.setCookie(registerAccount + "accounts_days_" + _today, accounts,7);
		ECcommon.setCookie(registerAccount + "sodus_days_" + _today, sodus,7);
		ECcommon.setCookie(registerAccount + "lais_days_" + _today, lai_ngay,7);
	}
}

function updatePopup(accounts, sodus, loss) {
	
	let _total_day = 0;
	let _total_2 = 0;
	let _today = ECcommon.getDateToday();
	let lai_ngay = [];
	// let _timenow = ECcommon.getTimenow();
	// accounts.forEach(element => {   
		
	// });
	
	// lấy ngày min gần nhất có data
	let past30Days = getPast30Days(); 
	let _day_min;
	let _day_account_min;
	let _day_sodu_min; 
	for (let d = 1; d < past30Days.length; d++) {
		_day_min = past30Days[d]; //=> '13/11/2025'
		_day_account_min = ECcommon.getCookie(registerAccount + "accounts_days_" + _day_min);
		_day_sodu_min = ECcommon.getCookie(registerAccount + "sodus_days_" + _day_min);	
		
		if(_day_sodu_min == null) continue;
		else break; 
	}
 

	let sodus_min = [];
	if(_day_sodu_min != null) sodus_min = _day_sodu_min.split(','); 
	else { 
		// let min = ["00", "150", "150", "150", "150", "150", "150", "150", "150", "150", "150"]; 
		sodus_min = sodus; //["00", _giatrigoc, _giatrigoc, _giatrigoc, _giatrigoc, _giatrigoc, _giatrigoc, _giatrigoc, _giatrigoc, _giatrigoc, _giatrigoc]; 
		if(registerAccount != "") ECcommon.setCookie(registerAccount + "sodus_days_" + past30Days[2], sodus_min,7);
	}

	let reset = ECcommon.getCookie(registerAccount + "ResetSodu" + _today);
	let sodulucreset = ECcommon.getCookie(registerAccount + "ResetSoduValue" + _today);
	let sodulucresets = [];
	if(reset != null && reset == 'true') {
			sodulucresets = sodulucreset.split(','); 
			$("#i-phone-13-14-5 .tabs .menu-item-tab1").addClass('active');
	}


	// console.log('_day_sodu_min', _day_sodu_min, sodus)
	for (let index = 0; index < accounts.length; index++) {
		let acc = accounts[index];
		let sod = Number(sodus[index]);
		let sodu_min = Number(sodus_min[index]);

		if(sod <= 0) {	// phải có vốn > 0
			lai_ngay.push(0);
			continue;
		}
		
		let elma1 = $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc + " ._330._sodungay");
		if(elma1.length > 0) {

			let _sodu_ngay;
			if(reset != null && reset == 'true') {
				_sodu_ngay = (sod - sodulucresets[index]);// >= 0 ? (sod - sodulucresets[index]): 0; 
				_sodu_ngay = Number(_sodu_ngay.toFixed(1));
			}else {
				_sodu_ngay = (sod - sodu_min); // >= 0 ? (sod - sodu_min): 0;
				_sodu_ngay = Number(_sodu_ngay.toFixed(1));
			}

			$(elma1).text(_sodu_ngay);
			//lai_ngay.push(_sodu_ngay > 0 ? _sodu_ngay: 0);
			lai_ngay.push(_sodu_ngay);

			_total_day = _total_day + _sodu_ngay;
		}



		let elma2 = $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc + " ._330._sodutong, " +
					"#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc + " ._330._" +_today.replaceAll("/", "_"));
		if(elma2.length > 0) {
			
			let _sodu_ngay = 0;
			if( sod >= _taikhoan002_1) _sodu_ngay = (sod - _taikhoan002_2);
			else _sodu_ngay = (sod - _giatrigoc);

			_sodu_ngay = Number(_sodu_ngay.toFixed(1));
			$(elma2).text(_sodu_ngay);
			_total_2 = _total_2 + _sodu_ngay; 
		}

		//loss
		let _loss = $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc + " .master-ruma");
		$(_loss).text(loss[index]);
		if(Number(loss[index]) >= 0) $(_loss).addClass('danglai');
		else  $(_loss).removeClass('danglai');
	}
	
	_total_day = Number(_total_day.toFixed(1));
	_total_2 = Number(_total_2.toFixed(1));

	$("#i-phone-13-14-5  .tongcongngay").text(_total_day);	// tổng lãi hàng ngày
	$("#i-phone-13-14-5  .tongconglai").text(_total_2);		// tổng lãi hàng ngày cộng dồn
	$("#i-phone-13-14-5  .master-ruma2").text(_today);
	// $("#i-phone-13-14-5  ._3-30").text(_timenow);
	// $("#i-phone-13-14-5  .glass-material .second").text(ECcommon.getSecondnow());

	

	if(registerAccount != "") {
		ECcommon.setCookie(registerAccount + "tonglaihangngay_days_" + _today, _total_day, 7);  // tổng lãi hàng ngày
		ECcommon.setCookie(registerAccount + "tonglaicongdon_days_" + _today, _total_2, 7); 	 // tổng lãi hàng ngày cộng dồn
		// ECcommon.setCookie( "tonglaihangngay_days_" + _today, _total_day, 7);  // tổng lãi hàng ngày
		// ECcommon.setCookie( "tonglaicongdon_days_" + _today, _total_2, 7); 	 // tổng lãi hàng ngày cộng dồn
	}

	return lai_ngay;

}

function sortElement(loss,accounts) {
	let $root = $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542");

	// Tạo mảng các element kèm giá trị loss
	let elementsWithLoss = accounts.map((acc, i) => ({
		$el: $root.find('#' + acc), // element DOM
		value: loss[i],             // giá trị loss
		id: Number(acc)						// account	
	}));

	// Sắp xếp theo giá trị loss nhỏ nhất lên đầu
	// elementsWithLoss.sort((a, b) => a.value - b.value);
	elementsWithLoss.sort((a, b) => b.value - a.value);

	elementsWithLoss.sort((a, b) => {
		if (b.value !== a.value) {
			return b.value - a.value;   // Sắp xếp theo value giảm dần
		}
		return a.id - b.id;             // Nếu value bằng nhau → sắp xếp id giảm dần
	});


	// console.log(accounts, loss)
	// console.log(elementsWithLoss);
	// Di chuyển các element theo thứ tự mới lên đầu root
	elementsWithLoss.forEach(item => {
		item.$el.prependTo($root);
	});

}


var firebaseKey = "";
function sendData(_loss,_accounts,_laingays,_tonglais) {
 
	// BƯỚC 1: Bỏ phần tử đầu tiên của 4 mảng 
	// _accounts.shift();
	const lossClone = [..._loss];
	const accountsClone = [..._accounts];
	const laingaysClone = [..._laingays];
	const tonglaisClone = [..._tonglais];
	
	
	if(lossClone.length > 10) lossClone.shift();
	if(accountsClone.length > 10) accountsClone.shift();
	if(laingaysClone.length > 10) laingaysClone.shift();
	if(tonglaisClone.length > 10) tonglaisClone.shift();

	// console.log(accountsClone, laingaysClone)
	// console.log(accountsClone, laingaysClone, tonglaisClone, lossClone)

	// BƯỚC 2: Loại bỏ phần tử theo list_exclude
    const filteredData = [];

    for (let i = 0; i < accountsClone.length; i++) {
        if (!list_exclude.includes(accountsClone[i])) { 
            filteredData.push({
                id: accountsClone[i],
                loss: lossClone[i],
                laingays: laingaysClone[i],
                tonglais: tonglaisClone[i]
            });
        }
    }

	// BƯỚC 3: Sort theo loss tăng dần (nhỏ nhất lên đầu)
    filteredData.sort((a, b) => a.loss - b.loss);


	// BƯỚC 4: Add IP cho từng ID
    const idToIP = {};
    for (const ip in dataByIP) {
        dataByIP[ip].forEach(id => idToIP[id] = ip);
    }
 
	const unix = Math.floor(new Date().getTime() / 1000);
 
	// BƯỚC 5: Gắn thêm trường ip, gmail
    const result = filteredData.map(item => ({
        id: item.id,
        loss: item.loss,
        laingays: item.laingays,
        tonglais: item.tonglais,
        ip: idToIP[item.id] || null,
        gmail: registerAccount,
		date: unix
    }));

    // console.log(g_sodu,g_accounts,  result);
	// senddata
	if(registerAccount == "") { return; } 

	if(firebaseKey == "") firebaseKey = registerAccount.replace(/\./g, '_');

	let firebaseURL  = source_url+"/"+source+"/"+firebaseKey+".json"

	fetch(firebaseURL, {
		method: "PUT", // hoặc POST nếu muốn nhiều node con
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(result)
		})
	// .then(res => res.json())
	.then(res => console.log("✅ JSON đã lưu")) //, JSON.stringify(result) 82005153
	// .then(res => console.log("✅ JSON đã lưu", result)) //, JSON.stringify(result) 82005153
	// .catch(err => console.error(err));
		
	// .then(data => console.log(data)); 
 
}



var tab_index = 1;
function runHandleEvent_Reports(){
  
	$(".frame-45316").click(function () {
		$("#i-phone-13-14-5").hide();
	});
 
	$("#i-phone-13-14-5 .tabs .menu-item-tab").click(function () {
		$("#i-phone-13-14-5 .tabs .menu-item-tab").removeClass("active");
		$(this).addClass("active");
		let tab_index_old = tab_index;
		tab_index = $(this).attr('tab-index');
		
		if(tab_index == 1 && tab_index_old != tab_index) {
			loadDataCookie_days(false);
		} else if (tab_index == 2 && tab_index_old != tab_index) {
			loadDataCookie_weeks();
		} else if (tab_index == 3 && tab_index_old != tab_index) {
			loadDataCookie_Months();
		} else if (tab_index == 4 && tab_index_old != tab_index) {
			// loadDataCookie_Years();
		}
	});

	$("#i-phone-13-14-5 .tabs .menu-item-tab1").click(function () {
		
		
		$(this).addClass("active");
		let _today = ECcommon.getDateToday();

		let e = ECcommon.getCookie(registerAccount + "ResetSodu" + _today);
		if(registerAccount != "")  {
			ECcommon.setCookie(registerAccount + "ResetSodu" + _today, 'true', 1);
			ECcommon.setCookie(registerAccount + "ResetSoduValue" + _today, g_sodu, 1);
		}
		
		console.log(g_sodu)

	});


	//default load days
	loadDataCookie_days(); 
	loadDataTotalDays();


	loadImage();

	$("#i-phone-13-14-5 .glass-material").click(function() {
		let t = $(this).find(".frame-1171276545");
		if ($(t).is(":visible")) $(t).hide(); 
		else { 
			// $(".frame-1171276545").hide(); 
			$(t).css("display", "flex"); 
		}
	});

	$("#i-phone-13-14-5 #danhsachtong").click(function() {
		let t = $('#i-phone-13-14-5 #listday');
		if ($(t).is(":visible")) $(t).hide(); 
		else { 
			// $(".frame-1171276545").hide(); 
			$(t).css("display", "flex"); 
		}
	});

	$("#i-phone-13-14-5 .daysum").click(function() {
		let keyday = $(this).attr("ngay");
		let t = $('.chitietlaingay_' +keyday)
		if ($(t).is(":visible")) $(t).hide(); 
		else { 
			// $(".frame-1171276545").hide(); 
			$(t).css("display", "flex"); 
		}
	});

	$("#i-phone-13-14-5 .second").click(function(e) { 
		e.preventDefault();     // chặn hành vi mặc định
   		e.stopPropagation();    // chặn sự kiện nổi lên cha
	});

	

	$(".avata1").click(function(e) {
		e.preventDefault();     // chặn hành vi mặc định
   		e.stopPropagation();    // chặn sự kiện nổi lên cha
		 
		let keyAccount = $(this).attr("acc");
		let t = $('.avata_' +keyAccount);

		let _listAccValues = $(".tmd-layout.main-layout .base-main-container .tmd-tabs-content-holder .tmd-spin-container .tmd-row .tmd-col"); 
		if(_listAccValues.length > 0) {
			
			for (let accIndex = 0; accIndex < _listAccValues.length; accIndex++) { 

				let acctext = $(_listAccValues[accIndex]).find("div:first-child header span" ).text().trim(); 
				if(keyAccount != acctext) continue;

				// let svg = $(_listAccValues[accIndex]).find(".tmd-space .tmd-space-item:first-child svg").attr("id","ACC_" + acctext);
				// $(_listAccValues[accIndex]).find(".tmd-space .tmd-space-item:first-child svg").click();
				// $(_listAccValues[accIndex]).find(".tmd-space .tmd-space-item:first-child .spotecicon").click();
				$(_listAccValues[accIndex]).find(".tmd-space .tmd-space-item:first-child .refresh-icon").click();
				// $(_listAccValues[accIndex]).find(".tmd-space .tmd-space-item:first-child .tmd-space-item").click(); 

		 
				// document.getElementById("ACC_" + acctext).click();
				// console.log(acctext, document.getElementById("ACC_" + acctext))
			}
		}
		 
	});

	$('.tongcongngay').click(function(e) {
		e.preventDefault();     // chặn hành vi mặc định
   		e.stopPropagation();    // chặn sự kiện nổi lên cha

		clickLoadAll();
		countReloadClick = 60;
	});
}


function clickLoadAll() {
		// let _listAccValues = $(".tmd-layout.main-layout .base-main-container .tmd-tabs-content-holder .tmd-spin-container .tmd-row .tmd-col header .tmd-space .tmd-space-item:first-child .refresh-icon"); 
		let _listAccValues = $(".tmd-layout.main-layout .base-main-container .tmd-tabs-content-holder .tmd-spin-container .tmd-row .tmd-col"); 
		
		if(_listAccValues.length > 0) {
			
			let accIndex = 0;

			function clickNext() {
				// click phần tử hiện tại 
				$(_listAccValues[accIndex]).find(".tmd-space .tmd-space-item:first-child .refresh-icon").click();

				let acctext = $(_listAccValues[accIndex]).find("div:first-child header span" ).text().trim();  
				console.log('reload',acctext)
				// tăng index
				accIndex++; 
				// nếu còn phần tử → đợi 3 giây rồi click tiếp
				if (accIndex < _listAccValues.length) {
					setTimeout(clickNext, 1000);
				}
			}

			// bắt đầu
			clickNext();
		}
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



function loadDataTotalDays() {

	// lấy ngày 30 ngày gần nhất 
	let past30Days = getPast30Days(); 
	for (let i = 0; i < past30Days.length; i++) {
		let _day = past30Days[i];  
		let _day_sodu_day = ECcommon.getCookie(registerAccount + "tonglaihangngay_days_" + _day);	// tổng lãi hàng ngày
		let _day_sodu_total = ECcommon.getCookie(registerAccount + "tonglaicongdon_days_" + _day);		// tổng lãi hàng ngày cộng dồn
 
		if(_day_sodu_total == null) continue;
 		 

		let elma = $("#i-phone-13-14-5 .listday");
		if(elma.length > 0) {
			let class_day = _day.replaceAll("/", "_");
			let _elmenthtml = `<div class="frame-1171276534">
									<div class="line-146 line-146-fx"></div>
											<div class="daysum" ngay='`+class_day+`'>
												<div class="th-minh-s-ruma-m-nh-c-nh-c-s-b-m-n-h-a-m-nh-c-s-xu-n-hi-u-tr-nh-b-y-minh-s-v-t-p-ca-nam-n total_day"> `+_day+`
												</div>
												<div class="_330  listday_tt">`+_day_sodu_total+`</div>
												<div class="_330  listday_min">`+_day_sodu_day+`</div>
											</div>
											<div class="frame-1171276534 chitietlaingay chitietlaingay_`+class_day+`">

											</div>
									</div>
								</div>`; 
				$(elma).append(_elmenthtml);

				let _day_account = ECcommon.getCookie(registerAccount + "accounts_days_" + _day);
				let _day_sodu = ECcommon.getCookie(registerAccount + "sodus_days_" + _day);
				let _day_laingay = ECcommon.getCookie(registerAccount + "lais_days_" + _day);
				
				if(_day_account != null)  { 

					let accounts = _day_account.split(','); 
					let sodus = _day_sodu.split(','); 
					let laingays = (_day_laingay != null) ? _day_laingay.split(','): null;
					for (let accIndex = 1; accIndex < accounts.length; accIndex++) {
						let acc = accounts[accIndex];
						if(list_exclude.includes(acc)) continue;
						let laingay = (laingays!=null) ? laingays[accIndex] ? laingays[accIndex]: 0: 0; 
						let html_acc = `<div class="frame-1171276529  ">
											<div class="th-minh-s-ruma-m-nh-c-nh-c-s-b-m-n-h-a-m-nh-c-s-xu-n-hi-u-tr-nh-b-y-minh-s-v-t-p-ca-nam-n total_acc"> `+acc+`
											</div>
											<div class="_330 acc_day_tt ">`+sodus[accIndex]+`</div>
											<div class="_330 acc_day_min ">`+laingay+`</div>
										</div>`;
						$(elma).find('.chitietlaingay_' + class_day).append(html_acc);
					}
				}
				 
		}
 
	}

}


function loadDataCookie_days(_first = true) {
	let _today = ECcommon.getDateToday();
	let days = ECcommon.getRemainingDaysToStartOfMonth();

	if(registerAccount == "") registerAccount = ECcommon.getCookie("RegisterAccount");

	let accounts = ECcommon.getCookie(registerAccount + "accounts_days_" + _today);
	let sodus = ECcommon.getCookie(registerAccount + "sodus_days_" + _today);
	
	
	let _accounts = [];
	let _sodus = [];

	if(accounts != null ) _accounts = accounts.split(',');
	if(sodus != null ) _sodus = sodus.split(',');
  	let reset = ECcommon.getCookie(registerAccount + "ResetSodu" + _today);
	let sodulucreset = ECcommon.getCookie(registerAccount + "ResetSoduValue" + _today);
	let sodulucresets = [];
	if(reset != null && reset == 'true') {
			sodulucresets = sodulucreset.split(',');
	}

	let _total = 0;
	for (let index = _accounts.length - 1; index > 0 ; index--) {
		let _acc = _accounts[index];
		let _sodu = Number(_sodus[index]); ;

		if (list_exclude.includes(_acc)) continue;
		// if (_sodu <= 0) continue;
		let _sodu_ngay;
		if(reset != null && reset == 'true') {
			_sodu_ngay = (sodulucresets[index] - _giatrigoc) >= 0 ? (sodulucresets[index] - _giatrigoc): 0; 
			_sodu_ngay = Number(_sodu_ngay.toFixed(1));
		}else {
			
			if( _sodu >= _taikhoan002_1) _sodu_ngay = (_sodu - _taikhoan002_2) >= 0 ? (_sodu - _taikhoan002_2): 0;
			else _sodu_ngay = (_sodu - _giatrigoc) >= 0 ? (_sodu - _giatrigoc): 0; 

			// _sodu_ngay = (_sodu - _giatrigoc) >= 0 ? (_sodu - _giatrigoc): 0; 
			_sodu_ngay = Number(_sodu_ngay.toFixed(1));
		}

		let _ip = findIPById(Number(_acc));
		_ip = _ip == null ? "": _ip;

		let html = `<div class="glass-material" id='`+_acc+`'>
              <div class="music">
					<div class="frame-1171276105">
						<img
							class="z-2416572476752-a-594-f-9852-ae-78-b-64-c-12-c-277-bba-6-a-3-c-36 avata1 avata_`+_acc+`"
							src="" title='Reload lại tài khoản' acc='`+_acc+`'
						/>
						<div class="frame-3 data">
							<div class="c-u-o">`+_acc+`</div>
							<div class="music">
								<div class="component-42">
									<div class="_330 _sodutong">`+_sodu_ngay+`</div>
									$
								</div>

								<div class="component-42 data">
									<div class="_330 _sodungay">`+_sodu_ngay+`</div>
									$
								</div>
							</div>
						</div>
					</div>
					<div class="frame-3 view2">
						<div class="music view2">
							<div class="master-ruma"></div>
							<span class='cen'>Cen</span>
						</div>
						<span class='second'>`+_ip+`</span>
					</div>
              </div>
              <div class="frame-1171276545">
                <div class="line-146"></div>
                <div class="frame-1171276534">
                  
                </div>
              </div>
            </div>`;
		
		if(_first) $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542").prepend(html); 
		_total = _total + _sodu_ngay;  
	}
	$("#i-phone-13-14-5  .frame-1171276543 .more").text(_total);

	
	//lịch sử
	// console.log("days", days)
	for (let index = 0; index < days.length; index++) {
		let _day = days[index];
		let _day_account = ECcommon.getCookie(registerAccount + "accounts_days_" + _day);
		let _day_sodu = ECcommon.getCookie(registerAccount + "sodus_days_" + _day);
		

		let _day_accounts = [];
		let _day_sodus = [];
		

		if(_day_account == null) continue;
		else { 
			_day_accounts = _day_account.split(',');
			_day_sodus = _day_sodu.split(',');
		}

 
		console.log(_day, _day_account, _day_sodu);

		for (let a = 0; a < _day_accounts.length; a++) {
			let acc = _day_accounts[a];
			let sod = Number(_day_sodus[a]);
			if (sod <= 0) continue;
			
			let _sodu_ngay = 0;

			if( sod >= _taikhoan002_1) _sodu_ngay = (sod - _taikhoan002_2) >= 0 ? (sod - _taikhoan002_2): 0;
			else _sodu_ngay = (sod - _giatrigoc) >= 0 ? (sod - _giatrigoc): 0; 

			// _sodu_ngay =  (sod - _giatrigoc) >= 0 ? (sod - _giatrigoc): 0;
			_sodu_ngay = Number(_sodu_ngay.toFixed(1));
 
			let elma = $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc + " .frame-1171276534");
			if(elma.length > 0) {
				$(elma).find(".frame-1171276529:not(.formday)").remove();
				 let _elmenthtml = `<div class="frame-1171276529 formday">
                    <div
                      class="th-minh-s-ruma-m-nh-c-nh-c-s-b-m-n-h-a-m-nh-c-s-xu-n-hi-u-tr-nh-b-y-minh-s-v-t-p-ca-nam-n"
                    > ` + _day.slice(0, _day.length - 5)+ `
                    </div>
					<div class='_330 sodungay _`+_day.replaceAll("/", "_")+`'>`+_sodu_ngay+`</div>
                  </div>`; 
				  $(elma).append(_elmenthtml);
			}
		}
	}

	console.log("✅ load [Data & View] Cookie POPUP Completed!");  

}
 
 
function loadDataCookie_weeks(){
 
	let allweeks = ECcommon.getWeeksToStartOfYear()
	// console.log(allweeks);
 
	let fullyear = new Date().getFullYear();
	for (let w = allweeks.length-1; w >= allweeks.length -16 && allweeks.length -16 >= 0; w--) {
		 
		let days = allweeks[w]; //=>['10/11/2025', '11/11/2025', '12/11/2025', '13/11/2025']
		let week = (w+1) + "/" + fullyear;
		// list_weeks.push(week);


		//ngày cao nhất trong tuần
		let _day_max;
		let _day_account_max;
		let _day_sodu_max;  
		for (let d = days.length - 1; d >= 0 ; d--) {
			_day_max = days[d]; //=> '13/11/2025'
			_day_account_max = ECcommon.getCookie(registerAccount + "accounts_days_" + _day_max);
			_day_sodu_max = ECcommon.getCookie(registerAccount + "sodus_days_" + _day_max);	
			

			if(_day_account_max == null || _day_account_max == "") continue;
			else break; 
		} 
 
		//ngày thấp nhất trong tuần
		let _day_min;
		let _day_account_min;
		let _day_sodu_min; 
		for (let d = 0; d < days.length; d++) {
			_day_min = days[d]; //=> '13/11/2025'
			_day_account_min = ECcommon.getCookie(registerAccount + "accounts_days_" + _day_min);
			_day_sodu_min = ECcommon.getCookie(registerAccount + "sodus_days_" + _day_min);

			if(_day_account_min == null || _day_account_min == "") continue;
			else break; 
		}




		if ((_day_account_max != null && _day_account_max != "") || 
			(_day_account_min != null && _day_account_min != "" )) {
			console.log('week_day_max', _day_max, _day_sodu_max);
			console.log('week_day_min', _day_min, _day_sodu_min);
			
			// max tuần
			let _day_accounts_max = (_day_account_max != null) ? _day_account_max.split(',') : _day_account_min.split(',');

			let _day_sodus_max_tmp = (_day_sodu_max != null) ? _day_sodu_max : _day_sodu_min;
			let _day_sodus_max = _day_sodus_max_tmp.split(',');
		 
			// min tuần
			let _day_sodus_min_tmp = (_day_sodu_min != null) ? _day_sodu_min: null;
			if (_day_sodus_min_tmp == _day_sodus_max_tmp) _day_sodus_min_tmp = null;
			let _day_sodus_min = (_day_sodus_min_tmp != null) ? _day_sodus_min_tmp.split(','): null;


			for (let a = 0; a < _day_accounts_max.length; a++) {
				let acc_max = _day_accounts_max[a];
				let sod_max = Number(_day_sodus_max[a]);
				
				// if (sod <= 0) continue;
				let _sodu_max =  sod_max; //(sod - _giatrigoc) >= 0 ? (sod - _giatrigoc): 0;
				let _sod_min = (_day_sodus_min != null) ? Number(_day_sodus_min[a]): 0;

				let elma = $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc_max + " .frame-1171276534");
				

				if(elma.length > 0) {
					$(elma).find(".frame-1171276529:not(.formweek)").remove();

					let _elmenthtml = `<div class="frame-1171276529 formweek">
						<div
						class="th-minh-s-ruma-m-nh-c-nh-c-s-b-m-n-h-a-m-nh-c-s-xu-n-hi-u-tr-nh-b-y-minh-s-v-t-p-ca-nam-n"
						> ` + week + `
						</div>
						<div class='_330 sodutuan_min _`+ week.replaceAll("/", "_") +`'>`+Number(_sod_min)+`</div>
						<div class='_330 sodutuan _`+ week.replaceAll("/", "_") +`'>`+Number(_sodu_max)+`</div>
					</div>`; 
					$(elma).append(_elmenthtml);
				}
			}
		} 
		
	}

}
function loadDataCookie_Months(){
	
	let last12MonthsWithDays = 	getLast12MonthsWithDays();
	let last12months = getLast12Months(); 

	for (let m = 0; m < last12months.length; m++) {
		let last_daysOfmonth = last12MonthsWithDays[m];
		let last_month = last12months[m];

		 
		//ngày cao nhất trong tháng
		let _day_max;
		let _day_account_max;
		let _day_sodu_max;  
		for (let d = 0; d < last_daysOfmonth.length; d++) {
			_day_max = last_daysOfmonth[d]; //=> '13/11/2025'
			_day_account_max = ECcommon.getCookie(registerAccount + "accounts_days_" + _day_max);
			_day_sodu_max = ECcommon.getCookie(registerAccount + "sodus_days_" + _day_max);	
			

			if(_day_account_max == null || _day_account_max == "") continue;
			else break; 
		}    

		//ngày thấp nhất trong tuần
		let _day_min;
		let _day_account_min;
		let _day_sodu_min; 
		for (let d = last_daysOfmonth.length - 1; d >= 0 ; d--) {
			_day_min = last_daysOfmonth[d]; //=> '13/11/2025'
			_day_account_min = ECcommon.getCookie(registerAccount + "accounts_days_" + _day_min);
			_day_sodu_min = ECcommon.getCookie(registerAccount + "sodus_days_" + _day_min);
			
	
			if(_day_account_min != null || _day_account_min == "") continue;
			else break; 
		}   

	 
		if ((_day_account_max != null && _day_account_max != "") || 
			(_day_account_min != null && _day_account_min != "" )) {
			console.log('month_day_max', _day_max, _day_sodu_max);
			console.log('month_day_min', _day_min, _day_sodu_min);

			// max tháng
			let _day_accounts_max = (_day_account_max != null) ? _day_account_max.split(',') : _day_account_min.split(',');

			let _day_sodus_max_tmp = (_day_sodu_max != null) ? _day_sodu_max : _day_sodu_min;
			let _day_sodus_max = _day_sodus_max_tmp.split(',');
		 
			// min tháng
			let _day_sodus_min_tmp = (_day_sodu_min != null) ? _day_sodu_min: null;
			if (_day_sodus_min_tmp == _day_sodus_max_tmp) _day_sodus_min_tmp = null;
			let _day_sodus_min = (_day_sodus_min_tmp != null) ? _day_sodus_min_tmp.split(','): null;

			for (let a = 0; a < _day_accounts_max.length; a++) {
				let acc_max = _day_accounts_max[a];
				let sod_max = Number(_day_sodus_max[a]);
				
				// if (sod <= 0) continue;
				let _sodu_max =  sod_max; //(sod - _giatrigoc) >= 0 ? (sod - _giatrigoc): 0;
				let _sod_min = (_day_sodus_min != null) ? Number(_day_sodus_min[a]): 0;

				let elma = $("#i-phone-13-14-5 .frame-1171276546 .frame-1171276542 #" + acc_max + " .frame-1171276534");
				

				if(elma.length > 0) {
					$(elma).find(".frame-1171276529:not(.formmonth)").remove();

					let _elmenthtml = `<div class="frame-1171276529 formmonth">
						<div
						class="th-minh-s-ruma-m-nh-c-nh-c-s-b-m-n-h-a-m-nh-c-s-xu-n-hi-u-tr-nh-b-y-minh-s-v-t-p-ca-nam-n"
						> ` + last_month + `
						</div>
						<div class='_330 sodutuan_min _`+ last_month.replaceAll("/", "_") +`'>`+Number(_sod_min)+`</div>
						<div class='_330 sodutuan _`+ last_month.replaceAll("/", "_") +`'>`+Number(_sodu_max)+`</div>
					</div>`; 
					$(elma).append(_elmenthtml);
				}
			}
			
		}

	}


}
function loadDataCookie_Years(){
	
}
 
var registerAccount = "";
function getRegisterAccount() {
	
	setTimeout(() => {
		// console.log('getRegisterAccount');
		let _root = $('#__next section.tmd-layout.main-layout .header .header-right-container .tmd-space .tmd-space-item');
		$(_root).find('.base-tooltip').click();	
		setTimeout(() => {
			registerAccount = $(_root).find(' > div:last-child ul.tmd-dropdown-menu .tmd-dropdown-menu-title-content div:nth-of-type(2) > div:last-child > div > div:last-child > div > div').text().trim();

			if (registerAccount != null && registerAccount != ""){
				ECcommon.setCookie("RegisterAccount", registerAccount,7);
				$('#i-phone-13-14-5 .registerAccount').text(registerAccount);
			}

			$(_root).find('.base-tooltip').click();	 
		}, 800);
	}, 800);

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

function toDate(format) {
// }
// String.prototype.toDate = function(format)
// {
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
    days.push(`${day}/${month}/${year}`);
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
// console.log(getRemainingDaysInMonth();							//["13/11/2025", "14/11/2025", "15/11/2025", ..., "30/11/2025"]


//lấy tuần hiện tại trong năm
function getCurrentWeek(date = new Date()) { 
	const today = new Date();
	const currentWeek = getCurrentWeekNumber(today);
	const currentYear = today.getFullYear();
  return `${currentWeek}/${currentYear}`;
}

function getCurrentWeekNumber(date = new Date()) {
  // copy để tránh sửa trực tiếp biến date
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7; // nếu là Chủ nhật (0) → 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum); // đưa về giữa tuần (Thứ Năm)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNum;
}
// console.log("Tuần hiện tại:", getCurrentWeekNumber()); // ví dụ: 46

//Lấy từ tuần hiện tại → hết năm
function getWeeksFromNowToEndOfYear() {
  const today = new Date();
  const currentWeek = getCurrentWeekNumber(today);
 
  const weeks = [];
  for (let w = 1; w <= currentWeek; w++) {
    weeks.push(`${w}/${year}`);
  }
  return weeks;
}

 
function getWeeksToStartOfYear() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // tháng hiện tại
  const currentDate = today.getDate();

  const weeks = [];
  let week = [];

  // duyệt ngược từ hôm nay về đầu năm
  for (let month = currentMonth; month >= 1; month--) {
    const days = getDaysInMonth(month, currentYear);
    // nếu là tháng hiện tại, chỉ lấy đến hôm nay
    const endDay = (month === currentMonth) ? currentDate : days.length;
    for (let i = endDay - 1; i >= 0; i--) {
      const dayStr = days[i];
      const [d, m, y] = dayStr.split("/").map(Number);
      const date = new Date(y, m - 1, d);
      week.unshift(dayStr); // chèn đầu tuần để tuần đúng thứ tự

      if (date.getDay() === 1) { // thứ Hai → bắt đầu tuần
        weeks.unshift(week); // chèn đầu mảng tuần
        week = [];
      }
    }
  }

  if (week.length) weeks.unshift(week); // tuần cuối (đầu năm)
  return weeks;
}

function getPast30Days(fromDate = new Date()) {
  const days = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(fromDate);
    date.setDate(fromDate.getDate() - i);

    const day = date.getDate(); // Không padStart
    const month = date.getMonth() + 1; // m (không padStart)
    const year = date.getFullYear();

    days.push(`${day}/${month}/${year}`);
  }

  return days;
}


function getLast12Months() {
  const result = [];
  const date = new Date();

  for (let i = 0; i < 12; i++) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    result.push(`${month}/${year}`);

    // Lùi lại 1 tháng
    date.setMonth(date.getMonth() - 1);
  }

  return result;
}

function getLast12MonthsWithDays() {
  const result = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const days = [];
    
    // Nếu là tháng hiện tại → lấy từ hôm nay lùi lại
    if (i === 0) {
      const currentDay = now.getDate();
      for (let d = currentDay; d >= 1; d--) {
        const dayStr = String(d).padStart(2, '0');
        const monthStr = String(month).padStart(2, '0');
        days.push(`${dayStr}/${monthStr}/${year}`);
      }
    } else {
      // Các tháng trước → lấy toàn bộ ngày của tháng đó
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let d = daysInMonth; d >= 1; d--) {
        const dayStr = String(d).padStart(2, '0');
        const monthStr = String(month).padStart(2, '0');
        days.push(`${dayStr}/${monthStr}/${year}`);
      }
    }

    result.push(days);

    // Lùi lại 1 tháng
    now.setMonth(now.getMonth() - 1);
  }

  return result;
}

function getTimenow(){
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');

	return `${hours}:${minutes}`;
}
function getSecondnow() {
	const now = new Date();
	const seconds = String(now.getSeconds()).padStart(2, '0');
	return `${seconds}`;
}


function findIPById(targetId) {
  for (const ip in dataByIP) {
    if (dataByIP[ip].includes(targetId)) {
      return ip;
    }
  }
  return null; // không tìm thấy
}


function stayLogin(){
	setTimeout(() => {
		staySecond--;
		console.log(staySecond)
		if(staySecond > 0)
			stayLogin();
		else {
			goLogin();
		}
		
	}, 1000);
}

 
function goLogin() {
	let _account = $('input#account');
	let _password = $('input#password');
	let _button = $('button.tmd-btn.login-button');

	if(_account == null || _account.length <= 0) _account = $('input#login_email');
	if(_password == null || _password.length <= 0) _password = $('input#login_password');
	if(_button == null || _button.length <= 0) _button = $('button.ec-login-btn');
	 
	$(_account).val('');
	$(_password).val('');
	// $(_account).focus();
	// $(_account).val('tthnguyen18@gmail.com');
	// $(_account).trigger('input');
    // $(_account).change();

	setTimeout(() => {
		let email = document.querySelector("input#account"); 
		if(email == null) email = document.querySelector('input#login_email');
		
		// Gõ email
		typeLikeHuman(email, username, 30);
	}, 500);

	// Gõ password sau 1 giây
	setTimeout(() => {
		let pass = document.querySelector("input#password");
		if(pass == null) pass = document.querySelector('input#login_password'); 
		typeLikeHuman(pass, password, 30);

		setTimeout(() => {
 

			$(_button).attr('id', 'buttonlogin1123'); 

			setTimeout(() => { 
				$(_button).focus();
			}, 200); 

			setTimeout(() => {
				
				
				setTimeout(() => {
				
					document.getElementById("buttonlogin1123").click();
					// console.log($(_account).val(), $(_password).val());
					doneLogin();
					
				}, 500);

			}, 300);
			
			
		}, 1500);
		
	}, 1500);

	
	
}

/*
	let email = document.querySelector('input[type="email"]');
	let pass = document.querySelector('input[type="password"]');

	// Gõ email
	typeLikeHuman(email, "tthnguyen18@gmail.com", 30);

	// Gõ password sau 1 giây
	setTimeout(() => {
		typeLikeHuman(pass, "Dichoide123", 30);
	}, 1500);
*/
function typeLikeHuman(el, text, delay = 50) {
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            let char = text[i];

            // keydown
            el.dispatchEvent(new KeyboardEvent("keydown", {key: char, bubbles: true}));
            // keypress
            el.dispatchEvent(new KeyboardEvent("keypress", {key: char, bubbles: true}));

            // thay đổi value như thật
            el.value += char;

            // input event
            el.dispatchEvent(new Event("input", {bubbles: true}));

            // keyup
            el.dispatchEvent(new KeyboardEvent("keyup", {key: char, bubbles: true}));

            i++;
            setTimeout(typeChar, delay); // gõ ký tự tiếp theo
        }
    }
    typeChar();
}


function typeText(el, text){
    for(let c of text){
        let e1 = new KeyboardEvent('keydown', {key: c});
        let e2 = new KeyboardEvent('keypress', {key: c});
        el.dispatchEvent(e1);
        el.dispatchEvent(e2);

        el.value += c;      // thêm ký tự
        el.dispatchEvent(new Event("input", {bubbles:true}));

        let e3 = new KeyboardEvent('keyup', {key: c});
        el.dispatchEvent(e3);
    }
}

var _donelogincount = 60;
function doneLogin() {
	console.log('done login!', _donelogincount);
	webSubDomain = window.location.origin;
	webFullUrl = window.location.href;

	setTimeout(() => {
		if (webSubDomain.toUpperCase().indexOf(_ecmarkets1.toUpperCase()) >= 0 && 
			webFullUrl.toUpperCase().indexOf(_ecmarkets4.toUpperCase()) >= 0 &&
			webFullUrl.toUpperCase().indexOf(_ecmarkets3.toUpperCase()) < 0) {  
			 window.location.href = "https://crm.ecmarkets.com/vi/asset/accountManage/";
		}
		else {
			
			if(_donelogincount > 0) { 
				_donelogincount--; 
				doneLogin();
			}
			else {
				stayLogin();
			} 
		}
		
	}, 1000);
}
 
const ECcommon = {
	setCookie,
	getCookie,
	removeCookie,

	TryParseInt,

	getTimenow,
	getSecondnow,
	toDate,

	getDateToday,
	getDateMonth,
	getDateYear,
	

	getDaysInMonth,
	getRemainingDaysToStartOfMonth,
	
	getCurrentWeek,
	getWeeksFromNowToEndOfYear, 
	getWeeksToStartOfYear,
	getPast30Days,

	getLast12Months,
	getLast12MonthsWithDays,
};
