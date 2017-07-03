var sumem;
chrome.storage.local.get('suop',function(d) {
	if(typeof d.suop === "undefined") {
		chrome.storage.local.set({suop: '[{"groups":[]}]'});
	}
	sumem = JSON.parse(d.suop);
});

function channelidgrabber(chlinks) { // a little thing i call creative thinking.
	var lids = [];
	for(var clp = 0; clp <= chlinks.length - 1; clp++) {
		lids[clp] = chlinks[clp].replace("https://www.youtube.com/channel/","");
	}
	return lids;
}



function groupNew(groupname,channelnames) {
	channelnames = channelidgrabber(channelnames);
	for(var npt = 0; npt <= channelnames.length - 1; npt++) {
		channelnames[npt] += '-guide-item';
	}
	sumem[0].groups.push({name: groupname, channels: channelnames});
	chrome.storage.local.set({suop: JSON.stringify(sumem)}); // i almost cried when this worked because this is the one thing that keeps this whole extension together. 
//	localStorage.setItem('suop',JSON.stringify(sumem));
}

// Array Remove - By John Resig (MIT Licensed) - when you're too lazy to figure it out on your own
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
	chrome.storage.local.set({suop: JSON.stringify(sumem)});
}


function createSubmit() {
	var gname, gchannels;
	var gchannelsholder = [];
	var gchannelcounter = 0;
	var gchannelcounterghost;
	gname = document.getElementById('GROUP_CREATE_NAME').value;
	gchannels = document.getElementById('GROUP_CREATE_CHANNELS').value;
	for(var mp = 0; mp <= gchannels.length - 1; mp++) {
		if(gchannels[mp] === ",") {
			var gchannelcurrent = "";
			gchannelcounterghost = gchannelcounter;
			for(var mp2 = 0; mp2 <= mp - gchannelcounterghost - 1; mp2++) {
				gchannelcurrent += gchannels[gchannelcounter];
				gchannelcounter++;
			}
			gchannelcounter = mp + 1;
			gchannelsholder.push(gchannelcurrent);
		}
	}
	groupNew(gname,gchannelsholder);
	document.getElementById('GROUP_CREATE_RESPONSE').innerHTML = "Group '"+gname+"' has been created. Refresh the page to see its effect.";
}

function createShow() {
	document.getElementById('GROUP_CREATE_SELECTOR').style.display = "block";
	document.getElementById('GROUP_DELETE_SELECTOR').style.display = "none";
}

function deleteSubmit() {
	groupDelete(document.getElementById('GROUP_DELETE_NAME').value);
	document.getElementById('GROUP_DELETE_RESPONSE').innerHTML = "Group '"+document.getElementById('GROUP_DELETE_NAME').value+"' has been deleted. Refresh the page to see its effect.";
}

function deleteShow() {
	document.getElementById('GROUP_DELETE_SELECTOR').style.display = "block";
	document.getElementById('GROUP_CREATE_SELECTOR').style.display = "none";
}



document.getElementById('GROUP_CREATE_SUBMIT').addEventListener('click',createSubmit);
document.getElementById('GROUP_DELETE_SUBMIT').addEventListener('click',deleteSubmit);
document.getElementById('GROUP_CREATE').addEventListener('click',createShow);
document.getElementById('GROUP_DELETE').addEventListener('click',deleteShow);