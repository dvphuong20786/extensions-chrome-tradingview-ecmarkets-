// form view website

$(window).load(function (e) {
	
	let _auto1 = "cmanga", 
		_auto_market = "market"; 
	let _auto = window.location.origin;			//www.example.com
	if (_auto.toUpperCase().indexOf(_auto1.toUpperCase()) == -1){ return; }	//check domain


	//-------------------------------
	let _pathname = window.location.pathname;			//  /products/search.php
	if (_pathname.toUpperCase().indexOf(_auto_market.toUpperCase()) !== -1){

		$.ajax({
			url:AddFile_Market(),
			success:function(){

				$.ajax({
					url:runHandleEvent_Market(),
					success:function(){
						$("#_SUPPORT_MARKET").show();
					}
				});

			}
		}); 
	}
});
 
function AddFile_Market(){

	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let div = document.createElement('div');
			div.classList.add("_SUPPORT_MARKET_WARP");
			div.innerHTML = this.responseText;
			
			$("body.setting .content .div_middle").prepend(div);
			//document.body.insertBefore(div, document.body.firstChild);
			
		} else {
			console.log('support MARKET readyState: ' + this.readyState);
		}
	};
	xhttp.open("GET", chrome.runtime.getURL("/Market.html"), true);
	xhttp.send();
}

//----------------AUTO FORM IP ADDRESS-----------------
function runHandleEvent_Market(){

	loadImage_MARKET();

	$("#profile_div .market_filter").append("<button id='_btnSupportSearch'>Search</button>");

	$("#_SUPPORT_MARKET #_hide").click(function () {

		$("#_SUPPORT_MARKET #_hide img").hide();
		let hide_status = $(this).attr("status");

		if (hide_status == "1"){
			$("#_SUPPORT_MARKET, #_form_xemthem_value_market").animate({ height: w_ex0 });
			$("#_SUPPORT_MARKET #_hide .ex0").show();
			$(this).attr("status", 0);
 
		}
		else {
			$("#_SUPPORT_MARKET, #_form_xemthem_value_market").animate({ height: w_ex2 });
			$("#_SUPPORT_MARKET #_hide .ex2").show();
			$(this).attr("status", 1);
		}

    });

	$("#_SUPPORT_MARKET_SEARCH, #_btnSupportSearch").click(function () {

		let _status = $(this).attr("status");
		if(_status != "1"){
			// alert(1)
			$(this).attr("status", 1);
			$("#_SUPPORT_MARKET .member_labelcheckbox .is_start").attr("src", img2);
			$("#_SUPPORT_MARKET .line").removeClass("active");
			$("#_SHOW_LOG").text("");
			btnSearch();
		}
		else{
			// alert(0)
			$(this).attr("status", 0);
			$("#_SUPPORT_MARKET .member_labelcheckbox .is_start").attr("src", img1);
			$("#_SUPPORT_MARKET .line").removeClass("active"); 
			
		}
    });

	$("#_COPY_DATA").click(function () {
		copyToClipboard($("#_SHOW_LOG").html());
	});

	$("#_xemthem_market").click(function () {

		$("#_xemthem_market img").hide();
		let _xemthemstatus = $(this).attr("status");

		if (_xemthemstatus == "0"){	//open
			$("._SUPPORT_MARKET_WARP").animate({ width: 680 });
			$("#_xemthem_market .ex3").show();
			$(this).attr("status", 1); 
		}
		else {	//close
			$("._SUPPORT_MARKET_WARP").animate({ width: 150 }); 
			$("#_xemthem_market .ex4").show();
			$(this).attr("status", 0); 
		} 
    });
		
}


function btnSearch(){
			
			//#market_fitler_name
			//#profile_div .market_filter button
 
			$("#market_fitler_name").val($("#_TEN_VAT_PHAM").val().trim()); 
			$("#market_fitler_level").val($("#_support_market_fitler_level").val()); 
			$("#market_fitler_type").val($("#_support_market_fitler_type").val());
			$("#market_fitler_sort").val($("#_support_market_fitler_sort").val());


			var _btnSearch = $("#profile_div .market_filter button:nth-of-type(1):not(#_btnSupportSearch)");
			$(_btnSearch).attr("id", "_btnSearch"); 

			document.getElementById("_btnSearch").click();
			_page_index = 1;
			_search_timeout = setTimeout(() => {
				page_index();
			}, 2000);
}


var _search_timeout;
function  page_index(){
	
	let _list_item = $(".market_list.market_module table tbody tr");
	let _page_redirect = $(".market_list.market_module .page_redirect p");
	if (_list_item.length >= 1 && _page_redirect.length >= 1){
		
		item_element = 0;
		findItem(_list_item);
 
		
	}else{
		_search_timeout = setTimeout(() => {
			page_index();
		}, 500);
	}
}

var item_element = 0;
function findItem(_listitem){
	try{
		 
		if(item_element < _listitem.length){
			//giá
			let _id = $(_listitem[item_element]).find("td:nth-of-type(1) .item_info .date_end a.link").attr("href").replace("market");
			_id = replaceAll(_id,'/','');
			let _gia = $(_listitem[item_element]).find("td:nth-of-type(2) .item_price").text();
			let _ten = $(_listitem[item_element]).find("td:nth-of-type(1) .item_info .other .name span").text();
			let _info = $(_listitem[item_element]).find("td:nth-of-type(1) .item_info .avatar.equipment_avatar a").attr("id", "_iteminfo"+(item_element+1));
			document.getElementById("_iteminfo"+(item_element+1)).click();
			
			item_element++;
			setTimeout(() => {
				itemDetail(_gia, _ten).then(() => findItem(_listitem));
			}, 1000);
		}else{
			page_next();
		}
		 

	}catch(e){
		 console.error(e.message);
	}
}

function itemDetail(_gia, _ten){
	try{ 
		return new Promise(function(resolve, reject){
			//255659
			let _is_ok = true;
			let _item_html = "----Page:" + _page_index + "-Stt:" + (item_element)+"-Giá:" +_gia+ "----" + _ten + "<br>"; 
			let _items = $(".member_profile #item_view.item_roll table tbody tr");


			if(_ten.toUpperCase().indexOf("GIÀY")!==-1 || 
				_ten.toUpperCase().indexOf("MŨ")!==-1 || 
				_ten.toUpperCase().indexOf("GĂNG")!==-1){
				_is_ok = true;

				for(let t=0; t < _items.length -1; t++){
					let _tpmitem = $(_items[t]).find("td");
					if (_tpmitem.length > 1){
							 
						_is_ok = Is_Invalid_PhuKien(_tpmitem, _is_ok);
						_item_html = _item_html + html_text_PhuKien(_tpmitem); 
					}
					else{
						//option
						let objOp = $(_tpmitem[0]).find("span");
						for(let op = 0; op < objOp.length ; op++ ){
							_item_html = _item_html + $(objOp[op]).text() + "<br>";
						}
					}
				}
			}
			else if (_ten.toUpperCase().indexOf("GIÁP")!==-1){
				_is_ok = false;

				for(let t=0; t < _items.length -1; t++){
					let _tpmitem = $(_items[t]).find("td");
					if (_tpmitem.length > 1){
						
						_is_ok = Is_Invalid_Giap(_ten, _tpmitem, _is_ok); 
						_item_html = _item_html + html_text_giap(_ten, _tpmitem); 
						 
					}
					else{
						//option
						let objOp = $(_tpmitem[0]).find("span");
						for(let op = 0; op < objOp.length ; op++ ){
							_item_html = _item_html + $(objOp[op]).text() + "<br>";
						}
					}
				} 
			}
			
			//close
			if(_is_ok){
				$("#_SHOW_LOG").append(_item_html + "<br>");
			}
			$(".member_profile .yes_no button.no").attr("id", "_button_close");
			document.getElementById("_button_close").click();
			resolve("OK");
		});
	}catch(e){
		console.error(e.message);
		return new Promise(function(resolve, reject){ resolve(e.message); }); 
	}	
}

function Is_Invalid_Giap(_ten, _tpmitem, _ok){
	let _is_ok = _ok;
	//GIÁP VẢI
	if (_ten.toUpperCase().indexOf("S") &&
		_ten.toUpperCase().indexOf("GIÁP VẢI")!==-1){

		if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
			let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
			_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_MAU_S").val(),0)) ? true: false;
		}
		else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
			let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
			_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_GIAPVAI_S").val(),0)) ? true: false;
		}
	
	}
	else if (_ten.toUpperCase().indexOf("S+")!==-1 &&
		_ten.toUpperCase().indexOf("GIÁP VẢI")!==-1){

			if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_MAU_S1").val(),0)) ? true: false;
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_GIAPVAI_S1").val(),0)) ? true: false;
			} 
	}
	else if (_ten.toUpperCase().indexOf("SS")!==-1 &&
		_ten.toUpperCase().indexOf("GIÁP VẢI")!==-1){
			
			if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_MAU_SS").val(),0)) ? true: false;
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_GIAPVAI_SS").val(),0)) ? true: false;
			} 
	}

	//GIÁP DA
	else if (_ten.toUpperCase().indexOf("S") &&
		_ten.toUpperCase().indexOf("GIÁP DA")!==-1){

		if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
			let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
			_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_MAU_S").val(),0)) ? true: false;
		}
		else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
			let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
			_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_GIAPDA_S").val(),0)) ? true: false;
		}  
	}
	else if (_ten.toUpperCase().indexOf("S+")!==-1 &&
		_ten.toUpperCase().indexOf("GIÁP DA")!==-1){

			if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_MAU_S1").val(),0)) ? true: false;
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_GIAPDA_S1").val(),0)) ? true: false;
			}
	}
	else if (_ten.toUpperCase().indexOf("SS")!==-1 &&
		_ten.toUpperCase().indexOf("GIÁP DA")!==-1){
			
			if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_MAU_SS").val(),0)) ? true: false;
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_GIAPDA_S1").val(),0)) ? true: false;
			}
	}

	//GIÁP SẮT
	else if (_ten.toUpperCase().indexOf("S") &&
		_ten.toUpperCase().indexOf("GIÁP SẮT")!==-1){

		if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
			let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
			_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_MAU_S").val(),0)) ? true: false;
		}
		else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
			let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
			_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_GIAPSAT_S").val(),0)) ? true: false;
		} 
	}
	else if (_ten.toUpperCase().indexOf("S+")!==-1 &&
		_ten.toUpperCase().indexOf("GIÁP SẮT")!==-1){

			if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_MAU_S1").val(),0)) ? true: false;
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_GIAPSAT_S1").val(),0)) ? true: false;
			}
	}
	else if (_ten.toUpperCase().indexOf("SS")!==-1 &&
		_ten.toUpperCase().indexOf("GIÁP SẮT")!==-1){
			
			if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_MAU_SS").val(),0)) ? true: false;
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
				let _chiso = $(_tpmitem[1]).text().split('(')[1].replace(')','');
				_is_ok = (TryParseInt(_chiso,0) >= TryParseInt($("#_GIAP_GIAPSAT_SS").val(),0)) ? true: false;
			}
	}

	return _is_ok;
}

function html_text_giap(_ten, _tpmitem){
	let _item_html = "";
	// if($(_tpmitem[0]).text().toUpperCase().indexOf("HỆ") ==-1 && 
	// 	$(_tpmitem[0]).text().toUpperCase().indexOf("CƯỜNG HÓA") ==-1){ 

		if (_ten.toUpperCase().indexOf("GIÁP VẢI")!==-1){
			if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (7k2-9k6-12k)" +"<br>";
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (37.8-50.4-63)" +"<br>";
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("KHÁNG PHÉP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (63-84-105)" +"<br>";
			}
			else if($(_tpmitem[1]).text().toUpperCase().indexOf("KHÔNG CÓ") == -1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() +"<br>"; 
			} 
		}
		else if (_ten.toUpperCase().indexOf("GIÁP DA")!==-1){
			if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (7k2-9k6-12k)" +"<br>";
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (50.4-67.2-84)" +"<br>";
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("KHÁNG PHÉP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (50.4-67.2-84)" +"<br>";
			}
			else if($(_tpmitem[1]).text().toUpperCase().indexOf("KHÔNG CÓ") == -1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() +"<br>"; 
			}
		}
		else if (_ten.toUpperCase().indexOf("GIÁP SẮT")!==-1){
			if($(_tpmitem[0]).text().toUpperCase().indexOf("HP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (7k2-9k6-12k)" +"<br>";
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (63-84-105)" +"<br>";
			}
			else if($(_tpmitem[0]).text().toUpperCase().indexOf("KHÁNG PHÉP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (37.8-50.4-63)" +"<br>";
			} 
			else if($(_tpmitem[1]).text().toUpperCase().indexOf("KHÔNG CÓ") == -1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() +"<br>"; 
			}
		}
		
	// }
	return _item_html;
}

function Is_Invalid_PhuKien(_tpmitem, _ok){ 
	let _is_ok = _ok;
	if($(_tpmitem[0]).text().toUpperCase().indexOf("MÁU") !==-1){
		_is_ok = (TryParseInt($(_tpmitem[1]).text(),0) < TryParseInt($("#_PK_MAU").val(),0)) ? false: true;
	}
	else if($(_tpmitem[0]).text().toUpperCase().indexOf("TẤN CÔNG") !==-1 || 
			$(_tpmitem[0]).text().toUpperCase().indexOf("TỐC ĐỘ") !==-1){
		_is_ok = (TryParseInt($(_tpmitem[1]).text(),0) < TryParseInt($("#_PK_DMG_SPD").val(),0)) ? false: true;
	}
	else if($(_tpmitem[0]).text().toUpperCase().indexOf("CHÍ MẠNG") !==-1 || 
			$(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1 ||
			$(_tpmitem[0]).text().toUpperCase().indexOf("KHÁNG PHÉP") !==-1){
		_is_ok = (TryParseInt($(_tpmitem[1]).text(),0) < TryParseInt($("#_PK_CRI_GIAP_KHANGPHEP").val(),0)) ? false: true;
	}
	return _is_ok;
}

function html_text_PhuKien(_tpmitem){
	let _item_html = "";
	//html
	if($(_tpmitem[0]).text().toUpperCase().indexOf("MÁU") !==-1){
		_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (6k-8k)" + "<br>";
	}
	else if($(_tpmitem[0]).text().toUpperCase().indexOf("TẤN CÔNG") !==-1 || 
			$(_tpmitem[0]).text().toUpperCase().indexOf("TỐC ĐỘ") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (600-800)" + "<br>";
	}
	else if($(_tpmitem[0]).text().toUpperCase().indexOf("CHÍ MẠNG") !==-1 || 
			$(_tpmitem[0]).text().toUpperCase().indexOf("GIÁP") !==-1 ||
			$(_tpmitem[0]).text().toUpperCase().indexOf("KHÁNG PHÉP") !==-1){
				_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + " (42-56)" + "<br>";
	}
	else { 
		_item_html = _item_html + $(_tpmitem[0]).text() + ": " + $(_tpmitem[1]).text() + "<br>";
	}
	return _item_html;
}


var _page_index = 0;
function page_next(){
	try{
		return new Promise(function(resolve, reject){
			
			_page_index++; 
			//Next page
			let _page_redirect = $(".market_list.market_module .page_redirect p");
			for(let i = 0; i < _page_redirect.length; i++){
				if(_page_index.toString() == $(_page_redirect[i]).text().trim()){
 
					$(_page_redirect[i]).attr("id","_NEXT_PAGE");
					document.getElementById("_NEXT_PAGE").click();
					_search_timeout = setTimeout(() => {
						page_index();
					}, 2000);
					resolve("OK");
					break;
				}
			}
		});
	}catch(e){ 
		console.error(e.message);
		return new Promise(function(resolve, reject){ resolve(e.message); }); 
	}
}

function btnSearch_finish(){
	clearTimeout(_search_timeout);
	$("#_SUPPORT_MARKET_SEARCH").attr("status", 0);
	$("#_SUPPORT_MARKET .member_labelcheckbox .is_start").attr("src", img1);
	$("#_SUPPORT_MARKET .line").removeClass("active");
}




 
var img1, img2, img3;
var img_ex0, img_ex1, img_ex2, img_ex3, w_ex0 = 38, w_ex1 = 245, w_ex2 = 350;  
function loadImage_MARKET(){


	img1 = chrome.runtime.getURL("/images/not-running.png");
	img2 = chrome.runtime.getURL("/images/running.png"); 
	img3 = chrome.runtime.getURL("/images/loading.gif");
	img_ex0 = chrome.runtime.getURL("/images/app/ex0.png");
	img_ex1 = chrome.runtime.getURL("/images/app/ex1.png");
	img_ex2 = chrome.runtime.getURL("/images/app/ex2.png");
	img_ex3 = chrome.runtime.getURL("/images/app/ex3.png");

	$("#_SUPPORT_MARKET .member_labelcheckbox .is_start").attr("src", img1);
	$("#_SUPPORT_MARKET .line .is_running").attr("src", img3);

	$("#_SUPPORT_MARKET #_hide .ex0").attr("src", img_ex0);
	$("#_SUPPORT_MARKET #_hide .ex1").attr("src", img_ex1);
	$("#_SUPPORT_MARKET #_hide .ex2").attr("src", img_ex2).show();

	$("#_SUPPORT_MARKET .line .img_hide .ex3").attr("src", img_ex0).show();
	$("#_SUPPORT_MARKET .line .img_hide .ex4").attr("src", img_ex3);
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

function copyToClipboard(text) {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
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
