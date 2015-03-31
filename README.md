# yatayat-data

## Files

 * routes.geojson -- maintained by geojson.io
 * stops.geojson -- pulled from OSM, using the overpass script
 * combined.geojson -- made using combine.js (see below)
 * routing_data.geojson -- made using GraphStructure.java (see [graph-maker](https://github.com/yatayat/graph-maker))

### Using the combine.js script

The script needs Node.js and the Turf.js submodule to run. You need to install Node.js and run 'npm install Turf' in your working directory.

To run the script use the command 'node combine.js /path/to/your/stops.geojson /path/to/your/routes.geojson' 
