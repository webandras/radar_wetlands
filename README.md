# radar_wetlands

!! IMPORTANT NEWS. READ THIS !!
These codes in this repo are old now. Please check out my Google Earth Engine repo for Sentinel-1 processing: https://code.earthengine.google.com/?accept_repo=users/gulandras90/inlandExcessWater
If you accept the invitation, you will have read rights on my newest scripts for radar processing. The processing methodology was enhanced: * **Refined Lee filter** (much better the median filtering!)
* **wekaKMeans clustering** (no need to use SAGA GIS or other desktop apps for classification, GEE already have a lot of algorithms - no fuzzy or soft clustering though)
* **masking out areas where wind speed was too high** (to eliminate wind-induced surface roughening effects on water surfaces!)
* cosine correction
* Do not mix radar images taken on ascending and descending path! Do not average those! Make monthly averages for asc and desc path seperately!


Scripts written for data radar data processing. Supplementary material for my paper called 'Monitoring surface water cover change in Hungarian wetlands with Sentinel-1 radar using Google Earth Engine'

## Javascript codes for Google Earth Engine

In the **js** folder
* ***google_earth_engine_sentinel1_processing.js***: Main script for the processing of Sentinel-1 C-band SAR radar data (Level 1 Ground Range Detected) product. See the comments to understand the code. You can try out too.


## Batch script for SAGA GIS (ISODATA clustering)

In the **batch** folder
* ***saga_gis_isodata_clustering.bat***: Batch script for SAGA GIS 3.0 (64 bit version): Imports data then classifies all the images one by one in the working directory with the ISODATA algorithm and exports results in GeoTiff format.

## R script to perform a Receiver Operator Characteristics (ROC) analysis

The ROC function for R was developed by Okumura, H. and is available online here: http://oku.edu.mie-u.ac.jp/~okumura/stat/ROC.html.



