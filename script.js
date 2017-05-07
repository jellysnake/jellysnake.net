/* jquery objects */
var content;
var mainWindow;
var links;
/* Other globals */
var lineHeight = 20;
var height, width;
var effects = [];
var chars = ["!", "@", "#", "$", "%", "^", "&", "*", "4", "6", "8", "9", "0"];
var linkText = [];

/**
 * Called once the body has finished loading
 */
function onLoad() {
	content = $("#effectsBox");
	links = $("a");
	mainWindow = $(window);
	
	links.text(function(i, old){ linkText.push(old); return old});
	setupEffect();
	
	mainWindow.resize(setupEffect);
	setInterval(alterEffect, 50);
}

/**
 * Called each time the page is resized or the page is loaded
 * Creates the effects on the edges
 */
function setupEffect() {
	height = Math.floor(mainWindow.height()/lineHeight);
	width = Math.floor(mainWindow.width()/lineHeight);
	var dia = Math.floor(0.8 * Math.min(width, height));
	effects = [];
	
	for (var y = 0; y < (height-dia)/2; y++) {
		var row = ""
		for (var i = 0; i < width + 1; i++) {
			row += ' ' + getRandomChar();
		}
		effects.push(row);
	}
	
	for (var y = 0; y < dia; y++){
		var rowWidth = Math.sin(((Math.PI)/dia)*y) * dia + 1;
		var row = "";
		
		for (var i = 0; i < (width-rowWidth)/2;  i++) {
			row += ' ' + getRandomChar();
		}
		
		for (var i = 0; i < rowWidth; i++) {
			row += "  ";
		}
		
		for (var i = 0; i < (width-rowWidth)/2 + 1; i++) {
			row += ' ' + getRandomChar();
		}
		effects.push(row);
	}
	
	for (var y = 0; y < (height-dia)/2 + 1; y++) {
		var row = "";
		for (var i = 0; i < width + 1; i++) {
			row += ' ' + getRandomChar();
		}
		effects.push(row);
	}
	alterEffect();
}



/**
 * Scrambles the links slightly, then undoes it.
 */
function tweakLink() {
	links.text(editInLine);
	setTimeout(fixLink, 300);
}

/**
 * Restores the link to original quality
 */
function fixLink() {
	links.text(function(i, old){ return linkText[i]});
}

/**
 * Alters a random number of chars in each row
 * Called once every 100ms
 */
function alterEffect() {
	for (i = 0; i < effects.length; i++) {
		for (j = 0; j < 7; j++) {
			effects[i] = editInLine(0, effects[i]);
		}
	}
	if (Math.random() < 0.02) {
		tweakLink();
	}
	content.html(effects.join("<br>"));
}



/**
 * Scrambles one character in the line
 * @param {int} _ A garbage paramater
 * @param {string} str The string to edit
 */
function editInLine(_, str) {
	var index = Math.floor(Math.random() * str.length);
	if (str.charAt(index) != " ") {
		return setCharAt(str, index, getRandomChar());
	}
	return str;
}

/**
 * Returns a random scramble character.
 * @returns {char} A random character
 */
function getRandomChar() {
	return chars[Math.floor(Math.random()*chars.length)];
}

/**
 * Sets the character at an index
 * @param {string} The string to alter
 * @param {int} The index of the character to alter
 * @param {char} The character to set it to
 * @returns {string} The new string
 */
function setCharAt(str,index,chr) {
	return str.substr(0, index) + chr + str.substr(index + 1);
}
