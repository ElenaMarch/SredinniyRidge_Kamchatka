/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// Legend Box
// var sattelite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
//       maxZoom: 21,
//       subdomains:['mt0','mt1','mt2','mt3']
//     });


var baseLayers = {
		"Topographic": base,
	  	"Sattelite": L.esri.basemapLayer("ImageryFirefly") }, //sattelite},
	
	groupedOverlays = {
	"Volcanic hazard": {
		"Active volcanoes": avolcLayer,
		"Volcanic hazard zones": hazard 
	},
	"Sredinniy ridge": {
		"Quarternary volcanoes": volcanoQ,
		"Holocene volcanoes": Group_volc,
	  	"Glaciers": Group_gl2016
	},
	"Kluchevskaya group of volcanoes": {
		"Cinder cones, lava flows": kluchGroup,
		"Glaciers<i hidden>A</i>": glKluchGroup,
		"Shelters": houseLayer
	},
	"Geological samples": {
		"Rocktype": sampleLayer
	}
	};

var c = L.control.groupedLayers(baseLayers, groupedOverlays, {collapsed:false, className: "ini"}).addTo(map);


var div_vKluch = L.DomUtil.create('div', 'legend');
div_vKluch.innerHTML += '<p style="line-height: 1.4; font-weight: bold">Cinder cones and lava flows: dating</p>';
div_vKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #c5072d;background-color:#F61340;"></i><p>Historical eruptions: 1900-2000 years AC</p>';
div_vKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #ff4d64;background-color:#FF7082;"></i><p>1400-1600 years AD</p>';
div_vKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #635976;background-color:#9386AE;"></i><p>500-650 years AD</p>';
div_vKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #1c79ca;background-color:#3692E3;"></i><p>300-350 years AD</p>';
div_vKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #39ac73;background-color:#6BDE87;"></i><p>750-100 years BC</p>';
div_vKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #bac46e;background-color:#C7CF8A;"></i><p>950-800 years BC</p>';
div_vKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #8a8a5c;background-color:#a3a375;"></i><p>2000-1000 years BC</p>';
div_vKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #9B373D;background-color:#B26045;"></i><p>before 2000 years BC</p>';
div_vKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #595959;background-color:#b3b3b3;"></i><p>Unknown</p>';
div_vKluch.innerHTML += '<br><i class="shish-fill"></i><p>Shield volcano</p>';
div_vKluch.innerHTML += '<i class="hatching-trench"></i><p>Landslide debris</p>';

var div_v = L.DomUtil.create('div', 'legend');
div_v.innerHTML += '<b>Holocene volcanoes</b><br>';
div_v.innerHTML += '<i class="triangle-up"></i><p>Stratovolcano</p>';
div_v.innerHTML += '<i class="triangle"></i><p>Monogenetic cone</p>';
div_v.innerHTML += '<b style="color: #ac3939; font-size: 14px; float: left; margin-right: 9px; margin-left: 2px">&#10006</b><p>Volcanic field</p>';
div_v.innerHTML += '<br><b>Lava flows: composition</b><br>';
div_v.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #905080;background-color:#ff6030;"></i><p>Basalt, andesite-basalt</p>';
div_v.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #ff5500;background-color:#ff8010;opacity:0.6"></i><p>Andesite-basalt</p>';
div_v.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #602060;background-color:#602060;"></i><p>Dacite, biotite</p>';
div_v.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #595959;background-color:#b3b3b3;"></i><p>Unknown</p>';

var div_gl = L.DomUtil.create('div', 'legend');
div_gl.innerHTML += '<b>Glaciers</b><br>';
div_gl.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #0086b3;background-color:#99ebff;"></i><p>Moving ice</p>';
div_gl.innerHTML += '<i class="hatching-deadice" ></i><p>Passive ice</p>';
div_gl.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #4d3319;background-color:#996633;"></i><p>Lateral moraine</p>';
div_gl.innerHTML += '<i class="dotted" ></i><p>Surface moraine</p>';

var div_glKluch = L.DomUtil.create('div', 'legend');
div_glKluch.innerHTML += '<b>Glaciers</b><br>';
div_glKluch.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #0086b3;background-color:#99ebff;"></i><p>Moving ice</p>';
div_glKluch.innerHTML += '<i class="hatching-deadice" ></i><p>Dead ice</p>';
div_glKluch.innerHTML += '<i class="hatching-passice" ></i><p>Periglacial zone</p>';
div_glKluch.innerHTML += '<i class="hatching-cover" ></i><p>Ice-bound debris cover</p>';
div_glKluch.innerHTML += '<i class="hatching-line" ></i><p>Fronts of creeping ice</p>';

var div_hazard = L.DomUtil.create('div', 'legend');
div_hazard.innerHTML += '<p style="line-height: 1.4"><b>Volcanic hazard zones (showing reoccurence of eruptions)</b></p>';
div_hazard.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #633705;background-color:#D21704;"></i><p>1 time in 1-5 years</p>';
div_hazard.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #633705;background-color:#F05511;"></i><p>1 time in 10-50 years</p>';
div_hazard.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #633705;background-color:#FCA73C;"></i><p>1 time in 50-100 years</p>';
div_hazard.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #633705;background-color:#FFE668;"></i><p>1 time in > 100 years</p>';
div_hazard.innerHTML += '<i class="hatching-hazard" ></i><p>Highly dangerous area</p>';

var div_avolc = L.DomUtil.create('div', 'legend');
div_avolc.innerHTML += '<b>Active volcanoes</b><br>';
div_avolc.innerHTML += '<i class="triangle" style="border-bottom: 12px solid red;"></i><p>Recorded eruptions</p>';
div_avolc.innerHTML += '<i class="triangle" style="border-bottom: 12px solid #FF9B00;"></i><p>Potentially active</p>';
div_avolc.innerHTML += '<i class="triangle" style="border-bottom: 12px solid grey;"></i><p>Hydrothermal activity</p>';

var div_geosamples_rocktype = L.DomUtil.create('div', 'legend'),
	sio2_array = ['Basalt', 'Andesi-basalt', 'Andesite', 'Dacite', 'Riodacite', 'Riolite']
div_geosamples_rocktype.innerHTML += '<b>Geosamples - rocktype</b><br>';

var rainbow = new Rainbow(); 
rainbow.setNumberRange(1, sio2_array.length);
for (i = 0; i < sio2_array.length; i++) {
	div_geosamples_rocktype.innerHTML += '<i class="circle" style="background-color: #' + rainbow.colourAt(i+1) + ';"></i><p>'+ sio2_array[i] + '</p>';
};
div_geosamples_rocktype.innerHTML += '<i class="circle" style="background-color: grey;"></i><p>Undefined</p>';


// var div = document.createElement('div');
var div = L.DomUtil.create('div', 'legend-container'),
	contentLegend = div;
let h2 = document.createElement("h2"); h2.innerText='Legend';
div.prepend(h2);

function setContent(div, childList, flag) {
	// div.innerHTML = '<h2>Legend</h2>'
	var children = Array.from(div.childNodes), i;
	for (i = 0; i < childList.length; i++) {
		child = childList[i];
		if (flag === 'add') {
			div.appendChild(child);
		} else if (flag === 'remove' && children.includes(child)) {
			div.removeChild(child);
		}
	  };
	  if (activeTab === 'tab-Legend') {
		activeTab = sidebar.setTab('tab-Legend', div);
	  }
	 
};

setContent(div, [div_avolc, div_hazard], 'add');


map.on('overlayadd', function (eventLayer) {
	if (eventLayer.name === 'Holocene volcanoes') {
		setContent(div, [div_v], 'add');	
	} else if (eventLayer.name === 'Glaciers') { 
		setContent(div, [div_gl], 'add');
	} else if (eventLayer.name === 'Volcanic hazard zones') { 
		setContent(div, [div_hazard], 'add');
	} else if (eventLayer.name === 'Active volcanoes') { 
		setContent(div, [div_avolc], 'add');
	} else if (eventLayer.name === 'Cinder cones, lava flows') { 
		setContent(div, [div_vKluch], 'add');
	} else if (eventLayer.name === "Glaciers<i hidden>A</i>") { 
		setContent(div, [div_glKluch], 'add');
	} else if (eventLayer.name === "Rocktype") { 
		setContent(div, [div_geosamples_rocktype], 'add');
		styleEditor.addTo(map);
	};
});

map.on('overlayremove', function (eventLayer) {
	if (eventLayer.name === 'Holocene volcanoes') {
		setContent(div, [div_v], 'remove');
	} else if (eventLayer.name === 'Volcanic hazard zones') { 
		setContent(div, [div_hazard], 'remove');
	} else if (eventLayer.name === 'Active volcanoes') { 
		setContent(div, [div_avolc], 'remove');
	} else if (eventLayer.name === 'Cinder cones and lava flows') { 
		setContent(div, [div_vKluch], 'remove');
	} else if (eventLayer.name === 'Glaciers') { 
		setContent(div, [div_gl], 'remove');
	} else if (eventLayer.name === "Glaciers<i hidden>A</i>") { 
		setContent(div, [div_glKluch], 'remove');
	} else if (eventLayer.name === "Rocktype") { 
		setContent(div, [div_geosamples_rocktype], 'remove');
		map.removeControl(styleEditor);
	};
});

// Bounds Sredinniy, Kluchevskoy
function checkView(group) {
	var count = 0;
	group.eachFeature(function (layer) {
		if (map.hasLayer(layer)) {
			if (map.getBounds().intersects(layer.getBounds())) {
				count = count + 1; }
		}
	});
	if (count != 0) {
		return true;
	} else {
		return false;
	}};

function checkView2(group) {
	var count = 0;
	group.eachLayer(function (layer) {
		if (map.hasLayer(layer)) {
			if (map.getBounds().intersects(layer.getBounds())) {
				count = count + 1; }
		}
	});
	if (count != 0) {
		return true;
	} else {
		return false;
	}};

map.on('zoomend', function () {
    if (map.getZoom() < 9 )
    {   
		setContent(div, [div_vKluch, div_glKluch, div_gl, div_v], 'remove');
		setContent(div, [div_hazard], 'add');
    }
	if (map.getZoom() >= 9) 
	{
		if (checkView(gl2016)) {
			setContent(div, [div_v, div_gl], 'add');
		}
		if (checkView2(kluchGroup)) {
			setContent(div, [div_vKluch, div_glKluch], 'add');
		}
		setContent(div, [div_hazard], 'remove');
    }
});

map.on('moveend', function () {
	if (checkView(gl2016)) {
		setContent(div, [div_gl], 'add');
	} else {
		setContent(div, [div_gl], 'remove');
	};
	if (checkView(lava)) {
		setContent(div, [div_v], 'add');
	} else {
		setContent(div, [div_v], 'remove');
	};
	if (checkView2(kluchGroup)) { //lavaPobochLayer
		setContent(div, [div_vKluch, div_glKluch], 'add');
	} else {
		setContent(div, [div_vKluch, div_glKluch], 'remove');
	};
});
