chrome.storage.local.get('suop',function(d) {
	if(typeof d.suop === "undefined") {
		chrome.storage.local.set({suop: '[{"groups":[]}]'});
	}
	var channels = document.createElement('script');
	channels.innerHTML = "var sumem = JSON.parse('"+d.suop+"');";
	channels.onload = function() {
		this.parentNode.removeChild(this);
	};	
	(document.head || document.documentElement).appendChild(channels);
});

var s = document.createElement('script');
s.src = chrome.extension.getURL('ut.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);