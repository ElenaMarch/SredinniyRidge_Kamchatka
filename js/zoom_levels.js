var tooltipPanes = ['Local3', 'Samples'];
var lastZoom;
map.on('zoomend', function () {
    var zoom = map.getZoom();
    if (map.hasLayer(rivLayer) && zoom >= 10) {
        map.removeLayer(rivLayer)
    };
    if (!map.hasLayer(rivLayer) && zoom < 10) {
        rivLayer.addTo(map);
    };
    if (!map.hasLayer(rivKluchGroup) && zoom >= 11) {
        rivKluchGroup.addTo(map);
    };
    if (map.hasLayer(rivKluchGroup) && zoom < 11) {
        map.removeLayer(rivKluchGroup)
    };
    if (zoom >= 9 && (!lastZoom || lastZoom < 9)) {
        if (map.hasLayer(cityLayer)) {
            cityLayer.refilter(function(feature){
                return feature.properties.PPPTFLAG > 0;
            });
        };
        if (!map.hasLayer(reefLayer)) {
            reefLayer.addTo(map);
        }; 
        if (!map.hasLayer(kluchGroup)) {
            kluchGroup.addTo(map);
            glKluchGroup.addTo(map);
            houseLayer.addTo(map);
        };
        map.eachLayer(function(l) {
            if (l.getTooltip() && !tooltipPanes.includes(l.options.pane)) {
                var tooltip = l.getTooltip();
                l.unbindTooltip().bindTooltip(tooltip, {
                    permanent: true
                })
            }
        });
    } else if (zoom < 9 && (!lastZoom || lastZoom >= 9)) {
        if (map.hasLayer(cityLayer)) {
            cityLayer.refilter(function(feature){
                return feature.properties.PPPTFLAG > 1;
              }); 
        };
        if (map.hasLayer(reefLayer)) {
            map.removeLayer(reefLayer);
        };
        if (map.hasLayer(kluchGroup)) {
            map.removeLayer(kluchGroup);
            map.removeLayer(glKluchGroup);
            map.removeLayer(houseLayer);
        };
        map.eachLayer(function(l) {
            if (l.getTooltip() && !tooltipPanes.includes(l.options.pane)) {
                var tooltip = l.getTooltip();
                l.unbindTooltip().bindTooltip(tooltip, {
                    permanent: false
                })
            }
        });
    }
    lastZoom = zoom;
});


