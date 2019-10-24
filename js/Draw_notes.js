/*

  Copyright (c) 2018 by Elena Marchenko
  
 */

// Layers to draw in
var objects = new L.FeatureGroup();
map.addLayer(objects);

var popup = new L.Popup({maxWidth: 200, closeButton: false, offset: L.point(1,-25)});
objects.on('click', function(e){
	var props = e.layer.feature.properties = e.layer.feature.properties || {},
			popup_fin = '<label><strong>Note '+ props.id +'</strong></label><br>' + props.note;
	popup2.setLatLng(e.latlng)
		  .setContent(popup_fin)
		  .openOn(map);
	});

// Drawing
drawIcon = new L.icon({
	iconUrl: 'button/marker-icon-red.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -33],
	shadowUrl: 'button/marker-shadow.png',
	shadowSize: [41, 41],
	shadowAnchor: [12, 41]
});

var drawControl = new L.Control.Draw({ 
	draw:{circle:false, circlemarker:false, rectangle:false,
		  marker: {icon: drawIcon},
		  polygon: {shapeOptions:{color: '#e60000'}},
		  polyline: {shapeOptions:{color: '#e60000'}} },
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
	layer.bindPopup(content, {closeButton:false});
	layer.openPopup();

	$(document).ready(function(){
	  $("#OK").click(function(){
		  props["note"] = $("#TEXT").val();
		  props["id"] = n;
		  var content = '<label><strong>Note '+ props.id +'</strong></label><br>'+props.note;
		  layer._popup.setContent(content) });      
	});
});

map.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer( function (layer) {
        objects.editLayer(layer);
        });
});


// Download Button
var down = L.easyButton({id: 'get-notes',
  states:[{stateName: 'download',
	onClick: function(){
	  var data = objects.toGeoJSON(),
		  blob = new Blob([JSON.stringify(data)], {type: "text/json;charset=utf-8"});
	  saveAs(blob, "features.json"); 
	  },
	title: 'Download objects as a GeoJson file',
	icon: "<img src='button/DL.png'>"}]});

// Upload button
var up = L.easyButton({id: 'upload-data',
  states:[{stateName: 'upload',
	onClick: function(){
		var uploaded_features = new L.GeoJSON.AJAX("features (13).json");
		uploaded_features.addTo(objects);
	},
	title: 'Upload your objects to the map',
	icon: "<img src='button/UL.png'>"}]});

L.easyBar([down, up], {position: 'bottomleft'}).addTo(map);