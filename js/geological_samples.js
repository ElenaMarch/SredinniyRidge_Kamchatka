// Geological darabase of Tatoana Churikova - visualisation

var geo_database_URL = "json/Rock_samples_Churikova.geojson",
  sidebar_geo = L.control.sidebar('sidebar-geo', {position: 'right'});
map.addControl(sidebar_geo);
sidebar_geo.show();

map.createPane('Samples');
// var sampleMarker = {
//     radius: 3,
//     fillColor: sampleStyle_Composition(feature.properties.sio2, [41, 52, 57, 63, 69, 73]),
//     color: "blue",
//     weight: 1,
//     opacity: 0.8,
//     fillOpacity: 0.8,
//   };
  
  var sampleLayer = new L.GeoJSON.AJAX(geo_database_URL,
    {pointToLayer: function (feature, latlng) {
      var marker = L.circleMarker(latlng, {
        radius: 3,
        fillColor: sampleStyle_Composition(feature.properties.sio2, [41, 52, 57, 63, 69, 73]),
        color: sampleStyle_Composition(feature.properties.sio2, [41, 52, 57, 63, 69, 73]),
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.6,
      })
      .on('click', function(e) {sidebar_geo.setContent(setContentGeoSamples(feature.properties))})
      .bindTooltip(feature.properties.sample, {className: 'myLabels', permanent:false});
      return marker} }
    ).addTo(map);

  // var sampleLayer = L.esri.featureLayer({url: geo_database_URL, pane: 'Samples',
	//   pointToLayer: function (feature, latlng) {
  //     var marker = L.circleMarker(latlng, sampleMarker)
  //       .on('click', function(e) {sidebar_geo.setContent(setContentGeoSamples(feature.properties))})
  //       .bindTooltip(feature.properties.sample, {className: 'myLabels', permanent:false});
  //     return marker} }
  //   ).addTo(map);

  function sampleStyle_Composition(field, array) {
    var color;
    if (field > array[0] && field <= array[1]) { color = "#5F391F"}
    else if (field > array[1] && field <= array[2]) { color = "#6E2500"}
    else if (field > array[2] && field <= array[3]) { color = "#B14801"}
    else if (field > array[3] && field <= array[4]) { color = "#FECDAC"}
    else if (field > array[4] && field <= array[5]) { color = "#FEC62A"}
    else if (field > array[5]) { color = "#FECC68"}
    else {color = "grey"};
    return color;
  };

  // function sampleStyle_Age(feature) {
  //   switch (feature.properties.Type) {
  //       case 'wide': return {"color": "#3399ff", "weight": 0.3};
  //       case 'normal': return {"color": "#3399ff", "weight": 0.3}; 
  //       case 'temporary': return {"color": "#3399ff", "weight": 0.3, dashArray: 3};  }
  // };
    
  function replaceNan(input){
    var inputString = input + "";
    const array = ["NaN", "null", "undefined"]
    array.forEach(function (x) {
      inputString = inputString.replaceAll(x,"- ");
    });
    inputString = inputString.replaceAll(", - ", "");
    inputString = inputString.replaceAll("- :", "");
    
    return inputString;
  }

  function setContentGeoSamples(p) {
    var ref;
    if (p.refchem == p.refchem) {
      ref = p.refchem;
    } else {
      ref = p.refchem + ', ' + p.refage;
    }
    var major_names = ['SiO<sub>2</sub>', 'TiO<sub>2</sub>', 'Al<sub>2</sub>O<sub>3</sub>', 'Fe<sub>2</sub>O<sub>3</sub>',
    'FeO', 'MnO', 'MgO', 'CaO', 'Na<sub>2</sub>O', 'K<sub>2</sub>O', 'P<sub>2</sub>O<sub>5</sub>', 'H<sub>2</sub>O'];
    var major_values = [p.sio2, p.tio2, p.al2o3, p.fe2o3, p.feo, p.mno, p.mgo, p.cao, p.na2o, p.k2o, p.p2o5, (p.loi + p.h2ominus + p.h2oplus)]
    
    var c = '<h3 style="color: #641E16;line-height:20px"><u>' + p.sample + '</u> - '+ p.volcanoes + ', ' + p.pbdomain + '</h3>\
    <table width="100%" class="geoTable">\
    <tr><td width = 30%><b>Location</b></td><td width = 70%>' + p.structural_location + ': ' + p.location +'</td></tr>\
    <tr><td><b>Rocktype</b></td><td>' + p.rocktype + ', ' + p.rocktype_div +'</td></tr>\
    <tr><td><b>Collector</b></td><td>' + p.collector + '</td></tr>\
    <tr><td><b>Geoage</b></td><td>' + p.geoage + ', ' + p.age +'</td></tr>\
    <tr><td><b>Eruption date</b></td><td>' + p.agehist +'</td></tr>\
    <tr><td><b>References</b></td><td>' + ref +'</td></tr>\
    </table>\
    <h3 style="color: #641E16">Major elements, wt.%</h3>\
    <table width="100%" class="geoTable"><tr>';

    for (let i = 0; i < major_names.length; i++) {
      if (!isNaN(major_values[i])) {
        c += '<td><b>' + major_names[i] + '</b></td><td>' + major_values[i] +'</td>';
        if (i > 0 && i % 2 != 0) {
          c += '</tr><tr>'
        } 
      }
    };
    c += '<tr><td><b>Sum</b></td><td>' + p.sum +'</td></tr></table>';

    var trace_names = ['Nb', 'Zr', 'Y', 'Sr', 'Rb', 'Pb', 'Ga', 'Zn', 'Cu', 'Ni', 'Co', 'Cr', 'V', 'Ba', 'Sc', 'Ce', 'Hf', 'La', 'Mo', 'Nd',
    'Sx', 'Sm', 'Th', 'U',	'Yb',	'Cl',	'Cs', 'Be',	'Li', 'Cd', 'Pr', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Lu', 'Ta', 'W', 'Tl', 'Sn', 'Sb',
    'Te', 'Ti', 'Mn', 'Bi']
    var trace_values = [[p.nbxrf, p.nbicpms], [p.zrxrf, p.zricpms], [p.yxrf, p.yicpms],	[p.srxrf, p.sricpms],	[p.rbxrf, p.rbicpms],	
        [p.pbxrf, p.pbicpms], [p.gaxrf, null],	[p.znxrf, p.znicpms], [p.cuxrf, p.cuicpms],	
        [p.nixrf, p.niicpms],	[p.coxrf, p.coicpms],
      	[p.crxrf, null],	[p.vxrf, p.vicpms],	[p.baxrf, p.baicpms],	[p.scxrf, p.scicpms], [p.cexrf, p.ceicpms],	[p.Hfxrf, p.hficpms],	
        [p.Laxrf, p.laicpms],	[p.Moxrf, p.moicpms],	[p.Ndxrf, p.ndicpms], [p.Sxrf, null], [p.Smxrf, p.smicpms], [p.Thxrf, p.thicpms],	
        [p.Uxrf, p.uicpms], [p.Ybxrfp.ybicpms],	[p.Clxrf, null],	[p.Csxrf, p.csicpms], [null, p.beicpms], [null, p.liicpms], 
        [null, p.cdicpms], [null, p.pricpms], 
        [null, p.gdicpms], [null, p.tbicpms], [null, p.dyicpms], [null, p.hoicpms], [null, p.ericpms], [null, p.tmicpms],
        [null, p.luicpms], [null, p.taicpms], [null, p.wicpms], [null, p.tlicpms], [null, p.tmicpms], [null, p.snicpms],
        [null, p.sbicpms], [null, p.teicpms], [null, p.ticpms], [null, p.mnicpms], [null, p.bicpms],
      ];


    c += '<table width="100%" class="geoTable">\
    <h3 style="color: #641E16">Trace elements, ppm</h3>\
    <tr><td width = 33%></td><td width = 33%>SRF</td><td width = 33%>ICPMS</td></tr>\
    <tr><td><b>TiO<sub>2</sub></b></td><td>' + p.tio2 +'</td></tr>\
    <tr><td><b>Al<sub>2</sub>O<sub>3</sub></b></td><td>' + p.al2o3 +'</td></tr>\
    <tr><td><b>Fe<sub>2</sub>O<sub>3</sub></b></td><td>' + p.fe2o3 +'</td></tr>\
    <tr><td><b>FeO</b></td><td>' + p.feo +'</td></tr>\
    <tr><td><b>MnO</b></td><td>' + p.mno +'</td></tr>\
    <tr><td><b>CaO</b></td><td>' + p.cao +'</td></tr>\
    <tr><td><b>Na<sub>2</sub>O</b></td><td>' + p.na2o +'</td></tr>\
    <tr><td><b>K<sub>2</sub>O</b></td><td>' + p.k2o +'</td></tr>\
    <tr><td><b>P<sub>2</sub>O<sub>5</sub></b></td><td>' + p.p2o5 +'</td></tr>\
    <tr><td><b>H<sub>2</sub>O&#43</b></td><td>' + p.h2oplus +'</td></tr>\
    <tr><td><b>H<sub>2</sub>O&#8722</b></td><td>' + p.h2ominus +'</td></tr>\
    <tr><td><b>LOI</b></td><td>' + p.loi +'</td></tr>\
    <tr><td><b>Sum</b></td><td>' + p.sum +'</td></tr>\
    </table>';
    return replaceNan(c);
    // return c;
  };

  // <tr><td><b>H<sub>2</sub>O&#43</b></td><td>' + p.h2oplus +'</td>\
  // <td><b>H<sub>2</sub>O&#8722</b></td><td>' + p.h2ominus +'</td></tr>\
