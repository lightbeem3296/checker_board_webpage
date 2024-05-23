////////////////////////////////////////////////////////////
// GAME v1.7
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

//icons array
var iconsArr = [
	{icons:'assets/icons1.png', shadow:'assets/icon_shadow_1.png', whiteH:'assets/icon_whiteh_1.png', blackH:'assets/icon_blackh_1.png', highlight:'assets/icon_highlight.png', board:{color:['#bf8648','#e8b679'], borderColor:'#000'}},
	{icons:'assets/icons2.png', shadow:'assets/icon_shadow_1.png', whiteH:'assets/icon_whiteh_1.png', blackH:'assets/icon_blackh_1.png', highlight:'assets/icon_highlight.png', board:{color:['#bf8648','#e8b679'], borderColor:'#000'}},
	{icons:'assets/icons3.png', shadow:'assets/icon_shadow_1.png', whiteH:'assets/icon_whiteh_1.png', blackH:'assets/icon_blackh_1.png', highlight:'assets/icon_highlight.png', board:{color:['#bf8648','#e8b679'], borderColor:'#000'}},
	{icons:'assets/icons4.png', shadow:'assets/icon_shadow_1.png', whiteH:'assets/icon_whiteh_1.png', blackH:'assets/icon_blackh_1.png', highlight:'assets/icon_highlight.png', board:{color:['#bf8648','#e8b679'], borderColor:'#000'}},
	{icons:'assets/icons5.png', shadow:'assets/icon_shadow_1.png', whiteH:'assets/icon_whiteh_1.png', blackH:'assets/icon_blackh_1.png', highlight:'assets/icon_highlight.png', board:{color:['#bf8648','#e8b679'], borderColor:'#000'}}
]

//classic settings
var defaultSettings = {
	twoPlayer:true,
	size:8,
};

//custom settings
var customSettings = {
	enable:true,
	twoPlayer:true,
	sizeMin:8,
	sizeMax:12
};

//board settings
var boardSettings = {
	width:60,
	border:3,
	radius:5,
	outerBorder:4,
	outerRadius:5,
	shadowX:2,
	shadowY:5,
	pieceDrag: true, //true for drag and drop, false for select to move
	tweenSlideSpeed:.3,
	tweenJumpSpeed:.3,
	tweenJumpScale:1.5,
	tweenRemoveSpeed:.8,
	showPlayerHighlight:true,
	showPlayerMove: true,
	timer:90000,
	timerDown: 60000
};

const possibleColors = [
	"DodgerBlue",
	"OliveDrab",
	"Gold",
	"Pink",
	"SlateBlue",
	"LightBlue",
	"Gold",
	"Violet",
	"PaleGreen",
	"SteelBlue",
	"SandyBrown",
	"Chocolate",
	"Crimson"
  ];

const maxConfettis = 150;
let particles = [];


//game text display
var textDisplay = {
					customTitle:'CUSTOM BOARD',
					customSize:'[NUMBER] x [NUMBER] SQUARE',
					vs:'VS',
					player1:'PLAYER',
					player2:'PLAYER 2',
					computer:'COMPUTER',
					userTurn:'YOUR TURN',
					playerTurn:'[NAME] TURN',
					computerTurn:'THINKING...',
					playerTotal:'x [NUMBER]',
					youMustJump:'YOU MUST JUMP!',
					playerMustJump:'[NAME] MUST JUMP!',
					youAnotherJump:'YOU HAS\nANOTHER JUMP!',
					playerAnotherJump:'[NAME] HAS\nANOTHER JUMP!',
					gameWin:'[PLAYER] WON!',
					draw:'GAME DRAW!',
					exitTitle:'EXIT GAME',
					exitMessage:'Are you sure you want\nto quit game?',
					share:'SHARE YOUR SCORE:',
					resultTitle:'GAME OVER',
					resultDesc:'SCORE : [NUMBER] TILES',
					bEmployee: false,
					room: '',
					firstGame: 'yes',
					currentTurn: 'me',
					giveup: 'no',
					winEffect: 'yes',
					effectduration: ''
				}

let cardWidth = 15;
let cardHeight = 15;
let topHeight = 50;
const cardPadding = 20;
let imagesCanvas = {};

var Player1 = {
	username: '',
	betUsd: '',
	Status: '',
	CountryName: '',
	TokenId: '',
	entityId: '',
	gameID: '',
	games_entryID: '',
	prizeUSD: 0
}

var Player2 = {
	username: '',
	betUsd: '',
	Status: '',
	CountryName: '',
	TokenId: '',
	entityId: '',
	gameID: '',
	games_entryID: '',
	prizeUSD: 0
}
//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = 'Highscore on Play Checkers is [SCORE]';//social share score title
var shareMessage = 'I just won $[SCORE] on player1.win, Let’s play Connect Four with real money bets! Are you in? Join now.'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = {enable:false};
var playerData = {score:0, opponentScore:0};
var gameData = {paused:true, moving:false, icon:0, iconSwitch:false, icons:['white','black'], type:'classic', custom:{size:0}, settings:{size:0, multipleJump:true, rowFill:0}, drag:{status:false,x:0,y:0}, player:0, ai:false, aiMove:false, complete:false};
var timeData = {countdown: 60000, enable:false, startDate:null, nowDate:null, timer:0, oldTimer:0, isDown: false, playerTimer:60000, opponentTimer:0, playerAccumulate:60000, opponentAccumulate:0};
var tweenData = {score:0, tweenScore:0};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	$(window).focus(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(false);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(false);
			}
		}
	});
	
	$(window).blur(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(true);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(true);
			}
		}
	});

	buttonClassic.cursor = "pointer";
	buttonClassic.addEventListener("click", function(evt) {
		playSound('soundButton');
		gameData.type = 'classic';
		toggleMainButton('players');
	});

	buttonCustom.cursor = "pointer";
	buttonCustom.addEventListener("click", function(evt) {
		playSound('soundButton');
		gameData.type = 'custom';
		toggleMainButton('players');
	});

	buttonOnePlayer.cursor = "pointer";
	buttonOnePlayer.addEventListener("click", function(evt) {
		playSound('soundButton');
		checkGameType(true);
	});

	buttonTwoPlayer.cursor = "pointer";
	buttonTwoPlayer.addEventListener("click", function(evt) {
		playSound('soundButton');
		checkGameType(false);
	});

	buttonLocal.cursor = "pointer";
	buttonLocal.addEventListener("click", function(evt) {
		playSound('soundButton');
		socketData.online = false;
		if(!defaultSettings.twoPlayer){
			gameData.ai = true;
		}
		toggleMainButton('default');
	});

	buttonOnline.cursor = "pointer";
	buttonOnline.addEventListener("click", function(evt) {
		playSound('soundButton');
		checkQuickGameMode();
	});

	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		gameData.type = 'custom';
		if(multiplayerSettings.localPlay){
			toggleMainButton('local');
		}else{
			checkQuickGameMode();
		}
	});

	buttonSizeL.cursor = "pointer";
	buttonSizeL.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleCustomSize(false);
	});

	buttonSizeR.cursor = "pointer";
	buttonSizeR.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleCustomSize(true);
	});

	buttonCustomStart.cursor = "pointer";
	buttonCustomStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
			postSocketUpdate('players');
		}else{
			goPage('players');
		}
	});

	buttonPlayersIcon.cursor = "pointer";
	buttonPlayersIcon.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleGameIcon();
	});

	buttonPlayersSwitch.cursor = "pointer";
	buttonPlayersSwitch.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleGameIconSide();
	});

	buttonPlayersStart.cursor = "pointer";
	buttonPlayersStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('game');
	});
	
	itemExit.addEventListener("click", function(evt) {
	});
	
	buttonContinue.cursor = "pointer";
	buttonContinue.addEventListener("click", function(evt) {
		playSound('soundButton');
		window.location.href = 'https://www.player1.win/games/2/checkers?rb=1';
	});
	
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	
	buttonTiktok.cursor = "pointer";
	buttonTiktok.addEventListener("click", function(evt) {
		share('tiktok');
	});

	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleSoundMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleSoundMute(false);
	});

	if (typeof buttonMusicOff != "undefined") {
		buttonMusicOff.cursor = "pointer";
		buttonMusicOff.addEventListener("click", function(evt) {
			toggleMusicMute(true);
		});
	}
	
	if (typeof buttonMusicOn != "undefined") {
		buttonMusicOn.cursor = "pointer";
		buttonMusicOn.addEventListener("click", function(evt) {
			toggleMusicMute(false);
		});
	}
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		togglePop(true);
		toggleOption();
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
		stopAudio();
		
		if (socket != null) {
			if (textDisplay.bEmployee == false) socket.emit('giveup', 0);
			else socket.emit('giveup', 1);
		} else {
			textDisplay.giveup = 0;
			endGame();
		}
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
	});

	emojiStarter.cursor = "pointer";
	emojiStarter.addEventListener("click", function(evt) {
		toggleEmoji();
	});
	emoji0Creator.cursor = "pointer";
	emoji0Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji0");
	});
	emoji1Creator.cursor = "pointer";
	emoji1Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji1");
	});
	emoji2Creator.cursor = "pointer";
	emoji2Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji2");
	});
	emoji3Creator.cursor = "pointer";
	emoji3Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji3");
	});
	emoji4Creator.cursor = "pointer";
	emoji4Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji4");
	});
	emoji5Creator.cursor = "pointer";
	emoji5Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji5");
	});
	emoji6Creator.cursor = "pointer";
	emoji6Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji6");
	});
	emoji7Creator.cursor = "pointer";
	emoji7Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji7");
	});
	emoji8Creator.cursor = "pointer";
	emoji8Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji8");
	});
	emoji9Creator.cursor = "pointer";
	emoji9Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji9");
	});
	emoji10Creator.cursor = "pointer";
	emoji10Creator.addEventListener("click", function(evt) {
		sentEmoji = false;
		showEmoji("emoji10");
	});

	gameData.custom.size = customSettings.sizeMin;
	checkCustomSettings();
	displayPlayerIcon();
}

/*!
 * 
 * TOGGLE GAME TYPE - This is the function that runs to toggle game type
 * 
 */
function toggleMainButton(con){
	if ( typeof initSocket == 'function' && multiplayerSettings.enable) {
		gameLogsTxt.visible = true;
		gameLogsTxt.text = '';
	}

	buttonStart.visible = false;
	buttonTypeContainer.visible = false;
	buttonPlayerContainer.visible = false;
	buttonLocalContainer.visible = false;

	if(con == 'default'){
		//buttonTypeContainer.visible = true;
	}else if(con == 'start'){
		//buttonStart.visible = true;
	}else if(con == 'local'){
		// buttonLocalContainer.visible = true;
	}else if(con == 'players'){

		if(gameData.type == 'classic'){
			if(!defaultSettings.twoPlayer){
				checkGameType(true);
				return;
			}
		}else{
			if(!customSettings.twoPlayer){
				checkGameType(true);
				return;
			}
		}

		buttonPlayerContainer.visible = false;

		checkGameType(false);
	}
}

function checkGameType(con){
	gameData.ai = con;
	if(gameData.type == 'classic'){
		goPage('players');
	}else{
		goPage('custom');
	}
}

function checkQuickGameMode(){
	socketData.online = true;
	if(!multiplayerSettings.enterName){
		buttonStart.visible = false;
		buttonTypeContainer.visible = false;
		buttonPlayerContainer.visible = false;
		buttonLocalContainer.visible = false;

		addSocketRandomUser();
	}else{
		goPage('name');
	}
}

function toggleCustomSize(con){
	if(con){
		gameData.custom.size++;
		gameData.custom.size = gameData.custom.size > customSettings.sizeMax ? customSettings.sizeMax : gameData.custom.size;
	}else{
		gameData.custom.size--;
		gameData.custom.size = gameData.custom.size < customSettings.sizeMin ? customSettings.sizeMin : gameData.custom.size;
	}

	if(!isEven(gameData.custom.size)){
		toggleCustomSize(con);
		return;
	}

	checkCustomSettings();
	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		postSocketUpdate('updatecustom', {size:gameData.custom.size, win:gameData.custom.win}, true);
	}
}

function checkCustomSettings(){
	var customSize = textDisplay.customSize.replace('[NUMBER]', gameData.custom.size);
	customSize = customSize.replace('[NUMBER]', gameData.custom.size);
	sizeTxt.text = customSize;
}

function toggleGameIcon(){
	gameData.icon++;
	gameData.icon = gameData.icon > iconsArr.length-1 ? 0 : gameData.icon;

	displayPlayerIcon();
	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		postSocketUpdate('updateplayers', {icon:gameData.icon, switch:gameData.iconSwitch, icons:gameData.icons}, true);
	}
}

function toggleGameIconSide(){
	gameData.iconSwitch = gameData.iconSwitch == true ? false : true;
	if(gameData.iconSwitch){
		gameData.icons = ['black','white'];
	}else{
		gameData.icons = ['white','black'];
	}

	displayPlayerIcon();
	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		postSocketUpdate('updateplayers', {icon:gameData.icon, switch:gameData.iconSwitch, icons:gameData.icons}, true);
	}
}

function displayPlayerIcon(){
	for(var n=0; n<2; n++){
		$.players['playerIconContainer'+ n].removeAllChildren();
		
		var iconID = 'icon'+gameData.icon;
		var iconID = 'icons'+gameData.icon;
		var _speed = 1;
		var _frameW = 45;
		var _frameH = 45;
		var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "width": _frameW, "count": 4};
		var _animations = {
							white:{frames: [0], speed:_speed},
							whiteking:{frames: [1], speed:_speed},
							black:{frames: [2], speed:_speed},
							blackking:{frames: [3], speed:_speed}
						};
							
		iconsData = new createjs.SpriteSheet({
			"images": [loader.getResult(iconID)],
			"frames": _frame,
			"animations": _animations
		});
		
		$.players['playerIcon'+ n] = new createjs.Sprite(iconsData, gameData.icons[n]);

		$.players['playerIconShadow'+ n] = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+'shadow'));
		centerReg($.players['playerIconShadow'+ n]);

		$.players['playerIcon'+ n].y = -20;
		$.players['playerIconShadow'+ n].x = $.players['playerIcon'+ n].x + boardSettings.shadowX;
		$.players['playerIconShadow'+ n].y = $.players['playerIcon'+ n].y + boardSettings.shadowY;

		$.players['playerIconContainer'+ n].addChild($.players['playerIconShadow'+ n], $.players['playerIcon'+ n]);

		//playerFlagContainer
		$.players['playerFlagContainer'+ n].removeAllChildren();

		const countryCode = getCountryFromIP(n);

		if (countryCode != '')
		{
			// Load flag as an image
			const flagImg = new Image();
			// flagImg.src = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${countryCode.toLowerCase()}.svg`;
			// flagImg.src = `https://www.worldometers.info/img/flags/${countryCode.toLowerCase()}-flag.gif`
			flagImg.src = `https://www.player1.win/assets/images/flags/`+countryCode+`.png`

			const flagWidth = 36; // Set your desired width here
			const flagHeight = 27; // Set your desired height here
		
			flagImg.onload = function(container) {
				// This function will be called when the image is loaded
				return function() {
					// Create a bitmap from the flag image
					const bitmap = new createjs.Bitmap(flagImg);
					// Set static width and height of the bitmap
					bitmap.scaleX = flagWidth / bitmap.image.width;
					bitmap.scaleY = flagHeight / bitmap.image.height;
		
					// Center the bitmap within the container
					bitmap.regX = bitmap.image.width / 2;
					bitmap.regY = 80;

					container.addChild(bitmap);
				};
			}($.players['playerFlagContainer'+ n]); 
		}
	}
}

function getCountryFromIP(n) {
    // Dummy implementation, you should replace this with actual logic
    // This could involve using a Geolocation API or querying a database
    // For demonstration purposes, let's just return a random country
	const countryNameToCode = {
		"Afghanistan": "AF",
		"Albania": "AL",
		"Algeria": "AG",
		"Andorra": "AN",
		"Angola": "AO",
		"Antigua and Barbuda": "AC",
		"Argentina": "AR",
		"Armenia": "AM",
		"Australia": "AS",
		"Austria": "AU",
		"Azerbaijan": "AJ",
		"Bahamas": "BF",
		"Bahrain": "BA",
		"Bangladesh": "BG",
		"Barbados": "BB",
		"Belarus": "BO",
		"Belgium": "BE",
		"Belize": "BH",
		"Benin": "BN",
		"Bhutan": "BT",
		"Bolivia": "BL",
		"Bosnia and Herzegovina": "BK",
		"Botswana": "BC",
		"Brazil": "BR",
		"Brunei": "BX",
		"Bulgaria": "BU",
		"Burkina Faso": "UV",
		"Burundi": "BY",
		"Côte d'Ivoire": "IV",
		"Cabo Verde": "CV",
		"Cambodia": "CB",
		"Cameroon": "CM",
		"Canada": "CA",
		"Central African Republic": "CT",
		"CAR": "CT",
		"Chad": "CD",
		"Chile": "CI",
		"China": "CH",
		"Colombia": "CO",
		"Comoros": "CN",
		"Congo": "CG",
		"Congo-Brazzaville": "CG",
		"Costa Rica": "CS",
		"Croatia": "HR",
		"Cuba": "CU",
		"Cyprus": "CY",
		"Czechia": "EZ",
		"Czech Republic": "EZ",
		"Denmark": "DA",
		"Djibouti": "DJ",
		"Dominica": "DO",
		"Dominican Republic": "DR",
		"DRC": "congo",
		"Ecuador": "EC",
		"Egypt": "EG",
		"El Salvador": "ES",
		"Equatorial Guinea": "EK",
		"Eritrea": "ER",
		"Estonia": "ET",
		"Eswatini": "WZ",
		"Swaziland": "SZ",
		"Ethiopia": "ET",
		"Fiji": "FJ",
		"Finland": "FI",
		"France": "FR",
		"Gabon": "GB",
		"Gambia": "GA",
		"Georgia": "GG",
		"Germany": "GM",
		"Ghana": "GH",
		"Greece": "GR",
		"Grenada": "GJ",
		"Guatemala": "GT",
		"Guinea": "GV",
		"Guinea-Bissau": "PU",
		"Guyana": "GY",
		"Haiti": "HA",
		"Holy See": "VT",
		"Honduras": "HO",
		"Hungary": "HU",
		"Iceland": "IC",
		"India": "IN",
		"Indonesia": "ID",
		"Iran": "IR",
		"Iraq": "IZ",
		"Ireland": "EI",
		"Israel": "IS",
		"Italy": "IT",
		"Jamaica": "JM",
		"Japan": "JA",
		"Jordan": "JO",
		"Kazakhstan": "KZ",
		"Kenya": "KE",
		"Kiribati": "KR",
		"Korea, North": "KP",
		"Korea, Sounth": "KS",
		"Kosovo": "XK",
		"Kuwait": "KU",
		"Kyrgyzstan": "KG",
		"Laos": "LA",
		"Latvia": "LG",
		"Lebanon": "LE",
		"Lesotho": "LT",
		"Liberia": "LI",
		"Libya": "LY",
		"Liechtenstein": "LS",
		"Lithuania": "LH",
		"Luxembourg": "LU",
		"Madagascar": "MA",
		"Malawi": "MI",
		"Malaysia": "MY",
		"Maldives": "MV",
		"Mali": "ML",
		"Malta": "MT",
		"Marshall Islands": "RM",
		"Mauritania": "MR",
		"Mauritius": "MP",
		"Mexico": "MX",
		"Micronesia": "FM",
		"Moldova": "MD",
		"Monaco": "MN",
		"Mongolia": "MG",
		"Montenegro": "MJ",
		"Morocco": "MO",
		"Mozambique": "MZ",
		"Myanmar": "BM",
		"Burma": "MM",
		"Namibia": "WA",
		"Nauru": "NR",
		"Nepal": "NP",
		"Netherlands": "NL",
		"New Zealand": "NZ",
		"Nicaragua": "NI",
		"Niger": "NG",
		"Nigeria": "NI",
		"North Macedonia": "MK",
		"Norway": "NO",
		"Oman": "MU",
		"Pakistan": "PK",
		"Palau": "PS",
		"Palestine State": "PS",
		"Panama": "PM",
		"Papua New Guinea": "PP",
		"Paraguay": "PA",
		"Peru": "PE",
		"Philippines": "RP",
		"Poland": "PL",
		"Portugal": "PO",
		"Qatar": "QA",
		"Romania": "RO",
		"Russia": "RS",
		"Rwanda": "RW",
		"Saint Kitts and Nevis": "SC",
		"Saint Lucia": "ST",
		"Saint Vincent and the Grenadines": "VC",
		"Samoa": "WS",
		"San Marino": "SM",
		"Sao Tome and Principe": "TP",
		"Saudi Arabia": "SA",
		"Senegal": "SG",
		"Serbia": "RI",
		"Seychelles": "SE",
		"Sierra Leone": "SL",
		"Singapore": "SN",
		"Slovakia": "LO",
		"Slovenia": "SI",
		"Solomon Islands": "BP",
		"Somalia": "SO",
		"South Africa": "SF",
		"South Sudan": "OD",
		"Spain": "SP",
		"Sri Lanka": "CE",
		"Sudan": "SU",
		"St. Vincent Grenadines": "VC",
		"State of Palestine": "palestine",
		"Suriname": "NS",
		"Sweden": "SW",
		"Switzerland": "SZ",
		"Syria": "SY",
		"Taiwan": "TW",
		"Tajikistan": "TI",
		"Tanzania": "TZ",
		"Thailand": "TH",
		"Timor-Leste": "TT",
		"Togo": "TO",
		"Tonga": "TN",
		"Trinidad and Tobago": "TD",
		"Tunisia": "TS",
		"Turkey": "TU",
		"Turkmenistan": "TX",
		"Tuvalu": "TV",
		"Uganda": "UG",
		"Ukraine": "UP",
		"United Arab Emirates": "AE",
		"U.A.E.": "AE",
		"United Kingdom": "UK",
		"U.K.": "UK",
		"United States": "US",
		"U.S.": "US",
		"Uruguay": "UY",
		"Uzbekistan": "UZ",
		"Vanuatu": "NH",
		"Venezuela": "VE",
		"Vietnam": "VM",
		"Yemen": "YM",
		"Zambia": "ZA",
		"Zimbabwe": "ZI",
	  };
	  
	let selectedCountryName = ''
	if (parseInt(n) == 0) {
		if (Player1.CountryName != '') {
			// selectedCountryName = countryNameToCode[Player1.CountryName];
			return Player1.CountryName.replace(/ /g, '-');;
		}
	} else {
		if (Player2.CountryName != '') {
			// selectedCountryName = countryNameToCode[Player2.CountryName];
			return Player2.CountryName.replace(/ /g, '-');;
		}
	}
	
	if (selectedCountryName != undefined && selectedCountryName != '')
		return selectedCountryName;
	else return '';
}

function resizeSocketLog(){
	gameLogsTxt.font = "30px bpreplaybold";
	gameLogsTxt.textAlign = "center";
	gameLogsTxt.color = "#ccc";

	if(curPage == 'main'){
		if(viewport.isLandscape){
			gameLogsTxt.x = canvasW/2;
			gameLogsTxt.y = canvasH/100 * 75;
		}else{
			gameLogsTxt.x = canvasW/2;
			gameLogsTxt.y = canvasH/100 * 75;
		}
	}else if(curPage == 'custom'){
		if(viewport.isLandscape){
			gameLogsTxt.x = canvasW/2;
			gameLogsTxt.y = canvasH/100 * 67;
		}else{
			gameLogsTxt.x = canvasW/2;
			gameLogsTxt.y = canvasH/100 * 65;
		}
	}
}

/*!
 * 
 * TOGGLE POP - This is the function that runs to toggle popup overlay
 * 
 */
function togglePop(con){
	confirmContainer.visible = con;
}


/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	$('#roomWrapper').hide();
	$('#roomWrapper .innerContent').hide();
	gameLogsTxt.visible = false;

	mainContainer.visible = false;
	nameContainer.visible = false;
	roomContainer.visible = false;
	customContainer.visible = false;
	playersContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;
	
	var targetContainer = null;
	switch(page){
		case 'main':
			playersContainer.visible = true;
			targetContainer = playersContainer;
			toggleMainButton('players');
		break;

		case 'name':
			targetContainer = nameContainer;
			$('#roomWrapper').show();
			$('#roomWrapper .nameContent').show();
			$('#roomWrapper .fontNameError').html('');
			$('#enterName').show();
		break;
			
		case 'room':
			targetContainer = roomContainer;
			$('#roomWrapper').show();
			$('#roomWrapper .roomContent').show();
			switchSocketRoomContent('lists');
		break;

		case 'custom':
			targetContainer = customContainer;

			buttonCustomStart.visible = true;
			buttonSizeL.visible = buttonSizeR.visible = true;

			if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
				if(!socketData.host){
					buttonCustomStart.visible = false;
					buttonSizeL.visible = buttonSizeR.visible = false;
				}
			}
		break;

		case 'players':
			if (textDisplay.effectduration == '') {
				textDisplay.effectduration = 15 * 1000;
				var end = Date.now() + textDisplay.effectduration;

				(function frame() {
					// launch a few confetti from the left edge
					confetti({
						particleCount: 3,
						angle: 60,
						spread: 180,
						startVelocity: 80,
						origin: { x: 0.5, y: 1 }
						// origin: {
						//     x: Math.random(),
						//     // since they fall down, start a bit higher than random
						//     y: Math.random() - 0.2
						// }
					});
					if (Date.now() < end && gameData.paused) {
						requestAnimationFrame(frame);
					}
				}());
			}
			targetContainer = playersContainer;

			createSocket();

			$.players['player'+ 0].text = removeCharsBetweenParentheses($.players['player'+ 0].text)

			if (!gameData.ai) {
				timeData.oldTimer = -1;
				timeData.countdown = boardSettings.timerDown
				timeData.isDown = true
				toggleGameTimer(true);
				//timerDownTxt.text = millisecondsToTimeGame(timeData.countdown);

				$.players['player'+ 1].text = removeCharsBetweenParentheses(textDisplay.player2);
			} else {
				$.players['player'+ 1].text = textDisplay.computer;
			}
			break;
		
		case 'game':
			targetContainer = gameContainer;
			if (gameData.ai) {
			}
			else {
				startGame();
			}
			break;
		
		case 'result':
			targetContainer = resultContainer;
			stopGame();
			togglePop(false);
			
			playSound('soundResult');

			var winner = '';

			var textMessage = '';
			var textTitle = '';

			var winStatus = '';

			buttonTiktok.visible = false;

			if (textDisplay.giveup == 0) {
				winner = Player2.entityId;
				if (textDisplay.bEmployee == false) { // fail
					winStatus = 'fail'
				} else { // success
					winStatus = 'win'
				}
			} else if (textDisplay.giveup == 1) {
				winner = Player1.entityId;
				if (textDisplay.bEmployee == false) { // success
					winStatus = 'win'
				} else { // fail
					winStatus = 'fail'
				}
			} else {
				if (playerData.score > playerData.opponentScore) {
					winner = Player1.entityId;
					if (textDisplay.bEmployee == false) { // success
						winStatus = 'win'
					} else { // fail
						winStatus = 'fail'
					}
				} else if (playerData.score < playerData.opponentScore) {
					winner = Player2.entityId;
					if (textDisplay.bEmployee == false) { // fail
						winStatus = 'fail'
					} else { // success
						winStatus = 'win'
					}
				} 
				else { // Draw
					winner = '';
					textTitle = "Draw! \n\n 🙁  \n\n"
					textMessage = "\n\nOne more try,\nyou've got this!";
					resultTitleTxt.font = "20px bpreplaybold";
					resultShareTxt.visible = false;
					buttonFacebook.visible = false;
					buttonTiktok.visible = false;
					buttonWhatsapp.visible = false;
					resultPriceTxt.visible = false;
				}
			}

			if (winStatus == 'win') {
				textTitle = "You won!!!!";
				textMessage = "Congratulations, you won:"
				resultPriceTxt.text = "$" + Player1.prizeUSD;
				resultTitleTxt.font = "60px bpreplaybold";

				if (textDisplay.winEffect == 'yes')
				{
					textDisplay.winEffect = 'no';
					particles = [];
					for (var i = 0; i < maxConfettis; i++) {
						particles.push(new confettiParticle());
					}
					Draw();
				}
			}
			else if (winStatus == 'fail') {
				textTitle = "The outcome of this game favors the opponent.\n\n 🙁  \n\n"
				textMessage = "\n\nOne more try,\nyou've got this!";
				resultTitleTxt.font = "20px bpreplaybold";
				resultShareTxt.visible = false;
				buttonFacebook.visible = false;
				buttonTiktok.visible = false;
				buttonWhatsapp.visible = false;
				resultPriceTxt.visible = false;
			}

			resultTitleTxt.text = textTitle;
			resultDescTxt.text = textMessage;

			saveGame(playerData.score, playerData.opponentScore, winner);

			if (socket != null) {
				socket.disconnect();
			}
			break;
		case 'result_no':
				stopGame();
				
				var winner = '';
				var winStatus = '';
	
				if (textDisplay.giveup == 0) {
					winner = Player2.entityId;
				} else if (textDisplay.giveup == 1) {
					winner = Player1.entityId;
				} else {
					if (playerData.score > playerData.opponentScore) {
						winner = Player1.entityId;
					} else if (playerData.score < playerData.opponentScore) {
						winner = Player2.entityId;
					} 
					else { // Draw
						winner = '';
					}
				}
	
				saveGame(playerData.score, playerData.opponentScore, winner);
	
				if (socket != null) {
					socket.disconnect();
				}
				break;
	}
	
	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}
	
	resizeCanvas();
}

let socket;
var players = [];

// my socket
function createSocket() {
	socket = io();

	socket.on('startGamebySocket', (players) => {
		// Start the game
		timeData.isDown = false
		timerDownTxt.text = ""
		textDisplay.bEmployee = false
		Player1.games_entryID = players[0].games_entryID;
		Player1.prizeUSD = players[0].prizeUSD;

		// online job
		if (players[0].playerName != textDisplay.player1) {
			textDisplay.bEmployee = true;
		}
		else {
			textDisplay.bEmployee = false;
		}

		if (gameData.ai == false) {
			textDisplay.player1 = players[0].playerName
			textDisplay.player2 = players[1].playerName

			$.players['gamePlayer'+ 0].text = removeCharsBetweenParentheses(players[0].playerName);
			$.players['gamePlayer'+ 1].text = removeCharsBetweenParentheses(players[1].playerName);

			Player1 = players[0]
			Player2 = players[1]
			
			defaultSettings.twoPlayer = true;
			goPage('game');
		}
		// online job
		
		$.players['gamePlayer'+ 0].text = removeCharsBetweenParentheses($.players['gamePlayer'+ 0].text);
		$.players['gamePlayer'+ 1].text = removeCharsBetweenParentheses($.players['gamePlayer'+ 1].text);

		gameData.player = 0;
		gameData.startPlayer = 0;

		gameData.moving = false

		displayPlayerTurn();
	});

	socket.on('joinedRoom', (roomName) => {
		textDisplay.room = roomName
	});

	socket.on('updatetimer', (timer) => {
		timeData.playerTimer = timer.playerTimer;
		timeData.opponentTimer = timer.opponentTimer;
		updateTimer();
	});

	socket.on('giveup', (playerName) => {
		textDisplay.giveup = playerName;
		endGame();
	});

	socket.on('toggleuser', (roomName) => {
		toggleGameTimer(true)
	});

	socket.on('playerDisconnected', (roomName) => {
		if (roomName == textDisplay.room) {
			endGame();
		}
	});
	
	socket.on('opponentMove', (moveData) => {
		// Handle opponent's move
		if (gameData.ai == false) {
			togglePieceDragEvent(moveData.data, moveData.con);
		}
	});

	socket.on('sendEmoji', (emojiName) => {
		showEmojiConvert(emojiName.name);
	});

	// Listen for nameTaken event
	socket.on('nameTaken', () => {
		if (socket != null) {
			if (textDisplay.bEmployee == false) socket.emit('giveup', 0);
			else socket.emit('giveup', 1);
			goPage('result_no');
		}
		redirectToWithAuth('/login', "You are already playing", "");
	});

	joinGame(socket)
}

function joinGame(socket) {
	textDisplay.player2 = Player2.username;
	if (gameData.ai == false)
		socket.emit('joinGame', {playerName: textDisplay.player1, player: Player1, isBot: 0});
	else
		{
			socket.emit('joinGame', {playerName: Player2.username, player: Player2, isBot: 1});
		}
}

/*!
 * 
 * START GAME - This is the function that runs to start game
 * 
 */
function startGame(){
	gameData.paused = false;
	gameData.complete = false;
	gameData.player = 0;
	gameData.moving = false;

	timeData.playerAccumulate = 0;
	timeData.opponentAccumulate = 0;

	buildPlayers();
	if(gameData.type == 'classic'){
		gameData.settings = {
			size:defaultSettings.size,
			rowFill:3,
			multipleJump:true,
		};
	}else{
		gameData.settings = {
			size:gameData.custom.size,
			rowFill:3,
			multipleJump:true,
		};
	}

	var matchRowFill = [
		{size:8, rowFill:3},
		{size:10, rowFill:4},
		{size:12, rowFill:5},
	]
	var rowFillindex = matchRowFill.findIndex(x => x.size === gameData.settings.size);
	gameData.settings.rowFill = matchRowFill[rowFillindex].rowFill;

	statusContainer.alpha = 0;

	buildBoard();
	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		if(socketData.host){
			toggleGameTimer(true);
		}
	}else{
		toggleGameTimer(true);
	}
}

/*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	boardDesignContainer.removeAllChildren();
	boardIconContainer.removeAllChildren();

	gameData.paused = true;
	TweenMax.killAll(false, true, false);
}

function saveGame(score, opponentscore, winner){

	const urlParams = new URLSearchParams(window.location.search);

	// Get the value of a specific parameter
	const tokenkey = urlParams.get('t'); // Returns 'value1'
	localStorage.setItem('t', tokenkey);

	
	var tokenID = localStorage.getItem("t");
	if (tokenID != undefined && tokenID != '')
	{
		localStorage.removeItem("t");
		$.ajax({
			type: "POST",
			url: '/result',
			data: {score:score, user: Player1, opponentScore: opponentscore, oppenent: Player2, winner: winner, room: textDisplay.room, t: tokenID, gameID: Player1.gameID},
			success: function (result) {
			  
			  if (result.success == true) {
				if (result.PriseUsd != undefined)
				{
					// resultPriceTxt.text = "$" + result.PriseUsd;
					// resultDescTxt.text = "Congratulations, you won:";
				} else {
					// var textTitle = "The outcome of this game favors the opponent.\n\n 🙁 \n\n";
					// var textMessage = "\n\nOne more try,\nyou've got this!";

					// resultTitleTxt.font = "20px bpreplaybold";

					// resultTitleTxt.text = textTitle;
					// resultDescTxt.text = textMessage;
				}
			  }
			},
			error: function(xhr, status, error) {
			  // Handle errors
			  console.error(xhr.responseText);
			}
		  });
	}
}


// Disable F5 and Ctrl+R
document.addEventListener('keydown', function(event) {
    if (event.key === 'F5' || (event.key === 'r' && event.ctrlKey)) {
		
		if (socket != null) {
			if (textDisplay.bEmployee == false) socket.emit('giveup', 0);
			else socket.emit('giveup', 1);
			goPage('result_no');
		}
		
    }
});

// Disable context menu "Reload"
document.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	preventRefresh(event);
});

function preventRefresh(event) {
	if (!gameData.paused)
	{
		togglePop(true);
	}

	// Show your own confirmation dialog
    var confirmationMessage = 'Are you sure you want to reload this page? Current result will be submitted by other member.';
    event.returnValue = confirmationMessage; // For older browsers

    return confirmationMessage; // For modern browsers
}

/*!
 * 
 * BUILD PLAYERS - This is the function that runs to build players
 * 
 */
function buildPlayers(){
	for(var n=0; n<2; n++){
		$.players['gameIconContainer'+ n].removeAllChildren();

		
		if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {

		}else{
			if(n == 1){
				if(gameData.ai){
					$.players['gamePlayer'+ 1].text = textDisplay.computer;
				}else{
					$.players['gamePlayer'+ 1].text = removeCharsBetweenParentheses(textDisplay.player2);
				}
			}
		}

		$.players['gamePlayer'+ 0].text = removeCharsBetweenParentheses($.players['gamePlayer'+ 0].text);
		$.players['gamePlayer'+ 1].text = removeCharsBetweenParentheses($.players['gamePlayer'+ 1].text);

		$.players['gameTurn'+ n].text = '';
		$.players['gameTimer'+ n].text = millisecondsToTimeGame(0);

		var iconID = 'icons'+gameData.icon;
		var _speed = 1;
		var _frameW = 45;
		var _frameH = 45;
		var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "width": _frameW, "count": 4};
		var _animations = {
							white:{frames: [0], speed:_speed},
							whiteking:{frames: [1], speed:_speed},
							black:{frames: [2], speed:_speed},
							blackking:{frames: [3], speed:_speed}
						};
		
		iconsData = new createjs.SpriteSheet({
			"images": [loader.getResult(iconID)],
			"frames": _frame,
			"animations": _animations
		});
		
		$.players['gameIcon'+ n] = new createjs.Sprite(iconsData, gameData.icons[n]);
		$.players['gameIconShadow'+ n] = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+'shadow'));
		centerReg($.players['gameIconShadow'+ n]);

		var iconID = 'icons'+gameData.icon;		
		iconsData = new createjs.SpriteSheet({
			"images": [loader.getResult(iconID)],
			"frames": _frame,
			"animations": _animations
		});
		
		var oppIndex = n == 0 ? 1 : 0;
		$.players['gameIconOpp'+ n] = new createjs.Sprite(iconsData, gameData.icons[oppIndex]);
		$.players['gameIconOppShadow'+ n] = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+'shadow'));
		centerReg($.players['gameIconOppShadow'+ n]);
		$.players['gameIconOpp'+ n].scaleX = $.players['gameIconOpp'+ n].scaleY = $.players['gameIconOppShadow'+ n].scaleX = $.players['gameIconOppShadow'+ n].scaleY = .6;

		$.players['gameIcon'+ n].y = -45;
		$.players['gameIconShadow'+ n].x = $.players['gameIcon'+ n].x + boardSettings.shadowX;
		$.players['gameIconShadow'+ n].y = $.players['gameIcon'+ n].y + boardSettings.shadowY;

		$.players['gameIconOpp'+ n].x = -20;
		$.players['gameIconOpp'+ n].y = -5;
		$.players['gameIconOppShadow'+ n].x = $.players['gameIconOpp'+ n].x + boardSettings.shadowX;
		$.players['gameIconOppShadow'+ n].y = $.players['gameIconOpp'+ n].y + boardSettings.shadowY;

		$.players['gameIconContainer'+ n].addChild($.players['gameIconOppShadow'+ n], $.players['gameIconOpp'+ n], $.players['gameIconShadow'+ n], $.players['gameIcon'+ n]);

		//playerFlagContainer
		$.players['gameFlagContainer'+ n].removeAllChildren();

		const countryCode = getCountryFromIP(n);

		if (countryCode != '') {
			// Load flag as an image
			const flagImg = new Image();
			// flagImg.src = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${countryCode.toLowerCase()}.svg`;
			// flagImg.src = `https://www.worldometers.info/img/flags/${countryCode.toLowerCase()}-flag.gif`
			flagImg.src = `https://www.player1.win/assets/images/flags/`+countryCode+`.png`

			const flagWidth = 36; // Set your desired width here
			const flagHeight = 27; // Set your desired height here
		
			flagImg.onload = function(container, order_n, isBot) {
				// This function will be called when the image is loaded
				return function() {
					// Create a bitmap from the flag image
					const bitmap = new createjs.Bitmap(flagImg);
					// Set static width and height of the bitmap
					bitmap.scaleX = flagWidth / bitmap.image.width;
					bitmap.scaleY = flagHeight / bitmap.image.height;
		
					// Center the bitmap within the container
					// bitmap.regX = flagWidth + parseInt(bitmap.image.width / 2) - 15;

					// if (isBot == true)
					// bitmap.regY = 100 + parseInt((bitmap.image.height + 35) * order_n);
					// else
					// bitmap.regY = 100;
					bitmap.regX = bitmap.image.width / 2;
					bitmap.regY = 90;

					container.addChild(bitmap)
				};
			}($.players['gameFlagContainer'+ n], n, gameData.ai); 
		}
	}

	playerData.score = 0;
	playerData.opponentScore = 0;
	playerData.piece = 0;
	playerData.opponentPiece = 0;

	displayPlayerScore();
}

/*!
 * 
 * BUILD BOARD - This is the function that runs to build board
 * 
 */
function buildBoard(){
	playSound('soundStart');
	statusContainer.alpha = 0;

	boardDesignContainer.removeAllChildren();
	boardIconContainer.removeAllChildren();

	gameData.complete = false;
	gameData.aiMove = false;
	gameData.board = [];
	gameData.piece = [];
	gameData.pieceIndex = -1;
	gameData.removePiece = null;
	gameData.mustJump = false;

	var bgWidth = (boardSettings.width + (boardSettings.outerBorder/2)) * gameData.settings.size;
	var bgHeight = (boardSettings.width + (boardSettings.outerBorder/2)) * gameData.settings.size;
	bgWidth += boardSettings.outerBorder/2;
	bgHeight += boardSettings.outerBorder/2;
	var bgBoard = new createjs.Shape();
	bgBoard.graphics.beginFill(boardSettings.borderColor).drawRoundRectComplex(-(bgWidth/2), -(bgHeight/2), bgWidth, bgHeight, boardSettings.outerRadius, boardSettings.outerRadius, boardSettings.outerRadius, boardSettings.outerRadius);
	boardDesignContainer.addChild(bgBoard);

	var positionData = {x:0, y:0, sX:0, sY:0};
	positionData.sX = -((boardSettings.width * (gameData.settings.size-1))/2);
	positionData.sY = -((boardSettings.width * (gameData.settings.size-1))/2);
	positionData.x = positionData.sX;
	positionData.y = positionData.sY;

	var totalCount = 0;
	for(var r=0; r<gameData.settings.size; r++){
		gameData.board.push([]);
		for(var c=0; c<gameData.settings.size; c++){
			var bgMoveA = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+gameData.icons[0]+'h'));
			centerReg(bgMoveA);
			var bgMoveB = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+gameData.icons[1]+'h'));
			centerReg(bgMoveB);
			bgMoveA.visible = bgMoveB.visible = false;
			
			gameData.board[r][c] = new createjs.Shape();
			gameData.board[r][c].x = bgMoveA.x = bgMoveB.x = positionData.x;
			gameData.board[r][c].y = bgMoveA.y = bgMoveB.y = positionData.y;
			positionData.x += boardSettings.width;

			var bgColor = 0;
			if ((r + c) % 2 == 0) {
				bgColor = 1;
			}else{
				var clrNum = -1
                if (r >= gameData.settings.size - gameData.settings.rowFill) clrNum = 0;
                if (r < gameData.settings.rowFill) clrNum = 1;
				if (clrNum >= 0) {
					placePiece(r,c,clrNum);
				}

				if(!boardSettings.pieceDrag){
					gameData.board[r][c].cursor = "pointer";
					gameData.board[r][c].addEventListener("click", function(evt) {
						if(gameData.paused || gameData.complete || gameData.moving){
							return;
						}

						if(gameData.ai){
							if(gameData.player == 1){
								return;
							}
							gameData.aiMove = true;
						}

						if(gameData.board[evt.target.row][evt.target.column].move){
							if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
								postSocketUpdate('moveplayer', {row:evt.target.row, column:evt.target.column, pieceIndex:gameData.pieceIndex});
							}else{
								movePlayer(evt.target.row, evt.target.column);
							}
						}else{
							getCurrentPiece(evt.target.row, evt.target.column);
						}
					});
				}
			}

			gameData.board[r][c].graphics.setStrokeStyle(boardSettings.border).beginStroke(iconsArr[gameData.icon].board.borderColor).beginFill(iconsArr[gameData.icon].board.color[bgColor]).drawRoundRectComplex(-(boardSettings.width/2), -(boardSettings.width/2), boardSettings.width, boardSettings.width, boardSettings.radius, boardSettings.radius, boardSettings.radius, boardSettings.radius);
			gameData.board[r][c].bgMoveA = bgMoveA;
			gameData.board[r][c].bgMoveB = bgMoveB;
			boardDesignContainer.addChild(gameData.board[r][c], bgMoveA, bgMoveB);

			gameData.board[r][c].player = -1;
			gameData.board[r][c].row = r;
			gameData.board[r][c].column = c;
			gameData.board[r][c].id = totalCount;
			gameData.board[r][c].move = false;
			gameData.board[r][c].icon = null;
			gameData.board[r][c].iconShadow = null;

			totalCount++;
		}

		positionData.x = positionData.sX;
		positionData.y += boardSettings.width;
	}

	countPiece();
	displayPlayerScore();

	statusContainer.y = (bgHeight/2) + 10;
	boardContainer.scaleX = boardContainer.scaleY = 1;
	var minBoardHeight = 520;
	if(bgHeight > minBoardHeight){
		var boardScale = minBoardHeight/bgHeight;
		boardContainer.scaleX = boardContainer.scaleY = boardScale;
	}

	if(gameData.player == 1 && gameData.ai){
		TweenMax.to(boardContainer, 1, {overwrite:true, onComplete:function(){
			moveAI();
		}});
	}
	displayPlayerTurn();
}

/*!
 * 
 * HIGHLIGHT MOVE PIECE - This is the function that runs to highlight move piece
 * 
 */
function highlightPiece(){
	var isPlayer = true;
	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		if(!socketData.turn){
			isPlayer = false;
		}
	}else{
		if(gameData.player == 1 && gameData.ai){
			isPlayer = false;
		}
	}

	gameData.mustJump = false;

	var pieceJumpArr = [];
	var pieceMoveArr = [];
	for(var n=0; n<gameData.piece.length; n++){
		var thisPiece = gameData.piece[n];
		thisPiece.highlight.visible = false;
		TweenMax.killTweensOf(thisPiece.highlight);

		if(isPlayer){
			for(var r=0; r<gameData.settings.size; r++){
				for(var c=0; c<gameData.settings.size; c++){
					thisPiece.dnx = c;
					thisPiece.dny = r;

					if(isLegalJump(thisPiece) && thisPiece.color == gameData.player){
						pieceJumpArr.push(thisPiece);
						thisPiece.highlight.visible = true;
						if(boardSettings.showPlayerHighlight && ((textDisplay.bEmployee == false && gameData.player == 0) || (textDisplay.bEmployee == true && gameData.player == 1))){
							animatePlayerMove(thisPiece.highlight);
						}
					}else if(isLegalMove(thisPiece) && thisPiece.color == gameData.player){
						pieceMoveArr.push(thisPiece);
						thisPiece.highlight.visible = true;
						if(boardSettings.showPlayerHighlight && ((textDisplay.bEmployee == false && gameData.player == 0) || (textDisplay.bEmployee == true && gameData.player == 1))){
							animatePlayerMove(thisPiece.highlight);
						}
					}
				}
			}
		}
	}

	if(pieceJumpArr.length > 0){
		gameData.mustJump = true;
		displayPlayerStatus(gameData.player, "jump");
		
		for(var p=0; p<pieceMoveArr.length; p++){
			var resetPiece = pieceMoveArr[p];
			resetPiece.highlight.visible = false;
			TweenMax.killTweensOf(resetPiece.highlight);
		}
		for(var p=0; p<pieceJumpArr.length; p++){
			var resetPiece = pieceJumpArr[p];
			resetPiece.highlight.visible = true;
			if(boardSettings.showPlayerHighlight && ((textDisplay.bEmployee == false && gameData.player == 0) || (textDisplay.bEmployee == true && gameData.player == 1))){
				animatePlayerMove(resetPiece.highlight);
			}
		}
	}
}

function resetPieces(){
	gameData.mustJump = false;
	for(var n=0; n<gameData.piece.length; n++){
		var thisPiece = gameData.piece[n];
		thisPiece.highlight.alpha = 0;
		TweenMax.killTweensOf(thisPiece.highlight);
	}
}

/*!
 * 
 * FIND VALID MOVE - This is the function that runs to find valid move
 * 
 */
function findValidMove(r,c){
	resetValidMove();

	var posJumpArr = [];
	var posMoveArr = [];
	var thisPiece = gameData.piece[gameData.pieceIndex];
	for(var r=0; r<gameData.settings.size; r++){
		for(var c=0; c<gameData.settings.size; c++){
			thisPiece.dnx = c;
			thisPiece.dny = r;
			var canMove = false;
			if(isLegalJump(thisPiece)){
				posJumpArr.push({r:r, c:c});
				canMove = true;
			}else if(isLegalMove(thisPiece) && !gameData.mustJump){
				posMoveArr.push({r:r, c:c});
				canMove = true;
			}

			if(canMove){
				gameData.board[r][c].move = true;
				if(boardSettings.showPlayerMove){
					var targetMove = gameData.player == 0 ? gameData.board[r][c].bgMoveA : gameData.board[r][c].bgMoveB;
					targetMove.visible = true;
					animatePlayerMove(targetMove);
				}
			}
		}
	}

	if(posJumpArr.length > 0){		
		for(var p=0; p<posMoveArr.length; p++){
			var r = posMoveArr[p].r;
			var c = posMoveArr[p].c;
			gameData.board[r][c].move = false;
			gameData.board[r][c].bgMoveA.visible = false;
			gameData.board[r][c].bgMoveB.visible = false;
			TweenMax.killTweensOf(gameData.board[r][c].bgMoveA);
			TweenMax.killTweensOf(gameData.board[r][c].bgMoveB);
		}
		for(var p=0; p<posJumpArr.length; p++){
			var r = posJumpArr[p].r;
			var c = posJumpArr[p].c;

			gameData.board[r][c].move = true;
			if(boardSettings.showPlayerMove){
				var targetMove = gameData.player == 0 ? gameData.board[r][c].bgMoveA : gameData.board[r][c].bgMoveB;
				targetMove.visible = true;
				animatePlayerMove(targetMove);
			}
		}
	}
}

function resetValidMove(){
	for(var r=0; r<gameData.settings.size; r++){
		for(var c=0; c<gameData.settings.size; c++){
			gameData.board[r][c].move = false;
			gameData.board[r][c].bgMoveA.visible = false;
			gameData.board[r][c].bgMoveB.visible = false;
			TweenMax.killTweensOf(gameData.board[r][c].bgMoveA);
			TweenMax.killTweensOf(gameData.board[r][c].bgMoveB);
		}
	}
}

function animatePlayerMove(obj){
	obj.alpha = 0;
	var tweenSpeed = .5;
	TweenMax.to(obj, tweenSpeed, {alpha:.5, overwrite:true, onComplete:function(){
		TweenMax.to(obj, tweenSpeed, {alpha:0, overwrite:true, onComplete:animatePlayerMove, onCompleteParams:[obj]});
	}});
}

/*!
 * 
 * MOVE PIECE - This is the function that runs to move piece
 * 
 */
function movePlayer(r,c){
	gameData.moving = true;
	resetValidMove();
	hidePlayerTurn();

	var thisPiece = gameData.piece[gameData.pieceIndex];
	gameData.pieceIndex = -1;
	if (thisPiece.color != gameData.player) {
		return;
	}

	thisPiece.dnx = c
	thisPiece.dny = r;
	var jumps = getJumps(gameData.player);
	if (isLegalMove(thisPiece)) {
		if (jumps.length) {
			highlightPiece();
			displayPlayerStatus(gameData.player, "jump");
			gameData.moving = false;
		} else {
			animatePiece(thisPiece, true);
		}
	} else {
		var jumpedPiece = isLegalJump(thisPiece);
		if (jumpedPiece) {
			gameData.removePiece = jumpedPiece;
			animatePiece(thisPiece, false, movePlayerNext, thisPiece);
		}
	}
}

function movePlayerNext(thisPiece){
	if(gameData.settings.multipleJump) {
		var jumps = getJumps(gameData.player);
		if (jumps.length) {
			var moreJumpsQ = false;
			for (var i = 0; i < jumps.length; i++) {
				var jumpPiece = jumps[i][0];
				if (jumpPiece.nx == thisPiece.nx && jumpPiece.ny == thisPiece.ny) {
					moreJumpsQ = true;
				}
			}
			if (moreJumpsQ) {
				highlightPiece();
				displayPlayerStatus(gameData.player, "anotherjump");
				gameData.moving = false;
			} else {
				nextPlayerTurn();
			}
		} else {
			nextPlayerTurn();
		}
	} else {
		nextPlayerTurn();
	}
}

/*!
 * 
 * NEXT PLAYER TURN - This is the function that runs to check result and next player
 * 
 */
function nextPlayerTurn() {
	
	var gameComplete = false;
	countPiece();
	if(playerData.piece == 0){
		gameComplete = true;
		playSound("soundComplete");
		showGameStatus('win', $.players['gamePlayer'+ 1].text);
	}else if(playerData.opponentPiece == 0){
		gameComplete = true;
		playSound("soundComplete");
		showGameStatus('win', $.players['gamePlayer'+ 0].text);
	}
    
	hidePlayerTurn();
	if(gameComplete){
		gameData.complete = true;
		endGame();
	}else{
		if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
			
		}else{
			togglePlayer();
			displayPlayerTurn();
			gameData.moving = false;

			if(gameData.player == 1 && gameData.ai){
				TweenMax.to(boardContainer, 1, {overwrite:true, onComplete:function(){
					moveAI();
				}});
			}
		}
	}
}


function checkGameComplete() {
	var gameComplete = false;
	countPiece();
	if(playerData.piece == 0){
		gameComplete = true;
		playSound("soundComplete");
		showGameStatus('win', $.players['gamePlayer'+ 1].text);
	}else if(playerData.opponentPiece == 0){
		gameComplete = true;
		playSound("soundComplete");
		showGameStatus('win', $.players['gamePlayer'+ 0].text);
	}

	if(gameComplete){
		gameData.complete = true;
		endGame();
	}
}
/*!
 * 
 * ANIMATE PIECE - This is the function that runs to animate piece
 * 
 */
function animatePiece(thisPiece, turn, callback, piece){
	gameData.pieceIndex = -1;
	hidePlayerTurn();
	resetPieces();

	thisPiece.nx = thisPiece.dnx;
	thisPiece.ny = thisPiece.dny;
	var iconX = gameData.board[thisPiece.dny][thisPiece.dnx].x;
	var iconY = gameData.board[thisPiece.dny][thisPiece.dnx].y;
	var shadowX = gameData.board[thisPiece.dny][thisPiece.dnx].x + boardSettings.shadowX;
	var shadowY = gameData.board[thisPiece.dny][thisPiece.dnx].y + boardSettings.shadowY;

	thisPiece.highlight.x = iconX;
	thisPiece.highlight.y = iconY;
	boardIconContainer.setChildIndex(thisPiece.shadow, boardIconContainer.numChildren-1);
	boardIconContainer.setChildIndex(thisPiece, boardIconContainer.numChildren-1);

	if(gameData.removePiece != null){
		if(boardSettings.pieceDrag){
			playSound('soundSlide');
			TweenMax.to(thisPiece.shadow, boardSettings.tweenSlideSpeed, {x:shadowX, y:shadowY, overwrite:true});
			TweenMax.to(thisPiece, boardSettings.tweenSlideSpeed, {x:iconX, y:iconY, overwrite:true, onComplete:function(){
				playSound('soundDrop');
				checkIsKing(thisPiece);

				if(gameData.player == 0){
					playerData.score++;
				}else{
					playerData.opponentScore++;
				}
				displayPlayerScore();

				if(gameData.removePiece != null){
					removePiece(gameData.removePiece);
					gameData.removePiece = null;
				}

				if(turn){
					nextPlayerTurn();
				}

				if (typeof callback == 'function') {
					callback(piece);
				}
			}});
		}else{
			var centerPos = getCenterPosition(thisPiece.x, thisPiece.y, iconX, iconY);
			TweenMax.to(thisPiece.shadow, boardSettings.tweenJumpSpeed, {x:centerPos.x, y:centerPos.y, ease:Sine.easeIn, overwrite:true});
			TweenMax.to(thisPiece, boardSettings.tweenJumpSpeed, {x:centerPos.x, y:centerPos.y, scaleX:boardSettings.tweenJumpScale, scaleY:boardSettings.tweenJumpScale, ease:Sine.easeIn, overwrite:true, onComplete:function(){
				TweenMax.to(thisPiece.shadow, boardSettings.tweenJumpSpeed, {x:shadowX, y:shadowY, ease:Sine.easeOut, overwrite:true});
				TweenMax.to(thisPiece, boardSettings.tweenJumpSpeed, {x:iconX, y:iconY, scaleX:1, scaleY:1, overwrite:true, ease:Sine.easeOut, onComplete:function(){
					playSound('soundDrop');
					checkIsKing(thisPiece);

					if(gameData.player == 0){
						playerData.score++;
					}else{
						playerData.opponentScore++;
					}
					displayPlayerScore();

					if(gameData.removePiece != null){
						removePiece(gameData.removePiece);
						gameData.removePiece = null;
					}

					if(turn){
						nextPlayerTurn();
					}

					if (typeof callback == 'function') {
						callback(piece);
					}
				}});
			}});
		}
	}else{
		playSound('soundSlide');
		TweenMax.to(thisPiece.shadow, boardSettings.tweenSlideSpeed, {x:shadowX, y:shadowY, overwrite:true});
		TweenMax.to(thisPiece, boardSettings.tweenSlideSpeed, {x:iconX, y:iconY, overwrite:true, onComplete:function(){
			checkIsKing(thisPiece);
			if(turn){
				nextPlayerTurn();
			}

			if (typeof callback == 'function') {
				callback(piece);
			}
		}});
	}
}

function removePiece(piece) {
    for (var i = 0; i < gameData.piece.length; i++){
		var thisPiece = gameData.piece[i];
        if (piece == thisPiece) {
			var totalW = (gameData.settings.size * boardSettings.width)/2;
			var rangeX = randomIntFromInterval(totalW/3, totalW);
			var rangeY = randomIntFromInterval(totalW/3, totalW);
			var randomX = randomBoolean() == true ? rangeX : -rangeX;
			var randomY = randomBoolean() == true ? rangeY : -rangeY;
			TweenMax.to(thisPiece.shadow, boardSettings.tweenRemoveSpeed, {x:randomX, y:randomY, alpha:0, overwrite:true});
			TweenMax.to(thisPiece, boardSettings.tweenRemoveSpeed, {x:randomX, y:randomY, alpha:0, overwrite:true, onComplete:removePieceChild, onCompleteParams:[thisPiece]});
            gameData.piece.splice(i, 1);
            return;
        }
    }
}

function removePieceChild(thisPiece){
	boardIconContainer.removeChild(thisPiece, thisPiece.shadow);
}

/*!
 * 
 * DISPLAY PLAYER TURN - This is the function that runs to display playter turn
 * 
 */
function displayPlayerTurn(){
	for(var n=0; n<2; n++){
		var userTurn = '';
		if(n == gameData.player && !gameData.complete){
			userTurn = textDisplay.userTurn;

			if(gameData.ai){
				if (n == 1)
				{
					userTurn = textDisplay.computerTurn;
				}
			}
			else {
				if (textDisplay.bEmployee == false)
				{
					if (n == 0) userTurn = userTurn;
					else userTurn = textDisplay.playerTurn.replace('[NAME]', $.players['gamePlayer'+ n].text);
				} 
				else 
				{
					if (n == 0) userTurn = textDisplay.playerTurn.replace('[NAME]', $.players['gamePlayer'+ n].text);
					else userTurn = userTurn;
				}
			}
		}

		$.players['gameTurn'+ n].text = userTurn;

		TweenMax.killTweensOf($.players['gameTurn'+ n]);
		if(userTurn != ''){
			animatePlayerTurn($.players['gameTurn'+ n]);
		}
	}

	togglePlayerTimer();
	highlightPiece();
}

function displayPlayerStatus(index, status){
	var statusText;
	var multiText;
	if(status == "jump"){
		statusText = textDisplay.youMustJump;
		multiText = textDisplay.playerMustJump
	}else if(status == "anotherjump"){
		statusText = textDisplay.youAnotherJump;
		multiText = textDisplay.playerAnotherJump;
	}
	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		if(socketData.host){
			statusText = index == 1 ? multiText.replace('[NAME]', $.players['gamePlayer'+ index].text) : statusText;
		}else{
			statusText = index == 0 ? multiText.replace('[NAME]', $.players['gamePlayer'+ index].text) : statusText;
		}
	}

	if (gameData.ai == false) {
		if (textDisplay.bEmployee == false) {
			statusText = index == 1 ? multiText.replace('[NAME]', $.players['gamePlayer'+ index].text) : statusText;
		} else {
			statusText = index == 1 ? statusText : multiText.replace('[NAME]', $.players['gamePlayer'+ index].text);
		}
	}
	$.players['gameTurn'+ index].text = statusText;

	TweenMax.killTweensOf($.players['gameTurn'+ index]);
	animatePlayerTurn($.players['gameTurn'+ index]);
}

function hidePlayerTurn(){
	for(var n=0; n<2; n++){
		$.players['gameTurn'+ n].text = "";
		TweenMax.killTweensOf($.players['gameTurn'+ n]);
	}
}

function animatePlayerTurn(obj){
	obj.alpha = .3;
	var tweenSpeed = .2;
	TweenMax.to(obj, tweenSpeed, {alpha:1, overwrite:true, onComplete:function(){
		TweenMax.to(obj, tweenSpeed, {alpha:.3, overwrite:true, onComplete:animatePlayerTurn, onCompleteParams:[obj]});
	}});
}

/*!
 * 
 * GAME STATUS - This is the function that runs to show game status
 * 
 */
function showGameStatus(con, player){
	if(con == 'win'){
		statusTxt.text = textDisplay.gameWin.replace("[PLAYER]", player);
	}else{
		statusTxt.text = textDisplay.draw;
	}

	var statusShape = {color:"#fff", stroke:"#3F280D", space:80, strokeNum:7, radius:25, w:0, h:50};
	statusShape.w = statusTxt.getMeasuredWidth() + statusShape.space;
	
	statusContainer.alpha = 0;
	TweenMax.to(statusContainer, .5, {alpha:1, overwrite:true, onComplete:function(){
		TweenMax.to(statusContainer, .5, {delay:3, alpha:0, overwrite:true});
	}});
}

/*!
 * 
 * DISPLAY PLAYER SCORE - This is the function that runs to display player score
 * 
 */
function displayPlayerScore(){
	for(var n=0; n<2; n++){
		if(n == 0){
			$.players['gamePlayerWin'+ n].text = textDisplay.playerTotal.replace('[NUMBER]', playerData.score);
		}else{
			$.players['gamePlayerWin'+ n].text = textDisplay.playerTotal.replace('[NUMBER]', playerData.opponentScore);
		}
	}
}

/*!
 * 
 * GET SELECT PIECE - This is the function that runs to get select piece
 * 
 */
function getCurrentPiece(r,c){
	var newPieceIndex = -1;
	for(var n=0; n<gameData.piece.length; n++){
		var thisPiece = gameData.piece[n];
		if(thisPiece.nx == c && thisPiece.ny == r && thisPiece.color == gameData.player){
			newPieceIndex = n;
		}
	}
	
	if(newPieceIndex == -1 || !gameData.piece[newPieceIndex].highlight.visible){
		playSound("soundError");
		return;
	}

	playSound("soundSelect");
	if(gameData.pieceIndex == -1 || gameData.pieceIndex != newPieceIndex){
		gameData.pieceIndex = newPieceIndex;
		resetPieces();
		var thisPiece = gameData.piece[gameData.pieceIndex];

		if(boardSettings.showPlayerHighlight && !boardSettings.pieceDrag){

			if (((textDisplay.bEmployee == false && gameData.player == 0) || (textDisplay.bEmployee == true && gameData.player == 1)))
			{
				thisPiece.highlight.visible = true;
				thisPiece.highlight.alpha = 1;
			} else {
				thisPiece.highlight.visible = false;
				thisPiece.highlight.alpha = 0;
			}
		}

		findValidMove(r,c);
	}else if(newPieceIndex == gameData.pieceIndex){
		gameData.pieceIndex = -1;
		resetValidMove();
		highlightPiece();
	}
}

/*!
 * 
 * PLACE PIECE - This is the function that runs to create piece
 * 
 */
function placePiece(r,c,player){

	var iconID = 'icons'+gameData.icon;
	var _speed = 1;
	var _frameW = 45;
	var _frameH = 45;
	var _frame = {"regX": _frameW/2, "regY": _frameH/2, "height": _frameH, "width": _frameW, "count": 4};
	var _animations = {
						white:{frames: [0], speed:_speed},
						whiteking:{frames: [1], speed:_speed},
						black:{frames: [2], speed:_speed},
						blackking:{frames: [3], speed:_speed}
					};
	
	
	iconsData = new createjs.SpriteSheet({
		"images": [loader.getResult(iconID)],
		"frames": _frame,
		"animations": _animations
	});
		
	var newIcon = new createjs.Sprite(iconsData, gameData.icons[player]);
	var newIconShadow = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+'shadow'));
	centerReg(newIconShadow);
	var newIconHighlight = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+'highlight'));
	centerReg(newIconHighlight);

	newIcon.x = gameData.board[r][c].x;
	newIcon.y = gameData.board[r][c].y;
	newIcon.dnx = c;
	newIcon.dny = r;
	newIcon.nx = c;
	newIcon.ny = r;
	newIcon.color = player;
	newIcon.type = false;
	newIconShadow.x = gameData.board[r][c].x + boardSettings.shadowX;
	newIconShadow.y = gameData.board[r][c].y + boardSettings.shadowY;
	newIconHighlight.x = gameData.board[r][c].x;
	newIconHighlight.y = gameData.board[r][c].y;
	newIconHighlight.alpha = 0;
	newIcon.shadow = newIconShadow;
	newIcon.highlight = newIconHighlight;

	if(boardSettings.pieceDrag){
		newIcon.cursor = "pointer";
		newIcon.addEventListener("mousedown", function(evt) {

			if (gameData.ai == true) {
				togglePieceDragEvent(evt, 'drag')
			}
			else {
				if (((textDisplay.bEmployee == false && gameData.player == 0) || (textDisplay.bEmployee == true && gameData.player == 1)))
				{
					if (socket != null)
					{
						socket.emit('move', {con: 'drag', data: {
							'target': {
								'x': evt.target.x,
								'y': evt.target.y,
								'offset': evt.target.offset
							},
							'stageX': evt.stageX,
							'stageY': evt.stageY,
							'currentTarget': {
								'nx': evt.currentTarget.nx,
								'ny': evt.currentTarget.ny
							},
							player: gameData.player
						}});
					}
				}
			}
		});
		newIcon.addEventListener("pressmove", function(evt) {
			if (gameData.ai == true) {
				togglePieceDragEvent(evt, 'move')
			}
			else if (((textDisplay.bEmployee == false && gameData.player == 0) || (textDisplay.bEmployee == true && gameData.player == 1)))
			{
				togglePieceDragEvent(evt, 'move')
			}
		});
		newIcon.addEventListener("pressup", function(evt) {

			if (gameData.ai == true) {
				togglePieceDragEvent(evt, 'drop')
			}
			else if (((textDisplay.bEmployee == false && gameData.player == 0) || (textDisplay.bEmployee == true && gameData.player == 1))) {
				
				if (socket != null)
				{
					socket.emit('move', {con: 'drop', data: {
						'target': {
							'x': evt.target.x,
							'y': evt.target.y,
							'shadow': {
								'x': evt.target.shadow.x,
								'y': evt.target.shadow.y
							},
							'offset': evt.target.offset
						},
						'stageX': evt.stageX,
						'stageY': evt.stageY,
						'currentTarget': {
							'nx': evt.currentTarget.nx,
							'ny': evt.currentTarget.ny
						},
						player: gameData.player
					}});
				}
			}
		});
	}

	boardIconContainer.addChild(newIconHighlight, newIconShadow, newIcon);
	gameData.piece.push(newIcon);
}

function removeCharsBetweenParentheses(str) {
    return str.replace(/\([^)]*\)/g, '');
}

var canvas1 = document.getElementById("gameCanvas");
var context = canvas1.getContext("2d");

function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
	this.x = randomFromTo(0, Math.random() * stageW * 2); // x
	this.y = Math.random() * stageH - stageH; // y
	this.r = randomFromTo(11, 33); // radius
	this.d = Math.random() * maxConfettis + 11;
	this.color =
	  possibleColors[Math.floor(Math.random() * possibleColors.length)];
	this.tilt = Math.floor(Math.random() * 33) - 11;
	this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
	this.tiltAngle = 0;
  
	this.draw = function() {
		context.beginPath();
		context.lineWidth = this.r / 2;
		context.strokeStyle = this.color;
		context.moveTo(this.x + this.tilt + this.r / 3, this.y);
		context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
		return context.stroke();
	};
}

function Draw() {
	const results = [];
  
	// Magical recursive functional love
	requestAnimationFrame(Draw);
  
	//context.clearRect(0, 0, windowW, window.innerHeight);
  
	for (var i = 0; i < maxConfettis; i++) {
	  results.push(particles[i].draw());
	}
  
	let particle = {};
	let remainingFlakes = 0;
	for (var i = 0; i < maxConfettis; i++) {
	  particle = particles[i];
  
	  particle.tiltAngle += particle.tiltAngleIncremental;
	  particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
	  particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;
  
	  if (particle.y <= windowH) remainingFlakes++;
  
	  // If a confetti has fluttered out of view,
	  // bring it back to above the viewport and let if re-fall.
	  if (particle.x > stageW * 2 + 20 || particle.x < -20 || particle.y > windowH) {
		particle.x = Math.random() * stageW * 2;
		particle.y = -20;
		particle.tilt = Math.floor(Math.random() * 10) - 20;
	  }
	}
  
	return results;
  }

function redirectToWithAuth(url, authToken, noError) {
	var form = document.createElement('form');
	form.method = 'GET';
	form.action = url;

	var headerInput = document.createElement('input');
	headerInput.type = 'hidden';

	if (noError == 1)
	{
		headerInput.name = 't';
	} else {
		headerInput.name = 'e';
	}
	headerInput.value = authToken; 
	form.appendChild(headerInput);
	document.body.appendChild(form);
	form.submit();
}

var offset = {x: 0, y: 0};

function togglePieceDragEvent(obj, con){
	if(gameData.paused || gameData.complete || gameData.moving){
		return;
	}

	if(gameData.ai){
		if(gameData.player == 1){
			return;
		}
		gameData.aiMove = true;
	}
	
	switch(con){
		case 'drag':
			var global = boardContainer.localToGlobal(obj.target.x, obj.target.y);
			obj.target.offset = {x:global.x-(obj.stageX), y:global.y-(obj.stageY)};
			offset = obj.target.offset;
			getCurrentPiece(obj.currentTarget.ny, obj.currentTarget.nx);
			if(gameData.pieceIndex != -1){
				gameData.drag.status = true;
				gameData.drag.x = obj.target.x;
				gameData.drag.y = obj.target.y;

				boardIconContainer.setChildIndex(obj.target, boardIconContainer.numChildren-1);
			}
		break;
		
		case 'move':
			if(gameData.drag.status){
				// obj.target.offset = offset;
				var local = boardContainer.globalToLocal(obj.stageX, obj.stageY);
				// var moveX = ((local.x) + obj.target.offset.x);
				// var moveY = ((local.y) + obj.target.offset.y);
				var moveX = ((local.x) + (obj.target.offset == undefined ? 0 : obj.target.offset.x));
				var moveY = ((local.y) + (obj.target.offset == undefined ? 0 : obj.target.offset.y));
				obj.target.x = moveX;
				obj.target.y = moveY;
				obj.target.shadow.x = moveX + boardSettings.shadowX;
				obj.target.shadow.y = moveY + boardSettings.shadowY;
			}
		break;
		
		case 'drop':
			var foundDropZone = false;
			for(var r=0; r<gameData.settings.size; r++){
				for(var c=0; c<gameData.settings.size; c++){
					var thisBoard = gameData.board[r][c];
					if(thisBoard.move){
						if(obj.target.x >= thisBoard.x - (boardSettings.width/2) && obj.target.x <= thisBoard.x + (boardSettings.width/2)){
							if(obj.target.y >= thisBoard.y - (boardSettings.width/2) && obj.target.y <= thisBoard.y + (boardSettings.width/2)){
								foundDropZone = true;

								movePlayer(thisBoard.row, thisBoard.column);

								timeData.opponentTimer = 0;
								timeData.playerTimer = 0;
								togglePlayerTimer();
								checkGameComplete();
							}
						}
					}
				}
			}

			if(!foundDropZone && gameData.drag.status){
				gameData.pieceIndex = -1;
				resetPieces();
				resetValidMove();
				highlightPiece();
				
				obj.target.x = gameData.drag.x;
				obj.target.y = gameData.drag.y;
				obj.target.shadow.x = gameData.drag.x + boardSettings.shadowX;
				obj.target.shadow.y = gameData.drag.y + boardSettings.shadowY;
			}

			gameData.drag.status = false;
		break;
	}
}

/*!
 * 
 * TOGGLE PLAYER - This is the function that runs to toggle player
 * 
 */
function togglePlayer(){
	gameData.player = gameData.player == 0 ? 1 : 0;
}

/*!
 * 
 * AI MOVE - This is the function that runs to move AI
 * 
 */
function moveAI() {
	gameData.moving = true;

    var thisPiece = null;
    var diag = null;
    var jumps = getJumps(gameData.player);
    if (jumps.length) {
        var jump = jumps[Math.floor(Math.random() * jumps.length)];
        var thisPiece = jump[0];
        var diag = jump[1];
        var diagPc = getPieceAtSquare(thisPiece.nx + diag[0], thisPiece.ny + diag[1]);
		thisPiece.dnx = thisPiece.nx + diag[0] * 2;
        thisPiece.dny = thisPiece.ny + diag[1] * 2;
		gameData.removePiece = diagPc;
		animatePiece(thisPiece, false, moveAINext, thisPiece);
        return;
    }
    var moves = [];
    for (var i = 0; i < gameData.piece.length; i++) {
        thisPiece = gameData.piece[i];
        if (thisPiece.color == gameData.player) {
            var diags = getDiags(thisPiece);
            for (var j = 0; j < diags.length; j++) {
                diag = diags[j];
                var diagPc = getPieceAtSquare(thisPiece.nx + diag[0], thisPiece.ny + diag[1]);
                if (diagPc == 0) {
                    moves.push([thisPiece, diag]);
                }
            }
        }
    }
    if (!moves.length) {
        nextPlayerTurn();
        return;
    }

	move = getBestMove(moves);
	thisPiece = move[0];
	diag = move[1];

	thisPiece.dnx = thisPiece.nx + diag[0];
	thisPiece.dny = thisPiece.ny + diag[1];
	animatePiece(thisPiece, true);
}

function moveAINext(thisPiece){
	var jumps = getJumps(gameData.player);
	var moreJumpsQ = false;
	for (var i = 0; i < jumps.length; i++) {
		var jumpPiece = jumps[i][0];
		if (jumpPiece.nx == thisPiece.nx && jumpPiece.ny == thisPiece.ny) {
			moreJumpsQ = true;
		}
	}
	if (moreJumpsQ && gameData.settings.multipleJump) {
		TweenMax.to(boardContainer, .5, {overwrite:true, onComplete:function(){
			moveAI();
		}});
	} else {
		nextPlayerTurn();
	}
}

/*!
 * 
 * BOARD FUNC - This is the function that runs for board func
 * 
 */

function countPiece(){
	playerData.piece = 0;
	playerData.opponentPiece = 0;
	for (var i = 0; i < gameData.piece.length; i++) {
        var thisPiece = gameData.piece[i];
        if(thisPiece.color == 0){
			playerData.piece++;
		}else{
			playerData.opponentPiece++;
		}
    }
}

function checkIsKing(thisPiece) {
    if (thisPiece.color == 0 && thisPiece.dny == 0 || thisPiece.color == 1 && thisPiece.dny == gameData.settings.size - 1) {
        if (thisPiece.type != true) {
			playSound('soundPower');
			thisPiece.gotoAndStop(gameData.icons[thisPiece.color]+"king");
            thisPiece.type = true;
        }
    }
}

function getDiags(thisPiece) {
    var diags;
    if (thisPiece.type) {
        diags = [
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1]
        ];
    } else {
        if (thisPiece.color == 0) {
            diags = [
                [-1, -1],
                [1, -1]
            ];
        } else {
            diags = [
                [-1, 1],
                [1, 1]
            ];
        }
    }
    return diags;
}

function getJumps(color) {
    var jumps = [];
    for (var i = 0; i < gameData.piece.length; i++) {
        var thisPiece = gameData.piece[i];
        if (thisPiece.color == color) {
            var diags = getDiags(thisPiece);
            for (var j = 0; j < diags.length; j++) {
                var diag = diags[j];
                var diagPc = getPieceAtSquare(thisPiece.nx + diag[0], thisPiece.ny + diag[1]);
                if (typeof diagPc != "number") {
                    if (diagPc.color != color) {
                        var destPc = getPieceAtSquare(thisPiece.nx + diag[0] * 2, thisPiece.ny + diag[1] * 2);
                        if (destPc == 0) {
                            jumps.push([thisPiece, diag]);
                        }
                    }
                }
            }
        }
    }
    return jumps;
}

function getPieceAtSquare(nx, ny) {
    if (nx < 0) return -1;
    if (ny < 0) return -1;
    if (nx >= gameData.settings.size) return -1;
    if (ny >= gameData.settings.size) return -1;
    for (var i = 0; i < gameData.piece.length; i++) {
        var thisPiece = gameData.piece[i];
        if (thisPiece.nx == nx && thisPiece.ny == ny) {
            return thisPiece;
        }
    }
    return 0;
}

function isLegalMove(thisPiece) {
	var destinationEmpty = isEmpty(thisPiece.dnx, thisPiece.dny);
    var dCol = thisPiece.dnx;
    var dRow = thisPiece.dny;
    var oCol = thisPiece.nx;
    var oRow = thisPiece.ny;
    var color = thisPiece.color;
    var type = thisPiece.type;
    var blackMove = color === 0 && dRow + 1 === oRow;
    var redMove = color === 1 && dRow - 1 === oRow;
    var kingMove = type === true && (dRow + 1 === oRow || dRow - 1 === oRow);
    var legalMove = (dCol + 1 === oCol || dCol - 1 === oCol) && (blackMove || redMove || kingMove);
    return destinationEmpty && legalMove;
}

function isEmpty(nx, ny) {
    for (var i = 0; i < gameData.piece.length; i++) {
        var thisPiece = gameData.piece[i];
        if (thisPiece.nx == nx && thisPiece.ny == ny) return false;
    }
    return true;
}

function isLegalJump(thisPiece) {
    var destinationEmpty = isEmpty(thisPiece.dnx, thisPiece.dny);
    var dCol = thisPiece.dnx;
    var dRow = thisPiece.dny;
    var oCol = thisPiece.nx;
    var oRow = thisPiece.ny;
    var color = thisPiece.color;
    var type = thisPiece.type;
    var avgCol = (dCol + oCol) / 2;
    var avgRow = (dRow + oRow) / 2;
    var blackMove = color === 0 && dRow + 2 === oRow;
    var redMove = color === 1 && dRow - 2 === oRow;
    var kingMove = type === true && (dRow + 2 === oRow || dRow - 2 === oRow);
    var legalMove = (dCol + 2 === oCol || dCol - 2 === oCol) && (blackMove || redMove || kingMove);
    var jumpedPiece = getPieceAtSquare(avgCol, avgRow);
    if (jumpedPiece == null) return false;
    var jumpedColor = jumpedPiece.color;
    if (destinationEmpty && legalMove && jumpedColor !== color) {
        return jumpedPiece;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBestMove(moves) {
    var bestMove = [];
    var bestWt = -100;
    for (var i = 0; i < moves.length; i++) {
        var move = moves[i];
        var wt = 0;
        wt += getRandomInt(0, 2);
        var thisPiece = move[0];
        var diag = move[1];
        var movePc = getPieceAtSquare(thisPiece.nx + diag[0], thisPiece.ny + diag[1]);
        if (thisPiece.color == 0 && thisPiece.ny == gameData.settings.size - 1) wt -= 6;
        if (thisPiece.color == 1 && thisPiece.ny == 0) wt -= 6;
        if (thisPiece.color == 0 && movePc.ny == 0) wt += 9;
        if (thisPiece.color == 1 && movePc.ny == gameData.settings.size - 1) wt += 9;
        var frontLPc = getPieceAtSquare(thisPiece.nx + diag[0] - diag[0], thisPiece.ny + diag[1] + diag[1]);
        var frontRPc = getPieceAtSquare(thisPiece.nx + diag[0] + diag[0], thisPiece.ny + diag[1] + diag[1]);
        var backLPc = getPieceAtSquare(thisPiece.nx - diag[0], thisPiece.ny - diag[1]);
        var backRPc = getPieceAtSquare(thisPiece.nx + 3 * diag[0], thisPiece.ny - diag[1]);
        if (typeof frontLPc != 'number' && frontLPc.color != thisPiece.color) {
            wt -= 10;
            if (typeof backRPc != 'number' && backRPc.color == thisPiece.color) {
                wt += 10;
            }
        }
        if (typeof frontRPc != 'number' && frontRPc.color != thisPiece.color) {
            wt -= 10;
            if (typeof backLPc != 'number' && backLPc.color == thisPiece.color) {
                wt += 10;
            }
        }
        if (wt > bestWt) {
            bestWt = wt;
            bestMove = move;
        }
    }
    return bestMove;
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
function toggleGameTimer(con){
	if(con){
		timeData.startDate = new Date();
	}
	timeData.enable = con;
}

function togglePlayerTimer(){
	timeData.startDate = new Date();
	if(gameData.player == 0){
		timeData.opponentAccumulate = timeData.opponentTimer;
	}else{
		timeData.playerAccumulate = timeData.playerTimer;
	}
}

/*!
 * 
 * UPDATE GAME - This is the function that runs to loop game update
 * 
 */
function updateGame(){
	if(!gameData.paused){
		if(timeData.enable){
			timeData.nowDate = new Date();
			timeData.elapsedTime = Math.floor((timeData.nowDate.getTime() - timeData.startDate.getTime()));

			if(gameData.player == 0){
				// timeData.playerTimer = Math.floor(timeData.elapsedTime + timeData.playerAccumulate);
				timeData.playerTimer = Math.floor(timeData.countdown - timeData.elapsedTime);
			}
			else{
				//timeData.opponentTimer = Math.floor(timeData.elapsedTime + timeData.opponentAccumulate);	
				timeData.opponentTimer = Math.floor(timeData.countdown - timeData.elapsedTime);
			}

			if (gameData.ai == false) {
				if (socket != null && textDisplay.bEmployee == false) {
					socket.emit("updatetimer", {playerTimer: timeData.playerTimer, opponentTimer: timeData.opponentTimer});
				}
			}
			else {
				updateTimer();
			}
		}
	}
}

function updateTimer(){
	//timerTxt.text = millisecondsToTimeGame(timeData.timer);
	$.players['gameTimer'+ 0].text = millisecondsToTimeGame(timeData.playerTimer);
	$.players['gameTimer'+ 1].text = millisecondsToTimeGame(timeData.opponentTimer);

	if (timeData.playerTimer <= 10000) {
		$.players['gameTimer'+ 0].color = '#FF0000';
	} else if (timeData.opponentTimer <= 10000) {
		$.players['gameTimer'+ 1].color = '#FF0000';
	} else {
		$.players['gameTimer'+ 0].color = '#FFFFFF';
		$.players['gameTimer'+ 1].color = '#FFFFFF';
	}

	let limitMiliSeconds = 0;
	if (timeData.playerTimer < limitMiliSeconds)
	{
		if (socket != null) {
			socket.emit('giveup', 0);
		} else {
			textDisplay.giveup = 0;
			endGame();
		}
	}

	if (timeData.opponentTimer < limitMiliSeconds)
	{
		if (socket != null) {
			socket.emit('giveup', 1);
		} else {
			textDisplay.giveup = 1;
			endGame();
		}
	}
}

function updateTimerDownGame(){
	if (timeData.isDown && timeData.startDate != null) {
		timeData.nowDate = new Date();
		timeData.elapsedTime = Math.floor((timeData.nowDate.getTime() - timeData.startDate.getTime()));
		timeData.timer = Math.floor((timeData.countdown) - (timeData.elapsedTime));

		updateTimerDown();
	}
		
}

function updateTimerDown(){

	if(timeData.oldTimer == -1){
		timeData.oldTimer = timeData.timer;
	}

	if(timeData.isDown && timeData.timer <= 0){
		timeData.isDown = false
		timerDownTxt.text = ""
		timerDownTxt.visible = false;

		if (socket != null)
			socket.emit('beforeautogame', {})

		$.ajax({
			url: '/bot/info',
			type: 'GET',
			data: {
					't': localStorage.getItem('t'),
					'gameID': 2,
					betUsd: Player1.betUsd
				},
			success: function(response) {
				
				Player2 = response;

				textDisplay.computer = removeCharsBetweenParentheses(response.username);
				textDisplay.computerTurn = removeCharsBetweenParentheses(response.username) + ' turn';
				$.players['player'+ 1].text = removeCharsBetweenParentheses(response.username);

				checkGameType(true);
				goPage('game');

				startGame();
			},
			error: function(xhr, status, error) {
				// Handle errors
				
				if (socket != null) {
					socket.disconnect();
				}
				if (xhr.status === 400) {
					redirectToWithAuth('https://www.player1.win/games/2/checkers', 'Token invalid', 0);
				} else {
					console.error('Error:', errorThrown);
					location.reload();
				}
			}
		});
	}else{
		if(Math.abs((timeData.oldTimer - timeData.timer)) > 1000){
			if(timeData.timer < 1000){
				playSound('soundCountdownEnd');
			}else if(timeData.timer < 5000){
				playSound('soundCountdown');
			}
			
			timeData.oldTimer = timeData.timer;
			timerDownTxt.text = millisecondsToTimeGame(timeData.timer);
		}
	}
}
/*!
 * 
 * END GAME - This is the function that runs for game end
 * 
 */
function endGame(){
	gameData.paused = true;
	toggleGameTimer(false);

	TweenMax.to(gameContainer, 3, {overwrite:true, onComplete:function(){
		goPage('result')
	}});
}

/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTimeGame(milli) {
	var milliseconds = milli % 1000;
	var seconds = Math.floor((milli / 1000) % 60);
	var minutes = Math.floor((milli / (60 * 1000)) % 60);
	
	if(seconds<10){
		seconds = '0'+seconds;  
	}
	
	if(minutes<10){
		minutes = '0'+minutes;  
	}
	
	if (milli > 0)
	{
		return minutes+':'+seconds;
	}

	return '';
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}

function toggleEmoji() {
	if (emojiContainer.visible) {
		emojiContainer.visible = false;
	} else {
		emojiContainer.visible = true;
	}
}

const canvasWidth = canvas1.width;
const canvasHeight = canvas1.height;

function getX(params) {
	let distance = params.xTo - params.xFrom;
	let steps = params.frames;
	let progress = params.frame;
	return distance / steps * progress;
}

function getY(params) {
	let distance = params.yTo - params.yFrom;
	let steps = params.frames;
	let progress = params.frame;
	return topHeight;// distance / steps * progress;
}

function addImage(params) {
	if (params.frame == params.frames) {
		
	}
	else if (params.frame < params.frames) {

		if (window.innerWidth < 600) {
			cardWidth = 66;
			cardHeight = 54;
			topHeight = canvasH - 80;
		} else if (window.innerWidth < 1200) {
			cardWidth = 60;
			cardHeight = 72;
			topHeight = canvasH - 100;
		} else {
			cardWidth = 60;
			cardHeight = 72;
			topHeight = canvasH - 120;
		}

		let name = params.name;
		if (imagesCanvas[name] === undefined) {
			imagesCanvas[name] = document.createElement('canvas');
		}
		imagesCanvas[name].width = cardWidth;
		imagesCanvas[name].height = cardHeight;

		let image = document.getElementById(name);
		let imageCtx = imagesCanvas[name].getContext('2d');
		imageCtx.drawImage(image, 0, 0, cardWidth, cardHeight);
		context.drawImage(imagesCanvas[name], getX(params), getY(params));  
		
		params.frame = params.frame + 1;
		window.requestAnimationFrame(addImage.bind(null, params))
	}
}

function addConvertImage(params) {
	if (params.frame == params.frames) {
		
	}
	else if (params.frame > params.frames) {

		if (window.innerWidth < 600) {
			cardWidth = 66;
			cardHeight = 54;
			topHeight = canvasH - 80;
		} else if (window.innerWidth < 1200) {
			cardWidth = 60;
			cardHeight = 72;
			topHeight = canvasH - 100;
		} else {
			cardWidth = 60;
			cardHeight = 72;
			topHeight = canvasH - 120;
		}

		let name = params.name;
		if (imagesCanvas[name] === undefined) {
			imagesCanvas[name] = document.createElement('canvas');
		}
		imagesCanvas[name].width = cardWidth;
		imagesCanvas[name].height = cardHeight;

		let image = document.getElementById(name);
		let imageCtx = imagesCanvas[name].getContext('2d');
		imageCtx.drawImage(image, 0, 0, cardWidth, cardHeight);
		context.drawImage(imagesCanvas[name], getX(params), getY(params));  
		
		params.frame = params.frame - 1;
		window.requestAnimationFrame(addConvertImage.bind(null, params))
	}
}

let sentEmoji = false;
let myEmoji = false;
function showEmoji(emojiName) {
	toggleEmoji();
	addImage({
	  name: emojiName,
	  frame: 150,
	  frames: 800,
	  xFrom: cardPadding,
	  xTo: canvasWidth - cardWidth - cardPadding,
	  yFrom: cardPadding,
	  yTo: cardPadding
	});
	myEmoji = true;
	if (gameData.ai == false && socket != null && sentEmoji == false) {
		sentEmoji = true;
		socket.emit("sendEmoji", { name: emojiName })
	}
}

function showEmojiConvert(emojiName) {
	sentEmoji = false
	if (myEmoji == false)
	{
		addImage({
			name: emojiName,
			frame: 150,
			frames: 800,
			xFrom: cardPadding,
			xTo: canvasWidth - cardWidth - cardPadding,
			yFrom: cardPadding,
			yTo: cardPadding
		  });
	}
	myEmoji = false;
}
/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleSoundMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleSoundInMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleMusicMute(con){
	buttonMusicOff.visible = false;
	buttonMusicOn.visible = false;
	toggleMusicInMute(con);
	if(con){
		buttonMusicOn.visible = true;
	}else{
		buttonMusicOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = 'https://www.player1.win/games/2/checkers'//location.href

	var curr_loc = location.href
	curr_loc = curr_loc.substring(0, curr_loc.lastIndexOf("/") + 1);
	
	var title = '';
	var text = '';

	var prizeUSD = 0;

	if (Player1.prizeUSD != undefined && Player1.prizeUSD != '')
	{
		prizeUSD = Player1.prizeUSD;
	}
	
	title = shareTitle.replace("[SCORE]", prizeUSD);
	text = shareMessage.replace("[SCORE]", prizeUSD);
	
	var shareurl = '';
	
	if( action == 'tiktok' ) {
		shareurl = 'https://www.tiktok.com/@exampleuser/video/1234567890123456789?text=' + encodeURIComponent(text) + " " + encodeURIComponent(loc);
	}else if( action == 'facebook' ){
		//shareurl = 'https://www.facebook.com/dialog/share?href='+encodeURIComponent(loc)+'&quote='+encodeURIComponent(text) + encodeURIComponent(loc)
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(curr_loc+'share?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ) {
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}