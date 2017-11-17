/*http://www.ventetenerife.com/geoserver/Cabildo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Cabildo:pda_red_otras&outputFormat=json&viewparams=tipo:red_bica;

http://www.ventetenerife.com/geoserver/Cabildo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Cabildo:pda_red_otras&outputFormat=json&viewparams=tipo:red_senderos;
*/
var json = require('./bica.json');
var jsonfile = require('jsonfile');
//var polyline = require('polyline');
var polyline = require('@mapbox/polyline');	//https://github.com/mapbox/polyline
//https://stackoverflow.com/questions/39247286/polyline-encode-gets-wrong-lat-lng-after-decoding

var size = json.features.length;
var hikes = json.features;

for (var i = 0; i < size; i++){
	console.log("\n-------------------------\n");
	var file = 'data' + hikes[i].properties.id + '.json';
	var file2 = 'dataEnconded' + hikes[i].properties.id + '.txt';
	var object ={};
	object["id"]= hikes[i].properties.id;
	var coords = [];
	
	var coordsSize = hikes[i].geometry.coordinates.length;
	console.log("ID: " + hikes[i].properties.id +" parts: "+coordsSize);

	var jsonCoords =  hikes[i].geometry.coordinates;
	
	for (var j = 0; j < coordsSize; j++){
			var  indeedCoords = jsonCoords[j];
			for (var k = 0; k < indeedCoords.length; k++){
				var indeedCoords2 =  indeedCoords[k];
				coords.push(indeedCoords2);
			}
	} 
	object["coords"] = coords; 

	console.log("coords: "+coords.length);
	//console.log(JSON.stringify(object));
	var coordsEncoded = polyline.encode(coords);
	console.log(coordsEncoded);
	try{
			jsonfile.writeFileSync(file, object);
			jsonfile.writeFileSync(file2, coordsEncoded);
	}catch(e){
		console.log("error");
	}
	
/*	jsonfile.writeFile(file, object, function (err) {
		console.error(err)
	});*/
}