/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// Legend Box
var baseLayers = {
		"Topographic": base,
	  	"Sattelite": L.esri.basemapLayer("ImageryClarity") },
	overlays_SR = {
		"Quarternary volcanoes": volcanoQ,
	  	"Holocene volcanoes": Group_volc,
		"Glaciers": Group_gl2016, },
	overlays_Kam = {
		"Active volcanoes": avolcLayer,
		"Volcanic hazard zones": hazard };

L.control.layers(baseLayers, {}, {collapsed:false, className: "ini"}).addTo(map);

L.control.layers({}, overlays_Kam, {collapsed:false}).addTo(map);
var con_SR = L.control.layers({}, overlays_SR, {collapsed:false}).addTo(map);

//$(".leaflet-control-layers-overlays-SR").prepend("<label>Sredinniy Ridge</label>");

function getColour(d) {
	switch (d) {
		case 'Moving ice': return "#99ebff";
		case 'Dead ice': return '#202020';
		default: return '#fff';
	}
};

var legend_avolc  = L.control({position: 'topright'});
var legend_hazard  = L.control({position: 'topright'});
var legend_gl = L.control({position: 'topright'});
var legend_v  = L.control({position: 'topright'});


legend_v.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<b>Holocene volcanoes</b><br>';
	div.innerHTML += '<i class="triangle-up"></i><p>Stratovolcano</p>';
	div.innerHTML += '<i class="triangle"></i><p>Monogenetic cone</p>';
	div.innerHTML += '<b style="color: #ac3939; font-size: 10px; float: left; margin-right: 8px">&#10060</b><p>Volcanic field</p>';
	div.innerHTML += '<hr><b>Lava flows: composition</b><br>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #905080;background-color:#ff6030;"></i><p>Basalt, andesite-basalt</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #ff5500;background-color:#ff8010;opacity:0.6"></i><p>Andesite-basalt</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #602060;background-color:#602060;"></i><p>Dacite, biotite</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #202020;background-color:#909090;"></i><p>Unknown</p>';
	return div; };
//legend_v.addTo(map);

legend_gl.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<b>Glaciers&nbsp 2016</b><br>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #0086b3;background-color:#99ebff;"></i><p>Moving ice</p>';
	div.innerHTML += '<i class="hatching-deadice" ></i><p>Dead ice</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #4d3319;background-color:#996633;"></i><p>Lateral moraine</p>';
	div.innerHTML += '<i class="dotted" ></i><p>Surface moraine</p>';
	return div; };
//legend_gl.addTo(map);

legend_hazard.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<b>Volcanic hazard zones (showing reoccurence of eruptions)</b><br>';
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
	div.innerHTML += '<i class="triangle" style="border-bottom: 12px solid black;"></i><p>Potentially active</p>';
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
	}
});

map.on('overlayremove', function (eventLayer) {
	if (eventLayer.name === 'Holocene volcanoes') {
		map.removeControl(legend_v);
	} else if (eventLayer.name === 'Glaciers 2016') { 
		map.removeControl(legend_gl);
	} else if (eventLayer.name === 'Volcanic hazard zones') { 
		map.removeControl(legend_hazard);
	} else if (eventLayer.name === 'Active volcanoes') { 
		map.removeControl(legend_avolc);
	}
});

map.on('zoomend', function () {
    if (map.getZoom() < 9)
    {
        map.removeControl(legend_v);
		map.removeControl(legend_gl);
		legend_hazard.addTo(map);
    }
	if (map.getZoom() >= 9 ) {
        legend_v.addTo(map);
		legend_gl.addTo(map);
		map.removeControl(legend_hazard);
    }
});