// Snow storage
var snowLinesURL = 'json/snow_storage.geojson',
    snowLines = new L.GeoJSON.AJAX(snowLinesURL, {style: {"color": "#60469D", "weight": 1.2, "opacity": 0.8},
        onEachFeature: function (feature, layer) {
            layer.setText(feature.properties.deep1, {offset: -3, repeat: false, 
                attributes: {"font-size": 7, "font-family": "Verdana", "font-weight": "bold", "fill": "#60469D"}});
        }}),
    tileLayers = {};

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
    tileLayers['Snow accumulation'] = L.layerGroup([layer, snowLines]);
    L.control.layers({}, tileLayers, {
                position: 'topright',
                collapsed: false
            }).addTo(map);
    // c.addBaseLayer(L.layerGroup([layer, snowLines]), 'Snow accumulation');
});







