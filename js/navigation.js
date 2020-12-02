/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// BaseMap
var circle_nv = {
  radius: 4,
  color: "#492622",
  weight: 2,
  opacity: 1,
  fillOpacity: 0.5
};

var nv = L.map('mapSmall', {attributionControl: false, zoomControl: false}).setView([55.566,160.082], 4); // 7 ; 55.566,160.082
var nv_base = L.esri.basemapLayer('Gray').addTo(nv),
  box = L.layerGroup().addTo(nv);
nv.dragging.disable();


function addBox() {
  box.clearLayers();
  map.removeLayer(box);
  var bounds = map.getBounds();
  box.addLayer(L.rectangle(bounds, {color: "#20AB22", weight: 1}));
};

nv.on('click', function(e) {
  map.setView(e.latlng);
});

addBox();
// var kl_nv = L.circleMarker([56.056, 160.641], circle_nv).addTo(nv),
//     sr_nv = L.circleMarker([57.686, 160.476], circle_nv).addTo(nv);

nv.on('mouseover', function() {
  $("#mapSmall").tooltip({tooltipClass: "custom-tooltip-styling", track: true});
});
map.on('moveend', addBox);
