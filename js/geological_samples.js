// Geological darabase of Tatiana Churikova - visualisation

var geo_database_URL = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/rocksamples/FeatureServer/0",
// var geo_database_URL = "json/Rock_samples_Churikova.geojson",
  sidebar_geo = L.control.sidebar('sidebar-geo', {position: 'right', closeButton: true});
map.addControl(sidebar_geo);
  
// var sampleLayer = new L.GeoJSON.AJAX(geo_database_URL,
//   {pointToLayer: function (feature, latlng) {
    // var marker = L.circleMarker(latlng, {
    //   radius: 5,
    //   fillColor: sampleStyle_Composition(feature.properties.sio2, [41, 52, 57, 63, 69, 73]),
    //   color: 'white',
    //   weight: 1,
    //   opacity: 1,
    //   fillOpacity: 0.7,
    //   pane: 'Samples',
    // })
//     .on('click', function(e) {
//       if (sidebar.isVisible() === false) {
//         sidebar_geo.show();
//       }; 
//       sidebar_geo.setContent(setContentGeoSamples(feature.properties))
//     })
//     .on('mouseover', function(e) {e.target.setRadius(8);})
//     .on('mouseout', function(e) {e.target.setRadius(4);})
//     .bindTooltip(feature.properties.sample, {className: 'myLabels', permanent:false});
//     return marker} }
//   ).addTo(map);


var sampleLayer = L.esri.featureLayer({url: geo_database_URL,
  pointToLayer: function (feature, latlng) {
    var marker = L.marker(latlng, {
      icon: L.BeautifyIcon.icon({
        iconSize: [13, 13],
        iconShape: 'circle',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: sampleStyle_Composition(feature.properties.sio2, [41, 52, 57, 63, 69, 73])
      }),
      draggable: true,
      opacity: 0.7,
      pane: 'Samples',
    })
    .on('click', function(e) {
      if (sidebar_geo.isVisible() === false) {
        sidebar_geo.show();
      }; 
      sidebar_geo.setContent(setContentGeoSamples(feature.properties))
    })
    // .on('mouseover', function(e) {e.target.setIcon(iconHover);})
    // .on('mouseout', function(e) {e.target.setIcon(iconDefault);})
    .bindTooltip(feature.properties.sample, {className: 'myLabels', permanent:false});
    return marker} }
  );


function sampleStyle_Composition(field, array) {
  var color,
    rainbow = new Rainbow(); 
  rainbow.setNumberRange(1, array.length);
  if (field > array[0] && field <= array[1]) { color = '#' + rainbow.colourAt(1)}
  else if (field > array[1] && field <= array[2]) { color = '#' + rainbow.colourAt(2)}
  else if (field > array[2] && field <= array[3]) { color = '#' + rainbow.colourAt(3)}
  else if (field > array[3] && field <= array[4]) { color = '#' + rainbow.colourAt(4)}
  else if (field > array[4] && field <= array[5]) { color = '#' + rainbow.colourAt(5)}
  else if (field > array[5]) { color = '#' + rainbow.colourAt(6)}
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
  inputString = inputString.replaceAll("<td>0</td>", "<td></td>");
  inputString = inputString.replaceAll("<td>null</td>", "<td></td>");
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
  
  var c = '<h3 style="color: #641E16;line-height:20px"><u>' + p.sample + '</u> - '+ p.volcanoes + ', ' + p.pbdomain + '</h3>\
  <table width="100%" class="geoTable">\
  <tr><td width = 30%><b>Location</b></td><td width = 70%>' + p.structural_location + ': ' + p.location + ', ' + p.altitude + ' m asl</td></tr>\
  <tr><td><b>Rocktype</b></td><td>' + p.rocktype + ', ' + p.rocktype_div +'</td></tr>\
  <tr><td><b>Collector</b></td><td>' + p.Collector + '</td></tr>\
  <tr><td><b>Geoage</b></td><td>' + p.geoage;
  if (!isNaN(p.age) && p.age > 0) {
    c += ', ' + p.age + '&#177;' + p.age_error +' Ma</td></tr>'; 
  };
  if (!isNaN(p.agehist) && p.agehist > 0) {
    c += '<tr><td><b>Eruption date</b></td><td>' + p.agehist +'</td></tr>';
  };
  c += '<tr><td><b>References</b></td><td>' + ref +'</td></tr>\
  </table>\
  <table width="100%" class="geoTable"><tr>\
  <caption>Major elements, wt.%</caption>';

  var major_names = ['SiO<sub>2</sub>', 'TiO<sub>2</sub>', 'Al<sub>2</sub>O<sub>3</sub>', 'Fe<sub>2</sub>O<sub>3</sub>',
  'FeO', 'MnO', 'MgO', 'CaO', 'Na<sub>2</sub>O', 'K<sub>2</sub>O', 'P<sub>2</sub>O<sub>5</sub>', 'H<sub>2</sub>O'];
  var major_values = [p.sio2, p.tio2, p.al2o3, p.fe2o3, p.feo, p.mno, p.mgo, p.cao, p.na2o, p.k2o, p.p2o5, (p.loi + p.h2ominus + p.h2oplus)]

  for (let i = 0; i < major_names.length; i++) {
    if (!isNaN(major_values[i]) && major_values[i] > 0) {
      c += '<td><b>' + major_names[i] + '</b></td><td>' + major_values[i] +'</td>';
      if (i > 0 && i % 2 != 0) {
        c += '</tr><tr>'
      } 
    }
  };
  c += '</tr><tr style="background-color: #fff7ef;"><td></td><td></td><td><b>Sum</b></td><td>' + p.sum_ +'</td></tr></table>';

  // var trace_names = ['Nb', 'Zr', 'Y', 'Sr', 'Rb', 'Pb', 'Ga', 'Zn', 'Cu', 'Ni', 'Co', 'Cr', 'V', 'Ba', 'Sc', 'Ce', 'Hf', 'La', 'Mo', 'Nd',
  // 'Sx', 'Sm', 'Th', 'U',	'Yb',	'Cl',	'Cs', 'Be',	'Li', 'Cd', 'Pr', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Lu', 'Ta', 'W', 'Tl', 'Sn', 'Sb',
  // 'Te', 'Ti', 'Mn', 'Bi']
  // var trace_values = [[p.nbxrf, p.nbicpms], [p.zrxrf, p.zricpms], [p.yxrf, p.yicpms],	[p.srxrf, p.sricpms],	[p.rbxrf, p.rbicpms],	
  //     [p.pbxrf, p.pbicpms], [p.gaxrf, null],	[p.znxrf, p.znicpms], [p.cuxrf, p.cuicpms],	
  //     [p.nixrf, p.niicpms],	[p.coxrf, p.coicpms],
  //   	[p.crxrf, null],	[p.vxrf, p.vicpms],	[p.baxrf, p.baicpms],	[p.scxrf, p.scicpms], [p.cexrf, p.ceicpms],	[p.Hfxrf, p.hficpms],	
  //     [p.Laxrf, p.laicpms],	[p.Moxrf, p.moicpms],	[p.Ndxrf, p.ndicpms], [p.Sxrf, null], [p.Smxrf, p.smicpms], [p.Thxrf, p.thicpms],	
  //     [p.Uxrf, p.uicpms], [p.Ybxrfp.ybicpms],	[p.Clxrf, null],	[p.Csxrf, p.csicpms], [null, p.beicpms], [null, p.liicpms], 
  //     [null, p.cdicpms], [null, p.pricpms], 
  //     [null, p.gdicpms], [null, p.tbicpms], [null, p.dyicpms], [null, p.hoicpms], [null, p.ericpms], [null, p.tmicpms],
  //     [null, p.luicpms], [null, p.taicpms], [null, p.wicpms], [null, p.tlicpms], [null, p.tmicpms], [null, p.snicpms],
  //     [null, p.sbicpms], [null, p.teicpms], [null, p.ticpms], [null, p.mnicpms], [null, p.bicpms],
  //   ];

  var trace_names = ['Ba', 'Be', 'Bi', 'Cd', 'Ce', 'Cl', 'Co', 'Cr', 'Cs', 'Cu', 'Dy', 'Er', 'Ga', 'Gd', 'Hf', 'Ho', 'In',
  'La', 'Li', 'Lu', 'Mn', 'Mo', 'Nb', 'Nd', 'Ni', 'Pb', 'Pr', 'Rb', 'Sb', 'Sc', 'Sm', 'Sn', 'Sr', 'Sx', 'Ta', 'Tb', 
  'Te', 'Th', 'Ti', 'Tl', 'Tm', 'U', 'V', 'W', 'Y', 'Yb', 'Zn', 'Zr']

  var trace_values = [
    [p.baxrf, p.baicpms, p.Ba],
    [null, p.beicpms,], 
    [null, p.bicpms], 
    [null, p.cdicpms], 
    [p.cexrf, p.ceicpms],	
    [p.Clxrf, null],
    [p.coxrf, p.coicpms],
    [p.crxrf, p.cricpms],
    [p.Csxrf, p.csicpms],
    [p.fcuxrf, p.cuicpms, p.Cu],
    [null, p.dyicpms],
    [null, p.ericpms],
    [p.gaxrf, null],
    [null, p.gdicpms],
    [p.Hfxrf, p.hficpms, p.Hf], 
    [null, p.hoicpms],
    [null, p.inicpms],
    [p.Laxrf, p.laicpms],
    [null, p.liicpms], 
    [null, p.luicpms, p.Lu],
    [null, p.mnicpms], 
    [p.Moxrf, p.moicpms], 
    [p.nbxrf, p.nbicpms, p.Nb], 
    [p.Ndxrf, p.ndicpms], 
    [p.nixrf, p.niicpms],
    [p.pbxrf, p.pbicpms],	
    [null, p.pricpms],	
    [p.rbxrf, p.rbicpms, p.Rb],	
    [null, p.sbicpms],
    [p.scxrf, p.scicpms], 
    [p.Smxrf, p.smicpms],
    [null, p.snicpms],
    [p.fisrxrf, p.sricpms, p.Sr],
    [p.Sxrf, null],
    [null, p.taicpms, p.Ta],
    [null, p.tbicpms],
    [null, p.teicpms],
    [p.Thxrf, p.thicpms],	
    [null, p.ticpms],
    [null, p.tlicpms],
    [null, p.tmicpms],
    [p.Uxrf, p.uicpms],
    [p.vxrf, p.vicpms],
    [null, p.wicpms],
    [p.yxrf, p.yicpms],	
    [p.Ybxrf, p.ybicpms],	
    [p.znxrf, p.znicpms], 
    [p.zrxrf, p.zricpms, p.Zr], 
    ];

  // if (trace_values.some(x => !isNaN(x) && x > 0)) {

    c += '<table width="100%" class="geoTable">\
      <caption>Trace elements, ppm</caption>\
      <tr><td width = 25%></td><td width = 25%>XRF</td><td width = 25%>ICPMS</td><td width = 25%>Mass spectrometer</td></tr>';

    let cc = '';
    for (let i = 0; i < trace_names.length; i++) {
      let t = trace_values[i]; 
      if (t.some(x => !isNaN(x) && x > 0)) {
        cc += '<tr><td><b>' + trace_names[i] + '</b></td>';
        if (t.length < 3) {
          t.push(null);
        };
        for (let ii = 0; ii < t.length; ii++) {
          cc += '<td>' + t[ii] +'</td>';
        };
        cc += '</tr>';
      }
    };
    c += cc + '</table>'; 
  // } else {
  //   c += '<p>No trace elements data are available for the sample.</p>'
  // };

  var trace_ratios_names = ['La/Sm', 'La/Yb', 'Sr/Y', 'Sm/Yb', 'Dy/Yb'];
  var trace_ratios_values = [p.lasm,	p.layb,	p.sry,	p.smyb,	p.dyyb];

  if (trace_ratios_values.some(x => !isNaN(x) && x > 0)) {
    c += '<table width="100%" class="geoTable"><caption>Trace elements ratios</caption><tr>';
    
    for (let i = 0; i < trace_ratios_names.length; i++) {
      if (!isNaN(trace_ratios_values[i])) {
        c += '<td><b>' + trace_ratios_names[i] + '</b></td><td>' + trace_ratios_values[i] +'</td>';
        if (i > 0 && i % 2 != 0) {
          c += '</tr><tr>'
        } 
      }
    };

    c += '</table>';
  } else {
    c += '<p>No ratios of trace elements are available for the sample.</p>'
  };
  
  
  var isotopes_names = ['Sr<sup>87</sup>/Sr<sup>86</sup>', 'Nd<sup>143</sup>/Nd<sup>144</sup>', 'Pb<sup>206</sup>/Pb<sup>204</sup>',
    'Pb<sup>207</sup>/Pb<sup>204</sup>', 'Pb<sup>208</sup>/Pb<sup>204</sup>', 'Rb<sup>87</sup>/Sr<sup>86</sup>', 'O<sup>18</sup>/O<sup>16</sup>', 
    'Hf<sup>176</sup>/Hf<sup>177</sup>', '&#949;Hf', 'Lu<sup>176</sup>/Hr<sup>177</sup>', '&#916;Cu<sup>65</sup>', '&#916;&#949;Nd'];
  var isotopes_values = [p.F87_86Sr, p.F143_144Nd, p.F206_204Pb, p.F207_204Pb, p.F208_204Pb, p.F87Rb_86Sr, p.F18_16O, p.F176_177Hf,  p.EpslHf, p.F176Lu_177, p.delta_65Cu, p.Delta_Epsl];
  var isotopes_errors = [p.F87_86Sr_e, p.F143_144_1, p.F206_204_1, p.F207_204_1, p.F208_204_1, p.F87Rb_86_1, null, p.F176_177_1, null, null, p.F65Cu_erro, null]
  
  if (isotopes_values.some(x => !isNaN(x) && x > 0)) {
    c += '<table width="100%" class="geoTable"><caption>Isotopes</caption><tr>';
    
    for (let i = 0; i < isotopes_names.length; i++) {
      if (!isNaN(isotopes_values[i]) && isotopes_values[i] > 0) {
        c += '<td><b>' + isotopes_names[i] + '</b></td><td>' + isotopes_values[i];
        if (!isNaN(isotopes_errors[i]) && isotopes_errors[i] > 0) {
          c += ' &#177 ' + isotopes_errors[i] +'</td></tr>';
        } else {
          c += '</td></tr>';
        }
      }
    };

    c += '</table>'; 
  } else {
    c += '<p>No isotopes data are available for the sample.</p>'
  };

  return replaceNan(c);
};


var styleEditor  = L.control({position: 'topright'}),
  div_styleEditor = L.DomUtil.create('div', 'styleEditor'),
  style_content = '';




