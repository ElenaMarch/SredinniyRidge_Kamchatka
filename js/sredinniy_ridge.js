/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// URL
var lavaUrl    = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/lava_holo/FeatureServer/0";
var volcanoUrl = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/volc_holo/FeatureServer/0";
var gl2016Url  = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/glaciers_2016/FeatureServer/0";
var m2016Url   = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/moraine_2016/FeatureServer/0";
var markUrl	   = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/markers/FeatureServer/0";
var rivUrl     = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/rivers_srh/FeatureServer/0";
var volcanoQUrl= "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/Volc_Q/FeatureServer/0";


// LAYERS
// Rivers
// L.esri.featureLayer({url: rivUrl, fields: ['FID'], minZoom: 11,
// 	style: {color: "#3399ff", weight: 0.3}}).addTo(map);
	
// LAVA
map.createPane('Lava');
var lava = L.esri.featureLayer({ url: lavaUrl, precision: 8, pane: 'Lava', minZoom: 9,
  fields: ['FID', 'Name_eng', 'Composit', 'Age', 'Erupt_vol', 'Area', 'Products', 'Type', 'Hyperlink'],
  style: function (feature) {
		if(feature.properties.Composit === 'andesite-basalt'){
		  return {color: '#ff5500', fillColor: "#ff8010", weight: 0.5, fillOpacity: 0.4 };
		} else if(feature.properties.Composit === 'basalt, andesite-basalt'){
		  return {color: '#905080', fillColor: "#ff6030", weight: 0.5, fillOpacity: 0.4 };
		} else if(feature.properties.Composit === 'dacite, biotite'){
		  return {color: '#602060', fillColor: "#602060", weight: 0.5, fillOpacity: 0.4 };
		} else {
		  return {color: '#595959', fillColor: "#b3b3b3", weight: 0.5, fillOpacity: 0.8 }; } }});
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
  return L.Util.template(lava_attr, R_lava(layer)); }, {'className':'popupCustom'});

// Moraine
map.createPane('Moraine2016');
var shape = new L.PatternCircle({ x: 1, y: 1, radius: 1, fill: true, color: '#4d1300', weight: 0.5}); 
var pattern = new L.Pattern({width: 4, height: 4}); pattern.addShape(shape); pattern.addTo(map);

var m2016 = L.esri.featureLayer({ url: m2016Url, precision: 9, pane: 'Moraine2016', minZoom: 9,
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
  return L.Util.template(mor_attr, R_mor(layer)); }, {'className':'popupCustom'});
  

// GLACIERS
map.createPane('Glaciers2016');
var stripes = new L.StripePattern({weight: 1.5, color: '#145252', spaceWeight: 6.5, spaceColor: '#6699cc', spaceOpacity: 0.7, angle: -30}); 
stripes.addTo(map);
function glacierStyle(value) {
	if(value === 'moving'){
	  return {color: '#00A1DE', fillColor: "#99ebff", weight: 0.3, fillOpacity: 0.5, precision: 10 };
	} else {
	  return {color: '#202020', fillPattern: stripes, weight: 0.3, fillOpacity: 0.5, dashArray: 2, precision: 10}; } };

var gl2016 = L.esri.featureLayer({ url: gl2016Url, precision: 9, pane: 'Glaciers2016', minZoom: 9,
  fields: ['FID', 'TYPE', 'NAME_ENG', 'NUMBER_KAT', 'SArea_km', 'Vol_km3',
		   'AVG_SLOPE', 'Avg_ASP', 'Elevation', 'H_ice', 'ZMIN', 'ZMAX', 'URL'],
  style: function (feature) { 
	  return glacierStyle(feature.properties.TYPE) }
});

function removeElement(element) {
	 element.remove(); }

var GL_attr = '<h3>{NAME_ENG} glacier</h3><b>Area</b>: {SArea} km<sup>2</sup>\
				  <br><b>Catalog Nr.</b> {NUMBER_KAT}\
				  <br><b>Outline</b>: 2016</sup>\
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
  return L.Util.template(GL_attr, R(layer)); }, {'className':'popupCustom'});
  
var Group_gl2016 = L.layerGroup([gl2016, m2016], {minZoom: 9}).addTo(map);


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

var volcano = L.esri.featureLayer({url: volcanoUrl, fields: ['FID','Name_eng', 'Type'], minZoom: 9,
	pointToLayer: function (feature, latlng) {
		return L.shapeMarker(latlng, VolcStyle(feature))
		  .bindTooltip(feature.properties.Name_eng, {className: 'myLabels'}); } });

var Group_volc = L.layerGroup([volcano, lava], {minZoom: 9}).addTo(map); //

// Markers
map.createPane('Mark');
L.esri.featureLayer({url: markUrl, fields: ['FID','Name_eng', 'Label_scal'], 
	minZoom: 8,
	pointToLayer: function (feature, latlng) {
		if (feature.properties.Label_scal === 1)
		return L.circle(latlng, {color: "#001a00", weight: 0.5, opacity: 0.4})
		  .bindTooltip(feature.properties.Name_eng, {className: 'marker-point', permanent: true, offset: [-4,0]}); } })
	.addTo(map);

// Quaternary volcanoes
var Qstyle = {
	"color": '#492622',
	"shape": "triangle",
	"fillOpacity": 0.75,
	"radius": 3,
	"pane": 'Volc',
	"weight": 1.2
  }
var volcanoQ = L.esri.featureLayer({url: volcanoQUrl, fields: ['FID','Name_eng', 'Type_eng', 'H', 'Vol_type_e'],
	pointToLayer: function (feature, latlng) {
		return L.shapeMarker(latlng, Qstyle)
		.bindTooltip(feature.properties.Name_eng, {className: 'myLabels', offset: [-5,0]}); } })
	.addTo(map);
	
var Q_attr = '<h3 style="color: #641E16;">{Name}</h3>\
				<b>Class</b>: Quaternary volcanoes\
				<br><b>Altitude</b>: {H} m asl\
				<br><b>Morphology</b>: {Type}\
				<br><b>Eruptive activity</b>: {Vol_type}';
function Q(layer) {
	return {Name: layer.feature.properties.Name_eng,
			Type:   layer.feature.properties.Type_eng,
			H: layer.feature.properties.H,
			Vol_type:  layer.feature.properties.Vol_type_e};}

volcanoQ.bindPopup(function (layer) {
	return L.Util.template(Q_attr, Q(layer)); }, {'className':'popupCustom'});
