// Geological darabase of Tatiana Churikova - visualisation

var geo_database_URL = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/Geosamples_2023/FeatureServer/0";
// var geo_database_URL = "json/Rock_samples_Churikova.geojson",
var contentGeosamples = '<h2>Geological samples - data</h2>Choose a geological sample to see rock properties;';

var sampleLayer = L.esri.Cluster.featureLayer({url: geo_database_URL,
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 0.5,
  iconCreateFunction: function (cluster) {
    var count = cluster.getChildCount();
    return L.divIcon({
      html: count,
      className: 'cluster',
      iconSize: null
    });
  },
  pointToLayer: function (feature, latlng) {
    var marker = L.circleMarker(latlng, {
      radius: 6,
      fillColor: sampleStyle_Composition(feature.properties.SiO2, [41, 52, 57, 63, 69, 73]),
      color: 'white',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.7,
      pane: 'Samples',
    })
    .on('click', function(e) {
      if (sidebar.isVisible() === false) {
        sidebar.show();
      };
      contentGeosamples = setContentGeoSamples(feature.properties);
      activeTab = sidebar.setTab('tab-Geosamples', contentGeosamples);
    })
    .on('mouseover', function(e) {
      var r = e.target.getRadius();
      e.target.setRadius(parseInt(r) + 4);})
    .on('mouseout', function(e) {
      var r = e.target.getRadius();
      e.target.setRadius(parseInt(r)-4);})
    .bindTooltip(feature.properties.ID, {className: 'myLabels', permanent:false, offset: [10,-10]});
    return marker} }
); //.addTo(map)


function sampleStyle_Composition(field, array) {
  var color,
    rainbow = new Rainbow(); 
  rainbow.setNumberRange(1, array.length);
  if (field > array[0] && field <= array[1]) { color = `#${rainbow.colourAt(1)}`}
  else if (field > array[1] && field <= array[2]) { color = `#${rainbow.colourAt(2)}`}
  else if (field > array[2] && field <= array[3]) { color = `#${rainbow.colourAt(3)}`}
  else if (field > array[3] && field <= array[4]) { color = `#${rainbow.colourAt(4)}`}
  else if (field > array[4] && field <= array[5]) { color = `#${rainbow.colourAt(5)}`}
  else if (field > array[5]) { color = `#${rainbow.colourAt(6)}`}
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
  var refFields = [p.Macroelemets__Me__publication, p.Microelements_1_µe1_publication, p.Isotope_publication, p.Age_publication],
  ref = [...new Set(refFields)];
  ref = ref.filter(x => x);
  ref = ref.join(', ');
  
  var desc = [p.Morphology_of_object, p.Common_description_of_object, p.Location_of_object, p.Altitude, p.Object_on_volcano]; 
  desc = desc.filter(x => x);
  desc = desc.join(', ');
  if (!isNaN(p.Altitude) && p.Altitude > 0 && p.Altitude !== null) {
    desc = desc.replace(p.Altitude, `${p.Altitude} m asl`); 
  };
  var c = `<h2>Geological samples - data</h2><h3 style="color: #641E16;line-height:20px">
  <u>${p.ID}</u> - ${p.Volcano}, ${p.Volcanic_massif}, ${p.Volcanic_group}</h3>
  <table width="100%" class="geoTable">
  <tr><td width = 30%><b>Location</b></td><td width = 70%>${desc}</td></tr>
  <tr><td><b>Rocktype</b></td><td>${p.Rocktype}, ${p.Mineral_composition}</td></tr>`;
  if (p.Owner_of_sample !== null) {
    c += `<tr><td><b>Owner of sample</b></td><td>${p.Owner_of_sample}</td></tr>`;
  };
  if (p.Sampling_date !== null) {
    c += `<tr><td><b>Sampling date</b></td><td>${p.Sampling_date}</td></tr>`;
  };
  c += `<tr><td><b>Geoage</b></td><td>${p.geoage}`;
  if (!isNaN(p.age) && p.age > 0 || p.age !== null) {
    c += `, ${p.age}&#177;${p.age_error} Ma</td></tr>`; 
  };
  if (!isNaN(p.agehist) && p.agehist > 0) {
    c += `<tr><td><b>Eruption date</b></td><td>${p.agehist}</td></tr>`;
  };
  c += `<tr><td><b>References</b></td><td>${ref}</td></tr>
  </table>
  <table width="100%" class="geoTable"><tr>
  <caption>Major elements, wt.%</caption>`;

  var major_names = ['SiO<sub>2</sub>', 'TiO<sub>2</sub>', 'Al<sub>2</sub>O<sub>3</sub>', 'Fe<sub>2</sub>O<sub>3</sub>', 'Fe<sub>2</sub>O<sub>3</sub><sup>Tot</sup>',
  'FeO', 'FeO<sup>Tot</sup>','MnO', 'MgO', 'CaO', 'Na<sub>2</sub>O', 'K<sub>2</sub>O', 'P<sub>2</sub>O<sub>5</sub>', 'H<sub>2</sub>O', 'SO<sub>3</sub>'];
  var major_values = [p.SiO2, p.TiO2, p.Al2O3, p.Fe2O3, p.Fe2O3_total, p.FeO, p.FeO_total, p.MnO, p.MgO, p.CaO, p.Na2O, p.K2O, p.P2O5, (p.LOI + p.H2Ominus + p.H2Oplus), p.SO3],
  n = 0;
  for (let i = 0; i < major_names.length; i++) {
    if (!isNaN(major_values[i]) && major_values[i] > 0) {
      n += 1;
      c += `<td><b>${major_names[i]}</b></td><td>${major_values[i]}</td>`;
      if (n > 0 && n % 2 == 0) {
        c += `</tr><tr>`
      } 
    }
  };
  c += `</tr><tr style="background-color: #fff7ef;"><td></td><td></td><td><b>Sum</b></td><td>${p.Sum_}</td></tr></table>`;

  var trace_names = ['Ag', 'As', 'Au', 'B', 'Ba', 'Be', 'Bi', 'Br', 'CO2', 'Cd', 'Ce', 'Cl', 'Co', 'Cr', 'Cs', 'Cu', 'Dy', 'Er', 'Eu', 
  'F', 'Ga', 'Gd', 'Ge', 'H2O', 'Hf', 'Hg', 'Ho', 'In', 'Ir', 'K', 'La', 'Li', 'Lu', 'Mn', 'Mo', 'Na', 'Nb', 'Nd', 'Ni', 
  'Os', 'P', 'Pb', 'Pd', 'Pr', 'Pt', 'Rb', 'Re', 'Rh', 'Ru', 'S', 'Sb', 'Sc', 'Se', 'Sm', 'Sn', 'Sr', 'Ta', 'Tb', 'Te', 'Th', 'Ti', 'Tl', 
  'Tm', 'U', 'V', 'W', 'Y', 'Yb', 'Zn', 'Zr']
  var attr = Object.keys(p), trace_values=[];

  for (let i = 0; i < trace_names.length; i++) {
    let t = trace_names[i], x = [];
    for (let n of [1,2]) {
      let elementcontains = (attr.indexOf(`${t}_${n}`) > -1);
      if (elementcontains) {
        x.push(p[`${t}_${n}`]);
      } else {
        x.push(null);
      };
    };
    trace_values.push(x);
  };
  trace_names = trace_names.map(i => i == 'H2O' ? 'H<sub>2</sub>O' : i);
  trace_names = trace_names.map(i => i == 'CO2' ? 'CO<sub>2</sub>' : i);

  if (trace_values.some(x => x.some(y => !isNaN(y) && y > 0))) {
    if (p.µe1_method === null) {
      p.µe1_method = `XRF`;
    };
    if (p.µe2_method === null) {
      p.µe2_method = `ICP-MC`;
    };

    c += `<table width="100%" class="geoTable">
      <caption>Trace elements, ppm</caption>
      <tr><td width = 33%>Method</td><td width = 33%>${p.µe1_method}</td><td width = 33%>${p.µe2_method}</td></tr>`;
    
    let cc = '';
    for (let i = 0; i < trace_names.length; i++) {
      let t = trace_values[i]; 
      if (t.some(x => !isNaN(x) && x > 0)) {
        cc += `<tr><td><b>${trace_names[i]}</b></td>`;
        for (let ii = 0; ii < t.length; ii++) {
          cc += `<td>${t[ii]}</td>`;
        };
        cc += '</tr>';
      }
    };
    c += `${cc}</table>`; 
  } else {
    c += '<p>No trace elements data are available for the sample.</p>'
  };

  var trace_ratios_names = ['La/Sm', 'La/Yb', 'Sr/Y', 'Sm/Yb', 'Dy/Yb'];
  var trace_ratios_values = [p.lasm,	p.layb,	p.sry,	p.smyb,	p.dyyb];

  if (trace_ratios_values.some(x => !isNaN(x) && x > 0)) {
    c += '<table width="100%" class="geoTable"><caption>Trace elements ratios</caption><tr>';
    
    for (let i = 0; i < trace_ratios_names.length; i++) {
      if (!isNaN(trace_ratios_values[i])) {
        c += `<td><b>${trace_ratios_names[i]}</b></td><td>${trace_ratios_values[i]}</td>`;
        if (i > 0 && i % 2 != 0) {
          c += '</tr><tr>'
        } 
      }
    };

    c += '</table>';
  } else {
    c += '<p>No ratios of trace elements are available for the sample.</p>'
  };

  
  var isotopes_names = ['B-Isotope', '&#948;<sup>11</sup>B', '<sup>18</sup>O', 'd<sup>18</sup>O-ol', 'd<sup>18</sup>O-cpx', 'd<sup>18</sup>O-pl',
    'd<sup>18</sup>O-amf', 'd<sup>18</sup>O-gl', 'd<sup>65</sup>Cu', 'Rb-Isotope', '<sup>87</sup>Rb/<sup>86</sup>Sr', 'SR-Isotope',
    '<sup>87</sup>Sr/<sup>86</sup>Sr', '<sup>87</sup>Sr/<sup>86</sup>Sr-Initial', '<sup>143</sup>Nd/<sup>144</sup>Nd', '&#949;Nd', '&#916;&#949;Nd',
    '<sup>176</sup>Lu/<sup>177</sup>Hf', '<sup>176</sup>Hf/<sup>177</sup>Hf', '&#949;Hf', '<sup>187</sup>Re/<sup>188</sup>Os',
    '<sup>184</sup>Os/<sup>188</sup>Os', '<sup>206</sup>Pb/<sup>204</sup>Pb', '<sup>207</sup>Pb/<sup>204</sup>Pb', 
    '<sup>208</sup>Pb/<sup>204</sup>Pb', '<sup>226</sup>Ra', '<sup>226</sup>Ra/<sup>230</sup>Th', '<sup>230</sup>Ra/<sup>232</sup>Th',
    '<sup>230</sup>Ra/<sup>238</sup>U', '<sup>238</sup>U/<sup>232</sup>Th', 'Pa', '<sup>231</sup>Pa/<sup>235</sup>Th',
    '<sup>234</sup>U/<sup>238</sup>U'];
  var isotopes_values = [p.B_Isotope, p.Delta_11B, p.F18O, p.Delta_18O_ol, p.Delta_18O_cpx, p.Delta_18O_pl, p.Delta_18O_amf, p.Delta_18O_gl, 
    p.Delta_65Cu, p.Rb_Isotope, p.F87Rb_86Sr, p.SR_Isotope, p.F87_86Sr, p.F87_86Sr_ini, p.F143_144Nd, p.Epsl_Nd, p.DeltaEpsl_Nd, 
    p.F176Lu_177Hf, p.F176_177Hf, p.Epsl_Hf, p.F187Re_188Os, p.F184_188Os, p.F187_188Os, p.F206_204Pb, p.F207_204Pb, p.F208_204Pb, 
    p.F226Ra_isotopes, p.F226Ra_230Th, p.F230Ra_232Th, p.F230Ra_238U, p.F238U_232Th, p.Pa_isotopes, p.F231Pa_235U, p.F234_238U];
  var isotopes_errors = [null, p.Delta_11B_e, null, null, null, null, null, null,
    p.Delta_65Cu_e, null, p.F87Rb_86Sr_e, null, p.F87_86Sr_e, null, p.F143_144Nd_e, null, null, 
    null, p.F176_177Hf_e, null, null, null, null, p.F206_204Pb_e, p.F207_204Pb_e, p.F208_204Pb_e, 
    null, null, null, null, null, null, null, null];
  
  if (isotopes_values.some(x => !isNaN(x) && x > 0)) {
    c += '<table width="100%" class="geoTable"><caption>Isotopes</caption><tr>';
    
    for (let i = 0; i < isotopes_names.length; i++) {
      if (!isNaN(isotopes_values[i]) && isotopes_values[i] > 0) {
        c += `<td><b>${isotopes_names[i]}</b></td><td>${isotopes_values[i]}`;
        if (!isNaN(isotopes_errors[i]) && isotopes_errors[i] > 0) {
          c += ` &#177 ${isotopes_errors[i]}</td></tr>`;
        } else {
          c += '</td></tr>';
        }
      }
    };

    c += '</table>'; 
  } else {
    c += '<p>No isotopes data are available for the sample.</p>'
  };
  if (p.Notes !== null) {
    c += `<p><b>Note:</b> ${p.Notes}.</p>`;
  };

  c = c.replaceAll('Sample location is approximate!','<br><span class="red-text">Sample location is approximate!</span>');
  return replaceNan(c);
};



// Style control
var styleEditor  = L.control({position: 'topright'}),
    div_styleEditor = L.DomUtil.create('div', 'styleeditor-container');
div_styleEditor.innerHTML += '<h3 style="color: #641E16;line-height:15px">Style geological samples</h3>'

var slider_container = L.DomUtil.create('div', 'slider-container', div_styleEditor);
slider_container.innerHTML += '<h4>Marker size</h4>'
    slider = L.DomUtil.create('input', 'styleeditor-slider', slider_container);
slider.type = 'range';
slider.max = 20;
slider.min = 1;
slider.step = 1;
slider.value = 6;
slider_label = L.DomUtil.create('span', 'styleeditor-input-span', slider_container);
slider_label.innerHTML = slider.value;

var defaultRadius = 6;
slider.oninput = function() {
  slider_label.innerHTML = this.value;
  sampleLayer.setStyle({
    radius: this.value
  });
  defaultRadius = parseInt(this.value);
};

var colorpicker = L.DomUtil.create('div', 'styleeditor-colorpicker', div_styleEditor);
colorpicker.innerHTML = '<h4>Border color</h4><div class="styleeditor-color" style="background-color: black;" onclick="switchColor(1);"></div>\
  <div class="styleeditor-color" style="background-color: white;" onclick="switchColor(2);"></div>';

function switchColor(c) {
  var cc;
  if (c == 1) {
    cc = 'black';
  } else {
    cc = 'white';
  }
  sampleLayer.setStyle({
    color: cc
  });
};

var tooltips_control = L.DomUtil.create('div', 'tooltips-control', div_styleEditor);
tooltips_control.innerHTML = '<br><label for="tooltips-control">\
  <input type="checkbox" id="tooltips-control" class="tooltips-control" onclick="handleClick(this);">\
  Show labels</label>';

function handleClick(checkbox) {
  if (checkbox.checked) {
    sampleLayer.eachFeature(function (l) {
      l.unbindTooltip().bindTooltip(l.feature.properties.ID, {className: 'myLabels', permanent:true, offset: [10,-10]}); });
  } else {
    sampleLayer.eachFeature(function (l) {
      l.unbindTooltip().bindTooltip(l.feature.properties.ID, {className: 'myLabels', permanent:false, offset: [10,-10]}); });
      };
}; 

styleEditor.onAdd = function () {
  this._div = div_styleEditor;
  this._div.addEventListener('mouseover', function () {
      map.dragging.disable();
  });
  this._div.addEventListener('mouseout', function () {
      map.dragging.enable();
  });
	return this._div;
};



// CHART - Scatter plot
var fields = ["Longitude", "Latitude", "SiO2", "TiO2", "Al2O3", "Fe2O3", "FeO", "MnO", "MgO", "CaO", "Na2O", "K2O", "P2O5", "H2Ominus", "H2Oplus", "LOI", "SO3", "SumNoWater", "Sum_", "Fe2O3_total", "FeO_total", "H2O_1", "Li_1", "Be_1", "B_1", "CO2_1", "F_1", "Na_1", "S_1", "Cl_1", "K_1", "Sc_1", "V_1", "Cr_1", "Co_1", "Ni_1", "Cu_1", "Zn_1", "Ga_1", "Rb_1", "Sr_1", "Y_1", "Zr_1", "Nb_1", "Mo_1", "Cs_1", "Ba_1", "La_1", "Ce_1", "Pr_1", "Nd_1", "Sm_1", "Eu_1", "Gd_1", "Yb_1", "Hf_1", "Re_1", "Os_1", "Pb_1", "Th_1", "U_1", "H2O_2", "Li_2", "Be_2", "B_2", "CO2_2", "F_2", "P_2", "S_2", "Cl_2", "K_2", "Sc_2", "Ti_2", "V_2", "Cr_2", "Mn_2", "Co_2", "Ni_2", "Cu_2", "Zn_2", "Ga_2", "Ge_2", "As_2", "Se_2", "Br_2", "Rb_2", "Sr_2", "Y_2", "Zr_2", "Nb_2", "Mo_2", "Ru_2", "Rh_2", "Pd_2", "Ag_2", "Cd_2", "In_2", "Sn_2", "Sb_2", "Te_2", "Cs_2", "Ba_2", "La_2", "Ce_2", "Pr_2", "Nd_2", "Sm_2", "Eu_2", "Eu3_2", "Gd_2", "Gd8_2", "Tb_2", "Dy_2", "Ho_2", "Er_2", "Tm_2", "Yb_2", "Lu_2", "Hf_2", "Ta_2", "W_2", "Re_2", "Os_2", "Ir_2", "Pt_2", "Au_2", "Hg_2", "Tl_2", "Pb_2", "Bi_2", "Th_2", "U_2", "B_Isotope", "Delta_11B", "F18O", "Delta_18O_ol", "Delta_18O_cpx", "Delta_18O_pl", "Delta_18O_amf", "Delta_18O_gl", "Delta_65Cu", "Rb_Isotope", "F87Rb_86Sr", "SR_Isotope", "F87_86Sr", "F87_86Sr_ini", "F143_144Nd", "Epsl_Nd", "DeltaEpsl_Nd", "F176Lu_177Hf", "F176_177Hf", "Epsl_Hf", "F187Re_188Os", "F184_188Os", "F187_188Os", "F206_204Pb", "F207_204Pb", "F208_204Pb", "F226Ra_isotopes", "F226Ra_230Th", "F230Ra_232Th", "F230Ra_238U", "F238U_232Th", "Pa_isotopes", "F231Pa_235U", "F234_238U", "lasm", "layb", "smyb", "dyyb"];
var names_vs_alias = {};
fields.forEach((key, i) => names_vs_alias[key] = fields[i]);
for (let f in names_vs_alias){
  if (f.slice(-2) === '_1' || f.slice(-2) === '_2') {
    names_vs_alias[f] = f.replace('_', ' - µe');
  }
}

exceptions = {
  '1': '1',
  // 'age': 'Age',
  "SiO2": 'SiO\u2082',
  "TiO2": 'TiO\u2082',
  "Al2O3": 'Al\u2082O\u2083',
  "Fe2O3": 'Fe\u2082O\u2083',
  "Na2O": 'Na\u2082O',
  "K2O": 'K\u2082O',
  "P2O5": 'P\u2082O\u2085',
  "LOI": 'H\u2082O',
  "SO3": 'SO\u2083',
  "SumNoWater": 'Sum - no water',
  "Sum_": 'Sum - macro elem.',
  "Fe2O3_total": 'Fe\u2082O\u2083 total',
  "H2O_1": 'H\u2082O - µe1',
  "CO2_1": 'CO\u2082 - µe1',
  "H2O_2": 'H\u2082O - µe2',
  "CO2_2": 'CO\u2082 - µe2',
  'lasm': 'La/Sm', 
  'layb': 'La/Yb',
  'smyb': 'Sm/Yb', 
  'dyyb': 'Dy/Yb', 
  "B_Isotope": 'B - isotope',
  "Delta_11B": 'δ\u00B9\u00B9B',
  "F18O": '\u00B9\u2078O',
  "Delta_18O_ol": 'd\u00B9\u2078O-ol',
  "Delta_18O_cpx": 'd\u00B9\u2078O-cpx',
  "Delta_18O_pl": 'd\u00B9\u2078O-pl',
  "Delta_18O_amf": 'd\u00B9\u2078O-amf',
  "Delta_18O_gl": 'd\u00B9\u2078O-gl',
  "Delta_65Cu": 'd\u2076\u2075Cu',
  "Rb_Isotope": 'Rb - isotope',
  "F87Rb_86Sr": '\u2078\u2077Rb / \u2078\u2076Sr',
  "SR_Isotope": 'Sr - isotope',
  "F87_86Sr": '\u2078\u2077Sr / \u2078\u2076Sr',
  "F87_86Sr_ini": '\u2078\u2077Sr / \u2078\u2076Sr - initial',
  "F143_144Nd": '\u00B9\u2074\u00B3Nd / \u00B9\u2074\u2074Nd',
  "Epsl_Nd": 'Epsl Nd',
  "DeltaEpsl_Nd": 'd Epsl Nd',
  "F176Lu_177Hf": '\u00B9\u2077\u2076Lu / \u00B9\u2077\u2077Hf',
  "F176_177Hf": '\u00B9\u2077\u2076Hf / \u00B9\u2077\u2077Hf',
  "Epsl_Hf": 'Epsl Hf',
  "F187Re_188Os": '\u00B9\u2078\u2077Re / \u00B9\u2078\u2078Os',
  "F184_188Os": '\u00B9\u2078\u2074Os / \u00B9\u2078\u2078Os',
  "F187_188Os": '\u00B9\u2078\u2077Os / \u00B9\u2078\u2078Os',
  "F206_204Pb": '\u00B2\u2070\u2076Pb / \u00B2\u2070\u2074Pb',
  "F207_204Pb": '\u00B2\u2070\u2077Pb / \u00B2\u2070\u2074Pb',
  "F208_204Pb": '\u00B2\u2070\u2078Pb / \u00B2\u2070\u2074Pb',
  "F226Ra_isotopes": '\u00B2\u00B2\u2076Ra - isotopes',
  "F226Ra_230Th": '\u00B2\u00B2\u2076Ra / \u00B2\u00B3\u2070Th',
  "F230Ra_232Th": '\u00B2\u00B3\u2070Ra / \u00B2\u00B3\u00B2Th',
  "F230Ra_238U": '\u00B2\u00B3\u2070Ra / \u00B2\u00B3\u2078U',
  "F238U_232Th": '\u00B2\u00B3\u2078U / \u00B2\u00B3\u00B2Th',
  "Pa_isotopes": 'Pa - isotopes',
  "F231Pa_235U": '\u00B2\u00B3\u2071Pa / \u00B2\u00B3\u2075U',
  "F234_238U": '\u00B2\u00B3\u2074U / \u00B2\u00B3\u2078U',
  'H2Oplus': 'H\u2082O+', 
  'H2Ominus': 'H\u2082O-'
};

for (let f in exceptions){
  names_vs_alias[f] = exceptions[f];
}



var contentChart;
var chartArea = L.DomUtil.create('div', 'chart-container');
var chartCanvas = L.DomUtil.create('canvas', 'chart');
chartArea.appendChild(chartCanvas);
let axisDialog = L.DomUtil.create('form', 'fields-selection');
let charDiv = L.DomUtil.create('div', 'chart-pane');
charDiv.innerHTML = "<h2>Geological samples - charts</h2>";
[axisDialog, chartArea].forEach(
  f  => charDiv.appendChild(f)
);
contentChart = charDiv;


var select_x_up = document.createElement('select'),
  select_y_up = document.createElement('select'),
  select_x_down = document.createElement('select'),
  select_y_down = document.createElement('select'),
  select_area = document.createElement('input'),
  x = document.createElement('label'),
  area = document.createElement('label'),
  y = document.createElement('label');
  devide = document.createElement('span');

x.innerText = 'X: ';
y.innerText = 'Y: ';
devide.innerText = ' / '; ;
area.innerText = 'Spatial query: ';
// Takes fields from the layer directly. How to handle the order? Since we are not set with the table stucture, I take it easy for now and write oprions fron the alias_vs_names array. To be redone after!!! 
// sampleLayer.metadata(function (error, metadata) {
//   if (error) { return; }
//   metadata.fields.forEach(f => {
//     if ((f.actualType == "float" || f.actualType == "real") && !f.alias.includes('error')) {
//       select_x.add(new Option(names_vs_alias[f.name],f.name));
//       select_y.add(new Option(names_vs_alias[f.name],f.name));
//     }; })
// });
Object.keys(names_vs_alias).forEach(f => {
  select_x_up.add(new Option(names_vs_alias[f],f));
  select_y_up.add(new Option(names_vs_alias[f],f));
  select_x_down.add(new Option(names_vs_alias[f],f));
  select_y_down.add(new Option(names_vs_alias[f],f));
});

[x, select_x_up, devide, select_x_down, document.createElement('br'), y, select_y_up, devide.cloneNode(true), select_y_down, area, select_area ].forEach(
  f  => axisDialog.appendChild(f)
);
axisDialog.onchange = function () {
  updateChartWrap();
};


var initialChartData = {
  datasets: [{
    data: []
  }]
};

var chartOptions = {
  elements: {
    point: {
      backgroundColor: 'rgba(81, 243, 148, 0.5)',
      hoverRadius: 7,
      redius: 4,
      borderColor: 'rgba(43, 100, 67, 0.9)',
    },
  },
  scales: {
    xAxes: [{ scaleLabel: { display: true, labelString: "" } }],
    yAxes: [{ scaleLabel: { display: true, labelString: "" } }],
  },
  legend: {
    display: false
  },
  title: {
    display: true,
    text: "",
  },
  maintainAspectRatio: false,
  animation: {duration: 0},
  onHover: handleChartHover
};

var chart = new Chart(chartCanvas, {
  type: 'scatter',
  data: initialChartData,
  options: chartOptions
});
Chart.defaults.global.legend.display = false;

const updateChartWrap = () => {
  if (!select_area.value) {
    updateChart(select_x_up.value, select_x_down.value, select_y_up.value, select_y_down.value, sampleLayer, 'no_query');
  } else {
    let a = drawnObjects.customGetLayer(select_area.value);
    sampleLayer.query().within(a).run(function (error, featureCollection, response){
      updateChart(select_x_up.value, select_x_down.value, select_y_up.value, select_y_down.value, featureCollection.features, 'query')
    });
  }
};

const arrayToShow = (x_up, x_down, y_up, y_down, e, array) => {
  let p = e.properties; p['1'] = 1;
  if (p[x_up] && p[y_up] && p[x_down] && p[y_down]) {
    array.push({
      x: p[x_up]/p[x_down],
      y: p[y_up]/p[y_down],
      featureId: e.id,
    });

  };
};
const updateChart = (x_up, x_down, y_up, y_down, layer, flag) => {
  var scatterPlotDataArray = [];
  if (flag === 'query') {
    layer.forEach(e => {
      arrayToShow(x_up, x_down, y_up, y_down, e, scatterPlotDataArray);
    })
  } else {
    layer.eachFeature(function (e) {
      arrayToShow(x_up, x_down, y_up, y_down, e.feature, scatterPlotDataArray);
    });
  }
  
  chart.data.datasets[0].data = scatterPlotDataArray;
  console.log(scatterPlotDataArray.length);

  const handleOne = (up, down) => {
    let exp = `${up}/${down}`;
    return exp.replace('/1', '');
  } 
  
  if ([names_vs_alias[x_up], names_vs_alias[y_up], names_vs_alias[x_down], names_vs_alias[y_down]].some(x => x!== undefined)) {
    xlabel = handleOne(names_vs_alias[x_up], names_vs_alias[x_down]);
    ylabel = handleOne(names_vs_alias[y_up], names_vs_alias[y_down]);
    chart.options.title.text = `${xlabel}  vs  ${ylabel}`;
    chart.options.scales.xAxes[0].scaleLabel.labelString = xlabel;
    chart.options.scales.yAxes[0].scaleLabel.labelString = ylabel;
  };
  chart.update();
};

function handleChartHover (e) {
  var chartHoverData = chart.getElementsAtEvent(e);
  if (!chartHoverData.length) {
    sampleLayer.eachFeature(function (e) {
      e.setRadius(defaultRadius);
      e.closeTooltip();
    });
    return;
  }
  var hoverFeatureIds = chartHoverData.map(function (datum) {
    return chart.data.datasets[0].data[datum._index].featureId;
  });
  sampleLayer.eachFeature(function (e, idx) {
    if ( hoverFeatureIds.indexOf(e.feature.id) > -1) {
      e.setRadius(defaultRadius + 4);
      e.openTooltip();
    };
  });
};









