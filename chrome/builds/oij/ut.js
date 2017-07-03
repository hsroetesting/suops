/*
-----------------
-     SUOPS     -
- INJECTED CODE -
-----------------
- Created by    -
- John Fisher   -
-----------------

Nothing much changes in this file, as most of the magic is done through the popop box thing, which is managed from popup.js
*/



// the function which is called once the element with the 'guide-toplevel' class is ready, as it doesn't load when you open a video link directly (as i found out from people using it thank you all :))))) )
function suops_load() {
	subscriptionsThere();
	var ut = {
		toplevel: document.getElementsByClassName("guide-toplevel")[0], // this is the container for the sidebar thing
		suop:     document.createElement("li"), // the container for the 'SUBSCRIPTION GROUPS' section. everything is in here.
		vistog:   document.createElement('li'), // part of an extra secret feature which toggles off the visibility of all the subscriptions you have
		scripts:  document.createElement('script'), // makes ut.vistog work
	}
	ut.suop.setAttribute("class","guide-section"); // done to match the other sections in the sidebar
	ut.suop.innerHTML = '<h3><a class="yt-uix-sessionlink g-hovercard spf-link">Subscription Groups</a></h3><div id="SUOP"></div><hr class="guide-section-seperator"><br />';
	ut.toplevel.insertBefore(ut.suop,ut.toplevel.childNodes[4]); // inserts the subscription groups container into the sidebar above the subscriptions container
	
	// secret feature functionallity
	ut.vistog.setAttribute('role','menuitem');
	ut.vistog.innerHTML = '<span id="togvis" class="guide-sort-choice yt-uix-button-menu-item" onclick="togglevisf()" data-guide-sort="3">Toggle Vis</span>';
	document.getElementsByClassName('yt-uix-button-menu yt-uix-button-menu-hover-action-menu')[0].appendChild(ut.vistog); 
	ut.scripts.innerHTML = "var togglevis = false;if(localStorage.getItem('chlvis') === 'false') { togglevisf() }function togglevisf() {if(togglevis){document.getElementById('guide-subs-footer-container').style.display='block';togglevis = false;localStorage.setItem('chlvis','true')} else {document.getElementById('guide-subs-footer-container').style.display='none';togglevis = true;localStorage.setItem('chlvis','false')}}";
	document.getElementsByTagName('head')[0].appendChild(ut.scripts);
	
	
	// this starts injecting each group one by one into the group container with the id of 'SUOP'
	for(var elpon = 0; elpon <= sumem[0].groups.length - 1; elpon++) {
		var curg = document.createElement('div');
			curg.setAttribute('id','group_' + elpon); // so the group is able to be neatly referenced
			curg.setAttribute('style','margin-left: 0;'); // i forget if this is needed i may remove this some time
			curg.innerHTML = "<a class=\"guide-item yt-uix-sessionlink yt-valign spf-link\" onclick='if(document.getElementById(\"group_" + elpon + "_channels\").style.display === \"block\") {document.getElementById(\"group_" + elpon + "_channels\").style.display = \"none\";} else {document.getElementById(\"group_" + elpon + "_channels\").style.display = \"block\";}'> > "+ sumem[0].groups[elpon].name + "</a><div id='group_" + elpon + "_channels' style='display: none; padding-bottom: 5px; padding-top: 5px; margin-left: 0;'></div>"; // basically a template of sorts for each group.
		document.getElementById('SUOP').appendChild(curg);
		var curgch = document.getElementById('group_' + elpon + '_channels'); // this is purely made so that the line its used in isn't so long
		for(var chelpon = 0; chelpon <= sumem[0].groups[elpon].channels.length - 1; chelpon++) { // loop to inject the channels into the channel container
			try { // because some people screw up on this step and i have trouble figuring out why
				curgch.appendChild(document.getElementById(sumem[0].groups[elpon].channels[chelpon]).cloneNode(true)); // copies the channel from the list of channels one would be subscribed to.
			}
			catch(err) { // if the above doesnt work (its a user error if it doesnt mate THE CODE WORKS ITS NOT MY FAULT)
				console.log('Suops [Info] Could not find channel element with id: ' + sumem[0].groups[elpon].channels[chelpon]);
				var errorchannel = document.createElement('div');
				errorchannel.innerHTML = "Channel not found.";
				curgch.appendChild(errorchannel);
			}
		}
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
}

// i found a problem when there werent any subscriptions on a user (like if you were not signed in) the groups element would just keep injecting
function subscriptionsThere() {
	try {
		document.getElementById('guide-subscriptions-section').getElementsByClassName('guide-section-separator');
	}
	catch (err) {
		console.log("couldn't find subscriptions");
	}
}
suops_try();

