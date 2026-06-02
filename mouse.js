/****************************
*  Tinkerbell Magic Sparkle *
*(c)2005-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
****************************/

(function () {
	var colour = ["#ff0546", "#0ce6f2"];
	var sparkles = 40;

	var cNum = 0;
	var x = (ox = 300);
	var y = (oy = 100);
	var swide = window.innerWidth,
		shigh = window.innerHeight;
	var sleft = (sdown = 0);
	var tiny = [],
		star = [],
		starv = [],
		starx = [],
		stary = [],
		tinyx = [],
		tinyy = [],
		tinyv = [];
	
	// ã‚¹ãƒ©ã‚¤ãƒ€ãƒ¼æ“ä½œä¸­ã‹ã©ã†ã‹ã®ãƒ•ãƒ©ã‚°
	var isInteractingWithControls = false;
	// ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ä¸€æ™‚åœæ­¢ãƒ•ãƒ©ã‚°
	var isPaused = false;
	// ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ã‚¿ã‚¤ãƒžãƒ¼ID
	var animationTimer = null;
	// ã‚­ãƒ©ã‚­ãƒ©è¦ç´ ç”¨ã®ã‚³ãƒ³ãƒ†ãƒŠ
	var sparkleContainer = null;
	
	window.onload = function () {
		// ã‚­ãƒ©ã‚­ãƒ©è¦ç´ ç”¨ã®ã‚³ãƒ³ãƒ†ãƒŠã‚’ä½œæˆ
		sparkleContainer = document.createElement("div");
		sparkleContainer.id = "sparkle-container";
		sparkleContainer.style.position = "fixed";
		sparkleContainer.style.top = "0";
		sparkleContainer.style.left = "0";
		sparkleContainer.style.width = "100%";
		sparkleContainer.style.height = "100%";
		sparkleContainer.style.pointerEvents = "none";
		sparkleContainer.style.zIndex = "10000";
		document.body.appendChild(sparkleContainer);
		
		var i, rats, rlef, rdow;
		for (var i = 0; i < sparkles; i++) {
			var rats = createDiv(3, 3);
			rats.style.visibility = "hidden";
			sparkleContainer.appendChild((tiny[i] = rats));
			starv[i] = 0;
			tinyv[i] = 0;
			var rats = createDiv(5, 5);
			rats.style.backgroundColor = "transparent";
			rats.style.visibility = "hidden";
			var rlef = createDiv(1, 5);
			var rdow = createDiv(5, 1);
			rats.appendChild(rlef);
			rats.appendChild(rdow);
			rlef.style.top = "2px";
			rlef.style.left = 0;
			rdow.style.top = 0;
			rdow.style.left = "2px";
			sparkleContainer.appendChild((star[i] = rats));
		}
		
			// ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³é–‹å§‹
	startAnimation();
	
	// ã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«è¦ç´ ã¨ã®å¹²æ¸‰ã‚’æ¤œå‡ºã™ã‚‹ã‚¤ãƒ™ãƒ³ãƒˆãƒªã‚¹ãƒŠãƒ¼ã‚’è¿½åŠ 
	setupControlInteractionDetection();
	
	// ã‚¿ãƒ–éžã‚¢ã‚¯ãƒ†ã‚£ãƒ–æ™‚ã®åœæ­¢æ©Ÿèƒ½ã‚’è¨­å®š
	setupVisibilityChangeHandler();
	};
	
	// ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³é–‹å§‹é–¢æ•°
	function startAnimation() {
		if (!animationTimer) {
			animationTimer = setInterval(sparkle, 50);
		}
	}
	
	// ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³åœæ­¢é–¢æ•°
	function stopAnimation() {
		if (animationTimer) {
			clearInterval(animationTimer);
			animationTimer = null;
		}
	}
	
	// ã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«è¦ç´ ã¨ã®å¹²æ¸‰ã‚’æ¤œå‡ºã™ã‚‹é–¢æ•°
	function setupControlInteractionDetection() {
		// ãƒžã‚¦ã‚¹ãƒ€ã‚¦ãƒ³æ™‚ã«ã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«è¦ç´ ã‹ã©ã†ã‹ã‚’ãƒã‚§ãƒƒã‚¯
		document.addEventListener('mousedown', function(e) {
			if (isControlElement(e.target)) {
				isInteractingWithControls = true;
				// ã‚¹ãƒ©ã‚¤ãƒ€ãƒ¼æ“ä½œé–‹å§‹æ™‚ã«ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ã‚’åœæ­¢
				isPaused = true;
				stopAnimation();
				
				// ã™ã¹ã¦ã®ã‚¨ãƒ•ã‚§ã‚¯ãƒˆã‚’éžè¡¨ç¤ºã«ã™ã‚‹
				hideAllEffects();
			}
		});
		
		// ãƒžã‚¦ã‚¹ã‚¢ãƒƒãƒ—æ™‚ã«ãƒ•ãƒ©ã‚°ã‚’ãƒªã‚»ãƒƒãƒˆ
		document.addEventListener('mouseup', function() {
			if (isInteractingWithControls) {
				isInteractingWithControls = false;
				// æ“ä½œçµ‚äº†æ™‚ã«ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ã‚’å†é–‹
				isPaused = false;
				startAnimation();
			}
		});
		
		// ãƒžã‚¦ã‚¹ç§»å‹•æ™‚ã«ã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«è¦ç´ ä¸Šã‹ã©ã†ã‹ã‚’ãƒã‚§ãƒƒã‚¯
		document.addEventListener('mousemove', handleMouseMove);
		
		// ã‚¹ãƒ©ã‚¤ãƒ€ãƒ¼ã®å¤‰æ›´ã‚¤ãƒ™ãƒ³ãƒˆã‚’ç›£è¦–
		document.addEventListener('input', function(e) {
			if (e.target.classList.contains('tag-slider')) {
				// ã‚¹ãƒ©ã‚¤ãƒ€ãƒ¼æ“ä½œä¸­ã¯ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ã‚’åœæ­¢
				isPaused = true;
				stopAnimation();
			}
		});
		
		// ã‚¹ãƒ©ã‚¤ãƒ€ãƒ¼ã®å¤‰æ›´å®Œäº†ã‚¤ãƒ™ãƒ³ãƒˆã‚’ç›£è¦–
		document.addEventListener('change', function(e) {
			if (e.target.classList.contains('tag-slider')) {
				// ã‚¹ãƒ©ã‚¤ãƒ€ãƒ¼æ“ä½œå®Œäº†æ™‚ã«ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ã‚’å†é–‹
				setTimeout(function() {
					isPaused = false;
					startAnimation();
				}, 200); // å°‘ã—é…å»¶ã‚’å…¥ã‚Œã¦å†é–‹
			}
		});
	}
	
	// ã™ã¹ã¦ã®ã‚¨ãƒ•ã‚§ã‚¯ãƒˆã‚’éžè¡¨ç¤ºã«ã™ã‚‹é–¢æ•°
	function hideAllEffects() {
		for (var i = 0; i < sparkles; i++) {
			if (star[i]) star[i].style.visibility = "hidden";
			if (tiny[i]) tiny[i].style.visibility = "hidden";
		}
	}
	
	// ã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«è¦ç´ ã‹ã©ã†ã‹ã‚’ãƒã‚§ãƒƒã‚¯ã™ã‚‹é–¢æ•°
	function isControlElement(element) {
		// ã‚¹ãƒ©ã‚¤ãƒ€ãƒ¼ã‚„ãƒœã‚¿ãƒ³ãªã©ã®ã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«è¦ç´ ã‚’ãƒã‚§ãƒƒã‚¯
		return element.tagName === 'INPUT' || 
			   element.tagName === 'BUTTON' ||
			   element.tagName === 'SELECT' ||
			   element.classList.contains('tag-slider') ||
			   element.classList.contains('relevance-btn') ||
			   element.classList.contains('tag-sort-btn') ||
			   element.closest('.tag-controls') !== null;
	}
	
	// ã‚¿ãƒ–éžã‚¢ã‚¯ãƒ†ã‚£ãƒ–æ™‚ã®åœæ­¢æ©Ÿèƒ½ã‚’è¨­å®šã™ã‚‹é–¢æ•°
	function setupVisibilityChangeHandler() {
		// ãƒšãƒ¼ã‚¸å¯è¦–æ€§APIãŒã‚µãƒãƒ¼ãƒˆã•ã‚Œã¦ã„ã‚‹ã‹ãƒã‚§ãƒƒã‚¯
		if (typeof document.hidden !== "undefined" || typeof document.msHidden !== "undefined" || typeof document.webkitHidden !== "undefined") {
			// å¯è¦–æ€§å¤‰æ›´ã‚¤ãƒ™ãƒ³ãƒˆã‚’ç›£è¦–
			document.addEventListener('visibilitychange', handleVisibilityChange);
		}
	}
	
	// å¯è¦–æ€§å¤‰æ›´ã‚’å‡¦ç†ã™ã‚‹é–¢æ•°
	function handleVisibilityChange() {
		if (document.hidden || document.msHidden || document.webkitHidden) {
			// ã‚¿ãƒ–ãŒéžã‚¢ã‚¯ãƒ†ã‚£ãƒ–ã«ãªã£ãŸå ´åˆ
			console.log('ã‚¿ãƒ–ãŒéžã‚¢ã‚¯ãƒ†ã‚£ãƒ–ã«ãªã‚Šã¾ã—ãŸã€‚ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ã‚’åœæ­¢ã—ã¾ã™ã€‚');
			stopAnimation();
			hideAllEffects();
		} else {
			// ã‚¿ãƒ–ãŒã‚¢ã‚¯ãƒ†ã‚£ãƒ–ã«ãªã£ãŸå ´åˆ
			console.log('ã‚¿ãƒ–ãŒã‚¢ã‚¯ãƒ†ã‚£ãƒ–ã«ãªã‚Šã¾ã—ãŸã€‚ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ã‚’å†é–‹ã—ã¾ã™ã€‚');
			if (!isPaused && !isInteractingWithControls) {
				startAnimation();
			}
		}
	}
	
	function sparkle() {
		var c;
		// ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ä¸€æ™‚åœæ­¢ä¸­ã¯ä½•ã‚‚ã—ãªã„
		if (isPaused) return;
		
		// ã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«æ“ä½œä¸­ã¯ã‚¨ãƒ•ã‚§ã‚¯ãƒˆã‚’æ›´æ–°ã—ãªã„
		if (!isInteractingWithControls && (x != ox || y != oy)) {
			ox = x;
			oy = y;
			for (c = 0; c < sparkles; c++)
				if (!starv[c]) {
					star[c].style.left = (starx[c] = x) + "px";
					star[c].style.top = (stary[c] = y) + "px";
					star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
					star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = colour[cNum % colour.length];
					cNum++;
					star[c].style.visibility = "visible";
					star[c].style.pointerEvents = "none";
					starv[c] = 50;
					break;
				}
		}
		for (c = 0; c < sparkles; c++) {
			if (starv[c]) update_star(c);
			if (tinyv[c]) update_tiny(c);
		}
	}
	
	function update_star(i) {
		if (--starv[i] == 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
		if (starv[i]) {
			stary[i] += 1 + Math.random() * 3;
			if (stary[i] < shigh + sdown) {
				star[i].style.top = stary[i] + "px";
				starx[i] += ((i % 5) - 2) / 5;
				star[i].style.left = starx[i] + "px";
			} else {
				star[i].style.visibility = "hidden";
				starv[i] = 0;
				return;
			}
		} else {
			tinyv[i] = 50;
			tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
			tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
			tiny[i].style.width = "2px";
			tiny[i].style.height = "2px";
			tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
			star[i].style.visibility = "hidden";
			tiny[i].style.visibility = "visible";
			tiny[i].style.pointerEvents = "none";
		}
	}
	
	function update_tiny(i) {
		if (--tinyv[i] == 25) {
			tiny[i].style.width = "1px";
			tiny[i].style.height = "1px";
		}
		if (tinyv[i]) {
			tinyy[i] += 1 + Math.random() * 3;
			if (tinyy[i] < shigh + sdown) {
				tiny[i].style.top = tinyy[i] + "px";
				tinyx[i] += ((i % 5) - 2) / 5;
				tiny[i].style.left = tinyx[i] + "px";
			} else {
				tiny[i].style.visibility = "hidden";
				tinyv[i] = 0;
				return;
			}
		} else tiny[i].style.visibility = "hidden";
		tiny[i].style.pointerEvents = "none";
	}
	
	// ãƒžã‚¦ã‚¹ç§»å‹•ã‚¤ãƒ™ãƒ³ãƒˆãƒãƒ³ãƒ‰ãƒ©ã‚’åˆ†é›¢ã—ã¦æ”¹å–„
	function handleMouseMove(e) {
		// ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ä¸€æ™‚åœæ­¢ä¸­ã¯ä½•ã‚‚ã—ãªã„
		if (isPaused) return;
		
		// ã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«è¦ç´ ä¸Šã§ã¯ã‚«ãƒ¼ã‚½ãƒ«ä½ç½®ã‚’æ›´æ–°ã—ãªã„
		if (isControlElement(e.target)) {
			isInteractingWithControls = true;
			return;
		}
		
		isInteractingWithControls = false;
		y = e.pageY;
		x = e.pageX;
		sdown = window.pageYOffset;
		sleft = window.pageXOffset;
	}
	
	function createDiv(height, width) {
		var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.height = height + "px";
		div.style.width = width + "px";
		div.style.overflow = "hidden";
		div.style.pointerEvents = "none";
		div.style.zIndex = "10000";
		return div;
	}
})();