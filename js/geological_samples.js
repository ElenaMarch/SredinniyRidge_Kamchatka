// Geological darabase of Tatoana Churikova - visualisation

geo_database_URL = "json/Rock_samples_Churikova.geojson";

map.createPane('Samples');
var sampleMarker = {
    radius: 3,
    fillColor: "green",
    color: "blue",
    weight: 1,
    opacity: 0.6,
    fillOpacity: 0.6,
    pane: 'Samples'
  };
  
  var sampleLayer = new L.GeoJSON.AJAX(geo_database_URL,
    {pointToLayer: function (feature, latlng) {
      var marker = L.circleMarker(latlng, sampleMarker);
      marker.bindTooltip(feature.properties.sample, {className: 'avolcLabels', permanent:false});
      return marker} }
    );