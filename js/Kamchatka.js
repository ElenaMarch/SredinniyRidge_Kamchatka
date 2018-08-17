/*

  Copyright (c) 2018 by Elena Marchenko
  
 */

// BaseMap
var map = L.map('map').setView([57.822,160.501], 8);
var base = L.esri.basemapLayer('Topographic').addTo(map);

L.Control.Watermark = L.Control.extend({
		onAdd: function(map) {
			var img = L.DomUtil.create('img');
			img.src = 'logo/IVIS.png';
			img.style.width = '90px';
			return img;},
		onRemove: function(map) {} });

L.control.watermark = function(opts) {return new L.Control.Watermark(opts); }
L.control.watermark({ position: 'bottomright' }).addTo(map);

// Coordinates and Scale
L.control.coordinates({
	position:"bottomleft",
	decimals:3,
	decimalSeperator:".",
	labelTemplateLat:"N {y}&#176;&nbsp;&nbsp",
	labelTemplateLng:"&nbspE {x}&#176",
	useLatLngOrder:true
}).addTo(map);

L.control.scale({imperial: false}).addTo(map);

// URL
var lavaUrl    = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/lava_holo/FeatureServer/0";
var volcanoUrl = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/volc_holo/FeatureServer/0";
var gl2016Url  = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/glaciers_2016/FeatureServer/0";
var m2016Url   = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/moraine_2016/FeatureServer/0";
var markUrl	   = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/markers/FeatureServer/0";
var rivUrl     = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/rivers_srh/FeatureServer/0";



// LAYERS
// Rivers
L.esri.featureLayer({url: rivUrl, fields: ['FID'], minZoom: 11,
	style: {color: "#3399ff", weight: 0.3}}).addTo(map);
	
// LAVA
map.createPane('Lava');
var lava = L.esri.featureLayer({ url: lavaUrl, precision: 8, pane: 'Lava',
  fields: ['FID', 'Name_eng', 'Composit', 'Age', 'Erupt_vol', 'Area', 'Products', 'Type', 'Hyperlink'],
  style: function (feature) {
		if(feature.properties.Composit === 'andesite-basalt'){
		  return {color: '#ff5500', fillColor: "#ff8010", weight: 0.5, fillOpacity: 0.4 };
		} else if(feature.properties.Composit === 'basalt, andesite-basalt'){
		  return {color: '#905080', fillColor: "#ff6030", weight: 0.5, fillOpacity: 0.4 };
		} else if(feature.properties.Composit === 'dacite, biotite'){
		  return {color: '#602060', fillColor: "#602060", weight: 0.5, fillOpacity: 0.4 };
		} else {
		  return {color: '#202020', fillColor: "#909090", weight: 0.5, fillOpacity: 0.8 }; } }});
var lava_attr = '<h3>{Name}<br>Holocene {Type}</h3> <b>Age</b>: {Age}\
				  <br><b>Composition</b>: {Composit}\
				  <br><b>Eruption volume</b>: {Erupt_vol} km<sup>3</sup>\
				  <br><b>Area</b>: {Area} km<sup>2</sup><br><b>Products</b>: {Products}\
				  <br><br><a target="_blank" rel="noopener noreferrer" href="{Hyperlink}.jpg">\
				  <img src="{Hyperlink}.jpg" class=popupImage title="Open image in new tab" onError="removeElement(this);"/>';
function R_lava(layer) {
   return {Area: layer.feature.properties.Area.toFixed(1),
		   Name: layer.feature.properties.Name_eng,
		   Type: layer.feature.properties.Type,
		   Age:  layer.feature.properties.Age,
		   Composit: layer.feature.properties.Composit,
		   Erupt_vol:layer.feature.properties.Erupt_vol,
		   Products: layer.feature.properties.Products,
		   Hyperlink: layer.feature.properties.Hyperlink};}
lava.bindPopup(function (layer) {
  return L.Util.template(lava_attr, R_lava(layer)); });

// Moraine
map.createPane('Moraine2016');
var shape = new L.PatternCircle({ x: 1, y: 1, radius: 1, fill: true, color: '#4d1300', weight: 0.5}); 
var pattern = new L.Pattern({width: 4, height: 4}); pattern.addShape(shape); pattern.addTo(map);

var m2016 = L.esri.featureLayer({ url: m2016Url, precision: 9, pane: 'Moraine2016',
   fields: ['FID', 'type', 'NUMBER_K_1', 'SArea_km'],
   style:function (feature) {
		if(feature.properties.type === 'lateral'){
		  return {color: '#4d3319', fillColor: "#996633", weight: 0.2, fillOpacity: 0.6 };
		} else {
		  return {color: '#4d1300', weight: 0.5, dashArray: 2, fillPattern: pattern, fillOpacity: 1.0 }; } }
});

var mor_attr = '<h3>{type} moraine &ensp;2016</h3><b>Glacier Nr.</b> {NUMBER}\
				  <br><b>Area</b>: {SArea} km<sup>2</sup>';
function R_mor(layer) {
   return {SArea: layer.feature.properties.SArea_km.toFixed(1),
		   type:   layer.feature.properties.type,
		   NUMBER:layer.feature.properties.NUMBER_K_1};}
m2016.bindPopup(function (layer) {
  return L.Util.template(mor_attr, R_mor(layer)); });
  

// GLACIERS
map.createPane('Glaciers2016');
var stripes = new L.StripePattern({weight: 1.5, color: '#145252', spaceWeight: 6.5, spaceColor: '#6699cc', spaceOpacity: 1, angle: -30}); stripes.addTo(map);

var gl2016 = L.esri.featureLayer({ url: gl2016Url, precision: 9, pane: 'Glaciers2016',
  fields: ['FID', 'TYPE', 'NAME_ENG', 'NUMBER_KAT', 'SArea_km', 'Vol_km3',
		   'AVG_SLOPE', 'Avg_ASP', 'Elevation', 'H_ice', 'ZMIN', 'ZMAX', 'URL'],
  style:function (feature) {
		if(feature.properties.TYPE === 'moving'){
		  return {color: '#145252', fillColor: "#99ebff", weight: 0.3, fillOpacity: 0.6 };
		} else {
		  return {color: '#202020', fillPattern: stripes, weight: 0.3, fillOpacity: 0.5 }; } }
});

function removeElement(element) {
	 element.remove(); }

var GL_attr = '<h3>{NAME_ENG} glacier &ensp;2016</h3><b>Catalog Nr.</b> {NUMBER_KAT}\
				  <br><b>Area</b>: {SArea} km<sup>2</sup>\
				  <br><b>Estimated ice thickness (mean)</b>: {H_ice} m\
				  <br><b>Estimated ice volume</b>: {Vol} km<sup>3</sup>\
				  <br><b>Altitude range</b>: {ZMIN} - {ZMAX} m asl\
				  <br><b>Average slope</b>: {AVG_SLOPE}&deg\
				  <br><br><a target="_blank" rel="noopener noreferrer" href="{URL}.jpg">\
				  <img src="{URL}.jpg" class=popupImage title="Open image in new tab" onError="removeElement(this);"/>';
function R(layer) {
   return {SArea: layer.feature.properties.SArea_km.toFixed(1),
		   Vol:   layer.feature.properties.Vol_km3.toFixed(1),
		   H_ice: layer.feature.properties.H_ice,
		   ZMIN:  layer.feature.properties.ZMIN,
		   ZMAX:  layer.feature.properties.ZMAX,
		   AVG_SLOPE: layer.feature.properties.AVG_SLOPE,
		   NAME_ENG:  layer.feature.properties.NAME_ENG,
		   NUMBER_KAT:layer.feature.properties.NUMBER_KAT,
		   URL: layer.feature.properties.URL};}

gl2016.bindPopup(function (layer) {
  return L.Util.template(GL_attr, R(layer)); });
  
var Group_gl2016 = L.layerGroup([gl2016, m2016]).addTo(map);


// VOLCANOES
map.createPane('Volc');
function VolcStyle(feature) {
  var colorToUse; var radius; var shape; var w;
  var v = feature.properties.Type;

  if (v === 'Stratovolcano') colorToUse = "#802b00", radius = 8.0, shape = "triangle", w = 1;
  else if (v === "Monogenetic cone") colorToUse = "#ac3939", radius = 5.0, shape = "triangle", w = 1;
  else colorToUse = '#ac3939', radius = 5.0, shape = "x", w = 2;

  return {
	"color": colorToUse,
	"shape": shape,
	"fillOpacity": 1,
	"radius": radius,
	"pane": 'Volc',
	"weight": w
  };}

var volcano = L.esri.featureLayer({url: volcanoUrl, fields: ['FID','Name_eng', 'Type'],
	pointToLayer: function (feature, latlng) {
		return L.shapeMarker(latlng, VolcStyle(feature))
		  .bindTooltip(feature.properties.Name_eng, {className: 'myCSSClass'}); } });
	
var Group_volc = L.layerGroup([volcano, lava]).addTo(map);

// Markers
map.createPane('Mark');
L.esri.featureLayer({url: markUrl, fields: ['FID','Name_eng', 'Label_scal'], 
	minZoom: 8,
	pointToLayer: function (feature, latlng) {
		if (feature.properties.Label_scal === 1)
		return L.circle(latlng, {color: "#001a00", weight: 0.5, opacity: 0.4})
		  .bindTooltip(feature.properties.Name_eng, {className: 'marker_point', permanent: true, offset: [-5,0]}); } })
	.addTo(map);


// Legend Box
var baseLayers = {
	  "Topographic": base,
	  "Sattelite": L.esri.basemapLayer("ImageryClarity") },
	overlays = {
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


// References
var sidebar = L.control.sidebar('sidebar', {closeButton: true}),
	content = '<h2 style="margin-bottom:-6px">References</h2>\
			   <p class="lorem">The map layers were created using the following data sources:</p>\
			   <h3 style="margin-bottom:-6px">Holocene volcanoes</h3>\
			   <p class="lorem">Pevzner M.&nbsp;&nbsp 2015<br> Holocene volcanism of Sredinny Range of Kamchatka, ed. by M. Fedonkin. Transactions of the Geological Institute, vol. 608. Moscow: GEO — 252 p. \
			   <a href="http://www.ginras.ru/library/pdf/608_pevzner2015_holocene_volcanism_kamchatka.pdf"> ISBN 978-5-89118-682-8</a></p>\
			   <h3 style="margin-bottom:-6px">Glaciers</h3>\
			   <p class="lorem">Glaciers outlines were mapped using <a href="https://landsat.usgs.gov/">Landsat</a> Images (L7, L8 - August 2002, 2016) and orthophotoes taken from aircraft in 1949-1951. This dataset reflects glacial retreat in the Northern Kamchatka at the second part of 20th / beginning of 21th century and has been never published before.<br>&copy; Elena Marchenko, Yaroslav Muravyev</p>\
			   <br><hr><h2 style="margin-bottom:-6px">Credits</h2>\
			   <p class="lorem">The webb-map is built using the awesome open-source JavaScript library <a href="https://leafletjs.com/">Leaflet</a>. Besides, it makes use of a set of Leaflet plugins (incl. <a href=”https://esri.github.io/esri-leaflet/”>ESRI for Leaflet</a>) and ArcGIS basemaps. The latter two are freely distributed for non-commercial use under Essentials Developer Plan (<a href=”https://github.com/esri/esri-leaflet#terms”>ESRI’s Terms of Use</a>).</p>\
			   <p class="lorem" style="position: absolute; bottom:0">&copy; 2018 Elena Marchenko<br>PhD, Research fellow<br>\
			   <a href="http://www.kscnet.ru/ivs/">Institute of Volcanology and Seismology</a><br>Far Eastern Branch of Russian Academy<br> of Sciences</p>';

map.addControl(sidebar);
sidebar.setContent(content);

L.easyButton({id: 'reference',
  states:[{stateName: 'ref',
	onClick: function () {
		sidebar.toggle(); },
	title: 'Show/hide references',
	icon: "<img class=button src='button/menu.png'>"}]}).addTo(map);
