////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
 function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkMobileOrientation, 1000);
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/background_p.png', id:'backgroundP'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/logo_p.png', id:'logoP'},
			{src:'assets/button_classic.png', id:'buttonClassic'},
			{src:'assets/button_custom.png', id:'buttonCustom'},
			{src:'assets/button_oneplayer.png', id:'buttonOnePlayer'},
			{src:'assets/button_twoplayer.png', id:'buttonTwoPlayer'},
			{src:'assets/button_start.png', id:'buttonStart'},
			{src:'assets/button_online.png', id:'buttonOnline'},
			{src:'assets/button_local.png', id:'buttonLocal'},

			{src:'assets/button_plus.png', id:'buttonPlus'},
			{src:'assets/button_minus.png', id:'buttonMinus'},
			{src:'assets/button_theme.png', id:'buttonTheme'},
			{src:'assets/button_switch.png', id:'buttonSwitch'},
			{src:'assets/item_player.png', id:'itemPlayer'},
			{src:'assets/item_gameplayer.png', id:'itemGamePlayer'},
			{src:'assets/item_number.png', id:'itemNumber'},
		
			{src:'assets/item_timer.png', id:'itemTimer'},
			{src:'assets/item_timer_down.png', id:'itemTimerDown'},
			{src:'assets/item_status.png', id:'itemStatus'},

			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_tiktok.png', id:'buttonTiktok'},
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/item_pop.png', id:'itemPop'},
			{src:'assets/item_pop_p.png', id:'itemPopP'},
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'},

			{src:'assets/loading.gif', id:'buttonLoading'},
			{src:'assets/emoji0.png', id:'buttonEmoji0'},
			{src:'assets/emoji1.png', id:'buttonEmoji1'},
			{src:'assets/emoji2.png', id:'buttonEmoji2'},
			{src:'assets/emoji3.png', id:'buttonEmoji3'},
			{src:'assets/emoji4.png', id:'buttonEmoji4'},
			{src:'assets/emoji5.png', id:'buttonEmoji5'},
			{src:'assets/emoji6.png', id:'buttonEmoji6'},
			{src:'assets/emoji7.png', id:'buttonEmoji7'},
			{src:'assets/emoji8.png', id:'buttonEmoji8'},
			{src:'assets/emoji9.png', id:'buttonEmoji9'},
			{src:'assets/emoji10.png', id:'buttonEmoji10'},
			{src:'assets/emoji_starter.png', id:'buttonEmojiStarter'},
	];

	for(var n=0; n<iconsArr.length; n++){
		manifest.push({src:iconsArr[n].icons, id:'icons'+n});
		manifest.push({src:iconsArr[n].whiteH, id:'icon'+n+'whiteh'});
		manifest.push({src:iconsArr[n].blackH, id:'icon'+n+'blackh'});
		manifest.push({src:iconsArr[n].shadow, id:'icon'+n+'shadow'});
		manifest.push({src:iconsArr[n].highlight, id:'icon'+n+'highlight'});
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}else{
		if(!enableDesktopSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/sound_click.ogg', id:'soundButton'});
		manifest.push({src:'assets/sounds/sound_click_2.ogg', id:'soundButton2'});
		manifest.push({src:'assets/sounds/sound_drop.ogg', id:'soundDrop'});
		manifest.push({src:'assets/sounds/sound_draw.ogg', id:'soundDraw'});
		manifest.push({src:'assets/sounds/sound_complete.ogg', id:'soundComplete'});
		manifest.push({src:'assets/sounds/sound_result.ogg', id:'soundResult'});
		manifest.push({src:'assets/sounds/sound_start.ogg', id:'soundStart'});
		manifest.push({src:'assets/sounds/sound_power.ogg', id:'soundPower'});
		manifest.push({src:'assets/sounds/sound_slide.ogg', id:'soundSlide'});
		manifest.push({src:'assets/sounds/sound_select.ogg', id:'soundSelect'});
		manifest.push({src:'assets/sounds/sound_error.ogg', id:'soundError'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}