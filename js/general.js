/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// BaseMap
var map = L.map('map').setView([56.056,160.061], 11); // 7 ; 55.566,160.082
var base = L.esri.basemapLayer('Topographic').addTo(map);

L.Control.Watermark = L.Control.extend({
		onAdd: function(map) {
			var img = L.DomUtil.create('img');
			img.src = 'logo/IVIS.png';
			img.style.width = '110px';
			return img;},
		onRemove: function(map) {} });

L.control.watermark = function(opts) {return new L.Control.Watermark(opts); }
L.control.watermark({ position: 'bottomright' }).addTo(map);

// Coordinates and Scale
L.control.coordinates({
	position:"bottomleft",
	decimals:3,
	decimalSeperator:".",
	labelTemplateLat:"N {y}&#176;&nbsp;&nbsp",
	labelTemplateLng:"&nbspE {x}&#176",
	useLatLngOrder:true
}).addTo(map);

L.control.scale({imperial: false}).addTo(map);

// Button for references
L.easyButton({id: 'reference',
  states:[{stateName: 'ref',
	onClick: function () {
		sidebar.toggle(); },
	title: 'Show/hide references',
	icon: "<img class=button src='button/menu.png'>"}]}).addTo(map);

