REM @ECHO OFF
ECHO
REM ********************************************************************
REM Import, classify, and export Sentinel-1 rasters in GeoTIFF
REM Author: András Gulácsi
REM ********************************************************************


REM *************** PATHS ******************
REM Path to saga_cmd.exe
set PATH=%PATH%;e:\SAGA_GIS3\saga_3.0.0_x64\

REM Path to working dir
SET WORK=E:\Sentinel1\basedata


REM ****************************************


FOR /F %%i IN ('dir /b %WORK%\*.tif') DO (

REM Tool: Import Raster

saga_cmd io_gdal 0 ^
-GRIDS=%WORK%\%%i.sgrd ^
-FILES=%WORK%\%%i ^
-TRANSFORM=0


REM Tool: ISODATA Clustering for Grids

saga_cmd imagery_isocluster 0 ^
-FEATURES=%WORK%\%%i.sgrd ^
-CLUSTER=%WORK%\temp\%%i_isodata.sgrd ^
-STATISTICS=%WORK%\temp\%%i_clusterCenters.txt ^
-NORMALIZE=0 ^
-ITERATIONS=20 ^
-CLUSTER_INI=5 ^
-CLUSTER_MAX=16 ^
-SAMPLES_MIN=5


REM Tool: Export GeoTIFF

saga_cmd io_gdal 2 ^
-GRIDS=%WORK%\temp\%%i_isodata.sgrd ^
-FILE=%WORK%\temp\%%i_isodataClass.tif

)

PAUSE