// Kluchevskaya Group
// General layers
map.createPane('Kluch');
function rivStyle(feature) {
    switch (feature.properties.Type) {
        case 'wide': return {"color": "#3399ff", "weight": 0.3};
        case 'normal': return {"color": "#3399ff", "weight": 0.3}; 
        case 'temporary': return {"color": "#3399ff", "weight": 0.3, dashArray: 3};  }
  };
map.createPane('Kluch2');
var rivKluchLayer = new L.GeoJSON.AJAX("json/kluch_rivers.geojson", {style: rivStyle, pane: 'Kluch'});
var rivPolyKluchLayer = new L.GeoJSON.AJAX("json/kluch_rivers_poly.geojson", 
    {style: {"color": "#3399ff", "weight": 0.5, "fillColor": "#BEE8FF", "fillOpacity": 0.7}, pane: 'Kluch2'});


// Lava flows
var lavaVershinLayer = new L.GeoJSON.AJAX("json/lava_vershin.geojson", 
    {style: {"color": "#F61340", "weight": 0.5, "fillColor": "#F61340", "fillOpacity": 0.7, precision: 10}, pane: 'Kluch2'});
var shapeL = new L.PatternCircle({ x: 1, y: 1, radius: 1, fill: true, color: '#4D1300', spaceColor: "D7C29E", weight: 0.5}); 
var patternL = new L.Pattern({width: 4, height: 4}); patternL.addShape(shapeL); patternL.addTo(map);
function lavaPobochStyle(feature) {
    switch (feature.properties.Id) {
        case 4: return {"color": "#1c79ca", "weight": 0.5, "fillColor": "#3692E3", "fillOpacity": 0.7, precision: 10};
        case 5: return {"color": "#3aacf8", "weight": 0.5, "fillColor": "#7AC7FA", "fillOpacity": 0.7, precision: 10}; 
        case 6: return {"color": "#ff4d64", "weight": 0.5, "fillColor": "#FF7082", "fillOpacity": 0.7, precision: 10};
        case 7: return {"color": "#c5072d", "weight": 0.5, "fillColor": "#F61340", "fillOpacity": 0.7, precision: 10};
        case 8: return {"color": "#595959", "weight": 0.5, "fillColor": "#b3b3b3", "fillOpacity": 0.7, precision: 10};
        case 0: return {"color": "#4D1300", "weight": 0.5, "fillPattern": patternL, "fillOpacity": 0.7, precision: 10};
        case 1: return {"color": "#edeb92", "weight": 0.5, "fillColor": "#f4f3be", "fillOpacity": 0.7, precision: 10}; 
        case 2: return {"color": "#bac46e", "weight": 0.5, "fillColor": "#C7CF8A", "fillOpacity": 0.7, precision: 10}; 
        case 3: return {"color": "#39ac73", "weight": 0.5, "fillColor": "#6BDE87", "fillOpacity": 0.7, precision: 10}; };
    };
var lavaPobochLayer = new L.GeoJSON.AJAX("json/lava_poboch.geojson", {style: lavaPobochStyle, pane: 'Kluch2'});
var Kluch_attr = "<h3>{Name}</h3>\
                <b>Morphology</b>: lava flow\
                <br><b>Area</b>: {S} km<sup>2</sup>\
				<br><b>Eruption's date</b>: {Date}\
				<br><b>Age group</b>: {Age}";
function Kl(layer) {
	return {Name: layer.feature.properties.Name_eng,
			S:   layer.feature.properties.Ares_su_km.toFixed(1), //
			Date: layer.feature.properties.Eruption_d,
			Age:  layer.feature.properties.Eruption_a};}

lavaPobochLayer.bindPopup(function (layer) {
	return L.Util.template(Kluch_attr, Kl(layer)); }, {'className':'popupCustom'});


var shapeShish = new L.PatternPath({ d: 'M5 5 L7 5 L6 7 Z', fill: true, color: 'A87000'});
var patternShish = new L.Pattern({width: 3, height: 3}); patternShish.addShape(shapeShish); patternShish.addTo(map);
var lavaShishLayer = new L.GeoJSON.AJAX("json/lavoviy_shish.geojson", 
    {style: {"color": "#A87000", "weight": 0.5, "fillPattern": patternShish, "fillOpacity": 1, precision: 10}, pane: 'Kluch2'});
var conesPobochLayer = new L.GeoJSON.AJAX("json/cones_poboch.geojson", {style: lavaPobochStyle, pane: 'Kluch2'});
conesPobochLayer.bindPopup(function (layer) {
	return L.Util.template(Kluch_attr, Kl(layer)); }, {'className':'popupCustom'});

map.createPane('Kluch3');
function conesStyle(feature) {
	switch (feature.properties.Type) {
      case 'large': return {"color": "#595959", 'shape': "circle", 'radius': 3, "fillOpacity": 1, 'pane': 'Kluch3'};
      case 'small': return {"color": "#595959", 'shape': "circle", 'radius': 2, "fillOpacity": 1, 'pane': 'Kluch3'}; 
      case 'sheet': return {"color": "#595959", 'shape': "x", 'radius': 6, "fillOpacity": 0.75, 'pane': 'Kluch3'};    }
};

var conesPobochPointsLayer = new L.GeoJSON.AJAX("json/cones_poboch_point.geojson",
    {pointToLayer: function (feature, latlng) {
      var marker = L.shapeMarker(latlng, conesStyle(feature));
      (map.getZoom() >= 12
        ? marker.bindTooltip(feature.properties.Name_eng, {className: 'avolcLabels', permanent:true})
        : marker.bindTooltip(feature.properties.Name_eng, {className: 'avolcLabels', permanent:false} ));
      return marker} 
    });

// Glaciers
var glKLuchLayer = new L.GeoJSON.AJAX("json/glaciers_kluch.geojson", 
    {style: {"color": "#00A1DE", "weight": 0.7, "fillColor": "#BFF5F5", "fillOpacity": 0.7, dashArray: 2, precision: 10}, pane: 'Kluch'});

var passKLuchLayer = new L.GeoJSON.AJAX("json/passive_ice_kluch.geojson", 
    {style: {"color": "#00A1DE", "weight": 0.7, "fillPattern": stripes, "fillOpacity": 0.6, dashArray: 2, precision: 10}, pane: 'Kluch'});


// houses
var houseLayer = new L.GeoJSON.AJAX("json/house.geojson",
    {pointToLayer: function (feature, latlng) {
        var marker = L.shapeMarker(latlng, {shape: 'square', radius: 3, color: "orange", fillColor: "yellow", weight: 0.7, 
            fillOpacity: 0.9, pane: 'Kluch3'});
        marker.bindTooltip(feature.properties.Name_eng, {className: 'houseLabels', interactive: true});
        return marker}
});

// Add all together
var kluchGroup = L.layerGroup([rivKluchLayer, rivPolyKluchLayer, houseLayer, 
    lavaVershinLayer, lavaPobochLayer, conesPobochLayer, conesPobochPointsLayer, lavaShishLayer, glKLuchLayer, passKLuchLayer], {minZoom: 9});

