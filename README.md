# radar_wetlands
Scripts written for data radar data processing. Supplementary material for my paper called 'Monitoring surface water cover change in Hungarian wetlands with Sentinel-1 radar using Google Earth Engine'

My scientific paper is under construction. :construction: This repository will be uploaded soon...

## Javascript codes for Google Earth Engine

In the **js** folder
* ***google_earth_engine_sentinel1_processing.js***: Main script for the processing of Sentinel-1 C-band SAR radar data (Level 1 Ground Range Detected) product. See the comments to understand the code. You can try out too.


## Batch script for SAGA GIS (ISODATA clustering)

In the **batch** folder
* ***saga_gis_isodata_clustering.bat***: Batch script for SAGA GIS 3.0 (64 bit version): Imports data then classifies all the images one by one in the working directory with the ISODATA algorithm and exports results in GeoTiff format.

## R script to perform a Receiver Operator Characteristics (ROC) analysis

The ROC function for R was developed by Okumura, H. and is available online here: http://oku.edu.mie-u.ac.jp/~okumura/stat/ROC.html.



