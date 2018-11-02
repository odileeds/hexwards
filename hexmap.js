/*!
 * stuQuery v1.0.3
 */
var eventcache={};function S(g){function d(m,e){var s=new Array();var q,r,p,n,l,o;if(e.indexOf(":eq")>=0){q=e.split(" ");for(p=0;p<q.length;p++){if(p==0){o=i(m,q[p])}else{r=new Array();for(n=0;n<o.length;n++){r=r.concat(i(o[n],q[p]))}o=r.splice(0)}}}else{o=m.querySelectorAll(e)}for(l=0;l<o.length;l++){s.push(o[l])}return s}function i(q,p){var o=-1;var n=new Array();if(p.indexOf(":eq")>0){var l=p.replace(/(.*)\:eq\(([0-9]+)\)/,"$1 $2").split(" ");p=l[0];o=parseInt(l[1])}if(p[0]=="."){els=q.getElementsByClassName(p.substr(1))}else{if(p[0]=="#"){els=q.getElementById(p.substr(1))}else{els=q.getElementsByTagName(p)}}if(!els){els=[]}if(els.nodeName&&els.nodeName=="SELECT"){n.push(els)}else{if(typeof els.length!=="number"){els=[els]}for(k=0;k<els.length;k++){n.push(els[k])}if(o>=0&&n.length>0){if(o<n.length){n=[n[o]]}else{n=[]}}}return n}function c(o,n){var l=false;if(n[0]=="."){n=n.substr(1);for(var m=0;m<o.classList.length;m++){if(o.classList[m]==n){return true}}}else{if(n[0]=="#"){if(o.id==n.substr(1)){return true}}else{if(o.tagName==n.toUpperCase()){return true}}}return false}function f(e){var m;if(typeof e==="string"){this.e=d(document,e)}else{if(typeof e==="object"){this.e=(typeof e.length=="number")?e:[e]}}for(var l in this.e){this[l]=this.e[l]}this.length=(this.e?this.e.length:0);return this}f.prototype.ready=function(e){/in/.test(document.readyState)?setTimeout("S(document).ready("+e+")",9):e()};f.prototype.html=function(l){if(typeof l==="number"){l=""+l}if(typeof l!=="string"&&this.length==1){return this[0].innerHTML}if(typeof l==="string"){for(var e=0;e<this.length;e++){this[e].innerHTML=l}}return this};f.prototype.append=function(l){if(!l&&this.length==1){return this[0].innerHTML}if(l){for(var e=0;e<this.length;e++){this[e].innerHTML+=l}}return this};f.prototype.prepend=function(l){if(!l&&this.length==1){return this[0].innerHTML}if(l){for(var m=0;m<this.length;m++){this[m].innerHTML=l+this[m].innerHTML}}return this};f.prototype.before=function(n){var p=document.createElement("div");p.innerHTML=n;var o=p.childNodes;for(var m=0;m<el.length;m++){for(var l=0;l<o.length;l++){el[m].parentNode.insertBefore(o[l],el[m])}}return this};f.prototype.after=function(l){for(var e=0;e<this.length;e++){this[e].insertAdjacentHTML("afterend",l)}return this};function b(e,m){if(e&&e.length>0){for(var l=0;l<e.length;l++){if(e[l].node==m){return{success:true,match:l}}}}return{success:false}}function j(p,n,m,l,o){if(!eventcache[n]){eventcache[n]=new Array()}eventcache[n].push({node:p,fn:m,fn2:l,data:o})}function h(n){if(eventcache[n.type]){var l=b(eventcache[n.type],n.currentTarget);if(l.success){if(l.match.data){n.data=eventcache[n.type][l.match].data}return{fn:eventcache[n.type][l.match].fn,data:n}}}return function(){return{fn:""}}}f.prototype.off=function(n){if(typeof Element.prototype.removeEventListener!=="function"){Element.prototype.removeEventListener=function(t,q){if(!oListeners.hasOwnProperty(t)){return}var p=oListeners[t];for(var m=-1,o=0;o<p.aEls.length;o++){if(p.aEls[o]===this){m=o;break}}if(m===-1){return}for(var s=0,r=p.aEvts[m];s<r.length;s++){if(r[s]===q){r.splice(s,1)}}}}for(var l=0;l<this.length;l++){var e=b(eventcache[n],this.e[l]);if(e.success){this[l].removeEventListener(n,eventcache[n][e.match].fn2,false);eventcache[n].splice(e.match,1)}}return this};f.prototype.on=function(n,o,m){n=n||window.event;this.cache=[4,5,6];if(typeof o==="function"&&!m){m=o;o=""}if(typeof m!=="function"){return this}if(this.length>0){var p=this;var e=function(q){var r=h({currentTarget:this,type:n,data:o,originalEvent:q,preventDefault:function(){if(q.preventDefault){q.preventDefault()}},stopPropagation:function(){if(q.stopImmediatePropagation){q.stopImmediatePropagation()}if(q.stopPropagation){q.stopPropagation()}if(q.cancelBubble!=null){q.cancelBubble=true}}});if(typeof r.fn==="function"){return r.fn.call(p,r.data)}};for(var l=0;l<this.length;l++){j(this[l],n,m,e,o);if(this[l].addEventListener){this[l].addEventListener(n,e,false)}else{if(this[l].attachEvent){this[l].attachEvent(n,e)}}}}return this};f.prototype.trigger=function(n){var m;if(document.createEvent){m=document.createEvent("HTMLEvents");m.initEvent(n,true,true)}else{m=document.createEventObject();m.eventType=n}m.eventName=n;for(var l=0;l<this.length;l++){if(document.createEvent){this[l].dispatchEvent(m)}else{this[l].fireEvent("on"+m.eventType,m)}}return this};f.prototype.focus=function(){if(this.length==1){this[0].focus()}return this};f.prototype.blur=function(){if(this.length==1){this[0].blur()}return this};f.prototype.remove=function(){if(this.length<1){return this}for(var e=this.length-1;e>=0;e--){if(!this[e]){return}if(typeof this[e].remove==="function"){this[e].remove()}else{if(typeof this[e].parentElement.removeChild==="function"){this[e].parentElement.removeChild(this[e])}}}return this};f.prototype.hasClass=function(l){var e=true;for(var m=0;m<this.length;m++){if(!this[m].className.match(new RegExp("(\\s|^)"+l+"(\\s|$)"))){e=false}}return e};f.prototype.toggleClass=function(e){for(var l=0;l<this.length;l++){if(this[l].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this[l].className=this[l].className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g")," ").replace(/ $/,"")}else{this[l].className=(this[l].className+" "+e).replace(/^ /,"")}}return this};f.prototype.addClass=function(e){for(var l=0;l<this.length;l++){if(!this[l].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this[l].className=(this[l].className+" "+e).replace(/^ /,"")}}return this};f.prototype.removeClass=function(e){for(var l=0;l<this.length;l++){while(this[l].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this[l].className=this[l].className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g")," ").replace(/ $/,"").replace(/^ /,"")}}return this};f.prototype.css=function(n){var p;for(var m=0;m<this.length;m++){p={};var o=this[m].getAttribute("style");if(o){var r=this[m].getAttribute("style").split(";");for(var l=0;l<r.length;l++){var q=r[l].split(":");if(q.length==2){p[q[0]]=q[1]}}}if(typeof n==="object"){for(key in n){p[key]=n[key]}var e="";for(key in p){if(e){e+=";"}if(p[key]){e+=key+":"+p[key]}}this[m].setAttribute("style",e)}}if(this.length==1&&typeof n==="string"){return p[n]}return this};f.prototype.parent=function(){var l=[];for(var e=0;e<this.length;e++){l.push(this[e].parentElement)}return S(l)};f.prototype.children=function(n){if(typeof n==="string"){var e=[];for(var l=0;l<this.length;l++){for(var m=0;m<this[l].children.length;m++){if(c(this[l].children[m],n)){e.push(this[l].children[m])}}}return S(e)}else{for(var l=0;l<this.length;l++){this[l]=(this[l].children.length>n?this[l].children[n]:this[l])}return this}};f.prototype.find=function(l){var n=[];var e=new Array();for(var m=0;m<this.length;m++){e=e.concat(d(this[m],l))}return S(e)};function a(q,e,r,l){var p=[];for(var o=0;o<q.length;o++){p.push(q[o].getAttribute(e));var n=false;for(var m in l){if(typeof r===l[m]){n=true}}if(n){if(r){q[o].setAttribute(e,r)}else{q[o].removeAttribute(e)}}}if(p.length==1){p=p[0]}if(typeof r==="undefined"){return p}else{return q}}f.prototype.attr=function(e,l){return a(this,e,l,["string","number"])};f.prototype.prop=function(e,l){return a(this,e,l,["boolean"])};f.prototype.clone=function(){var e=document.createElement("div");e.appendChild(this[0].cloneNode(true));return e.innerHTML};f.prototype.replaceWith=function(l){var m=document.createElement("span");m.innerHTML=l;var n=S(this.e);for(var e=0;e<this.length;e++){n[0].parentNode.replaceChild(m,n[0])}return n};f.prototype.ajax=function(n,m){if(typeof n!=="string"){return false}if(!m){m={}}m.url=n+(typeof m.cache==="boolean"&&!m.cache?"?"+(new Date()).valueOf():"");var p=(window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");p.addEventListener("load",e);p.addEventListener("error",l);function e(q){if(p.status===200){m.header=p.getAllResponseHeaders();if(typeof m.complete==="function"){m.complete.call((m["this"]?m["this"]:this),(m.dataType=="json")?JSON.parse(p.responseText):p.responseText,m)}}else{l(q)}}function l(q){if(typeof m.error==="function"){m.error.call((m["this"]?m["this"]:this),q,m)}}try{p.open("GET",n)}catch(o){l(o)}try{p.send()}catch(o){l(o)}return this};f.prototype.loadJSON=function(l,m,e){if(!e){e={}}e.dataType="json";e.complete=m;this.ajax(l,e);return this};return new f(g)};

/*!
* ODI Leeds Hex Map (version 1)
*/
var map;

function WardMap(w,cities){
	if(typeof w==="string") w = JSON.parse(w);
	if(typeof cities!=="object") var cities = ['Leeds','Bradford'];

	this.lookup = {};
	this.wards = w;
	this.cities = cities;

	for(city in this.wards){
		for(var i = 0; i < this.wards[city].wards.length; i++){
			obj = this.wards[city].wards[i];
			obj.code = this.wards[city].wards[i].id;
			obj.city = city;
			//this.lookup[this.wards[city].wards[i].id] = obj;
			this.lookup[this.wards[city].wards[i].n[1]] = obj;
		}
	}
	this.lookup['Total'] = {"code":"Total"};

	// Create ourselves an empty stylesheet that we can update later
	S('body').append('<style id="wardstylesheet"></style>');

	this.update();
	return this;
}
WardMap.prototype.update = function(cities){
	if(typeof cities==="object") this.cities = cities;
	this.setRange().buildWards();
	return this;
}
WardMap.prototype.setRange = function(){
	var xmx = 0;
	var xmn = -1;
	var ymx = 0;
	var ymn = -1;
	for(city in this.wards){
		for(var c = 0; c < this.cities.length; c++){
			if(this.cities[c] == city){
				for(var i = 0; i < this.wards[city].wards.length; i++){
					y = this.wards[city].wards[i].y + this.wards[city].y;
					x = this.wards[city].wards[i].x + this.wards[city].x;
					if(x > xmx) xmx = x;
					if(x < xmn || xmn < 0) xmn = x;
					if(y > ymx) ymx = y;
					if(y < ymn || ymn < 0) ymn = y;
				}
			}
		}
	}
	if(xmn%2==1) xmn--;
	if(ymn%2==1) ymn--;
	//ymx -= 0.5;
	if(ymn < 1) ymn++;

	this.range = {'xmn':xmn,'xmx':xmx,'ymn':ymn,'ymx':ymx};
	return this;
}
WardMap.prototype.buildWards = function(){
	var html = "";
	var css = "";
	for(city in this.wards){
		for(var c = 0; c < this.cities.length; c++){
			if(this.cities[c] == city){
				for(var i = 0; i < this.wards[city].wards.length; i++){
					y = this.wards[city].wards[i].y + this.wards[city].y - this.range.ymn;
					x = this.wards[city].wards[i].x + this.wards[city].x - this.range.xmn;
					html += '<li class="'+this.wards[city].wards[i].id+' '+this.wards[city].wards[i].n[0]+' hextile"><a href="#data" class="hex"><div class="hexcontent"><span class="name" title="'+this.wards[city].wards[i].n[1]+'">'+this.wards[city].wards[i].n[1]+'</span><span class="n"></span></div></a></li>';
					css += '.'+this.wards[city].wards[i].id+' { left:'+(2.25*(x))+'em; bottom: '+(2.5*(y-0.5))+'em;'+(x%2==0 ? ' margin-bottom: 1.25em!important;':'')+' }';
				}
			}
		}
	}
	x = 0;
	y = 0;
	html += '<li class="Total hextile"><a href="#data" class="hex"><div class="hexcontent"><span class="name" title="Total">Total</span><span class="n"></span></div></a></li>';
	css += '.Total { left:'+(2.25*(x))+'em; bottom: '+(2.5*(y-0.5))+'em;'+(x%2==0 ? ' margin-bottom: 1.25em!important;':'')+' }';
	
	css += '.hexmap { height: '+((this.range.ymx-this.range.ymn + 1)*2.5)+'em; width:'+((this.range.xmx-this.range.xmn + 1.25)*2.25)+'em; }';
	S('#wardstylesheet').html(css);
	S('.hexmap').html(html)

	return this;
}


function HexMap(inp){

	this.data;
	this.responses = {};
	this.db = new Array();
	if(!inp) return this;

	this.wards = new WardMap(inp,['Leeds','Bradford']);

	var wards = this.wards.lookup;

	this.scales = {
		'ODI': 'rgb(114,46,165) 0%, rgb(230,0,124) 50%, rgb(249,188,38) 100%',
		'Heat': 'rgb(0,0,0) 0%, rgb(128,0,0) 25%, rgb(255,128,0) 50%, rgb(255,255,128) 75%, rgb(255,255,255) 100%',
		'Planck': 'rgb(0,0,255) 0, rgb(0,112,255) 16.666%, rgb(0,221,255) 33.3333%, rgb(255,237,217) 50%, rgb(255,180,0) 66.666%, rgb(255,75,0) 100%',
		'Viridis8': 'rgb(122,76,139) 0, rgb(124,109,168) 12.5%, rgb(115,138,177) 25%, rgb(107,164,178) 37.5%, rgb(104,188,170) 50%, rgb(133,211,146) 62.5%, rgb(189,229,97) 75%, rgb(254,240,65) 87.5%',
		'Plasma': 'rgb(12,7,134) 0, rgb(82,1,163) 12.5%, rgb(137,8,165) 25%, rgb(184,50,137) 37.5%, rgb(218,90,104) 50%, rgb(243,135,72) 62.5%, rgb(253,187,43) 75%, rgb(239,248,33) 87.5%',
		'Population': 'rgb(232,173,170) -1000, rgb(232, 173, 170) 0, rgb(255,​243,128) 0, rgb(135,247,23) 4, rgb(76,196,23) 11, rgb(52,128,23) 50',
		'Referendum': '#4BACC6 0, #B6DDE8 50%, #FFF380 50%, #FFFF00 100%',
	}


	// Do we update the address bar?
	this.pushstate = !!(window.history && history.pushState);
	var _obj = this;
	window.addEventListener('resize',function(e){ _obj.resize(); });
	window[(this.pushstate) ? 'onpopstate' : 'onhashchange'] = function(e){ _obj.navigate(e); };

	function parseQueryString(){
		var r = {};
		var q = location.search;
		if(q && q != '#'){
			// remove the leading ? and trailing &
			q = q.replace(/^\?/,'').replace(/\&$/,'');
			var qs = q.split('&');
			for(var i = 0; i < qs.length; i++){
				var key = qs[i].split('=')[0];
				var val = qs[i].split('=')[1];
				if(/^[0-9\.]+$/.test(val)) val = parseFloat(val);	// convert floats
				r[key] = val;
			}
		}
		this.testmode = (r['debug']) ? true : false;
		for(u in this.defaults){
			if(r[u]) this.defaults[u] = r[u];
		}
		return r;
	}
	
	// Escape HTML characters
	function htmlDecode(input){
		if(typeof input==="undefined") return;
		var d = document.createElement('div');
		d.innerHTML = decodeURIComponent( (input+'').replace(/\+/g, '%20').replace(/%,/g,"PERCENTCOMMA").replace(/\%$/g, 'PERCENT') ).replace(/PERCENTCOMMA/g,"%,").replace(/PERCENT/g,"%");
		return d.innerHTML;
	}

	this.setVals = function(){
		this.query = parseQueryString();
		this.title = htmlDecode(this.query.title);
		this.url = htmlDecode(this.query.url);
		this.cols = { 'ward': htmlDecode(this.query.ward), 'categories': htmlDecode(this.query.categories), 'col': htmlDecode(this.query.col), 'count': (this.query.count=="true" ? true : false), 'categorylist': false };

		// Use user-provided colour
		this.colour = htmlDecode(this.query.colour) || 'rgb(246,136,31)';

		this.palette = htmlDecode(this.query.palette);

		//this.processURL();

		for(var c in this.scales){
			if(c == this.palette){
				this.colour = this.scales[c];
				continue;
			}
		}
		return this;
	}
	this.processURL = function(){

		// A data set will exist at a URL e.g. http://datamillnorth.org/dataset/home-fire-safety-checks
		// We can get the metadata from e.g. http://datamillnorth.org/api/action/package_show?id=home-fire-safety-checks

		var protocol = this.url.indexOf("://");
		this.datastore = this.url.substr(0,protocol + 3 + this.url.substr(protocol+3).indexOf('/'))
		// Assume everything is under "dataset/"
		this.packageID = this.url.substring(this.url.indexOf("dataset/")+8);
		
		if(!this.responses[this.packageID]){
			S('#msg').html('Getting data set header <div class="spinner"></div>');
			S(document).ajax(this.datastore+'/api/action/package_show?id='+this.packageID,{
				'complete': this.loadedPackage,
				'error': this.failLoad,
				'this': this
			});
		}else this.loadedPackage(this.responses[this.query.ID].header);

		
		return this;
	}
	
	this.loadedPackage = function(d){
		//console.log(d)
	}
	
	
	this.setTitle = function(){
		S('.value_title').html((this.query.url ? '<a href="'+htmlDecode(this.query.url)+'">':'')+(htmlDecode(this.query.title) || this.query.ID)+(this.query.url ? '</a>':''));
		S('title').html(htmlDecode(this.query.title) || this.query.ID);
		return this;	
	}
	this.setInputs = function(){

		// Set the URL field
		S('#url').attr('value',this.url);
		S('#title').attr('value',htmlDecode(this.query.title));

		// Set the data file ID
		S('#ID').attr('value',this.query.ID);
		if(S('#ward').e[0].nodeName=="INPUT") S('#ward').attr('value',this.cols.ward);
		if(S('#categories').e[0].nodeName=="INPUT") S('#categories').attr('value',this.cols.categories);
		S('#colour').attr('value',htmlDecode(this.query.colour));

		// Update palette list
		var c = S('#palette option');
		for(var i = 0; i < c.length; i++){
			if(S(c.e[i]).attr('value') == this.palette+'') S(c.e[i]).attr('selected','selected');
		}
		// Update dropdown list
		var c = S('#count option');
		for(var i = 0; i < c.length; i++){
			if(S(c.e[i]).attr('value') == this.cols.count+'') S(c.e[i]).attr('selected','selected');
		}
		// Process the available fields and turn the <input> for category and ward columns into <select>
		if(this.data && this.data.result) this.makeSelect('ward',this.data.result.fields,'id',this.cols.ward);
		if(this.data && this.data.result) this.makeSelect('categories',this.data.result.fields,'id',this.cols.categories);

		return this;
	}
	this.init = function(){
		this.setVals();
		this.setTitle();
		this.setInputs();
		return this;
	}

	this.init();

	function colExists(data,col){
		for(var i = 0; i < data.result.fields.length; i++){
			if(data.result.fields[i].id == col) return true;
		}
		return false;
	}

	this.navigate = function(e){
		var id = this.query.ID;
		this.init();
		if(id != this.query.ID) this.getHeader();
		else this.update();
		return this;
	}
	
	// Function that processes changes to form input/select fields
	this.change = function(e){
		this.updateParams();
		var href = location.href.split("?")[0];
		if(this.pushstate && !e){
			href = href+'?'+this.buildQueryString();
			history.pushState({},"Hexmap",href);
			this.validateInputs();
			this.updateCategories();
			this.update();
		}
		return this;
	}
	this.makeSelect = function(id,fields,key,selected){
		if(fields.length > 1){
			var select = '<select id="'+id+'" name="'+id+'">';
			for(var f = 0; f < fields.length; f++) select += '<option value="'+fields[f][key]+'"'+(selected && selected==fields[f][key] ? ' selected="selected"':'')+'>'+fields[f][key]+'</option>';
			select += '</select>';
			S('#'+id).replaceWith(select);
			//S('#'+id).on('change',{me:this},function(e){ e.data.me.change(); });
		}
		return this;
	}
	// Build the query string
	this.buildQueryString = function(){
		var str = "";
		var els = S('#hexmapform input[type=text]');
		for(var i = 0; i < els.length; i++) str += (str ? '&':'')+S(els.e[i]).attr('id')+'='+els.e[i].value.replace(/#/g,'%23').replace(/\%/g,'%25');
		var els = S('#hexmapform select');
		for(var i = 0; i < els.length; i++){
			if(els.e[i].value) str += (str ? '&':'')+els.e[i].getAttribute('id')+'='+els.e[i].value.replace(/#/g,'%23').replace(/\%/g,'%25');
		}
		var els = S('#hexmapform input[type=hidden]');
		for(var i = 0; i < els.length; i++) str += (str ? '&':'')+S(els.e[i]).attr('id')+'='+els.e[i].value.replace(/#/g,'%23').replace(/\%/g,'%25');
		return str;
	}
	// Read the parameters from the form
	this.updateParams = function(){

		v = S('#ward').e[0].value;
		if(v) this.cols.ward = htmlDecode(v);

		v = S('#categories').e[0].value;
		if(v) this.cols.categories = htmlDecode(v);

		v = S('#colour').e[0].value;
		if(v) this.colour = htmlDecode(v);

		v = S('#count').e[0].value;
		if(v) this.cols.count = (v=="true" ? true: false);

		v = S('#palette').e[0].value;
		if(v) this.palette = htmlDecode(v);

		var v = S('#ID').e[0].value;
		if(v && v != this.query.ID){
			this.query.ID = v;
			this.setTitle();
			this.getHeader();
		}

		return this;
	}
	this.loadedHeader = function(data){
		if(!this.responses[this.query.ID]) this.responses[this.query.ID] = {'header':{}};
		this.responses[this.query.ID].header = data;

		data = JSON.parse(data);
		
		// We ask for all the records (up to a maximum of 100000)
		//this.setTitle();
		this.init();

		var n = Math.min(data.result.total,100000)
		S('#msg').html('Loading '+n+' records'+(n < data.result.total ? ' of '+data.result.total:'')+'&hellip;<div class="spinner"></div>');

		this.getRecords(n);
		
		return this;
	}

	this.loadedMetadata = function(data){
	
	}

	// First call will just return 1 record so we can get the metadata
	this.getHeader = function(){
		//console.log('getHeader',this.query.ID)

		this.setTitle();
		if(!this.responses[this.query.ID]){
			S('#msg').html('Getting data set header<div class="spinner"></div>');
			S(document).ajax('https://datamillnorth.org/api/action/datastore_search?resource_id='+this.query.ID+'&limit=1',{
				'complete': this.loadedHeader,
				'error': this.failLoad,
				'this': this
			});
		}else this.loadedHeader(this.responses[this.query.ID].header);
		return this;
	}
	this.failLoad = function(e){
		console.log('fail to load',this.query.ID,e)
		return this;
	}
	this.loadedRecords = function(data){
		this.responses[this.query.ID].body = data;
		data = JSON.parse(data);
		this.data = data;

		S('#msg').html('Loaded '+this.data.result.records.length+' records');
		setTimeout(function(){ S('#msg').html(''); },4000);

		this.setInputs();
		this.validateInputs();
		this.updateCategories();
		if(this.cols.categories && this.cols.ward){
			this.update();
		}

		// Create the data table
		var table = "<h2>Data table</h2><table>";
		table += '<tr>';
		for(var c = 0; c < this.data.result.fields.length; c++){
			table += '<th>'+this.data.result.fields[c].id+'</th>';
		}
		table += '</tr>';
		for(var i = 0; i < this.data.result.records.length; i++){
			table += '<tr>';
			for(var c = 0; c < this.data.result.fields.length; c++){
				table += '<td>'+this.data.result.records[i][this.data.result.fields[c].id]+'</td>';
			}
			table += '</tr>';
		}
		table += '</table>';
		S('#data').html(table);

		for(i in wards){
			S('.hexmap li.'+wards[i].code).on('click',{me:this,ward:wards[i]},function(e){
				var rows = S('#data table tr');
				var ward = matchWard(e.data.ward.code);
				for(var i = 0; i < e.data.me.wardrows.length; i++){
					S(rows.e[i+1]).attr('class',(e.data.me.wardrows[i] == ward ? 'show' : 'hide'));
				}
			});
		}

		return this;
	}
	this.validateInputs = function(){

		var line,i,j,n;
		var data = this.data;

		// If we've not defined the ward column by here, we try to auto identify it
		if(typeof this.cols.ward==="undefined"){
			for(i = 0; i < data.result.fields.length; i++){
				if(data.result.fields[i].id.search(/(^|\b)ward/i) >= 0 && data.result.fields[i].type=="varchar") this.cols.ward = data.result.fields[i].id;
			}
		}
		// Check if the column type for the categories is char
		if(typeof this.cols.categories){
			this.cols.categorylist = false;
			for(i = 0; i < data.result.fields.length; i++){
				if(data.result.fields[i].id == this.cols.categories){
					this.cols.categorylist = (data.result.fields[i].type=="varchar");
				}
			}
		}
		if(this.cols.categorylist) this.cols.count = true;

		// Sanitise data
		// 1) Do the columns exist?
		var showconfig = false;
		if(!colExists(data,this.cols.categories)){
			S('#categories').addClass('error');
			showconfig = true;
			this.cols.categories = "";
		}
		if(!colExists(data,this.cols.ward)){
			S('#ward').addClass('error');
			showconfig = true;
			this.cols.ward = "";
		}
		if(showconfig) S('#setup').removeClass('hide');
		else S('#setup').addClass('hide');

		return this;
	}
	this.updateCategories = function(){
		var data = this.data;
		var i,html,row;
		this.db = new Array();
		var categories = new Array();
		var typ = S('#category').e[0].value;
		if(this.cols.categories && this.cols.ward){
			for(i = 0; i < data.result.records.length; i++){
				row = data.result.records[i];

				// Inc No,Incident Type,Date,Time,District,Cause,Ward
				// 1547005758,Accidential Primary Fires,01/04/2015,10:18:24,Leeds,Other cause,City and Hunslet Ward
				if(row) this.db.push(row);
				if(this.cols.categorylist){
					j = row[this.cols.categories];
					if(!categories[j]) categories[j] = 0;
					categories[j]++;
				}
			}

			if(this.cols.categorylist){
				html = "";
				for(c in categories){
					html += '<option value="'+c+'"'+(typ && typ==c ? ' selected="selected"':'')+'>'+c+'</option>';
					if(!this.categories) this.categories = new Array();
					this.categories.push(c);
				}
				S('#category').html(html);
				S('#customise').css({'display':''});
			}else{
				S('#customise').css({'display':'none'});
				this.categories = new Array();
			}
		}
		return this;
	}
	this.getRecords = function(n){
		//console.log('getRecords',this.query.ID,this.responses[this.query.ID])
		if(!this.responses[this.query.ID].body){
			S(document).ajax('https://datamillnorth.org/api/action/datastore_search?resource_id='+this.query.ID+'&limit='+n,{
				'complete': this.loadedRecords,
				'error': this.failLoad,
				'this': this
			});
		}else this.loadedRecords(this.responses[this.query.ID].body);
	}
	
	// Create ourselves an empty stylesheet that we can update later
	S('body').append('<style id="customstylesheetmain"></style><style id="customstylesheet"></style>');

	// Set the spinner colour
	var c = window.getComputedStyle(S('body')[0])['color'];
	if(this.query.textcolor) c = window.getComputedStyle(S(document.createElement('div')).css({'color':this.query.textcolor})[0])['color'];
	if(c){
		var co = new Colour(c);
		c = co.rgb[0]+','+co.rgb[1]+','+co.rgb[2];
		S('#customstylesheetmain').html('.spinner { border-color: rgba('+c+', 1) rgba('+c+', 0) rgba('+c+', 0.333) rgba('+c+', 0.667); }');
	}


	// Listen for changes to the dropdown select box
	S('#category').on('change',{me:this},function(e){ e.data.me.change(); });
	S('#hexmapform').e[0].onsubmit = function(e){ e.preventDefault(); _obj.change(); return false; }

	function matchWard(w){
		if(!w || typeof w!=="string") return "";
		w = w.replace(/ Ward/,"").replace(/ +$/,"").toUpperCase();
		for(var name in wards){
			if(name.toUpperCase() == w || wards[name].code == w || wards[name].alt == w) return name;
		}
		return "";
	}
	
	this.update = function() {
		var typ = S('#category').e[0].value;
		this.setVals();
		var ok,v,i,id,w;
		var byward = { 'Total': 0 };
		this.wardrows = new Array(this.db.length);
		var count = {};
		var cities = new Array();

		for(i = 0; i < this.db.length; i++){
			w = matchWard(this.db[i][this.cols.ward]);
			if(this.wards.lookup[w]){
				if(!count[this.wards.lookup[w].city]) count[this.wards.lookup[w].city] = 0;
				count[this.wards.lookup[w].city]++;
			}
			if(w && !byward[w]) byward[w] = 0;
			ok = true;
			if(w) this.wardrows[i] = w;
			// If we have a set of categories and this row doesn't match the one selected we don't proceed
			if(this.categories.length > 0 && this.db[i][this.cols.categories] != typ) ok = false;
			if(ok){
				v = (this.cols.count) ? 1 : parseFloat(this.db[i][this.cols.categories]);
				if(isNaN(v)) v = 1;
				if(w){
					// Only include the data if a ward is provided
					byward[w] += v;
					byward['Total'] += v;
				}
			}
		}
		// Work out which cities we have
		for(var c in count){
			if(count[c] > 5) cities.push(c);
		}
		// Update the ward map
		this.wards.update(cities)

		var big = 1e50;
		var max = -big;
		var min = big;
		for(id in byward){
			if(byward[id] > max && id != "Total") max = byward[id];
			if(byward[id] < min && id != "Total") min = byward[id];
		}
		if(min == big || max == -big) return this;
		if(min > 0){ min = 0; }
		var css = "";
		var cs = this.extractColours(this.colour,min,max);

		for(i in wards){
			id = wards[i].code;
			v = (typeof byward[i]==="undefined" ? 0 : byward[i]);
			if(cs.length == 1) var colour = 'rgba('+cs[0].c.rgb[0]+', '+cs[0].c.rgb[1]+', '+cs[0].c.rgb[2]+', ' + v / max + ")";
			else{
				var colour = "";
				for(var c = 0; c < cs.length-1; c++){
					if(v >= cs[c].v){
						var pc = (v - cs[c].v)/(cs[c+1].v-cs[c].v);
						var a = cs[c].c;
						var b = cs[c+1].c;
						if(v > max) pc = 1;	// Don't go above colour range
						colour = 'rgb('+parseInt(a.rgb[0] + (b.rgb[0]-a.rgb[0])*pc)+','+parseInt(a.rgb[1] + (b.rgb[1]-a.rgb[1])*pc)+','+parseInt(a.rgb[2] + (b.rgb[2]-a.rgb[2])*pc)+')';
						continue;
					}
				}
			}
			var c2 = new Colour(colour);
			S('.'+id).find('.n').html(v + (typ ? '<span class="extra">&nbsp;&times; '+typ+'</span>':''))
			css += '.hexmap .hextile.'+id+' { background-color: '+colour+'; '+(cs.length > 1 ? 'color: '+c2.text:'')+'} .hexmap .hextile.'+id+':before, .hexmap .hextile.'+id+':after { border-color: '+colour+'; }';

		}
		css += '.mapholder .hexmap { font-size: '+(Math.round((typeof this.query.scale==="number" ? this.query.scale : 1)*document.body.offsetWidth/40))+'px; }';
		if(this.query.textcolor) css += 'body { color: '+this.query.textcolor+' }';
		S('#customstylesheet').html(css);
	}
	this.resize = function(){
		if(this.data) this.update();
		return this;
	}

	// Get the data
	if(this.query.ID) this.getHeader();
	
	S('#config').on('click',function(){
		S('#setup').toggleClass('hide');
		var t = this.attr('data-alt');
		var h = this.html();
		this.attr('data-alt',h).html(t);
	});

	// Send the colour stops as a string along with the minimum and maximum values
	this.extractColours = function(c,mn,mx){
		var stops = c.replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s\s/g," ").split(', ');
		var cs = new Array();
		for(var i = 0; i < stops.length; i++){
			var bits = stops[i].split(/ /);
			if(bits.length==2) cs.push({'v':bits[1],'c':new Colour(bits[0])})
			else if(bits.length==1) cs.push({'c':new Colour(bits[0])});
		}
		var r = mx-mn;
		for(var c=0; c < cs.length;c++){
			// If a colour-stop has a percentage value provided, 
			if(cs[c].v && cs[c].v.indexOf('%')>0) cs[c].v = (mn + parseFloat(cs[c].v)*r/100);
		}
		if(!cs[0].v) cs[0].v = mn; // Set the minimum value
		if(!cs[cs.length-1].v) cs[cs.length-1].v = mx; // Set the maximum value
		var skip = 0;
		// If a colour-stop doesn't have a specified position and it isn't the first
		// or last stop, then it is assigned the position that is half way between
		// the previous stop and next stop
		for(var c=1; c < cs.length;c++){
			// If we haven't got a value we increment our counter and move on
			if(!cs[c].v) skip++;
			// If we have a value and the counter shows we've skipped some
			// we now back-track and set them.
			if(cs[c].v && skip > 0){
				for(var d = 1; d <= skip ; d++){
					a = cs[c-skip-1].v;
					b = cs[c].v;
					cs[c-d].v = a + (b-a)*(skip-d+1)/(skip+1);
				}
				todo = 0;
			}
		}
		return cs;
	}
	
	// Define colour routines
	function Colour(c,n){
		if(!c) return {};

		function d2h(d) { return ((d < 16) ? "0" : "")+d.toString(16);}
		function h2d(h) {return parseInt(h,16);}
		/**
		 * Converts an RGB color value to HSV. Conversion formula
		 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
		 * Assumes r, g, and b are contained in the set [0, 255] and
		 * returns h, s, and v in the set [0, 1].
		 *
		 * @param   Number  r       The red color value
		 * @param   Number  g       The green color value
		 * @param   Number  b       The blue color value
		 * @return  Array           The HSV representation
		 */
		function rgb2hsv(r, g, b){
			r = r/255, g = g/255, b = b/255;
			var max = Math.max(r, g, b), min = Math.min(r, g, b);
			var h, s, v = max;
			var d = max - min;
			s = max == 0 ? 0 : d / max;
			if(max == min) h = 0; // achromatic
			else{
				switch(max){
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
				}
				h /= 6;
			}
			return [h, s, v];
		}

		this.alpha = 1;

		// Let's deal with a variety of input
		if(c.indexOf('#')==0){
			this.hex = c;
			this.rgb = [h2d(c.substring(1,3)),h2d(c.substring(3,5)),h2d(c.substring(5,7))];
		}else if(c.indexOf('rgb')==0){
			var bits = c.match(/[0-9\.]+/g);
			if(bits.length == 4) this.alpha = parseFloat(bits[3]);
			this.rgb = [parseInt(bits[0]),parseInt(bits[1]),parseInt(bits[2])];
			this.hex = "#"+d2h(this.rgb[0])+d2h(this.rgb[1])+d2h(this.rgb[2]);
		}else return {};
		this.hsv = rgb2hsv(this.rgb[0],this.rgb[1],this.rgb[2]);
		this.name = (n || "Name");
		var r,sat;
		for(r = 0, sat = 0; r < this.rgb.length ; r++){
			if(this.rgb[r] > 200) sat++;
		}
		this.text = (this.rgb[0] + this.rgb[1] + this.rgb[2] > 500 || sat > 1) ? "black" : "white";
		return this;
	}

	return this;
}

S(document).ready(function(){

	// Load the ward information
	S(document).ajax('wards.json',{
		'complete': function(w){
			map = new HexMap(w);
		},
		'error': function(e){},
		'this': this
	});


		
});
