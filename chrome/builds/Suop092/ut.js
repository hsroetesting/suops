var sumem = [];
/* localStorage set up first time */
if(localStorage.getItem('suop') === null) {
	localStorage.setItem('suop','[{"groups":[]}]');
	localStorage.setItem('chlvis','false');
} else {
	sumem = JSON.parse(localStorage.getItem('suop'));
	
}

var ut = new Object();
	ut.container     = document.getElementById("guide-container");
	ut.toplevel      = document.getElementsByClassName("guide-toplevel")[0];
	ut.subscriptions = document.getElementById("guide-subscriptions-section");
	ut.suop          = document.createElement("li");
	ut.channel       = document.getElementById("guide-channels");
	ut.channelh      = document.getElementsByClassName("guide-channels-list guide-item-container yt-uix-scroller yt-uix-tdl overflow-list")[0];
	ut.channels      = [];
	ut.grtest        = document.createElement('div');
	ut.vistog        = document.createElement('li');
	ut.scripts       = document.createElement('script');
	ut.usersubs		 = ut.channel.getElementsByClassName('guide-channel guide-notification-item overflowable-list-item');
ut.suop.setAttribute("class","guide-section");
ut.suop.innerHTML = '<h3><a class="yt-uix-sessionlink g-hovercard spf-link">Subscription Groups</a></h3><div id="SUOP"></div><hr class="guide-section-seperator"><br />';
ut.toplevel.insertBefore(ut.suop,ut.toplevel.childNodes[4]);
ut.vistog.setAttribute('role','menuitem');
ut.vistog.innerHTML = '<span id="togvis" class="guide-sort-choice yt-uix-button-menu-item" onclick="togglevisf()" data-guide-sort="3">Toggle Vis</span>';
document.getElementsByClassName('yt-uix-button-menu yt-uix-button-menu-hover-action-menu')[0].appendChild(ut.vistog);
ut.scripts.innerHTML = "var togglevis = false;if(localStorage.getItem('chlvis') === 'false') { togglevisf() }function togglevisf() {if(togglevis){document.getElementById('guide-subs-footer-container').style.display='block';togglevis = false;localStorage.setItem('chlvis','true')} else {document.getElementById('guide-subs-footer-container').style.display='none';togglevis = true;localStorage.setItem('chlvis','false')}}";
document.getElementsByTagName('head')[0].appendChild(ut.scripts);

/*
ut.grtest.setAttribute('id','group_test');
ut.grtest.setAttribute('onmouseover','document.getElementById("group_test_channels").style.display = "block";');
ut.grtest.setAttribute('onmouseout','document.getElementById("group_test_channels").style.display = "none";');
ut.grtest.setAttribute('style','padding-bottom: 10px;margin-left: 40px;background-color: #fffff;');
ut.grtest.innerHTML = "Test Group<div id=\"group_test_channels\" style=\"display: none; padding-bottom: 5px; padding-top: 5px; height: 30px; margin-left: -40px;\">This would be a channel</div></div>";
document.getElementById('SUOP').appendChild(ut.grtest);
*/

// injecting the groups into that new section thing i made
for(var elpon = 0; elpon <= sumem[0].groups.length - 1; elpon++) {
	var curg = document.createElement('div');
		curg.setAttribute('id','group_' + elpon);
/*		curg.setAttribute('onmouseover','document.getElementById("group_' + elpon + '_channels").style.display = "block";');
		curg.setAttribute('onmouseout','document.getElementById("group_' + elpon + '_channels").style.display = "none";'); */
		curg.setAttribute('style','margin-left: 0;background-color: #ffffff;');
		curg.innerHTML = "<a class=\"guide-item yt-uix-sessionlink yt-valign spf-link\" onclick='if(document.getElementById(\"group_" + elpon + "_channels\").style.display === \"block\") {document.getElementById(\"group_" + elpon + "_channels\").style.display = \"none\";} else {document.getElementById(\"group_" + elpon + "_channels\").style.display = \"block\";}'> > "+ sumem[0].groups[elpon].name + "</a><div id='group_" + elpon + "_channels' style='display: none; padding-bottom: 5px; padding-top: 5px; margin-left: 0;'></div>";
	document.getElementById('SUOP').appendChild(curg);
	var curgch = document.getElementById('group_' + elpon + '_channels');
	for(var chelpon = 0; chelpon <= sumem[0].groups[elpon].channels.length - 1; chelpon++) {
		curgch.appendChild(document.getElementById(sumem[0].groups[elpon].channels[chelpon]).cloneNode(true));
	}
}

/*
chrome.storage.local.get("example_stored",function(data) { if(data.example_stored === 1) {});
*/

function groupNew(groupname,channelnames) {
	for(var npt = 0; npt <= channelnames.length - 1; npt++) {
		channelnames[npt] += '-guide-item';
	}
	sumem[0].groups.push({name: groupname, channels: channelnames});
	localStorage.setItem('suop',JSON.stringify(sumem));
}

// Array Remove - By John Resig (MIT Licensed) * when you're too lazy to figure it out on your own
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function groupDelete(groupname) {
	for(var ap = 0; ap <= sumem[0].groups.length - 1; ap++) {
		if(sumem[0].groups[ap].name === groupname) {
			sumem[0].groups.remove(ap);
			ap = sumem[0].groups.length;
		}
	}
	localStorage.setItem('suop',JSON.stringify(sumem));
}

function channelidgrabber(chlinks) {
	var lids = [];
	for(var clp = 0; clp <= chlinks.length - 1; clp++) {
		console.log('clp: ' + clp + ', chlinks[clp]: ' + chlinks[clp] + ', chlinks.length: ' + chlinks.length);
		lids[clp] = chlinks[clp].replace("https://www.youtube.com/channel/","");
	}
	return lids;
}




/*
"<div id=\"group_test\" onmousemove=\"document.getElementById('group_test_channels').style.display = 'block';document.getElementById('group_test').style.background-color: '#222';\" 
onmouseout=\"document.getElementById('group_test_channels').style.display = 'none'\" style=\"padding-bottom: 10px;background-color: #ffffff\">hover over me<div id=\"group_test_channels\" style=\"display: none; padding-bottom: 5px; padding-top: 5px; background-color: rgb(255, 255, 255);\">test</div></div>"

<li role="menuitem"><span id="togvis" class="guide-sort-choice yt-uix-button-menu-item" onclick="togglevisf()" data-guide-sort="3">Toggle Vis</span></li>


*/
