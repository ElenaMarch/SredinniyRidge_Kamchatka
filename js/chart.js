// Charts
// STEP 2: DEFINE A CHART
var chart;
sampleLayer.once('load', function () {
  var datasets = [getDataset(sampleLayer)];

// designate a one or more series to show the data on the chart
var series = [{
  value: { field: 'sio2', label: 'SiO2' },
  category: { field: 'mgo', label: 'MgO' }
}];

// optionally override any of the cart type's default styles
var overrides = {
  hideXScrollbar: true,
  hideYScrollbar: true
};

// create a cedar chart using the known 'scatter' type
var elementId = 'chart';
chart = new cedar.Chart(elementId, { type: 'scatter' })
  .datasets(datasets)
  .series(series)
  .overrides(overrides);

// render the chart
  chart.show();
});

// STEP 3: MAKE THE CHART DYNAMIC BY ESTABLISHING MAP-TO-CHART COMMUNICATION
// show in the scatterplot only the features in the map's current extent
map.on('zoom move', function () {
  var datasets = [getDataset(sampleLayer)];
  chart.datasets(datasets);
  chart.show();
});

// Helper function, used by both createChart() and updateChart(),
// to get the data from the leaflet map (current extent) and return it
// in the proper format for Cedar to use.
function getDataset (layer) {
  var scatterPlotDataArray = [];
  layer.eachFeature(function (e) {
    scatterPlotDataArray.push({
      attributes: {
        sio2: e.feature.properties.sio2,
        mgo: e.feature.properties.mgo
      },
      geometry: {
        x: e.feature.geometry.coordinates[0],
        y: e.feature.geometry.coordinates[1]
      }
    });
  });
  return {
    data: {
      features: scatterPlotDataArray
    }
  };
}