// Kluchevskaya Group
// General layers
let date = new Date();
console.log();

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
lavaVershinLayer.bindPopup(function (layer) {
    var attr = "Summit lava flows in<br><b>" + layer.feature.properties.Name + "</b>";
    return attr; }, {'className':'popupCustom'});
var shapeL = new L.PatternCircle({ x: 1, y: 1, radius: 1, fill: true, color: '#4D1300', spaceColor: "D7C29E", weight: 0.5}); 
var patternL = new L.Pattern({width: 4, height: 4}); patternL.addShape(shapeL); patternL.addTo(map);
function lavaPobochStyle(feature) {
    switch (feature.properties.Id) {
        case 4: return {"color": "#1c79ca", "weight": 0.5, "fillColor": "#3692E3", "fillOpacity": 0.7, precision: 10};
        case 5: return {"color": "#635976", "weight": 0.5, "fillColor": "#9386AE", "fillOpacity": 0.7, precision: 10}; 
        case 6: return {"color": "#ff4d64", "weight": 0.5, "fillColor": "#FF7082", "fillOpacity": 0.7, precision: 10};
        case 7: return {"color": "#c5072d", "weight": 0.5, "fillColor": "#F61340", "fillOpacity": 0.7, precision: 10};
        case 8: return {"color": "#595959", "weight": 0.5, "fillColor": "#b3b3b3", "fillOpacity": 0.7, precision: 10};
        case 9: return {"color": "#9B373D", "weight": 0.5, "fillColor": "#B26045", "fillOpacity": 0.7, precision: 10};
        case 0: return {"color": "#4D1300", "weight": 0.5, "fillPattern": patternL, "fillOpacity": 0.7, precision: 10};
        case 1: return {"color": "#8a8a5c", "weight": 0.5, "fillColor": "#a3a375", "fillOpacity": 0.7, precision: 10}; 
        case 2: return {"color": "#bac46e", "weight": 0.5, "fillColor": "#C7CF8A", "fillOpacity": 0.7, precision: 10}; 
        case 3: return {"color": "#39ac73", "weight": 0.5, "fillColor": "#6BDE87", "fillOpacity": 0.7, precision: 10}; };
    };
var lavaPobochLayer = new L.GeoJSON.AJAX("json/lava_poboch.geojson", {style: lavaPobochStyle, pane: 'Kluch2'});
var Kluch_attr = "<h3>{Name}</h3>\
                <b>Morphology</b>: lava flow\
                <br><b>Area</b>: {S} km<sup>2</sup>\
				<br><b>Eruption's date</b>: {Date}\
				<br><b>Age</b>: {Age} years";
function Kl(layer) {
    let a;
    if (layer.feature.properties.Eruption_a.includes('00')) {
        a = layer.feature.properties.Eruption_a
    } else {
        a = date.getFullYear() - layer.feature.properties.Eruption_d
    }
	return {Name: layer.feature.properties.Name_eng,
			S:   layer.feature.properties.Area_pl_km.toFixed(2), //
			Date: layer.feature.properties.Eruption_d,
			Age:  a};}

lavaPobochLayer.bindPopup(function (layer) {
	return L.Util.template(Kluch_attr, Kl(layer)); }, {'className':'popupCustom'});


var shapeShish = new L.PatternPath({ d: 'M1 1 L 5 6 L 9 1', color: '#A87000', weight: 0.6});
var patternShish = new L.Pattern({width: 12, height: 8}); patternShish.addShape(shapeShish); patternShish.addTo(map);
var lavaShishLayer = new L.GeoJSON.AJAX("json/lavoviy_shish.geojson", 
    {style: {"color": "#A87000", "weight": 0.6, "fillPattern": patternShish, "fillOpacity": 1, precision: 10}, pane: 'Kluch2'});

lavaShishLayer.bindPopup(function (layer) {
    var Shish_attr = "<h3>Lavoviy Shish</h3>\
        <b>Morphology</b>: shield volcano/lava field\
        <br><b>Area</b>: " + layer.feature.properties.Area_pl_km.toFixed(2) + " km<sup>2</sup>\
        <br><b>Age</b>: c. 9000 years";
	return Shish_attr; }, {'className':'popupCustom'});

var conesPobochLayer = new L.GeoJSON.AJAX("json/cones_poboch.geojson", {style: lavaPobochStyle, pane: 'Kluch2'});
var Cones_attr = "<h3>{Name}</h3>\
                <b>Morphology</b>: cinder cone\
                <br><b>Altitude</b>: {Altitude} m\
				<br><b>Eruption's date</b>: {Date}\
                <br><b>Age group</b>: {Age}";

function Con(layer) {
    return {Name: layer.feature.properties.Name_eng,
            Date: layer.feature.properties.Eruption_d,
            Age:  layer.feature.properties.Eruption_a,
            Altitude: layer.feature.properties.Altitude};}

conesPobochLayer.bindPopup(function (layer) {
	return L.Util.template(Cones_attr, Con(layer)); }, {'className':'popupCustom'});

map.createPane('Kluch3');
function conesStyle(feature) {
	switch (feature.properties.Type) {
      case 'large': return {"color": "#595959", 'shape': "triangle", 'radius': 2.5, "fillOpacity": 1, "weight":1, 'pane': 'Kluch3'};
      case 'small': return {"color": "#595959", 'shape': "triangle", 'radius': 2.5, "fillOpacity": 1, "weight":1, 'pane': 'Kluch3'}; 
      case 'sheet': return {"color": "#595959", 'shape': "x", 'radius': 5, "weight":2, "fillOpacity": 0.75, 'pane': 'Kluch3'};    }
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
var shapeI = new L.PatternCircle({ x: 1, y: 1, radius: 1, fill: true, color: '#00A1DE', spaceColor: "transparent", weight: 0.5}); 
var patternI = new L.Pattern({width: 4, height: 4}); patternI.addShape(shapeI); patternI.addTo(map);
var iceCoverLayer = new L.GeoJSON.AJAX("json/cover_ice_kluch.geojson", 
    {style: {"color": "transparent", "weight": 0, "fillPattern": patternI, "fillOpacity": 0.7, precision: 10}, pane: 'Kluch'});

var glKLuchLayer = new L.GeoJSON.AJAX("json/glaciers_kluch.geojson", 
    {style: function (feature) {return glacierStyle(feature.properties.Type) }, pane: 'Kluch'});
var glKluch_attr = "<h3>{Name} glacier</h3><b>Area</b>: {S} km<sup>2</sup>";
function glKl(layer) {
    return {Name: layer.feature.properties.Name_eng,
            S:   layer.feature.properties.Area_km2.toFixed(2) };}
glKLuchLayer.bindPopup(function (layer) {
    return L.Util.template(glKluch_attr, glKl(layer)); }, {'className':'popupCustom'});

var stripes2 = new L.StripePattern({weight: 1.2, color: '#00A1DE', spaceWeight: 3, spaceColor: 'transparent', angle: -30}); 
stripes2.addTo(map);
var passKLuchLayer = new L.GeoJSON.AJAX("json/passive_ice_kluch.geojson", 
    {style: {"color": "#00A1DE", "weight": 0.7, "fillPattern": stripes2, "fillOpacity": 0.5, dashArray: 2, precision: 10}, pane: 'Kluch'});

var creepLayer = new L.GeoJSON.AJAX("json/creeping_fronts.geojson", {style: {"color": "#00cc7a", "weight": 2, "opacity": 0.6}, pane: 'Kluch3'});


// houses
var houseLayer = new L.GeoJSON.AJAX("json/house.geojson",
    {pointToLayer: function (feature, latlng) {
        var marker = L.shapeMarker(latlng, {shape: 'square', radius: 3, color: "orange", fillColor: "yellow", weight: 0.7, 
            fillOpacity: 0.9, pane: 'Kluch3'});
        marker.bindTooltip(feature.properties.Name_eng, {className: 'houseLabels', interactive: true});
        return marker}, minZoom: 9
});

// Add all together
var kluchGroup = new L.layerGroup([lavaVershinLayer, lavaPobochLayer, conesPobochLayer, conesPobochPointsLayer, lavaShishLayer], {minZoom: 9}),
    glKluchGroup = new L.layerGroup([glKLuchLayer, passKLuchLayer, creepLayer, iceCoverLayer], {minZoom: 9}),
    rivKluchGroup = new L.layerGroup([rivKluchLayer, rivPolyKluchLayer]);

