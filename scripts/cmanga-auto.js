// form view website

$(window).load(function (e) {
	
	let _auto1 = "cmanga", 
		_auto_member = "member";
		_auto_level = "level";
	let _auto = window.location.origin;			//www.example.com
	if (_auto.toUpperCase().indexOf(_auto1.toUpperCase()) == -1){ return; }	//check domain
	
	
	//-------------------------------
	let _pathname = window.location.pathname;			//  /products/search.php
 
	if (_pathname.toUpperCase().indexOf(_auto_member.toUpperCase()) !== -1 
	 && _pathname.toUpperCase().indexOf(_auto_level.toUpperCase()) !== -1){
	 
		//---------member level
		console.log(_auto + " auto member level!");
		$.ajax({
			url:AddFile_MemberLevel(),
			success:function(){
 
				$.ajax({
					url:runHandleEvent_MemberLevel(),
					success:function(){ 

						$("#acc_member_level").show();
					}
				});

			}
		});

	}

});


//----------------MEMBER LEVEL-----------------
var _memberlevel_settimeout;
var _memberlevel_time = 40;  
function runHandleEvent_MemberLevel(){
	
	chinhlaicssweb(); 
	loadImage();
	defaultcookie();

	btnStartClick(); 
	btnBossClick(); 
	btnGlobalMessageClick();

	$("#acc_member_level .hamnguc_don_doi").click(function () {

		$("#acc_member_level .hamnguc_don_doi").prop('checked', false);
		$("#acc_member_level .line.phanloai.step3_sub," +
		  "#acc_member_level .line.phanloai.step4_sub").hide();

		let sub = $(this).attr('sub');
		$(this).prop('checked', true);

		if (sub == "step3_sub"){
			$("#acc_member_level .line.phanloai.step3_sub").show();
		}else{
			
			$("#acc_member_level .line.phanloai.step4_sub.map").show();

			let _tmpStep4_map_val = $(".step4_sub input[name='_hamnguc_map']:checked").val();
			if(_tmpStep4_map_val=="RUNG_AM_U"){
				$(".step4_sub.RUNG_AM_U").show();
			}else if(_tmpStep4_map_val=="HAM_MO"){
				$(".step4_sub.HAM_MO").show();
			}else if(_tmpStep4_map_val=="PHUONG_HOANG"){
				$(".step4_sub.PHUONG_HOANG").show();
			}else if(_tmpStep4_map_val=="TINH_THE"){
				$(".step4_sub.TINH_THE").show();
			}
		}
	});

	$(".step4_sub input[name='_hamnguc_map']").click(function () {

		$("#acc_member_level .step4_sub").removeClass("selected");
		$(".step4_sub."+ $(this).val()).addClass("selected");
		$(".step4_sub.RUNG_AM_U,.step4_sub.HAM_MO,.step4_sub.PHUONG_HOANG,.step4_sub.TINH_THE").hide()

		let _tmpStep4_map_val = $(".step4_sub input[name='_hamnguc_map']:checked").val();
		if(_tmpStep4_map_val=="RUNG_AM_U"){
			$(".step4_sub.RUNG_AM_U").show();
		}else if(_tmpStep4_map_val=="HAM_MO"){
			$(".step4_sub.HAM_MO").show();
		}else if(_tmpStep4_map_val=="PHUONG_HOANG"){
			$(".step4_sub.PHUONG_HOANG").show();
		}else if(_tmpStep4_map_val=="TINH_THE"){
			$(".step4_sub.TINH_THE").show();
		}
	});



	$("#acc_member_level #_hide").click(function () {

		$("#acc_member_level #_hide img").hide();
		let hide_status = $(this).attr("status");

		if (hide_status == "1"){
			$("#acc_member_level, #_form_xemthem_boss").animate({ height: w_ex0 });
			$("#acc_member_level #_hide .ex0").show();
			$(this).attr("status", 0);
		}
		else {
			$("#acc_member_level, #_form_xemthem_boss").animate({ height: w_ex2 });
			$("#acc_member_level #_hide .ex2").show();
			$(this).attr("status", 1);
		}
    });

	$("#_xemthemboss").click(function () {

		$("#_xemthemboss img").hide();
		let _xemthemstatus = $(this).attr("status");

		if (_xemthemstatus == "0"){	//open
			$(".body_acc_member_level").animate({ width: 620 });
			$("#_xemthemboss .ex3").show();
			$(this).attr("status", 1);
		}
		else {	//close
			$(".body_acc_member_level").animate({ width: 310 }); 
			$("#_xemthemboss .ex4").show();
			$(this).attr("status", 0);
		}
    });
	

	//load_AUTO_BOSS
	loadAUTOBOSS();
}

var img1, img2, img3;
var img_ex0, img_ex1, img_ex2, img_ex3, w_ex0 = 38, w_ex1 = 245, w_ex2 = 445;  
function loadImage(){
	img1 = chrome.runtime.getURL("/images/not-running.png");
	img2 = chrome.runtime.getURL("/images/running.png"); 
	img3 = chrome.runtime.getURL("/images/loading.gif");
	img_ex0 = chrome.runtime.getURL("/images/app/ex0.png");
	img_ex1 = chrome.runtime.getURL("/images/app/ex1.png");
	img_ex2 = chrome.runtime.getURL("/images/app/ex2.png");
	img_ex3 = chrome.runtime.getURL("/images/app/ex3.png");

	$("#acc_member_level .member_labelcheckbox .is_start, #acc_member_level .member_labelcheckbox .is_start_boss").attr("src", img1);
	$("#acc_member_level .line .is_running").attr("src", img3);

	$("#acc_member_level #_hide .ex0").attr("src", img_ex0);
	$("#acc_member_level #_hide .ex1").attr("src", img_ex1);
	$("#acc_member_level #_hide .ex2").attr("src", img_ex2).show();

	$("#acc_member_level .line .img_hide .ex3").attr("src", img_ex0).show();
	$("#acc_member_level .line .img_hide .ex4").attr("src", img_ex3);
}
 
function AddFile_MemberLevel(){


	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let div = document.createElement('div');
			div.classList.add("body_acc_member_level");
			div.innerHTML = this.responseText;
			
			$("body.setting .content .div_middle ").prepend(div);
			//document.body.insertBefore(div, document.body.firstChild);
			
		} else {
			console.log('readyState: ' + this.readyState);
		}
	};
	xhttp.open("GET", chrome.runtime.getURL("/MemberLevel.html"), true);
	xhttp.send();

}

function defaultcookie(){
	
	let today = new Date();
	let str_date =  today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();

	let _ngay_diem_danh = getCookie("COUNT_BOSS_NGAY");
	if (_ngay_diem_danh == null || _ngay_diem_danh != str_date) {
		
		setCookie("COUNT_BOSS_NGAY", str_date, 1);
		setCookie("COUNT_BOSS_NOTICE", 0, 1); 
	} 
}



function btnStartClick(){ 
	$("#acc_member_level #acc_member_level_start").click(function () {

		let _status = $(this).attr("status");
		if(_status == "0"){
			
			$(this).attr("status", 1);
			$("#acc_member_level .member_labelcheckbox .is_start").attr("src", img2); 
			$("#acc_member_level .line:not(.step5)").removeClass("active"); 
			 
			runningStep();
		}
		else{
			
			$(this).attr("status", 0);
			$("#acc_member_level .member_labelcheckbox .is_start").attr("src", img1); 
			$("#acc_member_level .line:not(.step5)").removeClass("active");  

			//check step4 running
			if($("#acc_member_level #_hamngucdoi").is(":checked")){

				clearTimeout(_attact_monter_timeout);
				try{
					//quay lại
					let _step4_back_id = "_step4_back_id";
					$(".leveling_mini .dungeon.dungeon_module h3 a").attr("id", _step4_back_id);
					document.getElementById(_step4_back_id).click();
				}catch(e){
	
				} 
				$("#acc_member_level .line.step4").removeClass("active").addClass("finish"); 
				$("#acc_member_level_logDaily").prepend( "- Step 4: Hầm ngục (tổ dội) -> finish!<br>" );
			} 
		} 
    });
}

function runningStep(){ 
  
	runStep1_khieuchiendon()
	  .then(() => runStep2_khieuchiendoi())
	  .then(() => runStep3_hamngucdon())
	  .then(() => runStep4_hamngucdoi())
	  //.then(() => runStep5_danhboss())

	  .then(() => finishStep());
}



function runStep1_khieuchiendon(){ 
	try{ 
		$("#acc_member_level .line.step1").addClass("active");  
		
		return new Promise(function(resolve, reject){
			
			//check open daily quest
			let is_leveling_mini = $(".leveling_mini > .quest").length; 
			var _ms = 0;
			if (is_leveling_mini == 0){
				// mở nhiệm vụ ngày
				let _quest = $('#level_module_function .level_menu a[module="quest"].click');
				$(_quest).find("img").trigger('click'); 
				_ms = 2000;
			}

			var _setIdkhieuchien = "khieuchiendon" + Date.now();
			var _setIdkhieuchienPopup = "khieuchiendonPopup" + Date.now();
			setTimeout(() => {

				//kiểm tra đã làm nv chưa? 
				let _tr_element_index = 3;
				if ($('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') a.link').length <= 0){ 
					_tr_element_index = 4;
					if ($('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') a.link').length <= 0){
						$("#acc_member_level_logDaily").prepend('<span style="color:hsl(4, 78%, 42%);">- Step 1: Khiêu chiến đơn (bỏ qua) </span><br>' );
						$("#acc_member_level .line.step1").removeClass("active").addClass("finish");
						resolve("ok");
						return;
					}
				}
				
 
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') a.link').attr("id", _setIdkhieuchien); //set id
				document.getElementById(_setIdkhieuchien).click();							//click khiêu chiến lần 1

				console.log('---- khiêu chiến lần 1/2' );
				$("#acc_member_level_logDaily").prepend('---- khiêu chiến lần 1/2 <br>' );

				setTimeout(() => {

					$("#popup_content .yes_no button.no").attr("id", _setIdkhieuchienPopup); //set id 
					try{document.getElementById(_setIdkhieuchienPopup).click(); 				 //đóng popup lần 1
					}catch(e){} 
					document.getElementById(_setIdkhieuchien).click();						 //click khiêu chiến lần 2
					
					console.log('---- khiêu chiến lần 2/2' );
					$("#acc_member_level_logDaily").prepend('---- khiêu chiến lần 2/2 <br>' );
					 
					setTimeout(() => { 
						
						$("#popup_content .yes_no button.no").attr("id", _setIdkhieuchienPopup); //set id
						try{document.getElementById(_setIdkhieuchienPopup).click(); 				 //đóng popup lần 2
						}catch(e){} 

						$("#acc_member_level .line.step1").removeClass("active").addClass("finish"); 
						$("#acc_member_level_logDaily").prepend( "- Step 1: Khiêu chiến đơn -> finish!<br>" );
						resolve("ok");	//reject("error");
					}, 2000);  
				}, 2000); 
			}, _ms); 
		});
		
	}catch(e){
		$("#acc_member_level .line.step1").removeClass("active");
		console.log(e); 
		return new Promise(function(resolve, reject){ resolve(e.message); });
	}	
} 

function runStep2_khieuchiendoi(){ 
	try{ 
		
		//kiểm tra checked
		if(!$("#acc_member_level #_khieuchiendoi").prop("checked")){

			return new Promise(function(resolve, reject){  
				resolve("ok");	//reject("error");
			});
		}

		$("#acc_member_level .line.step2").addClass("active");  
		
		return new Promise(function(resolve, reject){
			
			//check open daily quest
			let is_leveling_mini = $(".leveling_mini > .quest").length; 
			var _ms = 0;
			if (is_leveling_mini == 0){
				// mở nhiệm vụ ngày
				let _quest = $('#level_module_function .level_menu a[module="quest"].click'); 
				console.log("Open daily quest: "+ _quest.length);
				
				$(_quest).find("img").trigger('click'); 
				_ms = 2000;
			}

			var _setIdkhieuchiendoi = "khieuchiendoi" + Date.now();
			var _setIdkhieuchiendoiPopup = "khieuchiendoiPopup" + Date.now();
			setTimeout(() => {

				//kiểm tra đã làm nv chưa? 
				let _tr_element_index = 5;
				if ($('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') a.link').length <= 0){ 
					//_tr_element_index = 5;
					//if ($('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') a.link').length <= 0){  }

					$("#acc_member_level .line.step2").removeClass("active").addClass("finish"); 
					$("#acc_member_level_logDaily").prepend('<span style="color:hsl(4, 78%, 42%);">- Step 2: Khiêu chiến (đội) (bỏ qua) </span><br>' );
					resolve("ok");
					return;
				}
				
 
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') a.link').attr("id", _setIdkhieuchiendoi); //set id
				document.getElementById(_setIdkhieuchiendoi).click();								//click khiêu chiến lần 1

				console.log('---- khiêu chiến (đội) lần 1/2' );
				$("#acc_member_level_logDaily").prepend('---- khiêu chiến (đội) lần 1/2 <br>' );

				setTimeout(() => {

					$("#popup_content .yes_no button.no").attr("id", _setIdkhieuchiendoiPopup); 	//set id
					try{document.getElementById(_setIdkhieuchiendoiPopup).click(); 				 		//đóng popup lần 1
					}catch(e){}
					document.getElementById(_setIdkhieuchiendoi).click();							//click khiêu chiến lần 2
					
					console.log('---- khiêu chiến (đội) lần 2/2' );
					$("#acc_member_level_logDaily").prepend('---- khiêu chiến (đội) lần 2/2 <br>' );
					 
					setTimeout(() => { 
						
						$("#popup_content .yes_no button.no").attr("id", _setIdkhieuchiendoiPopup); //set id
						try{document.getElementById(_setIdkhieuchiendoiPopup).click(); 				 		//đóng popup lần 2
						}catch(e){}

						$("#acc_member_level .line.step2").removeClass("active").addClass("finish"); 
						$("#acc_member_level_logDaily").prepend( "- Step 2: Khiêu chiến (đội) -> finish!<br>" );
						resolve("ok");	//reject("error");
					}, 2000);  
				}, 2000); 
			}, _ms); 
		});
		
	}catch(e){
		$("#acc_member_level .line.step2").removeClass("active");
		console.log(e); 
		return new Promise(function(resolve, reject){ resolve(e.message); });
	}	
}

function runStep3_hamngucdon(){ 
	try{ 

		//kiểm tra checked
		if(!$("#acc_member_level #_hamngucdon").is(":checked")){

			return new Promise(function(resolve, reject){  
				resolve("ok");	//reject("error");
			});
		}
 
		$("#acc_member_level .line.step3").addClass("active"); 
		
	    return new Promise(function(resolve, reject){
			try{
				//quay lại
				let _back_id = "_leveling_mini_formnhiemvu_quaylai";
				$(".leveling_mini > .quest > h3 > a").attr("id", _back_id);
				document.getElementById(_back_id).click();
			}catch(e){}
			 
			// mở hầm ngục - đơn
			setTimeout(function(){ 
				$('#level_module_play .level_menu .level_menu_dungeon a[module="dungeon"].click img').trigger('click');  //open dungeon
			setTimeout(function(){ 
				$('.leveling_mini .boss_zone #dungeon_menu ul.menu li:nth-of-type(2) a img').trigger('click'); 		 //open dungeon team
			setTimeout(function(){ 
				$('.leveling_mini .boss_zone #dungeon_map .dungeon_select tr:nth-of-type(1) td:nth-of-type(1) a.click img').trigger('click'); //open dungeon map
			setTimeout(function(){ 
				$('.leveling_mini .dungeon_level.dungeon_module .level_select li:nth-of-type(1) a[module="dark_forest"] img').trigger('click'); //open map-rank
			setTimeout(function(){ 

				$(".leveling_mini .dungeon_monster.dungeon_module .monster_static ul li:nth-of-type(1) svg").attr("id", "_step3__tancong"); //set id 
				document.getElementById("_step3__tancong").dispatchEvent(new Event('click'));//1
				$("#acc_member_level_logDaily").prepend('---- Vượt hầm ngục lần 1/3 <br>' );

				setTimeout(function(){
					$("#popup_content .yes_no button.no").attr("id", "_step3_dongpopup__tancong");
					document.getElementById("_step3_dongpopup__tancong").click();			//close

					setTimeout(function(){ 
						document.getElementById("_step3__tancong").dispatchEvent(new Event('click'));//2
						$("#acc_member_level_logDaily").prepend('---- Vượt hầm ngục lần 2/3 <br>' );

						setTimeout(function(){ 
							$("#popup_content .yes_no button.no").attr("id", "_step3_dongpopup__tancong");
							document.getElementById("_step3_dongpopup__tancong").click();	//close

							setTimeout(function(){ 
								document.getElementById("_step3__tancong").dispatchEvent(new Event('click'));//3
								$("#acc_member_level_logDaily").prepend('---- Vượt hầm ngục lần 3/3 <br>' );

								setTimeout(function(){
									$("#popup_content .yes_no button.no").attr("id", "_step3_dongpopup__tancong");
									document.getElementById("_step3_dongpopup__tancong").click();	//close 

									setTimeout(function(){
										//quay lại

										


										let _step3_back_id = "_step3_back_id";
										$(".leveling_mini .dungeon.dungeon_module h3 a").attr("id", _step3_back_id);
										document.getElementById(_step3_back_id).click();
										
										// $(".leveling_mini > .quest > h3 > a").attr("id", _step3_back_id);
										// document.getElementById(_step3_back_id).click();
										
										// $(".leveling_mini > .quest > h3 > a").attr("id", _step3_back_id);
										// document.getElementById(_step3_back_id).click();

										$("#acc_member_level .line.step3").removeClass("active").addClass("finish"); 
										$("#acc_member_level_logDaily").prepend( "- Step 3: Hầm ngục (đơn) -> finish!<br>" );
										resolve("ok");	//reject("error");
									}, 800); 

								}, 1500);
							}, 800);
						}, 1500);
					}, 800); 
				}, 1500);
 
			}, 800);
			}, 800);
			}, 800);
			}, 800);
			}, 800);
			
		});
	} catch(e){
		$("#acc_member_level .line.step3").removeClass("active");
		console.log(e); 
	}	
}

var _step4_map_val_css, _step4_rank_val_css;
function runStep4_hamngucdoi(){ 
	try{ 

		//kiểm tra checked
		if(!$("#acc_member_level #_hamngucdoi").is(":checked")){

			return new Promise(function(resolve, reject){  
				resolve("ok");	//reject("error");
			});
		}
 
		let _tmpStep4_map_val = $(".step4_sub input[name='_hamnguc_map']:checked").val();
		if(_tmpStep4_map_val=="RUNG_AM_U"){
			_step4_map_val_css = ".leveling_mini .boss_zone #dungeon_map .dungeon_select tr:nth-of-type(1) td:nth-of-type(1) a.click img";
			_step4_rank_val_css = ".leveling_mini .dungeon_level.dungeon_module .level_select a[level='"+ $(".step4_sub input[name='_hamnguc_1_rank']:checked").val() +"'] img";
		}else if(_tmpStep4_map_val=="HAM_MO"){
			_step4_map_val_css = ".leveling_mini .boss_zone #dungeon_map .dungeon_select tr:nth-of-type(1) td:nth-of-type(2) a.click img";
			_step4_rank_val_css = ".leveling_mini .dungeon_level.dungeon_module .level_select a[level='"+ $(".step4_sub input[name='_hamnguc_2_rank']:checked").val() +"'] img";
		}else if(_tmpStep4_map_val=="PHUONG_HOANG"){
			_step4_map_val_css = ".leveling_mini .boss_zone #dungeon_map .dungeon_select tr:nth-of-type(2) td:nth-of-type(1) a.click img";
			_step4_rank_val_css = ".leveling_mini .dungeon_level.dungeon_module .level_select a[level='"+ $(".step4_sub input[name='_hamnguc_3_rank']:checked").val() +"'] img";
		}else if(_tmpStep4_map_val=="TINH_THE"){
			_step4_map_val_css = ".leveling_mini .boss_zone #dungeon_map .dungeon_select tr:nth-of-type(2) td:nth-of-type(2) a.click img";
			_step4_rank_val_css = ".leveling_mini .dungeon_level.dungeon_module .level_select a[level='"+ $(".step4_sub input[name='_hamnguc_4_rank']:checked").val() +"'] img";
		}


		$("#acc_member_level .line.step4").addClass("active"); 
		
	    return new Promise(function(resolve, reject){
			try{
				//quay lại
				let _back_id = "_leveling_mini_formnhiemvu_quaylai";
				$(".leveling_mini > .quest > h3 > a").attr("id", _back_id);
				document.getElementById(_back_id).click();
			}catch(e){}

			// mở hầm ngục - đội
			setTimeout(function(){ 
				$('#level_module_play .level_menu .level_menu_dungeon a[module="dungeon"].click img').trigger('click');  //open dungeon
			setTimeout(function(){ 
				$('.leveling_mini .boss_zone #dungeon_menu ul.menu li:nth-of-type(1) a img').trigger('click'); 		 //open dungeon team
			setTimeout(function(){  
				$(_step4_map_val_css).trigger('click'); //open dungeon map  
			setTimeout(function(){  
				$(_step4_rank_val_css).trigger('click'); //open map-rank
			setTimeout(function(){ 


				repeatAttactMonter();
				
 
			}, 600);
			}, 600);
			}, 600);
			}, 600);
			}, 600);
			
		});
	} catch(e){
		$("#acc_member_level .line.step4").removeClass("active");
		console.log(e); 
	}	
}

var _attact_monter_timeout;
var _count_hamngucdoi_attact = 0;
function repeatAttactMonter(){

	try{
		_count_hamngucdoi_attact++;
		$(".leveling_mini .dungeon_monster.dungeon_module .monster_static ul li:nth-of-type(1) svg").attr("id", "_step4__tancong"); //set id 
		document.getElementById("_step4__tancong").dispatchEvent(new Event('click'));//1
		$("#acc_member_level_logDaily").prepend('---- Vượt hầm ngục (tổ đội) lần ' + _count_hamngucdoi_attact + ' <br>' );

		setTimeout(function(){
			$("#popup_content .yes_no button.no").attr("id", "_step4_dongpopup__tancong");
			document.getElementById("_step4_dongpopup__tancong").click();			//close 
		}, 2000);

		_attact_monter_timeout = setTimeout(() => {
			repeatAttactMonter();
		}, 62000);
 
	}catch(e){
		console.log(e); 
		$("#acc_member_level_logDaily").prepend( "- Step 4: Attact Monter: <br>" );
		_attact_monter_timeout = setTimeout(() => {
			repeatAttactMonter();
		}, 5000);
	} 
}


function finishStep(){ 
	try{ 
		$("#acc_member_level #acc_member_level_start").attr("status", 0);
		$("#acc_member_level .member_labelcheckbox .is_start").attr("src", img1); 
		$("#acc_member_level .line:not(.step5)").removeClass("active"); 
	    
	}catch(e){
		console.log(e); 
	}
}



/////////////////////BOSS////////////////////////////////////////////////
function btnBossClick(){

	$("#acc_member_level #acc_member_level_boss_start").click(function () {

		let _status = $(this).attr("status");
		if(_status == "0"){	//start

			$("#_global_message_auto").prop('checked', false);

			$(this).attr("status", 1);
			$("#acc_member_level .member_labelcheckbox .is_start_boss").attr("src", img2);  
			$("#acc_member_level .line.step5").addClass("active");
			runStep5_danhboss().then(() => 
				setTimeout(() => {
					loopWithSecondsBoss();
				}, 1000)
			); 

			$(".body_acc_member_level").animate({ width: 620 });
			$("#_xemthemboss .ex3").show();
			$("#_xemthemboss").attr("status", 1);
			setCookie('AUTO_BOSS', true, 120);


			//boss message
			clearTimeout(_loopDetectedBossNotice); 
			clearTimeout(_ATTACK_BOSS_EVENT);
			setCookie('DETECTED_BOSS', false, 120);
			$("#acc_member_level .line.step6").removeClass("active");
			_detected_boss_status = false; 
		}
		else{	
			
			clearTimeout(_loopWithSecondsBoss); 
			$(this).attr("status", 0);
			$("#acc_member_level .member_labelcheckbox .is_start_boss").attr("src", img1);  
			$("#acc_member_level .line.step5").removeClass("active");

			$(".body_acc_member_level").animate({ width: 310 });
			$("#_xemthemboss .ex4").show();
			$("#_xemthemboss").attr("status", 0);
			setCookie('AUTO_BOSS', false, 120);
			try{
				let _back_boss_id = "_back_boss_id";
				$('.leveling_mini .boss_zone .boss_all.boss_module > h3 a').attr("id", _back_boss_id); // quay lại
				document.getElementById(_back_boss_id).click();
			}catch(e){} 
		} 
    });

	
}
function loadAUTOBOSS(){
	let _boss_status = getCookie('AUTO_BOSS');
	if (_boss_status == "true"){
		$("#acc_member_level #acc_member_level_boss_start").click();
	}
	
	let _boss_detected = getCookie('DETECTED_BOSS');
	if (_boss_detected == "true"){
		$("#acc_member_level #_global_message_auto").click();
	}
}
/////////////////////END BOSS////////////////////////////////////////////////

function runStep5_danhboss(){ 
	try{ 
		
		//kiểm tra checked
		if(!$("#acc_member_level #_danhboss").is(":checked")){ 
			return new Promise(function(resolve, reject){  
				resolve("ok");	//reject("error");
			});
		}

		return new Promise(function(resolve, reject){ 
			try{
				//quay lại
				let _back_id = "_leveling_mini_formnhiemvu_quaylai";
				$(".leveling_mini > .quest > h3 > a").attr("id", _back_id);
				document.getElementById(_back_id).click();
			}catch(e){}

			// mở Boss
			setTimeout(function(){ 
				$('#level_module_play .level_menu li:nth-of-type(4) a[module="boss"].click img').trigger('click');  //open Boss
			setTimeout(function(){ 
				  
				
				$('.leveling_mini .boss_zone .boss_all.boss_module ul.menu li:nth-of-type(1) a img').trigger('click');	//open Boss Tinh Anh
				//$('.leveling_mini .boss_zone .boss_all.boss_module ul.menu li:nth-of-type(2) a img').trigger('click');	//open Boss Tinh Anh (VIP)
				//$('.leveling_mini .boss_zone .boss_all.boss_module ul.menu li:nth-of-type(3) a img').trigger('click');	//open Boss Thế Giới
				//$('.leveling_mini .boss_zone .boss_all.boss_module ul.menu li:nth-of-type(4) a img').trigger('click');	//open Boss Dã Ngoại
  
			setTimeout(function(){  
				

				Gettimeboss(); 
				resolve("ok");
				return;

				try{
					let _back_boss_id = "_back_boss_id";
					$('.leveling_mini .boss_zone .boss_all.boss_module > h3 a').attr("id", _back_boss_id); // quay lại
					document.getElementById(_back_boss_id).click();
				}catch(e){} 


			}, 1200);
			}, 600);
			}, 600); 
		});
	    
	}catch(e){ 
		console.log(e); 
		$("#acc_member_level_logDaily").prepend("- Step 5: "+e.message+"<br>" );
	}
} 


var _rank_member; 
var _boss_info_detail_d, _boss_info_detail_c, _boss_info_detail_b, _boss_info_detail_a,
	_boss_info_detail_s, _boss_info_detail_ss, _boss_info_detail_sss;
var _time_fight_d, _time_fight_c, _time_fight_b, _time_fight_a,
	_time_fight_s, _time_fight_ss, _time_fight_sss;
function Gettimeboss(){
	try{  

		//RANK Member 
		_rank_member = getLevel($(".div_middle .main_content .right .leveling .level_up .current_level p:nth-of-type(1)").text().split('-')[0]); //A = 7, (cửa boss - 3)
		_rank_member = _rank_member - 3;

		
		if (_rank_member <= 1){
			//BOSS D-Rank 
			_boss_info_detail_d = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(1) a'); 
			let _obj_boss_time = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(1) '+
							  	   '.boss_info_table tr:nth-of-type(1) td:nth-of-type(2) .time_count_down');
			let _obj_boss_time_txt = $(_obj_boss_time).text().trim(); 								  //39:57 (hh:mm)
			//let _obj_boss_time_date = $(_obj_boss_time).attr('time').toDate("yyyy-MM-dd hh:mm:ss"); //2022-03-23 14:39:00
			let _datetime_fight_client = new Date(); 
			
			_time_fight_d = gettimeclient(_obj_boss_time_txt, _datetime_fight_client);
			$("#_BOSS_TINH_ANH ._time_boss_d").text(_time_fight_d.toTimeString().split(' ')[0]);
			
			return;
		} 
		else if (_rank_member == 2){ 
			//BOSS C-Rank
			_boss_info_detail_c = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(2) a'); 
			let _obj_boss_time = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(2) '+
							  	   '.boss_info_table tr:nth-of-type(1) td:nth-of-type(2) .time_count_down');
			let _obj_boss_time_txt = $(_obj_boss_time).text().trim(); 								  //39:57 (hh:mm)
			//let _obj_boss_time_date = $(_obj_boss_time).attr('time').toDate("yyyy-MM-dd hh:mm:ss"); //2022-03-23 14:39:00
			let _datetime_fight_client = new Date(); 
			
			_time_fight_c = gettimeclient(_obj_boss_time_txt, _datetime_fight_client);
			$("#_BOSS_TINH_ANH ._time_boss_c").text(_time_fight_c.toTimeString().split(' ')[0]);
			
			return; 
		} 
		else if (_rank_member == 3){ 
			//BOSS B-Rank
			_boss_info_detail_b = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(3) a'); 
			let _obj_boss_time = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(3) '+
							  	   '.boss_info_table tr:nth-of-type(1) td:nth-of-type(2) .time_count_down');
			let _obj_boss_time_txt = $(_obj_boss_time).text().trim(); 								  //39:57 (hh:mm)
			//let _obj_boss_time_date = $(_obj_boss_time).attr('time').toDate("yyyy-MM-dd hh:mm:ss"); //2022-03-23 14:39:00
			let _datetime_fight_client = new Date(); 
			
			_time_fight_b = gettimeclient(_obj_boss_time_txt, _datetime_fight_client);
			$("#_BOSS_TINH_ANH ._time_boss_b").text(_time_fight_b.toTimeString().split(' ')[0]);

			return;
		}  
		else if (_rank_member == 4){ 
			//BOSS A-Rank
			_boss_info_detail_a = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(4) a'); 
			let _obj_boss_time = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(4) '+
							  	   '.boss_info_table tr:nth-of-type(1) td:nth-of-type(2) .time_count_down');
			let _obj_boss_time_txt = $(_obj_boss_time).text().trim(); 								  //39:57 (hh:mm)
			//let _obj_boss_time_date = $(_obj_boss_time).attr('time').toDate("yyyy-MM-dd hh:mm:ss"); //2022-03-23 14:39:00
			let _datetime_fight_client = new Date(); 
			
			_time_fight_a = gettimeclient(_obj_boss_time_txt, _datetime_fight_client);
			$("#_BOSS_TINH_ANH ._time_boss_a").text(_time_fight_a.toTimeString().split(' ')[0]);

			return;
		} 
		else if (_rank_member == 5){ 
			//BOSS S-Rank
			_boss_info_detail_s = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(5) a'); 
			let _obj_boss_time = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(5) '+
							  	   '.boss_info_table tr:nth-of-type(1) td:nth-of-type(2) .time_count_down');
			let _obj_boss_time_txt = $(_obj_boss_time).text().trim(); 								  //39:57 (hh:mm)
			//let _obj_boss_time_date = $(_obj_boss_time).attr('time').toDate("yyyy-MM-dd hh:mm:ss"); //2022-03-23 14:39:00
			let _datetime_fight_client = new Date(); 
			
			_time_fight_s = gettimeclient(_obj_boss_time_txt, _datetime_fight_client);
			$("#_BOSS_TINH_ANH ._time_boss_s").text(_time_fight_s.toTimeString().split(' ')[0]);

			return;
		} 
		else if (_rank_member == 6){ 
			//BOSS SS-Rank
			_boss_info_detail_ss = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(6) a'); 
			let _obj_boss_time = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(6) '+
							  	   '.boss_info_table tr:nth-of-type(1) td:nth-of-type(2) .time_count_down');
			let _obj_boss_time_txt = $(_obj_boss_time).text().trim(); 								  //39:57 (hh:mm)
			//let _obj_boss_time_date = $(_obj_boss_time).attr('time').toDate("yyyy-MM-dd hh:mm:ss"); //2022-03-23 14:39:00
			let _datetime_fight_client = new Date(); 
			
			_time_fight_ss = gettimeclient(_obj_boss_time_txt, _datetime_fight_client);
			$("#_BOSS_TINH_ANH ._time_boss_ss").text(_time_fight_ss.toTimeString().split(' ')[0]);

			return;
		} 
		else if (_rank_member == 7){ 
			//BOSS SSS-Rank
			_boss_info_detail_sss = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(7) a'); 
			let _obj_boss_time = $('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(7) '+
							  	   '.boss_info_table tr:nth-of-type(1) td:nth-of-type(2) .time_count_down');
			let _obj_boss_time_txt = $(_obj_boss_time).text().trim(); 								  //39:57 (hh:mm)
			//let _obj_boss_time_date = $(_obj_boss_time).attr('time').toDate("yyyy-MM-dd hh:mm:ss"); //2022-03-23 14:39:00
			let _datetime_fight_client = new Date(); 
			
			_time_fight_sss = gettimeclient(_obj_boss_time_txt, _datetime_fight_client);
			$("#_BOSS_TINH_ANH ._time_boss_sss").text(_time_fight_sss.toTimeString().split(' ')[0]);

			return;
		}
		 
		 
	}catch(e){
		$("#acc_member_level_logDaily").prepend( e.message + " <br>" );
	}
}



var _loopWithSecondsBoss;
var _reload_page = 240;
var _reload_page2 = 120;
var _current_count = 0;
function loopWithSecondsBoss(){
	try{
		_current_count++;
		checkTimeSanSang();
		 
		_loopWithSecondsBoss = setTimeout(() => {
			loopWithSecondsBoss();
		}, 1000);
	}catch(e){
		_loopWithSecondsBoss = setTimeout(() => {
			loopWithSecondsBoss();
		}, 1000);
	}
}

var _is_attack = false; 
var _tientrinh_att = false;
var _second_count = 0;
function checkTimeSanSang(){
	try{
		
		if(_is_attack){ 
			//kiểm tra boss đã chết?
			_second_count = 0;
			if ($('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .fight').css('display') == 'none' ){
				//lấy lại time boss
				window.location.href = window.location.href;
				//runStep5_danhboss();
				//_is_attack = false;
			}
			$("#_danhbossngay").text('('+_second_count+'/Attack)');
			return;
		} else {
			_second_count++;
			//ktra 300s reload
			if (_second_count >= _reload_page2){
				window.location.href = window.location.href;
			} 
			$("#_danhbossngay").text('('+_second_count+')'); //
		}

		let _date_now  = new Date();

		if((_rank_member <= 1 )) { //|| _rank_member <=1
			//D 
			$("#_BOSS_TINH_ANH ._time_boss_d").text(_time_fight_d.toTimeString().split(' ')[0]); 

			if (_date_now >= _time_fight_d && _is_attack == false && _tientrinh_att ==false) {
				$("#acc_member_level_logDaily").prepend('(1) D: Start<br>'); 
				_second_count = 0;
				_tientrinh_att = true;
				setTimeout(() => {
					VAO_BOSS_DETAIL(_boss_info_detail_d,'_BOSS_D_DETAIL','_BOSS_D_DETAIL_ATTACK');
				}, 2000); 
			}
			return;
 
		} else if((_rank_member ==2 )) { //|| _rank_member == 1
			//C
			$("#_BOSS_TINH_ANH ._time_boss_c").text(_time_fight_c.toTimeString().split(' ')[0]); 

			if (_date_now >= _time_fight_c && _is_attack == false && _tientrinh_att ==false) {
				$("#acc_member_level_logDaily").prepend('(1) C: Start<br>'); 
				_second_count = 0;
				_tientrinh_att = true;
				setTimeout(() => {
					VAO_BOSS_DETAIL(_boss_info_detail_c,'_BOSS_C_DETAIL','_BOSS_C_DETAIL_ATTACK');
				}, 2000); 
			}
			return;

		} else if((_rank_member ==3 )) { //|| _rank_member ==2
			//B
			$("#_BOSS_TINH_ANH ._time_boss_b").text(_time_fight_b.toTimeString().split(' ')[0]); 

			if (_date_now >= _time_fight_b && _is_attack == false && _tientrinh_att ==false) {
				$("#acc_member_level_logDaily").prepend('(1) B: Start<br>'); 
				_second_count = 0;
				_tientrinh_att = true;
				setTimeout(() => {
					VAO_BOSS_DETAIL(_boss_info_detail_b,'_BOSS_B_DETAIL','_BOSS_B_DETAIL_ATTACK');
				}, 2000);
			}
			return;

		} else if((_rank_member ==4 )) { //|| _rank_member ==3
			//A
			$("#_BOSS_TINH_ANH ._time_boss_a").text(_time_fight_a.toTimeString().split(' ')[0]); 

			if (_date_now >= _time_fight_a && _is_attack == false && _tientrinh_att ==false) {
				$("#acc_member_level_logDaily").prepend('(1) A: Start<br>'); 
				_second_count = 0;
				_tientrinh_att = true;
				setTimeout(() => {
					VAO_BOSS_DETAIL(_boss_info_detail_a,'_BOSS_A_DETAIL','_BOSS_A_DETAIL_ATTACK');
				}, 2000); 
			}
			return;

		} else if((_rank_member ==5 )) { //|| _rank_member ==4
			//S 
			$("#_BOSS_TINH_ANH ._time_boss_s").text(_time_fight_s.toTimeString().split(' ')[0]); 

			if (_date_now >= _time_fight_s && _is_attack == false && _tientrinh_att ==false) {
				$("#acc_member_level_logDaily").prepend('(1) S: Start<br>'); 
				_second_count = 0;
				_tientrinh_att = true;
				setTimeout(() => {
					VAO_BOSS_DETAIL(_boss_info_detail_s,'_BOSS_S_DETAIL','_BOSS_S_DETAIL_ATTACK');
				}, 2000); 
			}
			return;

		} else if((_rank_member ==6 )) { //|| _rank_member ==5
			//SS 
			$("#_BOSS_TINH_ANH ._time_boss_ss").text(_time_fight_ss.toTimeString().split(' ')[0]); 

			if (_date_now >= _time_fight_ss && _is_attack == false && _tientrinh_att ==false) {
				$("#acc_member_level_logDaily").prepend('(1) SS: Start<br>'); 
				_second_count = 0;
				_tientrinh_att = true;
				setTimeout(() => {
					VAO_BOSS_DETAIL(_boss_info_detail_ss,'_BOSS_SS_DETAIL','_BOSS_SS_DETAIL_ATTACK');
				}, 2000); 
			}
			return;
			
		} else if((_rank_member ==7)) { //|| _rank_member ==6
			
			$("#_BOSS_TINH_ANH ._time_boss_sss").text(_time_fight_sss.toTimeString().split(' ')[0]); 

			if (_date_now >= _time_fight_sss && _is_attack == false && _tientrinh_att ==false) {
				$("#acc_member_level_logDaily").prepend('(1) SSS: Start<br>'); 
				_second_count = 0;
				_tientrinh_att = true;
				setTimeout(() => {
					VAO_BOSS_DETAIL(_boss_info_detail_sss,'_BOSS_SSS_DETAIL','_BOSS_SSS_DETAIL_ATTACK');
				}, 2000); 
			}
			return;
		}
		
	}catch(e){
		$("#acc_member_level_logDaily").prepend( e.message + " <br>" );
	}
}


function VAO_BOSS_DETAIL(_p_obj_boss_info,_p_boss_detail_id,_p_boss_detail_attack_id){

	try{ 
			$("#acc_member_level_logDaily").prepend('(2) --> Check display<br>');
			if ($('.leveling_mini .boss_zone .boss_detail').css('display') != 'none' ){  return; }
			$("#acc_member_level_logDaily").prepend('(3) ----> go boss' + _p_boss_detail_id + " <br>");
			$(_p_obj_boss_info).attr('id', _p_boss_detail_id);
			document.getElementById(_p_boss_detail_id).click();

			setTimeout(() => {
				
				ATTACK_BOSS_DETAIL(_p_boss_detail_attack_id);  
			}, 1500);
 
	}catch(e){
		$("#acc_member_level_logDaily").prepend('VAO_BOSS_DETAIL: ' + e.message + " <br>");
		setTimeout(() => {
			VAO_BOSS_DETAIL(_p_obj_boss_info,_p_boss_detail_id,_p_boss_detail_attack_id);
		}, 1000); 
	}
}


function ATTACK_BOSS_DETAIL(_boss_detail_attack_id){
	try{  
		$("#acc_member_level_logDaily").prepend("(4) ----> Start auto! <br>");
		$('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight span').attr('id', _boss_detail_attack_id);
		document.getElementById(_boss_detail_attack_id).click();
		_is_attack = true;
		$("#acc_member_level_logDaily").prepend("(5) ----> AUTO OK! <br>");
	}catch(e){
		$("#acc_member_level_logDaily").prepend('ATTACK_BOSS: ' + e.message + " <br>");
		setTimeout(() => {
			ATTACK_BOSS_DETAIL(_boss_detail_attack_id);
		}, 100);
	}
}

function gettimeclient(_time_server_txt, _time_client){

	let _time_server_second = getSecondLeft(_time_server_txt); 
	let _tpm = _time_client.setSeconds(_time_client.getSeconds() + _time_server_second);
 
	return new Date(_tpm); 
}  

function getSecondLeft(_time_server){
	let _t_servers = _time_server.split(':'); //01:01:49
	let _s_servers = -10;
	if (_t_servers.length == 3){
		_s_servers = (TryParseInt(_t_servers[0], 0) * 3600) + (TryParseInt(_t_servers[1], 0) * 60) + (TryParseInt(_t_servers[2], 0));
	}else if (_t_servers.length == 2){
		_s_servers = (TryParseInt(_t_servers[0], 0) * 60) + (TryParseInt(_t_servers[1], 0));
	} 

	return _s_servers;
}

function getTimeLeft(_p_time_boss){ 
	let millis = Math.abs(new Date() - _p_time_boss);
	let seconds = Math.floor(millis / 1000);
	return toMMSS(seconds);
}

function toMMSS(ttseconds) {

	if (ttseconds <= 0){ return "Sẵn Sàng"; }

    let sec_num = parseInt(ttseconds, 0); // don't forget the second param
    //var hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor(sec_num / 60);
    let seconds = sec_num - (minutes * 60);

    //if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let time = minutes + ':' + seconds;
    return time;
}

/////////////////////btn Global Message Click////////////////////////////////////////////////
function btnGlobalMessageClick(){

	$("#_global_message_auto").click(function () {

		let _global_message = $(this).is(":checked");
		if (_global_message){
			setCookie('DETECTED_BOSS', true, 120); 
			$("#acc_member_level .line.step6").addClass("active");

			//boss daily auto
			clearTimeout(_loopWithSecondsBoss); 
			$(this).attr("status", 0);
			$("#acc_member_level .member_labelcheckbox .is_start_boss").attr("src", img1);  
			$("#acc_member_level .line.step5").removeClass("active");

			$(".body_acc_member_level").animate({ width: 310 });
			$("#_xemthemboss .ex4").show();
			$("#_xemthemboss").attr("status", 0);
			setCookie('AUTO_BOSS', false, 120);
			try{
				let _back_boss_id = "_back_boss_id";
				$('.leveling_mini .boss_zone .boss_all.boss_module > h3 a').attr("id", _back_boss_id); // quay lại
				document.getElementById(_back_boss_id).click();
			}catch(e){}


			loopDetectedBossNotice();

		} else{
			setCookie('DETECTED_BOSS', false, 120);
			$("#acc_member_level .line.step6").removeClass("active");
			_detected_boss_status = false;
			clearTimeout(_loopDetectedBossNotice); 
			clearTimeout(_ATTACK_BOSS_EVENT);


			try{
				let _back_boss_id = "_back_boss_id";
				$('.leveling_mini .boss_zone .boss_all.boss_module > h3 a').attr("id", _back_boss_id); // quay lại
				document.getElementById(_back_boss_id).click();
			}catch(e){}
		}
    }); 

	$("#_TEST").click(function () {

		_tientrinh = true;
		_second_detectedCount = 0; 
		openboss_notice(); 
		$('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight').show();
		$('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .fight').show();

	}); 
	$("#_TESTCLICK").click(function () {

		// $('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight').attr('id', '_boss_sukien_auto222_id');
		// document.getElementById('_boss_sukien_auto222_id').click();

		loopDetectedBossNotice();
		


		// $('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight svg').attr('id', '_boss_sukien_auto111_id');
		// document.getElementById("_boss_sukien_auto111_id").dispatchEvent(new Event('click'));//2

	}); 
	
}
var _second_detectedCount = 0;
var _detected_boss_status = false;
var _loopDetectedBossNotice;
var _tientrinh = false;
var _boss_lag = 0;
function loopDetectedBossNotice(){
	try{ 
		let _fleng = $('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight').length;
		let _hpbar = $('.leveling_mini .boss_zone .boss_detail .boss_info .current_hp .hp_bar').attr('current');
		let _display = $('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight').css('display');
		if(_fleng > 0){ 
			$('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight').attr('id', '_boss_is_death');
			$('#_TEST_MESSAGE').text('1: tientrinh= '+ _tientrinh + ', status= ' + _detected_boss_status + ', length= ' + _fleng + 
									 ', display= ' +  document.getElementById("_boss_is_death").style.display + 
									 ', display2= ' +  _display + 
									 ', hpbar= ' +  _hpbar);
		} else{
			$('#_TEST_MESSAGE').text('2: tientrinh= '+ _tientrinh + ', status= ' +_detected_boss_status + 
									 ', length= ' + _fleng + ', display=null, display2=null, hpbar= null');
		}

		if(_detected_boss_status){
			//kiểm tra boss đã chết?
		  
			if(_fleng > 0){ 
				$('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight').attr('id', '_boss_is_death');
				if (document.getElementById("_boss_is_death").style.display == 'none'){
					//lấy lại time boss
					window.location.href = window.location.href;
					_detected_boss_status = false;
				}
			}
			 
			if (_display == 'none' ){
				//lấy lại time boss
				window.location.href = window.location.href;
				_detected_boss_status = false;
			}

			if (_hpbar == '0' ){
				//lấy lại time boss
				window.location.href = window.location.href;
				_detected_boss_status = false;
			} 
			_boss_lag++;
			$("#_global_message_count").text('('+_boss_lag+'/Attack)');
			if (_boss_lag >= 400){
				window.location.href = window.location.href;
				_detected_boss_status = false;
			}
		}
		else {
			_second_detectedCount++;
			if (_second_detectedCount >= _reload_page && _tientrinh == false){ window.location.href = window.location.href; } //ktra 300s reload
			$("#_global_message_count").text('('+_second_detectedCount+'/'+getCookie("COUNT_BOSS_NOTICE")+')');

			let _obj_thongbao = $('#global_message');
			if ($(_obj_thongbao).find('.text p').text().indexOf('Boss dã ngoại')!==-1 && _tientrinh == false){
				_tientrinh = true;
				_second_detectedCount = 0;
				openboss_notice();
			}
		}


		_loopDetectedBossNotice = setTimeout(() => {
			loopDetectedBossNotice();
		}, 600);
		 

	}catch(e){
		$("#acc_member_level_logDaily").prepend('THÔNG BÁO BOSS: ' + e.message + " <br>");
		_loopDetectedBossNotice = setTimeout(() => {
			loopDetectedBossNotice();
		}, 600);
	}
}

function openboss_notice(){ 
	try{ 
  
		return new Promise(function(resolve, reject){ 
			try{
				//quay lại
				let _back_id = "_leveling_mini_formnhiemvu_quaylai";
				$(".leveling_mini > .quest > h3 > a").attr("id", _back_id);
				document.getElementById(_back_id).click();
			}catch(e){}

			// mở Boss
			setTimeout(function(){ 
				$('#level_module_play .level_menu li:nth-of-type(4) a[module="boss"].click img').trigger('click');  //open Boss
			setTimeout(function(){ 
				
				//$('.leveling_mini .boss_zone .boss_all.boss_module ul.menu li:nth-of-type(1) a img').trigger('click');	//open Boss Tinh Anh
				//$('.leveling_mini .boss_zone .boss_all.boss_module ul.menu li:nth-of-type(2) a img').trigger('click');	//open Boss Tinh Anh (VIP)
				//$('.leveling_mini .boss_zone .boss_all.boss_module ul.menu li:nth-of-type(3) a img').trigger('click');	//open Boss Thế Giới
				$('.leveling_mini .boss_zone .boss_all.boss_module ul.menu li:nth-of-type(4) a img').trigger('click');	//open Boss Dã Ngoại

			//vào boss detail
			setTimeout(() => {
				$('.leveling_mini .boss_zone .boss_menu.boss_module ul li:nth-of-type(1) a img').trigger('click');
				//if ($('.leveling_mini .boss_zone .boss_detail').css('display') != 'none' ){  return; }
			
				setTimeout(function(){  

					ATTACK_BOSS_EVENT(); 
					resolve("ok");
					return; 
	
				}, 1200);

			}, 800); 
			}, 800);
			}, 800); 
		});
	    
	}catch(e){ 
		console.log(e); 
		$("#acc_member_level_logDaily").prepend('THÔNG BÁO BOSS: ' + e.message + " <br>");
	}
} 
var _ATTACK_BOSS_EVENT;
function ATTACK_BOSS_EVENT(){ 
	try{  
		$("#acc_member_level_logDaily").prepend("(1) BOSS! <br>");
		// $('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight').show();
		// $('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .fight').show();

		$('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight span').attr('id', '_boss_sukien_auto111_id'); 
		if($('.leveling_mini .boss_zone .boss_detail .boss_info .boss_fight .auto_attack.fight span').attr('target') == '0'){

			document.getElementById('_boss_sukien_auto111_id').click();
			// document.getElementById("_boss_sukien_auto111_id").dispatchEvent(new Event('click'));//2
 
			_ATTACK_BOSS_EVENT = setTimeout(() => {
				ATTACK_BOSS_EVENT();
			}, 500);

			
		}else{
			_detected_boss_status = true;
			let _count_boss = TryParseInt(getCookie("COUNT_BOSS_NOTICE"),0) + 1; 
			setCookie("COUNT_BOSS_NOTICE", _count_boss, 1);
			$("#acc_member_level_logDaily").prepend("(2) BOSS SỰ KIỆN: AUTO OK! <br>");
			clearTimeout(_ATTACK_BOSS_EVENT);
		}
		
		
	}catch(e){
		$("#acc_member_level_logDaily").prepend('<span style="color:red">' + e.message + " </span><br>");
		_ATTACK_BOSS_EVENT = setTimeout(() => {
			ATTACK_BOSS_EVENT();
		}, 500);
	}
}
/////////////////////////////



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

function getLevel(_rank){ 
	switch(_rank){ 
		case "G":
			return 1;
		case "F":
			return 2;
		case "E":
			return 3;
		case "D":
			return 4;
		case "C":
			return 5;
		case "B":
			return 6;
		case "A":
			return 7;
		case "S":
			return 8;
		case "SS":
			return 9;
		case "SSS":
			return 10;
		case "SSSS":
			return 11;
		case "SSSSS":
			return 12;
		default:
			return 13;
	}
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



//----------------Chỉnh lại css web dễ nhìn-----------------
function chinhlaicssweb(){

	$('#level_module_function .level_menu a[module="quest"].click').click(function () {
		setTimeout(() => {
			let _bg_color_done = "rgb(181, 255, 181)";
			let _color_done = "rgb(0, 129, 0)";

			let _bg_color = "hsl(4, 100%, 80%)";

			//kiểm tra đã hoàn thành chưa
			let _tr_element_index = 1;
			let _str_check_val = $('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') td:nth-of-type(2) ').text().trim();
			if (_str_check_val != "600/600"){ 
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +'), ' +
				  '.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type(2)').css({ "background-color":_bg_color, "font-weight":"900" });
			}else{
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +'), ' +
				  '.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type(2)').css({ "background-color":_bg_color_done, "color": _color_done ,"font-weight":"900" });
			}

			_tr_element_index = 3;
			_str_check_val = $('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') td:nth-of-type(1) > p:nth-of-type(1)').text().trim();
			if(_str_check_val.toUpperCase().indexOf("QUẢNG CÁO") !== -1){
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color, "font-weight":"900" });
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') td:nth-of-type(1) > p:nth-of-type(3)').css({ "color":"hsl(4, 100%, 26%)", "font-weight":"900" });
				_tr_element_index = 4;
			}


			//khiêu chiến đơn
			_str_check_val = $('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') td:nth-of-type(1) > p:nth-of-type(3)').text().trim();
			if(_str_check_val.toUpperCase() == "CÒN 0 LƯỢT."){
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color_done, "color": _color_done ,"font-weight":"900" });
			}else{
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color, "font-weight":"900" });
			}

			//khiêu chiến đội
			_tr_element_index++;
			_str_check_val = $('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') td:nth-of-type(1) > p:nth-of-type(3)').text().trim();
			if(_str_check_val.toUpperCase() == "CÒN 0 LƯỢT."){
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color_done, "color": _color_done ,"font-weight":"900" });
			}else{
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color, "font-weight":"900" });
			}

			//Boss Tinh Anh.
			_tr_element_index++;
			_str_check_val = $('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') td:nth-of-type(1) > p:nth-of-type(2)').text().trim();
			if(_str_check_val.toUpperCase() == "CÒN 0 LƯỢT."){
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color_done, "color": _color_done ,"font-weight":"900" });
			}else{
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color, "font-weight":"900" });
			}

			//Vượt hầm ngục.
			_tr_element_index++;
			_str_check_val = $('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') td:nth-of-type(1) > p:nth-of-type(2)').text().trim();
			if(_str_check_val.toUpperCase() == "CÒN 0 LƯỢT."){
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color_done, "color": _color_done ,"font-weight":"900" });
			}else{
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color, "font-weight":"900" });
			}

			//Chiến Trường Viến Cổ.
			_tr_element_index++;
			_str_check_val = $('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +') td:nth-of-type(1) > p:nth-of-type(2)').text().trim();
			if(_str_check_val.toUpperCase() == "CÒN 0 LƯỢT."){
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color_done, "color": _color_done ,"font-weight":"900" });
			}else{
				$('.leveling_mini .quest table:nth-of-type(1) tbody tr:nth-of-type('+ _tr_element_index +')').css({ "background-color":_bg_color, "font-weight":"900" });
			}

			

		}, 800); 
	 });
}

