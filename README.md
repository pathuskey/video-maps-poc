# Video Map POC

## Getting Started
```
yarn
yarn start
```

### Creating Map Paths
1. Use Google Earth or possibly Google Map to create a path.
2. Use Google Earth to export the path to a .kml file.
3. Convert the .kml file to a geoJson file using [https://mygeodata.cloud/converter/](https://mygeodata.cloud/converter/).
4. Save the converted file to .json format so that Gatsby/Webpack can read it. You can place it the src/data folder beside the trail markdown file.