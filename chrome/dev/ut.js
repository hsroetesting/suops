/*

This is the file that is injected in the page as a script element

*/

// stackoverflow user 704371 john something thx
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}



// the function which is called once the element with the 'guide-toplevel' class is ready, as it doesn't load when you open a video link directly (as i found out from people using it thank you all :))))) )
function suops_load() {
	var ut = {
		toplevel: document.getElementsByClassName("guide-toplevel")[0], // this is the container for the sidebar thing
		suop:     document.createElement("li"), // the container for the 'SUBSCRIPTION GROUPS' section. everything is in here.
		vistog:   document.createElement('li'), // part of an extra secret feature which toggles off the visibility of all the subscriptions you have
		scripts:  document.createElement('script'), // makes ut.vistog work
	}
	if (document.getElementById('SUOP') == null) {
		ut.suop.setAttribute("class","guide-section"); // done to match the other sections in the sidebar
		ut.suop.innerHTML = '<h3><a class="yt-uix-sessionlink g-hovercard spf-link">Subscription Groups</a></h3><div id="SUOP"></div><hr class="guide-section-seperator"><br />';
		ut.toplevel.insertBefore(ut.suop,ut.toplevel.childNodes[4]); // inserts the subscription groups container into the sidebar above the subscriptions container
	} else {
		document.getElementById('SUOP').innerHTML = 'Something has gone wrong with Suops. Please try refreshing.';
	}
	
	
	// secret feature functionallity
	ut.vistog.setAttribute('role','menuitem');
	ut.vistog.innerHTML = '<span id="togvis" class="guide-sort-choice yt-uix-button-menu-item" onclick="togglevisf()" data-guide-sort="3">Toggle Vis</span>';
	document.getElementsByClassName('yt-uix-button-menu yt-uix-button-menu-hover-action-menu')[0].appendChild(ut.vistog); 
	ut.scripts.innerHTML = "var togglevis = false;if(localStorage.getItem('chlvis') === 'false') { togglevisf() }function togglevisf() {if(togglevis){document.getElementById('guide-subs-footer-container').style.display='block';togglevis = false;localStorage.setItem('chlvis','true')} else {document.getElementById('guide-subs-footer-container').style.display='none';togglevis = true;localStorage.setItem('chlvis','false')}}";
	document.getElementsByTagName('head')[0].appendChild(ut.scripts);
	
	
	// this starts injecting each group one by one into the group container with the id of 'SUOP'
	document.getElementById("SUOP").innerHTML = "";
	for(var elpon = 0; elpon <= sumem[0].groups.length - 1; elpon++) {
		var curg = document.createElement('div');
			curg.setAttribute('id','group_' + elpon); // so the group is able to be neatly referenced
			curg.setAttribute('style','margin-left: 0;'); // i forget if this is needed i may remove this some time
			curg.innerHTML = "<a class=\"guide-item yt-uix-sessionlink yt-valign spf-link\" onclick='if(document.getElementById(\"group_" + elpon + "_channels\").style.display === \"block\") {document.getElementById(\"group_" + elpon + "_channels\").style.display = \"none\"; document.getElementById(\"group_" + elpon + "_isENABLED\").innerHTML = \"\";} else {document.getElementById(\"group_" + elpon + "_channels\").style.display = \"block\"; document.getElementById(\"group_" + elpon + "_isENABLED\").innerHTML = \"&#32;&#32;&#9660; \";}'> "+ sumem[0].groups[elpon].name + "<span id=\"group_" + elpon + "_isENABLED\"></span></a><div id='group_" + elpon + "_channels' style='display: none; padding-bottom: 5px; padding-top: 5px; margin-left: 0;'></div>"; // basically a template of sorts for each group.
		document.getElementById('SUOP').appendChild(curg);
		var curgch = document.getElementById('group_' + elpon + '_channels');
		for(var chelpon = 0; chelpon <= sumem[0].groups[elpon].channels.length - 1; chelpon++) { // loop to inject the channels into the channel container
			try { 
				curgch.appendChild(document.getElementById(sumem[0].groups[elpon].channels[chelpon]).cloneNode(true)); // copies the channel from the list of channels one would be subscribed to.
			}
			catch(err) {
				console.log('Suops [Info] Could not find channel element with id: ' + sumem[0].groups[elpon].channels[chelpon]);
				var errorchannel = document.createElement('div');
				errorchannel.innerHTML = "Channel not found.";
				curgch.appendChild(errorchannel);
			}
		}
		var gfae = document.createElement('li');
		gfae.setAttribute("class", "guide-channel guide-notification-item overflowable-list-item");
		gfae.innerHTML = "<a class='guide-item yt-uix-sessionlink yt-valign spf-link' href='https://www.youtube.com/feed/subscriptions?" + elpon + "' title='click for sub feed special'><span class='yt-valign-container'><span class='thumb'><span class='video-thumb  yt-thumb yt-thumb-20'></span></span><span class='display-name  no-count'><span>View video feed...</span></span></span></a>";
		curgch.appendChild(gfae);
	}
}

// sometime the side bar doesn't load fast enough. this just keeps trying to load the groups until it works.
function suops_try() {
	try {
		suops_load();
		console.log('Success injecting Suops element.');
	}
	catch (err) {
		console.log('Failed to inject Suops element. Trying again in 2.5 seconds...');
		var sw4g = setTimeout(function () { suops_try() }, 2500);
	}
} suops_try();

function checkforsubfeed() {
	if (document.URL.substr(0, 42) === "https://www.youtube.com/feed/subscriptions") { loadSort() } else {
		var sw4g = setTimeout(function () { checkforsubfeed() }, 1000);
	}
}

checkforsubfeed();

var group;
function loadSort() {
	if (location.search != "" && document.URL.substr(0, 42) === "https://www.youtube.com/feed/subscriptions") {
		try {
		console.log(parseInt(location.search.replace("?", "").replace("=", "")));
		group = sumem[0].groups[parseInt(location.search.replace("?", "").replace("=", ""))];
		document.getElementsByClassName("item-section")[0].getElementsByClassName("branded-page-module-title-text")[0].innerHTML = group.name;
		document.getElementsByClassName("yt-uix-menu-top-level-button-container")[0].getElementsByClassName("yt-uix-menu-top-level-button yt-uix-menu-top-level-flow-button")[1].innerHTML = "";
		scanSort();
		} catch (e) { var sw4g = setTimeout(function () { checkforsubfeed() }, 1000); }
	} else {
		var sw4g = setTimeout(function () { checkforsubfeed() }, 1000);
	}
}

function scanSort() { // video feed for groups
	// loop to hide all non-relevant videos
	try {
		for (var i = 0; i < document.getElementsByClassName("yt-shelf-grid-item").length; i++) {
			var hgrdagsra = document.getElementsByClassName("yt-shelf-grid-item")[i].getElementsByClassName("yt-lockup-byline yt-ui-ellipsis yt-ui-ellipsis-2")[0].getElementsByTagName("a")[0].getAttribute("data-ytid");
			var bad = true;
			for (var j = 0; j < group.channels.length; j++) { 
				if (hgrdagsra === group.channels[j].replace("-guide-item","")) bad = false;
			}
			if (bad) document.getElementsByClassName("yt-shelf-grid-item")[i].style.display = "none";
		}
		
		// loop to shove all videos in one ul
		for (var i = 1; i < document.getElementById("browse-items-primary").getElementsByClassName("shelf-content").length; i++) {
			while (document.getElementById("browse-items-primary").getElementsByClassName("shelf-content")[i].getElementsByClassName("yt-shelf-grid-item").length > 0) {
				document.getElementById("browse-items-primary").getElementsByClassName("shelf-content")[0].appendChild(document.getElementById("browse-items-primary").getElementsByClassName("shelf-content")[i].getElementsByClassName("yt-shelf-grid-item")[0]);
			}
		}
		// loop to delete date headers stuff idk
		for (var i = 1; i < document.getElementsByClassName("item-section").length; i++) {
			document.getElementsByClassName("item-section")[i].remove();
		}
		
		// https://gist.github.com/jjmu15/8646226 i had somethign from this but had to modify it but didnt feel like i should cut out the credit
	
		// below is for automatically clicking on the load more button.
		var rect = document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-default load-more-button yt-uix-load-more browse-items-load-more-button yt-uix-sessionlink")[0].getBoundingClientRect();
		var html = document.documentElement;
		if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth))
			document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-default load-more-button yt-uix-load-more browse-items-load-more-button yt-uix-sessionlink")[0].click();
		
		
		if (document.URL.substr(0, 42) === "https://www.youtube.com/feed/subscriptions") {
			var sw4g = setTimeout(function () { scanSort() }, 1000);
		} else {
			var sw4g = setTimeout(function () { checkforsubfeed() }, 1000);
		}
	} catch (e) { var sw4g = setTimeout(function () { scanSort() }, 1000); }
}
console.log(group);