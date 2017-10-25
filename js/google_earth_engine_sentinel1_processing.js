/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++   Sentinel-1 Processing Tool (Study area: Felső-Kiskunság lakes)   ++++++
 * +++++                      Author: András Gulácsi                        ++++++
 * +++++                      Date: January 27, 2017                        ++++++
 * +++++                      Updated: October 25, 2017                     ++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

/* Direct link to the script if you have an Earth Engine Evaluator account: 
 *           https://code.earthengine.google.com/8a0ae44daab12b3edc4f0f9e48267f88
 */

// Function returns true if leap year, false otherwise.
var isLeapYear = function(year) {
  return (year % 4 === 0 && year !== 100) || year % 400 === 0;
};

// Gets the number of days in any month in a year.
var getDaysInMonth = function(year, month) {
  var leapYear = isLeapYear(parseInt(year, 10));
  var daysInMonth = 0;
  var monthNumber = parseInt(month, 10);

  if (monthNumber === 2) {
    leapyear ? daysInMonth = 29 : daysInMonth = 28;
  }
  else if (
    monthNumber === 4 ||
    monthNumber === 6 ||
    monthNumber === 9 ||
    monthNumber === 11
  ){
    daysInMonth = 30;
  }
  else {
    daysInMonth = 31;
  }
  
  return (daysInMonth);
};


// Adds rectangle (the study area) and create a Feature object using the rectangle.
var region = ee.Geometry.Rectangle(19.1223, 46.7513, 19.2341, 46.8884);
var studyArea = ee.Feature(region, { name: 'Felső-Kiskunság lakes'});


/* Show object properies in the Console. */
print(studyArea);

/* Sets the map view to the center
 * of the study area. */
Map.setCenter(19.17826,46.81987, 11);
//Map.centerObject(studyArea);


// Loads the Sentinel-1 image collection.
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');

/* Coordinate pairs, set start and end date
 * for filtering the collection. */
var point = ee.Geometry.Point(19.18, 46.84);

var currentYear = new Date().getFullYear();

// User inputs: year and month. Data is available from 12/2014!
var year = prompt('Which year you want to process (between 2014 and ' + currentYear + ')?');
// Use leading 0 if month number < than 10!
var month = prompt('Which month you want to process?', '07');

var daysInMonth = getDaysInMonth(year, month);

var start = ee.Date(year + '-' + month + '-01');
var finish = ee.Date(year + '-' + month + '-' + daysInMonth);
print(finish);
print(daysInMonth);

 // Filtering based on metadata properties.
var vh = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filterBounds(point)
  .filterDate(start, finish);

// Filter to get images from different look angles.
var vhAscending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var vhDescending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));


// Create a composite from means at different polarizations and look angles.
var composite = ee.Image.cat([
  vhAscending.select('VH').mean(),
  ee.ImageCollection(vhAscending.select('VV').merge(vhDescending.select('VV'))).mean(),
  vhDescending.select('VV').mean()
]).focal_median();


// Clip composite image with our study area.
var compositeClipped = composite.clip(studyArea);

// Display as a composite of polarization and backscattering characteristics.
Map.addLayer(
  compositeClipped,
  {
    min: [-25, -20, -25],
    max: [0, 10, 0]
  },
  'composite'
);

// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();

// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint(
  {
    featureCollection: studyArea,
    color: "black",
    width: 2
  }
);

Map.addLayer(outline, { palette: 'f00' }, 'Study Area');
print(compositeClipped);


// Save the composite image as GeoTIFF.
Export.image.toDrive(
  {
    image: compositeClipped,
    description: 'Sentinel'+year+month,
    scale: 10,
    region: studyArea
  }
);

// Save the VV polarisation band only.
Export.image.toDrive(
  {
    image: compositeClipped.select('VV'),
    description: 'SentinelVV'+year+month,
    scale: 10,
    region: studyArea
  }
);