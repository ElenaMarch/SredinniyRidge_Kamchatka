/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  Volcanic hazard in Kamchatka, scale 1:000 000

*/


// URLs
rivURL = "json/rivers.geojson";
cityURL = "json/cities.geojson";
avolcURL = "json/active_volcanoes.geojson";
dangerURL = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/danger/FeatureServer/0";
hdangerURL = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/high_danger/FeatureServer/0";



// Base
var rivLayer = new L.GeoJSON.AJAX(rivURL, {style: {"color": "#3399ff", "weight": 0.3}}).addTo(map);
map.on('zoomend', function () {
  if (map.getZoom() > 9 && map.hasLayer(rivLayer)) {
    map.removeLayer(rivLayer)
  }
  if (map.getZoom() < 10 && !map.hasLayer(rivLayer)) {
    rivLayer.addTo(map);
  }
});

var cityMarker = {
  radius: 2.2,
  fillColor: "white",
  color: "#424040",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.9
};

var cityLayer = new L.GeoJSON.AJAX(cityURL,
  {pointToLayer: function (feature, latlng) {
    var marker = L.circleMarker(latlng, cityMarker);
    marker.bindTooltip(feature.properties.PPPTNAME, {className: 'cityLabels', interactive: true});
    return marker} }
  ).addTo(map);

cityLayer.refilter(function(feature){
  return feature.properties.PPPTFLAG > 1;
});


map.on('zoomend', function () {
  if (map.getZoom() > 10 && map.hasLayer(cityLayer)) {
    map.removeLayer(cityLayer)
  }
  if (map.getZoom() < 11 && !map.hasLayer(cityLayer)) {
    cityLayer.addTo(map);
  }
  if (map.getZoom() < 11 && map.getZoom() > 8) {
    cityLayer.refilter(function(feature){
      return feature.properties.PPPTFLAG > 0;
    }); 
  }
  if (map.getZoom() < 9 && map.hasLayer(cityLayer)) {
    cityLayer.refilter(function(feature){
      return feature.properties.PPPTFLAG > 1;
    }); 
  }
});

// Volcanic danger assessment
map.createPane('Danger');
function dangerStyle(feature) {
  switch (feature.properties.Type) {
      case 1: return {"fillColor": "#D21704", "color": "#633705", "fillOpacity": 0.7, "weight": 0.5};
      case 2: return {"fillColor": "#F05511", "color": "#633705", "fillOpacity": 0.7, "weight": 0.5}; 
      case 3: return {"fillColor": "#FCA73C", "color": "#633705", "fillOpacity": 0.7, "weight": 0.5}; 
      case 4: return {"fillColor": "#FFE668", "color": "#633705", "fillOpacity": 0.7, "weight": 0.5}; }
};  
var dangerLayer = L.esri.featureLayer({url: dangerURL,  precision: 12,  maxZoom: 8, pane: 'Danger',
  fields: ['FID', 'Type'], style: dangerStyle});

map.createPane('HighDanger');
var stripes = new L.StripePattern({weight: 1.5, height: 4, color: 'black', spaceWeight: 2.5, spaceColor: 'none', angle: -30}); stripes.addTo(map);
var hdangerLayer = L.esri.featureLayer({url: hdangerURL,  precision: 9,  maxZoom: 8, pane: 'HighDanger', 
  fields: ['FID'], style: {fillPattern: stripes, weight: 0.3, fillOpacity: 0.5, color: 'grey' }});

var hazard = L.layerGroup([dangerLayer, hdangerLayer]).addTo(map);

map.createPane('AV');
function avolcStyle(feature) {
	switch (feature.properties.type) {
      case 1: return {"color": "red", "weight": 1.2, 'shape': "triangle", 'radius': 3, "fillOpacity": 0.75, "pane": 'AV'};
      case 2: return {"color": "black", 'weight': 1.2, 'shape': "triangle", 'radius': 3, "fillOpacity": 0.75, "pane": 'AV'}; 
      case 3: return {"color": "grey", 'weight': 1.2, 'shape': "triangle", 'radius': 3, "fillOpacity": 0.75, "pane": 'AV'};    }
};
var avolcLayer = new L.GeoJSON.AJAX(avolcURL,
  {pointToLayer: function (feature, latlng) {
    var marker = L.shapeMarker(latlng, avolcStyle(feature));
    (map.getZoom() >= 10
        ? marker.bindTooltip(feature.properties.Name_eng, {className: 'avolcLabels', permanent:true})
        : marker.bindTooltip(feature.properties.Name_eng, {className: 'avolcLabels', permanent:false} )
    );
    return marker} }
).addTo(map);

var lastZoom;
map.on('zoomend', function() {
    var zoom = map.getZoom();
    if (zoom < 9 && (!lastZoom || lastZoom >= 9)) {
        map.eachLayer(function(l) {
            if (l.getTooltip() && l.options.pane!='Volc') {
                var tooltip = l.getTooltip();
                l.unbindTooltip().bindTooltip(tooltip, {
                    permanent: false
                })
            }
        })
    } else if (zoom >= 9 && (!lastZoom || lastZoom < 9)) {
        map.eachLayer(function(l) {
            if (l.getTooltip() && l.options.pane!='Volc') {
                var tooltip = l.getTooltip();
                l.unbindTooltip().bindTooltip(tooltip, {
                    permanent: true
                })
            }
        });
    }
    lastZoom = zoom;
});


// Seismic activity
 
