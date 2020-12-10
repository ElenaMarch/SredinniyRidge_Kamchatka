/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  
 */

// References
var sidebar = L.control.sidebar('sidebar', {position: 'right'}),
	content = '<h2 style="margin-bottom:-6px">References</h2>\
			   <p class="lorem">The map layers were created using the following data sources:</p>\
			   \
			   <h4 style="margin-bottom:-6px">Active volcanoes and volcanic hazard zones</h4>\
			   <p class="lorem">Markhinin E., Sirin A. et al.&nbsp;&nbsp 1962<br><a href="http://repo.kscnet.ru/3663/1/Marchinin_EK_BVS-32_1962.pdf" target="_blank">Experience of volcano-geographical zoning of Kamchatka and the Kuril Islands.</a> Bulletin of the Kamchatka Volcanological Station. vol 32. p. 52-70. (in Russian)</p>\
			   \
			   <h4 style="margin-bottom:-6px">Sredinniy ridge: quaternary and holocene volcanoes</h4>\
			   <p class="lorem">Ogorodov N., Kozhemyaka N.&nbsp;&nbsp 1972<br>Volcanoes and quaternary volcanism of the Sredinniy ridge of Kamchatka. ed. by Erlikh E., Moscow: Science — 191 p. (in Russian)</p>\
			   \
			   <p class="lorem">Pevzner M.&nbsp;&nbsp 2015<br> Holocene volcanism of Sredinny Range of Kamchatka, ed. by M. Fedonkin. Transactions of the Geological Institute, vol. 608. Moscow: GEO — 252 p. (in Russian)\
			   <a href="http://www.ginras.ru/library/pdf/608_pevzner2015_holocene_volcanism_kamchatka.pdf" target="_blank"> ISBN 978-5-89118-682-8</a></p>\
			   \
			   <h4 style="margin-bottom:-6px">Kluchevskoy volcano: cinder cones and lava flows</h4>\
			   <p class="lorem">Cinder cones and lava flows of lateral eruptions were mapped using sattelite images (LandSAT, ESRI Firefly) and dated based on:</p>\
			   <p class="lorem">Ponomareva V., Melekestsev I., Braitseva O.&nbsp;&nbsp 2010<br>Quaternary volcanism on the Kamchatka Peninsula, Northwest Pacific Region. Eruptive history of Kluchevskoy volcano. Conference presentation. Russian-Japan expert meeting in Kamchatka, November 2010.</p>\
			   \
			   <h4 style="margin-bottom:-6px">Maximum accumulation of seasonal snow (snow water equivalent)</h4>\
			   <p class="lorem">Kotlyakov V., Kravtsova  V., Dreyer N.&nbsp;&nbsp 1997<br>The world atlas of snow and ice resources. Russian Academy of Sciences, Institute of Geography, vol.2 — 371 p. \
			   \
			   <h4 style="margin-bottom:-6px">Glaciers and moraine</h4>\
			   <p class="lorem"><u>Sredinniy ridge</u>: Glaciers outlines were mapped using <a href="https://landsat.usgs.gov/" target="_blank">Landsat</a> Images (L7, L8 - August 2002, 2016) and orthophotoes taken from aircraft in 1949-1951. This dataset reflects glacial retreat in the Northern Kamchatka at the second part of 20th / beginning of 21st century.</p>\
			   <p class="lorem"><u>Northern group of volcanoes</u>: Glaciers outlines were primarily mapped in 2010 using sattelite images (LandSAT, Aster) and has been updated a number of times since then. The latest update was done in September 2020 (ESRI Firefly Imagery - also available as a basemap "Sattelite"). In some cases the location of glaciers fronts were revised based on GPS measurements in the field.</p>\
			   <p class="lorem">Vinogradov V.&nbsp;&nbsp 1968<br>The USSR glacier catalog. Kamchatka, vol. 20, part 2-4. Leningrad:Hydrometeorological service — 80 p. (in Russian)</p>\
			   \
			   <br><hr><h2>Credits</h2>\
			   <p class="lorem">The webb-map is built using the awesome open-source JavaScript library <a href="https://leafletjs.com/" target="_blank">Leaflet</a>. \
			   Besides, it makes use of a set of Leaflet plugins (incl. <a href=”https://esri.github.io/esri-leaflet/” target="_blank">ESRI for Leaflet</a>) and ArcGIS basemaps - \
			   Topographic and <a href="https://hub.arcgis.com/datasets/39858979a6ba4cfd96005bbe9bd4cf82" target="_blank">Firefly Imagery</a>. The latter provides a mosaic of satellite and aerial images for the entire world with up to 0.5 m resolution (TerraColor, SPOT and Maxar). \
			   The basemaps are freely distributed for non-commercial use under Essentials Developer Plan (<a href=”https://github.com/esri/esri-leaflet#terms” target="_blank">ESRI’s Terms of Use</a>).</p>\
			   <br><hr>\
			   <p class="lorem">&copy; 2018-2020 Elena Marchenko<br>PhD Goesciences, Research fellow<br>\
			   Laboratory of Informatic Technologies and Geoecology<br>\
			   <a href="http://www.kscnet.ru/ivs/ target="_blank"">Institute of Volcanology and Seismology</a><br>Far Eastern Branch of Russian Academy of Sciences</p>';

map.addControl(sidebar);
sidebar.setContent(content);
// sidebar.show();