/*

  Copyright (c) 2018 by Elena Marchenko
  
 */

// Measurements
L.control.measure({lineColor: 'red', position: 'topleft', captureZIndex: 10000 }).addTo(map);

// Layers to draw in
var drawnObjects = new L.FeatureGroup({pane: 'Draw'});
map.addLayer(drawnObjects);

var popup  = new L.Popup({maxWidth: 200, closeButton: false, className: 'popupCustom'});
var popup2 = new L.Popup({maxWidth: 200, closeButton: false, offset: L.point(1,-25), className: 'popupCustom'});
drawnObjects.on('click', function(e){
	var props = e.layer.feature.properties = e.layer.feature.properties || {},
		popup_fin = '<label><strong>'+ props.name +'</strong></label><br>' + props.note;
		if (e.layer instanceof L.Marker) {
			popup2.setLatLng(e.latlng)
				  .setContent(popup_fin)
				  .openOn(map); }
		else {
			popup.setLatLng(e.latlng)
				 .setContent(popup_fin)
				 .openOn(map); }
	});


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
	position: 'topleft',
	draw:{circle:false, circlemarker:false, rectangle:false,
		  marker: {icon: drawIcon},
		  polygon: {shapeOptions:{color: '#334d4d', weight: 2}, 
					  icon: vertIcon},
		  polyline: {shapeOptions:{color: '#334d4d', weight: 2},
					   icon: vertIcon}},
	edit:{featureGroup: drawnObjects} });
map.addControl(drawControl);

map.on('draw:created', function (e) {
	var layer = e.layer,
		feature = layer.feature = layer.feature || {};
	feature.type = feature.type || "Feature"; 
	var props = feature.properties = feature.properties || {};
	drawnObjects.addLayer(layer); 

	var content = "<form autocomplete='off'><label for='object'><strong>Name</strong></label><br>" +
				  "<input type='text' id='name_id' name='object'></form>" +
				  '<label><strong>Note</strong></label><textarea id="TEXT" ></textarea>'+
				  '<div align="right">'+
				  '<button type="button" title="Save note" class="ok" id="OK"><img src="button/ok3.png"></button>'+
				  '</div>';
	layer.bindPopup(content, {closeButton: false, className: 'popupCustom'});
	layer.openPopup();

	$(document).ready(function(){
	  $("#OK").click(function(){
		  props["note"] = $("#TEXT").val();
		  props["name"] = $("#name_id").val();
		  var content = '<label><strong>'+ props.name +'</strong></label><br><br>'+props.note;
		  layer._popup.setContent(content);
		});     
	});
});

// Download Button
var down = L.easyButton({id: 'get-notes',
  position: 'topleft',
  states:[{stateName: 'download',
	onClick: function(){
	  var data = drawnObjects.toGeoJSON(),
		  blob = new Blob([JSON.stringify(data)], {type: "text/json;charset=utf-8"});
	  saveAs(blob, "features.json"); 
	  },
	title: 'Download drawnObjects as a GeoJSON file',
	icon: "<img class=button src='button/DL.png'>"}]}).addTo(map);

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
L.Control.FileLayerLoad.LABEL = "<img class=button1 src='button/UL.png'>";
var control = L.Control.fileLayerLoad({
	position: 'topleft',
    fitBounds: true,
	layerOptions: {style: style,
                   pointToLayer: function (data, latlng) {
					    var name = data.properties.name;
						var marker = L.marker(latlng, {icon: showIcon}).bindPopup(name, {closeButton: false, className: 'popupCustom'});
                      	return marker;
                   }},
}).addTo(map);





