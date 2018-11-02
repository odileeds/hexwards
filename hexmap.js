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
				'dataType': 'json',
				'success': this.loadedPackage,
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
		console.log('loadedHeader',data)
		if(!this.responses[this.query.ID]) this.responses[this.query.ID] = {'header':{},'table':null};
		this.responses[this.query.ID].header = data.result;
		if(!this.responses[this.query.ID].table){
			S('#msg').html('Getting table<div class="spinner"></div>');
			S(document).ajax(this.responses[this.query.ID].header.table+'?$limit=1',{
				'dataType':'json',
				'success': this.loadedTable,
				'error': this.failLoad,
				'this': this
			});
		}else this.loadedTable(this.responses[this.query.ID].table);

	}

	this.loadedTable = function(data){
		// We ask for all the records (up to a maximum of 100000)
		//this.setTitle();
		this.init();
		this.responses[this.query.ID].table = data;

		var n = Math.min(data.info.total,100000);
		S('#msg').html('Loading '+n+' records'+(n < data.info.total ? ' of '+data.info.total:'')+'&hellip;<div class="spinner"></div>');

		this.getRecords(n);
		
		return this;
	}

	// First call will just return 1 record so we can get the metadata
	this.getHeader = function(){
		//console.log('getHeader',this.query.ID)

		this.setTitle();
		if(!this.responses[this.query.ID]){
			S('#msg').html('Getting data set header<div class="spinner"></div>');
			S(document).ajax('https://datamillnorth.org/api/action/datastore_search?resource_id='+this.query.ID+'&limit=1',{
				'dataType':'json',
				'this':this,
				'success': this.loadedHeader,
				'error': this.failLoad
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
				'success': this.loadedRecords,
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
		'dataType':'json',
		'success': function(w){
			map = new HexMap(w);
		},
		'error': function(e){},
		'this': this
	});


		
});
