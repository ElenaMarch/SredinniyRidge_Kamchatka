/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// BaseMap
var map = L.map('map', {attributionControl: false, maxZoom: 21}).setView([55.566,160.082], 7);
var base = L.esri.basemapLayer('Topographic').addTo(map);

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
			sidebar.toggle();
		},
	title: 'Show sidebar',
	icon: "<img class=button src='button/book.png'>"}]}).addTo(map);

L.easyButton({id: 'help',
	states:[{stateName: 'help',
		onClick: function () {
			win.show(); },
	title: 'Show help',
	icon: "<img class=button src='button/question.png'>"}]}).addTo(map);

// Panes
map.createPane('Overview1');
map.getPane('Overview1').style.zIndex = 500;
map.createPane('Overview2');
map.getPane('Overview2').style.zIndex = 510;
map.createPane('Overview3');
map.getPane('Overview3').style.zIndex = 610;

map.createPane('Local1');
map.getPane('Local1').style.zIndex = 600;
map.createPane('Local2');
map.getPane('Local2').style.zIndex = 605;
map.createPane('Local3');
map.getPane('Local3').style.zIndex = 620;

map.createPane('Samples');
map.getPane('Samples').style.zIndex = 640;
map.createPane('Draw');
map.getPane('Draw').style.zIndex = 645;

// Sidebar
getActiveTab = (id) => {
	activeTab = id;
}

var sidebar = L.control.sidebar('sidebar', {position: 'right', autoPan: false}),
	tabList = {'Legend': 'layers', 'Geosamples': 'hammer-rock-small', 'Chart':'chart', 'References': 'book', 'Credits': 'star'};
	sidebarContent = '<div id="tabs-list" class="tab">';
for (i in tabList){
	sidebarContent += '<button class="tablinks" id="tab-'+ i +'" onclick="sidebar.setTab(this.id, content'+ i +');getActiveTab(this.id);" title="'+ i +'"><img src="button/'+ tabList[i] +'.png"></button>';
}
sidebarContent += '</div><div class="tab-content"></div>';
var activeTab = 'tab-Legend';

sidebar.setContent(sidebarContent);
map.addControl(sidebar);
sidebar.show();

// let charDiv = document.getElementById('chart-pane');
// let charDiv = document.createElement('div');
// charDiv.innerHTML = "<h2>Geological samples - charts</h2><form id='fields-selection' enctype='multipart/form-data'></form><div class='chart-container'><canvas id='chart'></canvas></div>";
// var contentChart = charDiv;

L.LayerGroup.include({
    customGetLayer: function (name) {
        for (var i in this._layers) {
            if (this._layers[i].feature.properties.name == name) {
               return this._layers[i];
            }
        }
    }
});

