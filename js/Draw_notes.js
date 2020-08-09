/*

  Copyright (c) 2018 by Elena Marchenko
  
 */

// Layers to draw in
var objects = new L.FeatureGroup();
map.addLayer(objects);

var popup  = new L.Popup({maxWidth: 200, closeButton: false, className: 'popupCustom'});
var popup2 = new L.Popup({maxWidth: 200, closeButton: false, offset: L.point(1,-25), className: 'popupCustom'});
objects.on('click', function(e){
	var props = e.layer.feature.properties = e.layer.feature.properties || {},
		popup_fin = '<label><strong>Note '+ props.id +'</strong></label><br>' + props.note;
		if (e.layer instanceof L.Marker) {
			popup2.setLatLng(e.latlng)
				  .setContent(popup_fin)
				  .openOn(map); }
		else {
			popup.setLatLng(e.latlng)
				 .setContent(popup_fin)
				 .openOn(map); }
	});

//Upload Button
showIcon = new L.icon({
	iconUrl: 'button/marker-icon.png',
	iconSize: [19, 32],
	iconAnchor: [9, 32],
	popupAnchor: [1, -33],
	shadowUrl: 'button/marker-shadow.png',
	shadowSize: [32, 32],
	shadowAnchor: [9, 32]
});
var style = {color:'#0073e6', opacity: 0.7, fillOpacity: 0.3, weight: 3};
L.Control.FileLayerLoad.LABEL = "<img src='button/UL.png'>";
var control = L.Control.fileLayerLoad({
	position: 'bottomleft',
    fitBounds: false,
	layerOptions: {style: style,
                   pointToLayer: function (data, latlng) {
                      return L.marker(latlng, {icon: showIcon});
                   }},
}).addTo(map);
control.loader.on('data:loaded', function (e) {
	layers = e.layer;
	layers.eachLayer(function(l) {
		l.addTo(objects);
	})
	map.fitBounds(layers.getBounds());
});

// Download Button
var down = L.easyButton({id: 'get-notes',
  position: 'bottomleft',
  states:[{stateName: 'download',
	onClick: function(){
	  var data = objects.toGeoJSON(),
		  blob = new Blob([JSON.stringify(data)], {type: "text/json;charset=utf-8"});
	  saveAs(blob, "features.json"); 
	  },
	title: 'Download objects as a GeoJSON file',
	icon: "<img src='button/DL.png'>"}]}).addTo(map);

// Drawing
drawIcon = new L.icon({
	iconUrl: 'button/marker-icon-red.png',
	iconSize: [19, 32],
	iconAnchor: [9, 32],
	popupAnchor: [1, -33],
	shadowUrl: 'button/marker-shadow.png',
	shadowSize: [32, 32],
	shadowAnchor: [9, 32]
});

vertIcon = new L.DivIcon({
	iconSize: new L.Point(8, 8),
	className: 'leaflet-div-icon leaflet-editing-icon my-own-editing-icon'
});

var drawControl = new L.Control.Draw({
	position: 'bottomleft',
	draw:{circle:false, circlemarker:false, rectangle:false,
		  marker: {icon: drawIcon},
		  polygon: {shapeOptions:{color: '#334d4d', weight: 2}, 
					  icon: vertIcon},
		  polyline: {shapeOptions:{color: '#334d4d', weight: 2},
					   icon: vertIcon}},
	edit:{featureGroup: objects} });
map.addControl(drawControl);

map.on('draw:created', function (e) {
	var layer = e.layer,
		type = e.layerType,
		feature = layer.feature = layer.feature || {},
		n = objects.getLayers().length + 1;
	feature.type = feature.type || "Feature"; 
	var props = feature.properties = feature.properties || {};
	objects.addLayer(layer); 

	var content = '<label><strong>Note '+ n +'</strong></label><br>' +
				  '<textarea style="width:250px;height:80px;" id="TEXT" ></textarea>'+
				  '<div align="right">'+
				  '<button type="button" title="Save note" class="ok" id="OK"><img src="button/ok3.png"></button>'+
				  '</div>';
	layer.bindPopup(content, {closeButton: false, className: 'popupCustom'});
	layer.openPopup();

	$(document).ready(function(){
	  $("#OK").click(function(){
		  props["note"] = $("#TEXT").val();
		  props["id"] = n;
		  var content = '<label><strong>Note '+ props.id +'</strong></label><br>'+props.note;
		  layer._popup.setContent(content) });      
	});
});

// Measurements
L.control.measure({lineColor: 'red', position: 'bottomleft' }).addTo(map);


