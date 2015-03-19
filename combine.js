var fs = require('fs');
var turf = require('turf');

console.log('Reading stops file ...');
var stops = fs.readFileSync(process.argv[2]);
console.log('Reading stops file sucessful.');

console.log('Reading routes file...');
var routes = fs.readFileSync(process.argv[3]);
console.log('Reading routes file sucessful.');

var stopsJSON = JSON.parse(stops);
var routesJSON = JSON.parse(routes);

console.log(routesJSON.features.length + ' routes found');
var combinedJSON = {
  "type": "FeatureCollection",
  "features": []};
for (var i = 0; i < routesJSON.features.length; i++){	
	var route = routesJSON.features[i];
	combinedJSON.features[i] = {
    "type": "FeatureCollection",
    "features": []};
    combinedJSON.features[i].features[0] = route;	
	console.log('Snappign points to route ' + route.properties.name);
	var snaps = 0;
	for(var j = 0; j < stopsJSON.features.length; j++){
		var stop = stopsJSON.features[j];
		var snapped = turf.pointOnLine(route,stop);		
		var distance = turf.distance(stop, snapped, 'kilometers');
		if(distance < 0.02){
			// console.log(snapped);
			//Write to the file here
			combinedJSON.features[i].features[snaps + 1]= stop;
			combinedJSON.features[i].features[snaps + 1].geometry.coordinates = snapped.geometry.coordinates;
			snaps++;
		}
	}
	console.log(' Snapped ' + snaps + ' points to the route');
}
//console.log(JSON.stringify(combinedJSON));
fs.writeFileSync('combined.geojson', JSON.stringify(combinedJSON,null,4));




