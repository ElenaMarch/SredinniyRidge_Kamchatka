var tooltipPanes = ['Volc', 'Kluch3'];
var lastZoom;
map.on('zoomend', function () {
    var zoom = map.getZoom();
    if (map.hasLayer(rivLayer) && zoom >= 11) {
        map.removeLayer(rivLayer)
        rivKluchGroup.addTo(map);
    };
    if (!map.hasLayer(rivLayer) && zoom < 11) {
        rivLayer.addTo(map);
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
                console.log(l.options.pane in tooltipPanes);
                var tooltip = l.getTooltip();
                l.unbindTooltip().bindTooltip(tooltip, {
                    permanent: false
                })
            }
        });
    }
    lastZoom = zoom;
});


