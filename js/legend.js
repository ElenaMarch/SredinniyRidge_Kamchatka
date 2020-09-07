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
	// overlays_SR = {
	// 	"Quarternary volcanoes": volcanoQ,
	//   	"Holocene volcanoes": Group_volc,
	// 	"Glaciers": Group_gl2016, },
	// overlays_Kam = {
	// 	"Active volcanoes": avolcLayer,
	// 	"Volcanic hazard zones": hazard },
	// overlays_Kluch = {
	// 	"Cinder cones, lava flows": kluchGroup,
	// 	"Glaciers": glKluchGroup,
	// 	"Shelters": houseLayer,
	// };
	
	groupedOverlays = {
	"Volcanic danger": {
		"Active volcanoes": avolcLayer,
		"Volcanic hazard zones": hazard 
	},
	"Sredinniy ridge": {
		"Quarternary volcanoes": volcanoQ,
		"Holocene volcanoes": Group_volc,
	  	"Glaciers": Group_gl2016
	},
	"Kluchevskoy volcano": {
		"Cinder cones, lava flows": kluchGroup,
		"Glaciers<i hidden>A</i>": glKluchGroup,
		"Shelters": houseLayer
	},
	};

var c = L.control.groupedLayers(baseLayers, groupedOverlays, {collapsed:false, className: "ini"}).addTo(map);
// L.control.layers(baseLayers, {}, {collapsed:false, className: "ini"}).addTo(map);

// L.control.layers({}, overlays_Kam, {collapsed:false, className: 'KAM'}).addTo(map);
// var con_SR = L.control.layers({}, overlays_SR, {collapsed:false}).addTo(map),
// var con_Kluch = L.control.layers({}, {}, {collapsed:false}).addTo(map);
$(".leaflet-control-layers-base").prepend('<label style="font-weight:650;margin-bottom:.1em;margin-left:3px">Base layers</label>');

var legend_avolc  = L.control({position: 'topright'}),
	legend_hazard  = L.control({position: 'topright'}),
	legend_gl = L.control({position: 'topright'}),
	legend_v  = L.control({position: 'topright'}),
	legend_gl_KL = L.control({position: 'topright'}),
	legend_vKluch = L.control({position: 'topright'});

legend_vKluch.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<p style="line-height: 1.4; font-weight: bold">Cinder cones and lava flows: dating</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #c5072d;background-color:#F61340;"></i><p>Historical eruptions: 1900-2000 years AC</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #ff4d64;background-color:#FF7082;"></i><p>1400-1600 years AD</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #635976;background-color:#9386AE;"></i><p>500-650 years AD</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #1c79ca;background-color:#3692E3;"></i><p>300-350 years AD</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #39ac73;background-color:#6BDE87;"></i><p>750-100 years BC</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #bac46e;background-color:#C7CF8A;"></i><p>950-800 years BC</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #8a8a5c;background-color:#a3a375;"></i><p>2000-1000 years BC</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #595959;background-color:#b3b3b3;"></i><p>Unknown</p>';
	div.innerHTML += '<hr><i class="shish-fill"></i><p>Shield volcano</p>';
	div.innerHTML += '<i class="hatching-trench"></i><p>Landslide debris</p>';
	return div; };
// legend_vKluch.addTo(map);

legend_v.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<b>Holocene volcanoes</b><br>';
	div.innerHTML += '<i class="triangle-up"></i><p>Stratovolcano</p>';
	div.innerHTML += '<i class="triangle"></i><p>Monogenetic cone</p>';
	div.innerHTML += '<b style="color: #ac3939; font-size: 14px; float: left; margin-right: 9px; margin-left: 2px">&#10006</b><p>Volcanic field</p>';
	div.innerHTML += '<hr><b>Lava flows: composition</b><br>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #905080;background-color:#ff6030;"></i><p>Basalt, andesite-basalt</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #ff5500;background-color:#ff8010;opacity:0.6"></i><p>Andesite-basalt</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #602060;background-color:#602060;"></i><p>Dacite, biotite</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #595959;background-color:#b3b3b3;"></i><p>Unknown</p>';
	return div; };
// legend_v.addTo(map);

legend_gl.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<b>Glaciers</b><br>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #0086b3;background-color:#99ebff;"></i><p>Moving ice</p>';
	div.innerHTML += '<i class="hatching-deadice" ></i><p>Passive ice</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #4d3319;background-color:#996633;"></i><p>Lateral moraine</p>';
	div.innerHTML += '<i class="dotted" ></i><p>Surface moraine</p>';
	return div; };
//legend_gl.addTo(map);

legend_gl_KL.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<b>Glaciers</b><br>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #0086b3;background-color:#99ebff;"></i><p>Moving ice</p>';
	div.innerHTML += '<i class="hatching-deadice" ></i><p>Dead ice</p>';
	div.innerHTML += '<i class="hatching-passice" ></i><p>Periglacial zone</p>';
	div.innerHTML += '<i class="hatching-cover" ></i><p>Ice-bound debris cover</p>';
	div.innerHTML += '<i class="hatching-line" ></i><p>Fronts of creeping ice</p>';
	return div; };
// legend_gl_KL.addTo(map);

legend_hazard.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<p style="line-height: 1.4"><b>Volcanic hazard zones (showing reoccurence of eruptions)</b></p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #633705;background-color:#D21704;"></i><p>1 time in 1-5 years</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #633705;background-color:#F05511;"></i><p>1 time in 10-50 years</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #633705;background-color:#FCA73C;"></i><p>1 time in 50-100 years</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #633705;background-color:#FFE668;"></i><p>1 time in > 100 years</p>';
	div.innerHTML += '<i class="hatching-hazard" ></i><p>Highly dangerous area</p>';
	return div;
};
legend_hazard.addTo(map);

legend_avolc.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<b>Active volcanoes</b><br>';
	div.innerHTML += '<i class="triangle" style="border-bottom: 12px solid red;"></i><p>Recorded eruptions</p>';
	div.innerHTML += '<i class="triangle" style="border-bottom: 12px solid #FF9B00;"></i><p>Potentially active</p>';
	div.innerHTML += '<i class="triangle" style="border-bottom: 12px solid grey;"></i><p>Hydrothermal activity</p>';
	return div;
};
legend_avolc.addTo(map);

map.on('overlayadd', function (eventLayer) {
	if (eventLayer.name === 'Holocene volcanoes') {
		legend_v.addTo(map);	
	} else if (eventLayer.name === 'Glaciers') { 
		legend_gl.addTo(map);
	} else if (eventLayer.name === 'Volcanic hazard zones') { 
		legend_hazard.addTo(map);
	} else if (eventLayer.name === 'Active volcanoes') { 
		legend_avolc.addTo(map);
	} else if (eventLayer.name === 'Cinder cones and lava flows') { 
		legend_vKluch.addTo(map);
	} else if (eventLayer.name === "Glaciers<i hidden>A</i>") { 
		legend_gl_KL.addTo(map);
	};
});

map.on('overlayremove', function (eventLayer) {
	if (eventLayer.name === 'Holocene volcanoes') {
		map.removeControl(legend_v);
	} else if (eventLayer.name === 'Volcanic hazard zones') { 
		map.removeControl(legend_hazard);
	} else if (eventLayer.name === 'Active volcanoes') { 
		map.removeControl(legend_avolc);
	} else if (eventLayer.name === 'Cinder cones and lava flows') { 
		map.removeControl(legend_vKluch);
	} else if (eventLayer.name === 'Glaciers') { 
		map.removeControl(legend_gl);
	} else if (eventLayer.name === "Glaciers<i hidden>A</i>") { 
		map.removeControl(legend_gl_KL);
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
        map.removeControl(legend_v);
		map.removeControl(legend_gl);
		map.removeControl(legend_vKluch);
		map.removeControl(legend_gl_KL);
		legend_hazard.addTo(map);
    }
	if (map.getZoom() >= 9) 
	{
		if (checkView(gl2016)) {
			legend_v.addTo(map);
			legend_gl.addTo(map);
		}
		if (checkView2(kluchGroup)) {
			legend_vKluch.addTo(map);
			legend_gl_KL.addTo(map);
		}
		map.removeControl(legend_hazard);
    }
});

map.on('moveend', function () {
	if (checkView(gl2016)) {
		legend_gl.addTo(map);
	} else {
		map.removeControl(legend_gl);
	};
	if (checkView(lava)) {
		legend_v.addTo(map);
	} else {
		map.removeControl(legend_v);
	};
	if (checkView2(kluchGroup)) { //lavaPobochLayer
		legend_vKluch.addTo(map);
		legend_gl_KL.addTo(map);
	} else {
		map.removeControl(legend_vKluch);
		map.removeControl(legend_gl_KL);
	};
});
