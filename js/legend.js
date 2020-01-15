/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// Legend Box
var baseLayers = {
	  "Topographic": base,
	  "Sattelite": L.esri.basemapLayer("ImageryClarity") },
	overlays = {
		"Quarternary volcanoes": volcanoQ,
	  	"Holocene volcanoes": Group_volc,
	  	"Glaciers 2016": Group_gl2016, };
	  
L.control.layers(baseLayers, overlays, {collapsed:false}).addTo(map);

function getColour(d) {
	switch (d) {
		case 'Moving ice': return "#99ebff";
		case 'Dead ice': return '#202020';
		default: return '#fff';
	}
};
	
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
legend_v.addTo(map);

legend_gl.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'legend');
	div.innerHTML += '<b>Glaciers&nbsp 2016</b><br>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #0086b3;background-color:#99ebff;"></i><p>Moving ice</p>';
	div.innerHTML += '<i class="hatching-deadice" ></i><p>Dead ice</p>';
	div.innerHTML += '<i style="height: 12px; width: 16px; border: 1.2px solid #4d3319;background-color:#996633;"></i><p>Lateral moraine</p>';
	div.innerHTML += '<i class="dotted" ></i><p>Surface moraine</p>';
	return div; };
legend_gl.addTo(map);

map.on('overlayadd', function (eventLayer) {
	if (eventLayer.name === 'Holocene volcanoes') {
		legend_v.addTo(map);
	} else if (eventLayer.name === 'Glaciers 2016') { 
		legend_gl.addTo(map);
	}
});

map.on('overlayremove', function (eventLayer) {
	if (eventLayer.name === 'Holocene volcanoes') {
		map.removeControl(legend_v);
	} else if (eventLayer.name === 'Glaciers 2016') { 
		map.removeControl(legend_gl);
	}
});