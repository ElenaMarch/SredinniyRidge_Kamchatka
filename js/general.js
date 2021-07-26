/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// BaseMap
var map = L.map('map', {attributionControl: false}).setView([55.566,160.082], 7);
// var base = L.esri.basemapLayer('Topographic').addTo(map);

// Coordinates and Scale
// function addControlPlaceholders(map) {
//     var corners = map._controlCorners,
//         l = 'leaflet-',
//         container = map._controlContainer;

//     function createCorner(vSide, hSide) {
//         var className = l + vSide + ' ' + l + hSide;
//         corners[vSide + hSide] = L.DomUtil.create('div', className, container);
//     }
//     createCorner('bottom', 'center');
// }
// addControlPlaceholders(map);

L.control.coordinates({
	position:"bottomright",
	decimals:3,
	decimalSeperator:".",
	labelTemplateLat:"N {y}&#176;&nbsp;&nbsp",
	labelTemplateLng:"&nbspE {x}&#176",
	useLatLngOrder:true
}).addTo(map);

L.control.scale({imperial: false, position: 'bottomright'}).addTo(map);


// L.Control.Watermark = L.Control.extend({
// 	onAdd: function(map) {
// 		var img = L.DomUtil.create('img');
// 		img.src = 'logo/IVIS.png';
// 		img.style.width = '110px';
// 		return img;},
// 	onRemove: function(map) {} });

// L.control.watermark = function(opts) {return new L.Control.Watermark(opts); }
// L.control.watermark({ position: 'bottomright' }).addTo(map);
var help_content = "<img class=helpImage src='Webmap_instructions_eng.png'>"
var win =  L.control.window(map, {content: help_content, modal: true, position: 'top'})

// Button for references
L.easyButton({id: 'reference',
	states:[{stateName: 'ref',
		onClick: function () {
			sidebar.toggle(); },
	title: 'Show/hide references',
	icon: "<img class=button src='button/book.png'>"}]}).addTo(map);

L.easyButton({id: 'help',
	states:[{stateName: 'help',
		onClick: function () {
			win.show(); },
	title: 'Show help',
	icon: "<img class=button src='button/question.png'>"}]}).addTo(map);

