/*

file for popup functions

*/

var sumem, subs;
function subssave(assassin) { subs = assassin } // probably not needed just was having trouble with an issue similar to this in a different program and didnt want to worry about the issue in here
chrome.storage.local.get('suop',function(d) {
	if(typeof d.suop === "undefined") {
		chrome.storage.local.set({suop: '[{"groups":[]}]'});
	}
	sumem = JSON.parse(d.suop);
});

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

// by stackoverflow user 236139 (Reid)
Array.prototype.move = function (old_index, new_index) {
	if (new_index >= this.length) {
		var k = new_index - this.length;
		while ((k--) + 1) {
			this.push(undefined);
		}
	}
	this.splice(new_index, 0, this.splice(old_index, 1)[0]);
	return this; // for testing purposes
};

// loads subs gathered from YouTube webpage
function loadsubs() {
	chrome.storage.local.get('suop_subs', function (d) { subssave(JSON.parse(d.suop_subs)) });
}

// create
function groupNew(groupname,channelnames) {
	sumem[0].groups.push({name: groupname, channels: channelnames});
	chrome.storage.local.set({suop: JSON.stringify(sumem)});
}

function createSubmit() {
	var gname, gchannels = [];
	gname = document.getElementById('GROUP_CREATE_NAME').value;
	for (var gcp = 0; gcp <= document.getElementById('lkauhgrs').getElementsByTagName('a').length - 1; gcp++) {
		if (document.getElementById('lkauhgrs').getElementsByTagName('a')[gcp].type != "")
			gchannels.push(document.getElementById('lkauhgrs').getElementsByTagName('a')[gcp].type);
	}
	if (gname.indexOf('"') === -1 && gname.indexOf("'") === -1 && gname.indexOf('\\') === -1) {
		groupNew(gname, gchannels);
		document.getElementById('GROUP_CREATE_RESPONSE').innerHTML = "Group '" + gname + "' has been created. Refresh the YouTube page to see its effect.";
		createbox_try();
		modbox_try();
		editbox_try();
	} else {
		document.getElementById('GROUP_CREATE_RESPONSE').innerHTML = "An illegal character was used in the title. The group has not been created.";
	}
}

function createShow() {
	document.getElementById('GROUP_CREATE_SELECTOR').style.display = "block";
	document.getElementById('GROUP_DELETE_SELECTOR').style.display = "none";
	document.getElementById('GROUP_EDIT_SELECTOR').style.display = "none";
	document.getElementById('GROUP_MOD_SELECTOR').style.display = "none";
}

function createblah() {
	document.getElementById('lkauhgrs').innerHTML = "";
	document.getElementById('asuirghs').innerHTML = "";
	document.getElementById('GROUP_CREATE_NAME').value = "";
	for (var subsp = 0; subsp <= subs.length - 1; subsp++) {
		var csub = document.createElement('div');
		csub.setAttribute('id', 'GCREATE_' + subsp);
		csub.innerHTML = "<a href='#' id='GCREATE_" + subsp + "_S' type='" + subs[subsp].id + "'><div id='GCREATE_" + subsp + "_T'>" + subs[subsp].name + "</div></a>";
		document.getElementById('asuirghs').appendChild(csub);
		createsubo(csub, subsp);
	}
	createbox_filter();
}
function createbox_try() {
	try {
		loadsubs();
		createblah();
	}
	catch (err) {
		console.log("couldn't create createbox. trying again in 2.5 seconds.");
		var sw4g = setTimeout(function () { createbox_try() }, 2500);
	}
}
function createbox_filter() {
	// text-filter
	document.getElementById('asuirghs').innerHTML = "";
	for (var subsp = 0; subsp <= subs.length - 1; subsp++) {
		if (subs[subsp].name.toLowerCase().indexOf(document.getElementById('GROUP_CREATE_FILTER').value.toLowerCase()) != -1 && createbox_filterCheck(subsp)) {
			var csub = document.createElement('div');
			csub.setAttribute('id', 'GCREATE_' + subsp);
			csub.innerHTML = "<a href='#' id='GCREATE_" + subsp + "_S' type='" + subs[subsp].id + "'><div id='GCREATE_" + subsp + "_T'>" + subs[subsp].name + "</div></a>";
			document.getElementById('asuirghs').appendChild(csub);
			createsubo(csub, subsp);
		}
	}
}
function createbox_filterCheck(srgsargsarg) {
	var isValid = true;
	for (var acs = 0; acs <= document.getElementById('lkauhgrs').getElementsByTagName('a').length - 1; acs++) {
		if (document.getElementById('lkauhgrs').getElementsByTagName('a')[acs].getElementsByTagName('div')[0].innerHTML === subs[srgsargsarg].name) isValid = false;
	}
	// filters out the channels in the bottom thing that are already in groups but ONLY IF THING CHECKED
	if (document.getElementById('GROUP_CREATE_FILTER_USEDCHANNELS').checked) {
		for (var grpo = 0; grpo <= sumem[0].groups.length - 1; grpo++) {
			for (var chpoi = 0; chpoi <= sumem[0].groups[grpo].channels.length - 1; chpoi++) {
				if (subs[srgsargsarg].id === sumem[0].groups[grpo].channels[chpoi]) isValid = false;
			}
		}
	}
	return isValid;
}

// delete
function groupDelete(groupname) {
	for(var ap = 0; ap <= sumem[0].groups.length - 1; ap++) {
		if(sumem[0].groups[ap].name === groupname) {
			sumem[0].groups.remove(ap);
			ap = sumem[0].groups.length;
		}
	}
	chrome.storage.local.set({suop: JSON.stringify(sumem)});
}
function deleteShow() {
	document.getElementById('GROUP_DELETE_SELECTOR').style.display = "block";
	document.getElementById('GROUP_CREATE_SELECTOR').style.display = "none";
	document.getElementById('GROUP_EDIT_SELECTOR').style.display = "none";
	document.getElementById('GROUP_MOD_SELECTOR').style.display = "none";
}
function deleteReload() {
	deletebox_try();
}
function deletebox() {
	document.getElementById('group_container').innerHTML = "";
	for (var cdp = 0; cdp <= sumem[0].groups.length - 1; cdp++) {
		var cdge = document.createElement('div'); // channel delete group element
		cdge.setAttribute('class', 'gdel');
		cdge.setAttribute('value', sumem[0].groups[cdp].name);
		cdge.innerHTML = sumem[0].groups[cdp].name + "<a id='GDEL_" + cdp + "' href='#'><div style='float: right; padding-right: 15px'>X</div></a>";
		document.getElementById('group_container').appendChild(cdge);
		deleteboxEvents(cdp); // go to declaration for explanation (ayylmao rhymes)
	}
	editbox_try();
	modbox_try();
}
function deletebox_try() {
	try {
		deletebox();
	}
	catch (err) {
		console.log("couldn't grab groups. trying again in 2.5 seconds.");
		var sw4g = setTimeout(function () { deletebox_try() }, 2500);
	}
}

// rearrange (edit originally made because I was going to make the rearranging & modify feature a single feature
function editShow() {
	document.getElementById('GROUP_DELETE_SELECTOR').style.display = "none";
	document.getElementById('GROUP_CREATE_SELECTOR').style.display = "none";
	document.getElementById('GROUP_EDIT_SELECTOR').style.display = "block";
	document.getElementById('GROUP_MOD_SELECTOR').style.display = "none";
}
function editReload() {
	editbox_try();
}
function editbox() {
	document.getElementById('GROUP_EDIT_GROUPS').innerHTML = "";
	for (var cep = 0; cep <= sumem[0].groups.length - 1; cep++) {
		var cege = document.createElement('div'); // channel edit group element
		cege.setAttribute('class', 'group_editable');
		cege.innerHTML = "<a href='#' id='GEDIT_" + cep + "'>" + sumem[0].groups[cep].name + "</a> <div class='group_edits'><a href='#' class='group_edits' id='GEDIT_" + cep + "_UP'>&uarr;</a><a href='#' class='group_edits' id='GEDIT_" + cep + "_DOWN'>&darr;</a></div>";
		document.getElementById('GROUP_EDIT_GROUPS').appendChild(cege);
		editboxEvents(cep);
	}
	modbox_try();
}
function editbox_try() {
	try {
		editbox();
	}
	catch (err) {
		console.log("couldn't grab edit groups. trying again in 2.5 seconds.");
		var sw4g = setTimeout(function () { editbox_try() }, 2500);
	}
}

// modify
function modSubmit() {
	var gprename, gname, gchannels = [];
	gprename = document.getElementById('GROUP_MOD_GROUPS').value;
	gname = document.getElementById('GROUP_MOD_NAME').value;
	for (var gcp = 0; gcp <= document.getElementById('lkauhgrs2').getElementsByTagName('a').length - 1; gcp++) {
		if (document.getElementById('lkauhgrs2').getElementsByTagName('a')[gcp].type != "")
		gchannels.push(document.getElementById('lkauhgrs2').getElementsByTagName('a')[gcp].type);
	}
	if (gname.indexOf('"') === -1 && gname.indexOf("'") === -1 && gname.indexOf('\\') === -1) {
		groupDelete(gprename);
		groupNew(gname, gchannels);
		if (gprename === gname) {
			document.getElementById('GROUP_MOD_RESPONSE').innerHTML = "Group '" + gprename + "' has been modified. Refresh the YouTube page to see its effect.";
		}
		else {
			document.getElementById('GROUP_MOD_RESPONSE').innerHTML = "Group '" + gprename + "' has been modified (now called '" + gname + "'). Refresh the page to see its effect.";
		}

		modbox();
		// was trying to make it so that when you modified the group it would go straight back to that group once modified but it wouldn't work for some reason :(
		//document.getElementById('GROUP_MOD_GROUPS').value = gname;
		//modUpdate();
	} else {
		document.getElementById('GROUP_MOD_RESPONSE').innerHTML = "An illegal character was used in the title (\", \', \\). The group has not been modified.";
	}
	editbox_try();
	deletebox_try();
}
function modShow() {
	document.getElementById('GROUP_MOD_SELECTOR').style.display = "block";
	document.getElementById('GROUP_CREATE_SELECTOR').style.display = "none";
	document.getElementById('GROUP_DELETE_SELECTOR').style.display = "none";
	document.getElementById('GROUP_EDIT_SELECTOR').style.display = "none";
}
function modUpdate() {
	var cgrindex;
	for (var curgp = 0; curgp <= sumem[0].groups.length - 1; curgp++) {
		if (document.getElementById('GROUP_MOD_GROUPS').value === sumem[0].groups[curgp].name) {
			cgrindex = curgp;
		}
	}
	modbox();
	document.getElementById('GROUP_MOD_GROUPS').value = sumem[0].groups[cgrindex].name;
	document.getElementById('GROUP_MOD_NAME').value = sumem[0].groups[cgrindex].name;
	for (var grchp = 0; grchp <= sumem[0].groups[cgrindex].channels.length - 1; grchp++) {
		for (var chnlp = 0; chnlp < document.getElementById('asuirghs2').getElementsByTagName('a').length; chnlp++) {
			if (document.getElementById('asuirghs2').getElementsByTagName('a')[chnlp].type === sumem[0].groups[cgrindex].channels[grchp]) {
				document.getElementById('asuirghs2').getElementsByTagName('a')[chnlp].click();
			} 
		}
	}
	//if (document.getElementById("lkauhgrs2").children.length != sumem[0].groups[cgrindex].channels.length) {
	//	
	//}

}
function modbox() {
	document.getElementById('lkauhgrs2').innerHTML = "";
	document.getElementById('asuirghs2').innerHTML = "";
	document.getElementById('GROUP_MOD_GROUPS').innerHTML = "";
	for (var grp = 0; grp <= sumem[0].groups.length - 1; grp++) {
		var sge = document.createElement('option');
		sge.setAttribute('value', sumem[0].groups[grp].name);
		sge.innerHTML = sumem[0].groups[grp].name;
		document.getElementById('GROUP_MOD_GROUPS').appendChild(sge);
	}
	for (var subsp = 0; subsp <= subs.length - 1; subsp++) {
		var csub = document.createElement('div');
		csub.setAttribute('id', 'GMOD_' + subsp);
		csub.innerHTML = "<a href='#' id='GMOD_" + subsp + "_S' type='" + subs[subsp].id + "'><div id='GMOD_" + subsp + "_T'>" + subs[subsp].name + "</div></a>";
		document.getElementById('asuirghs2').appendChild(csub);
		modsubo(csub, subsp);
	}
}
function modbox_try() {
	try {
		loadsubs();
		modbox();
		modUpdate();
	}
	catch (err) {
		console.log("couldn't create modbox. trying again in 2.5 seconds. " + err.message);
		var sw4g = setTimeout(function () { modbox_try() }, 2500);
	}
}
function modbox_filter() {
	document.getElementById('asuirghs2').innerHTML = "";
	for (var subsp = 0; subsp <= subs.length - 1; subsp++) {
		if (subs[subsp].name.toLowerCase().indexOf(document.getElementById('GROUP_MOD_FILTER').value.toLowerCase()) != -1 && modbox_filterCheck(subsp)) {
			var csub = document.createElement('div');
			csub.setAttribute('id', 'GMOD_' + subsp);
			csub.innerHTML = "<a href='#' id='GMOD_" + subsp + "_S' type='" + subs[subsp].id + "'><div id='GMOD_" + subsp + "_T'>" + subs[subsp].name + "</div></a>";
			document.getElementById('asuirghs2').appendChild(csub);
			modsubo(csub, subsp);
		}
	}
}
function modbox_filterCheck(bsgrasdrh) {
	var isValid = true;
	for (var acs = 0; acs <= document.getElementById('lkauhgrs2').getElementsByTagName('a').length - 1; acs++) {
		if (document.getElementById('lkauhgrs2').getElementsByTagName('a')[acs].getElementsByTagName('div')[0].innerHTML === subs[bsgrasdrh].name) isValid = false;
	}
	// filters out the channels in the bottom thing that are already in groups but ONLY IF THING CHECKED
	if (document.getElementById('GROUP_MOD_FILTER_USEDCHANNELS').checked) {
		for (var grpo = 0; grpo <= sumem[0].groups.length - 1; grpo++) {
			for (var chpoi = 0; chpoi <= sumem[0].groups[grpo].channels.length - 1; chpoi++) {
				if (subs[bsgrasdrh].id === sumem[0].groups[grpo].channels[chpoi]) isValid = false;
			}
		}
	}
	return isValid;
}
deletebox_try();
createbox_try();
modbox_try();


// everything below this line relates to event listeners

document.getElementById('GROUP_CREATE_SUBMIT').addEventListener('click', createSubmit);
document.getElementById('GROUP_DELETE_RELOAD').addEventListener('click', deleteReload);
document.getElementById('GROUP_EDIT_RELOAD').addEventListener('click', editReload);
document.getElementById('GROUP_MOD_SUBMIT').addEventListener('click', modSubmit);
document.getElementById('GROUP_MOD_GROUPS').addEventListener('change', modUpdate);
document.getElementById('GROUP_CREATE').addEventListener('click', createShow);
document.getElementById('GROUP_DELETE').addEventListener('click', deleteShow);
document.getElementById('GROUP_EDIT').addEventListener('click', editShow);
document.getElementById('GROUP_MOD').addEventListener('click', modShow);
document.getElementById('GROUP_CREATE_FILTER').addEventListener('keyup', createbox_filter);
document.getElementById('GROUP_CREATE_FILTER_USEDCHANNELS').addEventListener('change', createbox_filter);
document.getElementById('GROUP_MOD_FILTER_USEDCHANNELS').addEventListener('change', modbox_filter);
document.getElementById('GROUP_MOD_FILTER').addEventListener('keyup', modbox_filter);

function deleteboxEvents(ass) {
	document.getElementById('GDEL_' + ass).addEventListener('click', function () {
		console.log('deleting current group by name: ' + sumem[0].groups[ass].name);
		groupDelete(sumem[0].groups[ass].name);
		deletebox_try();
	});
}
function editboxEvents(ass) {
	if (ass != 0) {
		document.getElementById('GEDIT_' + ass + '_UP').addEventListener('click', function () {
			console.log('moving group ' + sumem[0].groups[ass].name + ' in direction up');
			sumem[0].groups.move(ass, ass - 1);
			editbox_try();
			chrome.storage.local.set({ suop: JSON.stringify(sumem) });
		});
	}
	if (ass != sumem[0].groups.length - 1) {
		document.getElementById('GEDIT_' + ass + '_DOWN').addEventListener('click', function () {
			console.log('moving group ' + sumem[0].groups[ass].name + ' in direction down');
			sumem[0].groups.move(ass, ass + 1);
			editbox_try();
			chrome.storage.local.set({ suop: JSON.stringify(sumem) });
		});
	}
}
function createsubo(csubo, subspo) {
	document.getElementById('GCREATE_' + subspo + '_S').addEventListener('click', function (event) {
		event.stopPropagation();
		if (event.target.id === 'GCREATE_' + subspo + '_T') {		
			if (csubo.parentNode == document.getElementById('asuirghs')) {
				document.getElementById('lkauhgrs').appendChild(csubo);
			}
			else {
				document.getElementById('asuirghs').appendChild(csubo);
			}
		}
	});
	document.getElementById('GCREATE_' + subspo + '_T').addEventListener('mouseenter', function () {
		document.getElementById('GCREATE_' + subspo + '_T').innerHTML += " <a href='https://www.youtube.com/channel/"+subs[subspo].id.replace("-guide-item", "")+"' target='_blank' style='font-size: 10pt; text-decoration: underline; color: #00e'><i>go to channel</i></a>";
	});
	document.getElementById('GCREATE_' + subspo + '_T').addEventListener('mouseleave', function () {
		document.getElementById('GCREATE_' + subspo + '_T').innerHTML = subs[subspo].name;
	});
}
function modsubo(csubo, subspo) {
	document.getElementById('GMOD_' + subspo + '_S').addEventListener('click', function (event) {
		if (event.isTrusted) { // i dont know if this is bad or not but it solves my problem with click() so |8^D
			event.stopPropagation();
			if (event.target.id === 'GMOD_' + subspo + '_T') {		
				if (csubo.parentNode == document.getElementById('asuirghs2')) {
					document.getElementById('lkauhgrs2').appendChild(csubo);
				}
				else {
					document.getElementById('asuirghs2').appendChild(csubo);
				}
			}
		} else {
			if (csubo.parentNode == document.getElementById('asuirghs2')) {
				document.getElementById('lkauhgrs2').appendChild(csubo);
			}
			else {
				document.getElementById('asuirghs2').appendChild(csubo);
			}
		}
	});
	document.getElementById('GMOD_' + subspo + '_T').addEventListener('mouseenter', function () {
		document.getElementById('GMOD_' + subspo + '_T').innerHTML += " <a href='https://www.youtube.com/channel/"+subs[subspo].id.replace("-guide-item", "")+"' target='_blank' style='font-size: 10pt; text-decoration: underline; color: #00e'><i>go to channel</i></a>";
	});
	document.getElementById('GMOD_' + subspo + '_T').addEventListener('mouseleave', function () {
		document.getElementById('GMOD_' + subspo + '_T').innerHTML = subs[subspo].name;
	});
}