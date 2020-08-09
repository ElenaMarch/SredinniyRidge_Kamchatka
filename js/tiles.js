// Snow storage
var snowLinesURL = 'json/snow_storage.geojson',
    snowLines = new L.GeoJSON.AJAX(snowLinesURL, {style: {"color": "#60469D", "weight": 1.2, "opacity": 0.8},
        onEachFeature: function (feature, layer) {
            layer.setText(feature.properties.deep1, {offset: -3, repeat: false, 
                attributes: {"font-size": 7, "font-family": "Verdana", "font-weight": "bold", "fill": "#60469D"}});
        }});

d3.text('json/snow.asc', function (asc) {
    var s = L.ScalarField.fromASCIIGrid(asc);
    var layer = L.canvasLayer.scalarField(s, {color: chroma.scale(['#CBEDFF', '#8FE5FF', '#88C4E8', '#7D9AC7', '#5E50A4', '#6D318D']).domain(s.range), 
            mouseMoveCursor: null
        });
    var popup = L.popup({closeButton:false, className: 'popupTooltip', offset: L.point(0, 30)});
    layer.on('click', function (e) {
        if (e.value !== null) {
            popup.setLatLng(e.latlng).setContent(`<span class="popupTooltipText">${e.value} mm</span>`).openOn(map);
            // L.tooltip().setLatLng(e.latlng).setContent(e.value).openOn(map);
        }
    });
    layer.on('mousemove', function (e) {
        map.closePopup();
    });
    var tileLayers = {
                'Snow accumulation': L.layerGroup([layer, snowLines])
            };
    L.control.layers({}, tileLayers, {
                position: 'topright',
                collapsed: false
            }).addTo(map);
});




// /*
//     Some ScalarField layers with custom styles
// */
// d3.text('data/Bay_Speed.asc', function (asc) {
//     var s = L.ScalarField.fromASCIIGrid(asc);

//     var layer1 = L.canvasLayer.scalarField(s, {
//         color: chroma.scale(['white', 'black']).domain(s.range),
//         mouseMoveCursor: null
//     }).addTo(map);
//     map.fitBounds(layer1.getBounds());

//     var layer2 = L.canvasLayer.scalarField(s, {
//         color: chroma.scale('OrRd').domain(s.range),
//         mouseMoveCursor: null
//     });

//     var layer3 = L.canvasLayer.scalarField(s, {
//         color: chroma.scale('OrRd').classes(5),
//         mouseMoveCursor: null
//     });

//     var layers = {
//         'Two colors gradient': layer1,
//         'ColorBrewer2': layer2,
//         'Classes (n-equidistant)': layer3
//     };

//     L.control.layers(layers, {}, {
//         position: 'bottomleft',
//         collapsed: false
//     }).addTo(map);


//     /* Dynamic styles */
//     //      gradient with two colors
//     let gradientColors = document.getElementsByTagName('input[type=color]');
//     let low = document.getElementById('lowColor');
//     let high = document.getElementById('highColor');
//     var updateGradient = function () {
//         var scale = chroma.scale([low.value, high.value]).domain(s.range);
//         layer1.setColor(scale);
//     }
//     low.addEventListener('input', updateGradient);
//     high.addEventListener('input', updateGradient);

//     //      colorBrewer scale
//     let colorBrewer = document.getElementById('colorBrewer');
//     colorBrewer.addEventListener('change', function () {
//         var scale = chroma.scale(this.value).domain(s.range);
//         layer2.setColor(scale);
//     });

//     //      classes
//     let classes = document.getElementById("classes");
//     classes.addEventListener("change", function () {
//         var scale = chroma.scale('OrRd').classes(parseInt(this.value));
//         layer3.setColor(scale);
//     });

//     //      enable panels
//     map.on('baselayerchange', function (e) {
//         let gradientPanel = document.getElementById('gradientPanel');
//         gradientPanel.style.display = (e.layer === layer1) ? "block" : "none";

//         let colorBrewerPanel = document.getElementById('colorBrewerPanel');
//         colorBrewerPanel.style.display = (e.layer === layer2) ? "block" : "none";

//         let classesPanel = document.getElementById('classesPanel');
//         classesPanel.style.display = (e.layer === layer3) ? "block" : "none";
//     });
// });



