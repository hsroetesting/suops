// thanks internet. some reason i am stupid and couldn't figure this out. saved a lot of my time.
var s = document.createElement('script');
s.src = chrome.extension.getURL('ut.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);