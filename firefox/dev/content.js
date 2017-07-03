/*

content script

*/

browser.storage.local.get('suop', function (d) {
	if (typeof d.suop === "undefined") { // initialization
		browser.storage.local.set({suop: '[{"groups":[]}]'});
	}
	var channels = document.createElement('script');
	channels.innerHTML = "var sumem = JSON.parse('"+d.suop+"');";
	channels.onload = function() {
		this.parentNode.removeChild(this);
	};	
	(document.head || document.documentElement).appendChild(channels);
});

var s = document.createElement('script');
s.src = browser.extension.getURL('ut.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);


// grabs all subscription ids and names for group creation. requires refresh
var subscriptiongroups = [];
for (var sp = 0; sp <= document.getElementById('guide-channels').getElementsByTagName('li').length - 1; sp++) {
	subscriptiongroups[sp] = {};
	subscriptiongroups[sp].name = document.getElementById('guide-channels').getElementsByTagName('li')[sp].getElementsByTagName('a')[0].title;
	subscriptiongroups[sp].id = document.getElementById('guide-channels').getElementsByTagName('li')[sp].id;
}
browser.storage.local.set({ suop_subs: JSON.stringify(subscriptiongroups) });