/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// BaseMap
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
nv.on('mouseover', function() {
  $("#mapSmall").tooltip({tooltipClass: "custom-tooltip-styling", track: true});
});
map.on('moveend', addBox);