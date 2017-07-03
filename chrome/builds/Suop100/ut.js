/*
I know that I should have made some error catching, but seriously the directions are pretty simple just put the channel urls into the textbox add a groupname and then bam its working no errors at all (given you use the id channel url)
*/

var ut = new Object();
	ut.toplevel      = document.getElementsByClassName("guide-toplevel")[0];
	ut.suop          = document.createElement("li");
	ut.channel       = document.getElementById("guide-channels");
	ut.grtest        = document.createElement('div');
	ut.vistog        = document.createElement('li');
	ut.scripts       = document.createElement('script');
ut.suop.setAttribute("class","guide-section");
ut.suop.innerHTML = '<h3><a class="yt-uix-sessionlink g-hovercard spf-link">Subscription Groups</a></h3><div id="SUOP"></div><hr class="guide-section-seperator"><br />';
ut.toplevel.insertBefore(ut.suop,ut.toplevel.childNodes[4]);
ut.vistog.setAttribute('role','menuitem');
ut.vistog.innerHTML = '<span id="togvis" class="guide-sort-choice yt-uix-button-menu-item" onclick="togglevisf()" data-guide-sort="3">Toggle Vis</span>';
document.getElementsByClassName('yt-uix-button-menu yt-uix-button-menu-hover-action-menu')[0].appendChild(ut.vistog);
ut.scripts.innerHTML = "var togglevis = false;if(localStorage.getItem('chlvis') === 'false') { togglevisf() }function togglevisf() {if(togglevis){document.getElementById('guide-subs-footer-container').style.display='block';togglevis = false;localStorage.setItem('chlvis','true')} else {document.getElementById('guide-subs-footer-container').style.display='none';togglevis = true;localStorage.setItem('chlvis','false')}}";
document.getElementsByTagName('head')[0].appendChild(ut.scripts);

for(var elpon = 0; elpon <= sumem[0].groups.length - 1; elpon++) {
	var curg = document.createElement('div');
		curg.setAttribute('id','group_' + elpon);
		curg.setAttribute('style','margin-left: 0;background-color: #ffffff;');
		curg.innerHTML = "<a class=\"guide-item yt-uix-sessionlink yt-valign spf-link\" onclick='if(document.getElementById(\"group_" + elpon + "_channels\").style.display === \"block\") {document.getElementById(\"group_" + elpon + "_channels\").style.display = \"none\";} else {document.getElementById(\"group_" + elpon + "_channels\").style.display = \"block\";}'> > "+ sumem[0].groups[elpon].name + "</a><div id='group_" + elpon + "_channels' style='display: none; padding-bottom: 5px; padding-top: 5px; margin-left: 0;'></div>";
	document.getElementById('SUOP').appendChild(curg);
	var curgch = document.getElementById('group_' + elpon + '_channels');
	for(var chelpon = 0; chelpon <= sumem[0].groups[elpon].channels.length - 1; chelpon++) {
		curgch.appendChild(document.getElementById(sumem[0].groups[elpon].channels[chelpon]).cloneNode(true));
	}
}