/*!
* stuQuery version 1.0.1
*/
var eventcache={};function S(h){function f(m,e){var s=new Array();var q,r,p,n,l,o;if(e.indexOf(":eq")>=0){q=e.split(" ");for(p=0;p<q.length;p++){if(p==0){o=c(m,q[p])}else{r=new Array();for(n=0;n<o.length;n++){r=r.concat(c(o[n],q[p]))}o=r.splice(0)}}}else{o=m.querySelectorAll(e)}for(l=0;l<o.length;l++){s.push(o[l])}return s}function c(p,o){var n=-1;var l=new Array();if(o.indexOf(":eq")>0){var j=o.replace(/(.*)\:eq\(([0-9]+)\)/,"$1 $2").split(" ");o=j[0];n=parseInt(j[1])}if(o[0]=="."){els=p.getElementsByClassName(o.substr(1))}else{if(o[0]=="#"){els=p.getElementById(o.substr(1))}else{els=p.getElementsByTagName(o)}}if(!els){els=[]}if(els.nodeName&&els.nodeName=="SELECT"){l.push(els)}else{if(typeof els.length!=="number"){els=[els]}for(k=0;k<els.length;k++){l.push(els[k])}if(n>=0&&l.length>0){if(n<l.length){l=[l[n]]}else{l=[]}}}return l}function a(n,m){var j=false;if(m[0]=="."){m=m.substr(1);for(var l=0;l<n.classList.length;l++){if(n.classList[l]==m){return true}}}else{if(m[0]=="#"){if(n.id==m.substr(1)){return true}}else{if(n.tagName==m.toUpperCase()){return true}}}return false}function d(e){var j;if(typeof e==="string"){this.e=f(document,e)}else{if(typeof e==="object"){this.e=(typeof e.length=="number")?e:[e]}}this.length=(this.e?this.e.length:0);return this}d.prototype.ready=function(e){/in/.test(document.readyState)?setTimeout("S(document).ready("+e+")",9):e()};d.prototype.html=function(j){if(typeof j==="number"){j=""+j}if(typeof j!=="string"&&this.e.length==1){return this.e[0].innerHTML}if(typeof j==="string"){for(var e=0;e<this.e.length;e++){this.e[e].innerHTML=j}}return this};d.prototype.append=function(j){if(!j&&this.e.length==1){return this.e[0].innerHTML}if(j){for(var e=0;e<this.e.length;e++){this.e[e].innerHTML+=j}}return this};d.prototype.prepend=function(l){if(!l&&this.e.length==1){return this.e[0].innerHTML}if(l){for(var m=0;m<this.e.length;m++){this.e[m].innerHTML=l+this.e[m].innerHTML}}return this};d.prototype.before=function(n){var p=document.createElement("div");p.innerHTML=n;var o=p.childNodes;for(var m=0;m<el.length;m++){for(var l=0;l<o.length;l++){el[m].parentNode.insertBefore(o[l],el[m])}}return this};d.prototype.after=function(j){for(var e=0;e<this.e.length;e++){this.e[e].insertAdjacentHTML("afterend",j)}return this};function i(e,l){if(e&&e.length>0){for(var j=0;j<e.length;j++){if(e[j].node==l){return{success:true,match:j}}}}return{success:false}}function g(o,m,l,j,n){if(!eventcache[m]){eventcache[m]=new Array()}eventcache[m].push({node:o,fn:l,fn2:j,data:n})}function b(l){if(eventcache[l.type]){var j=i(eventcache[l.type],l.currentTarget);if(j.success){if(j.match.data){l.data=eventcache[l.type][j.match].data}return{fn:eventcache[l.type][j.match].fn,data:l}}}return function(){return{fn:""}}}d.prototype.off=function(l){if(typeof Element.prototype.removeEventListener!=="function"){Element.prototype.removeEventListener=function(s,p){if(!oListeners.hasOwnProperty(s)){return}var o=oListeners[s];for(var m=-1,n=0;n<o.aEls.length;n++){if(o.aEls[n]===this){m=n;break}}if(m===-1){return}for(var r=0,q=o.aEvts[m];r<q.length;r++){if(q[r]===p){q.splice(r,1)}}}}for(var j=0;j<this.e.length;j++){var e=i(eventcache[l],this.e[j]);if(e.success){this.e[j].removeEventListener(l,eventcache[l][e.match].fn2,false);eventcache[l].splice(e.match,1)}}return this};d.prototype.on=function(m,n,l){m=m||window.event;this.cache=[4,5,6];if(typeof n==="function"&&!l){l=n;n=""}if(typeof l!=="function"){return this}if(this.e.length>0){var o=this;var e=function(p){var q=b({currentTarget:this,type:m,data:n,originalEvent:p});if(typeof q.fn==="function"){return q.fn.call(o,q.data)}};for(var j=0;j<this.e.length;j++){g(this.e[j],m,l,e,n);if(this.e[j].addEventListener){this.e[j].addEventListener(m,e,false)}else{if(this.e[j].attachEvent){this.e[j].attachEvent(m,e)}}}}return this};d.prototype.trigger=function(m){var l;if(document.createEvent){l=document.createEvent("HTMLEvents");l.initEvent(m,true,true)}else{l=document.createEventObject();l.eventType=m}l.eventName=m;for(var j=0;j<this.e.length;j++){if(document.createEvent){this.e[j].dispanelEvent(l)}else{this.e[j].fireEvent("on"+l.eventType,l)}}return this};d.prototype.focus=function(){if(this.e.length==1){this.e[0].focus()}return this};d.prototype.blur=function(){if(this.e.length==1){this.e[0].blur()}return this};d.prototype.remove=function(){if(!this.e){return this}for(var e=this.e.length-1;e>=0;e--){if(!this.e[e]){return}if(typeof this.e[e].remove==="function"){this.e[e].remove()}else{if(typeof this.e[e].parentElement.removeChild==="function"){this.e[e].parentElement.removeChild(this.e[e])}}}return S(this.e)};d.prototype.hasClass=function(j){var e=true;for(var l=0;l<this.e.length;l++){if(!this.e[l].className.match(new RegExp("(\\s|^)"+j+"(\\s|$)"))){e=false}}return e};d.prototype.toggleClass=function(e){for(var j=0;j<this.e.length;j++){if(this.e[j].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this.e[j].className=this.e[j].className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g")," ").replace(/ $/,"")}else{this.e[j].className=(this.e[j].className+" "+e).replace(/^ /,"")}}return S(this.e)};d.prototype.addClass=function(e){for(var j=0;j<this.e.length;j++){if(!this.e[j].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this.e[j].className=(this.e[j].className+" "+e).replace(/^ /,"")}}return S(this.e)};d.prototype.removeClass=function(e){for(var j=0;j<this.e.length;j++){while(this.e[j].className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))){this.e[j].className=this.e[j].className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)","g")," ").replace(/ $/,"").replace(/^ /,"")}}return S(this.e)};d.prototype.css=function(m){var o;for(var l=0;l<this.e.length;l++){o={};var n=this.e[l].getAttribute("style");if(n){var q=this.e[l].getAttribute("style").split(";");for(var j=0;j<q.length;j++){var p=q[j].split(":");if(p.length==2){o[p[0]]=p[1]}}}if(typeof m==="object"){for(key in m){o[key]=m[key]}var e="";for(key in o){if(e){e+=";"}if(o[key]){e+=key+":"+o[key]}}this.e[l].setAttribute("style",e)}}if(this.e.length==1&&typeof m==="string"){return o[m]}return S(this.e)};d.prototype.parent=function(){var j=[];for(var e=0;e<this.e.length;e++){j.push(this.e[e].parentElement)}return S(j)};d.prototype.children=function(m){if(typeof m==="string"){var e=[];for(var j=0;j<this.e.length;j++){for(var l=0;l<this.e[j].children.length;l++){if(a(this.e[j].children[l],m)){e.push(this.e[j].children[l])}}}return S(e)}else{for(var j=0;j<this.e.length;j++){this.e[j]=(this.e[j].children.length>m?this.e[j].children[m]:this.e[j])}return S(this.e)}};d.prototype.find=function(j){var m=[];var e=new Array();for(var l=0;l<this.e.length;l++){e=e.concat(f(this.e[l],j))}return S(e)};d.prototype.attr=function(e,m){var l=[];for(var j=0;j<this.e.length;j++){l.push(this.e[j].getAttribute(e));if(typeof m==="string"||typeof m==="number"){if(m){this.e[j].setAttribute(e,m)}else{this.e[j].removeAttribute(e)}}}if(l.length==1){l=l[0]}if(typeof m==="undefined"){return l}else{return S(this.e)}};d.prototype.prop=function(e,m){var l=[];for(var j=0;j<this.e.length;j++){l.push(this.e[j].getAttribute(e));if(typeof m==="boolean"){if(m){this.e[j].setAttribute(e,e)}else{this.e[j].removeAttribute(e)}}}if(l.length==1){l=l[0]}return l};d.prototype.clone=function(){var e=document.createElement("div");e.appendChild(this.e[0].cloneNode(true));return e.innerHTML};d.prototype.replaceWith=function(j){var l=document.createElement("span");l.innerHTML=j;var m=S(this.e);for(var e=0;e<this.e.length;e++){m.e[0].parentNode.replaceChild(l,m.e[0])}return m};d.prototype.ajax=function(m,l){if(typeof m!=="string"){return false}if(!l){l={}}l.url=m+(typeof l.cache==="boolean" && !l.cache ? '?'+(new Date()).valueOf():'');var o=(window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");o.addEventListener("load",e);o.addEventListener("error",j);function e(p){if(o.status===200){l.header=o.getAllResponseHeaders();if(typeof l.complete==="function"){l.complete.call((l["this"]?l["this"]:this),(l.dataType=="json")?JSON.parse(o.responseText):o.responseText,l)}}else{j(p)}}function j(p){if(typeof l.error==="function"){l.error.call((l["this"]?l["this"]:this),p,l)}}try{o.open("GET",m)}catch(n){j(n)}try{o.send()}catch(n){j(n)}return this};d.prototype.loadJSON=function(j,l,e){if(!e){e={}}e.dataType="json";e.complete=l;this.ajax(j,e);return this};return new d(h)};

/*!
* ODI Leeds Hex Map (version 1)
*/
var map;

function HexMap(){

	this.data;
	this.responses = {};
	this.db = new Array();
	var wards = {
		"Adel and Wharfedale": {"code":"E05001411","alt":"AW"},
		"Alwoodley": {"code":"E05001412","alt":"AL"},
		"Ardsley and Robin Hood": {"code":"E05001413","alt":"AR"},
		"Armley": {"code":"E05001414","alt":"AM"},
		"Beeston and Holbeck": {"code":"E05001415","alt":"BH"},
		"Bramley and Stanningley": {"code":"E05001416","alt":"BS"},
		"Burmantofts and Richmond Hill": {"code":"E05001417","alt":"BR"},
		"Calverley and Farsley": {"code":"E05001418","alt":"CF"},
		"Chapel Allerton": {"code":"E05001419","alt":"CA"},
		"City and Hunslet": {"code":"E05001420","alt":"CH"},
		"Cross Gates and Whinmoor": {"code":"E05001421","alt":"CW"},
		"Farnley and Wortley": {"code":"E05001422","alt":"FW"},
		"Garforth and Swillington": {"code":"E05001423","alt":"GS"},
		"Gipton and Harehills": {"code":"E05001424","alt":"GH"},
		"Guiseley and Rawdon": {"code":"E05001425","alt":"GR"},
		"Harewood": {"code":"E05001426","alt":"HA"},
		"Headingley": {"code":"E05001427","alt":"HE"},
		"Horsforth": {"code":"E05001428","alt":"HO"},
		"Hyde Park and Woodhouse": {"code":"E05001429","alt":"HW"},
		"Killingbeck and Seacroft": {"code":"E05001430","alt":"KS"},
		"Kippax and Methley": {"code":"E05001431","alt":"KM"},
		"Kirkstall": {"code":"E05001432","alt":"KI"},
		"Middleton Park": {"code":"E05001433","alt":"MI"},
		"Moortown": {"code":"E05001434","alt":"MO"},
		"Morley North": {"code":"E05001435","alt":"MN"},
		"Morley South": {"code":"E05001436","alt":"MS"},
		"Otley and Yeadon": {"code":"E05001437","alt":"OY"},
		"Pudsey": {"code":"E05001438","alt":"PU"},
		"Rothwell": {"code":"E05001439","alt":"RL"},
		"Roundhay": {"code":"E05001440","alt":"RO"},
		"Temple Newsam": {"code":"E05001441","alt":"TN"},
		"Weetwood": {"code":"E05001442","alt":"WE"},
		"Wetherby": {"code":"E05001443","alt":"WY"},
		"Leeds": {"code":"Leeds"},
	}

	// Do we update the address bar?
	this.pushstate = !!(window.history && history.pushState);
	var _obj = this;
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
		d.innerHTML = decodeURIComponent((input+'').replace(/\+/g, '%20'));
		return d.innerHTML;
	}

	this.setVals = function(){
		this.query = parseQueryString();
		this.cols = { 'ward': htmlDecode(this.query.ward), 'categories': htmlDecode(this.query.categories), 'col': htmlDecode(this.query.col), 'colour': htmlDecode(this.query.colour), 'count': (this.query.count=="true" ? true : false), 'categorylist': false };
		// Use user-provided colour
		this.colour = extractColour(htmlDecode(this.cols.colour));
		return this;
	}

	this.setTitle = function(){
		S('.value_title').html((this.query.url ? '<a href="'+htmlDecode(this.query.url)+'">':'')+(htmlDecode(this.query.title) || this.query.ID)+(this.query.url ? '</a>':''));
		S('title').html(htmlDecode(this.query.title) || this.query.ID);
		return this;	
	}
	this.setInputs = function(){
		//console.log('setInputs')
		S('#ID').attr('value',this.query.ID);
		if(S('#ward').e[0].nodeName=="INPUT") S('#ward').attr('value',this.cols.ward);
		if(S('#categories').e[0].nodeName=="INPUT") S('#categories').attr('value',this.cols.categories);
		S('#colour').attr('value',this.cols.colour);
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
		//console.log('navigate',location.href,e)
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
		for(var i = 0; i < els.length; i++) str += (str ? '&':'')+S(els.e[i]).attr('id')+'='+els.e[i].value;
		var els = S('#hexmapform select');
		for(var i = 0; i < els.length; i++){
			if(els.e[i].value) str += (str ? '&':'')+els.e[i].getAttribute('id')+'='+els.e[i].value;
		}
		return str;
	}
	// Read the parameters from the form
	this.updateParams = function(){

		v = S('#ward').e[0].value;
		if(v) this.cols.ward = htmlDecode(v);

		v = S('#categories').e[0].value;
		if(v) this.cols.categories = htmlDecode(v);

		v = S('#colour').e[0].value;
		if(v) this.cols.colour = htmlDecode(v);

		v = S('#count').e[0].value;
		if(v) this.cols.count = (v=="true" ? true: false);

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
		
		// We ask for all the records (up to a maximum of 10000)
		//this.setTitle();
		this.init();

		this.getRecords(Math.max(data.result.total,10000));
		
		return this;
	}

	// First call will just return 1 record so we can get the metadata
	this.getHeader = function(){
		//console.log('getHeader',this.query.ID)

		this.setTitle();
		if(!this.responses[this.query.ID]){ 
			S(document).ajax('http://api.datapress.io/api/3/action/datastore_search?resource_id='+this.query.ID+'&limit=1',{
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

		this.setInputs();
		this.validateInputs();
		this.updateCategories();
		if(this.cols.categories && this.cols.ward){
			this.update();
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
			S(document).ajax('http://api.datapress.io/api/3/action/datastore_search?resource_id='+this.query.ID+'&limit='+n,{
				'complete': this.loadedRecords,
				'error': this.failLoad,
				'this': this
			});
		}else this.loadedRecords(this.responses[this.query.ID].body);
	}
	
	// Create ourselves an empty stylesheet that we can update later
	S('body').append('<style id="customstylesheet"></style>');

	// Listen for changes to the dropdown select box
	S('#category').on('change',{me:this},function(e){ e.data.me.change(); });
	S('#hexmapform').e[0].onsubmit = function(e){ _obj.change(); return false; }

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
		var byward = { 'Leeds': 0 };

		for(i = 0; i < this.db.length; i++){
			w = matchWard(this.db[i][this.cols.ward]);
			if(w && !byward[w]) byward[w] = 0;
			ok = true;
			// If we have a set of categories and this row doesn't match the one selected we don't proceed
			if(this.categories.length > 0 && this.db[i][this.cols.categories] != typ) ok = false;
			if(ok){
				v = (this.cols.count) ? 1 : parseFloat(this.db[i][this.cols.categories]);
				if(isNaN(v)) v = 1;
				if(w){
					// Only include the data if a ward is provided
					byward[w] += v;
					byward['Leeds'] += v;
				}
			}
		}
		var max = 0;
		for(id in byward){
			if(byward[id] > max && id != "Leeds") max = byward[id];
		}
		var css = "";
		for(i in wards){
			id = wards[i].code;
			v = (typeof byward[i]==="undefined" ? 0 : byward[i]);
			var colour = 'rgba('+this.colour.r+', '+this.colour.g+', '+this.colour.b+', ' + v / max + ")";
			S('.'+id).find('.n').html(v + (typ ? '<span class="extra">&nbsp;&times; '+typ+'</span>':''))
			css += '.hexmap .hextile.'+id+' { background-color: '+colour+'; } .hexmap .hextile.'+id+':before, .hexmap .hextile.'+id+':after { border-color: '+colour+'; }';
		}
		S('#customstylesheet').html(css);
	}

	// Get the data
	if(this.query.ID) this.getHeader();
	
	function extractColour(c){
		var col = { 'r' : 246, 'g': 136, 'b': 31 };
		if(c && c.indexOf('rgb(')==0){
			var bits = c.match(/[0-9]+/g);
			col.r = parseInt(bits[0]);
			col.g = parseInt(bits[1]);
			col.b = parseInt(bits[2]);
		}
		return col;
	}
	
	S('#config').on('click',function(){
		S('#setup').toggleClass('hide');
		var t = this.attr('data-alt');
		var h = this.html();
		this.attr('data-alt',h).html(t);
	});

	return this;
}
S(document).ready(function(){
	map = new HexMap();	
});
