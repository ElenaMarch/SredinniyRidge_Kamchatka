/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// References
var sidebar = L.control.sidebar('sidebar', {position: 'right'}),
	content = '<h2 style="margin-bottom:-6px">References</h2>\
			   <p class="lorem">The map layers were created using the following data sources:</p>\
			   <h3 style="margin-bottom:-6px">Holocene volcanoes</h3>\
			   <p class="lorem">Pevzner M.&nbsp;&nbsp 2015<br> Holocene volcanism of Sredinny Range of Kamchatka, ed. by M. Fedonkin. Transactions of the Geological Institute, vol. 608. Moscow: GEO — 252 p. \
			   <a href="http://www.ginras.ru/library/pdf/608_pevzner2015_holocene_volcanism_kamchatka.pdf"> ISBN 978-5-89118-682-8</a></p>\
			   <h3 style="margin-bottom:-6px">Glaciers</h3>\
			   <p class="lorem">Glaciers outlines were mapped using <a href="https://landsat.usgs.gov/">Landsat</a> Images (L7, L8 - August 2002, 2016) and orthophotoes taken from aircraft in 1949-1951. This dataset reflects glacial retreat in the Northern Kamchatka at the second part of 20th / beginning of 21th century and has been never published before.<br>&copy; Elena Marchenko, Yaroslav Muravyev</p>\
			   <br><hr><h2>Credits</h2>\
			   <p class="lorem">The webb-map is built using the awesome open-source JavaScript library <a href="https://leafletjs.com/">Leaflet</a>. Besides, it makes use of a set of Leaflet plugins (incl. <a href=”https://esri.github.io/esri-leaflet/”>ESRI for Leaflet</a>) and ArcGIS basemaps. The latter two are freely distributed for non-commercial use under Essentials Developer Plan (<a href=”https://github.com/esri/esri-leaflet#terms”>ESRI’s Terms of Use</a>).</p>\
			   <br><hr>\
			   <p class="lorem">&copy; 2018 Elena Marchenko<br>PhD, Research fellow<br>\
			   <a href="http://www.kscnet.ru/ivs/">Institute of Volcanology and Seismology</a><br>Far Eastern Branch of Russian Academy<br> of Sciences</p>';

map.addControl(sidebar);
sidebar.setContent(content);
// sidebar.show();