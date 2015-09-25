## COMPUTER GENERATED MOSAICS

A visualization project that implements a mosaic generator. Divides the canvas into tile spaces given a 
size(even, and in some cases, limited to perfect squares), and draws the tiles at a size that allows minimal tile grout 
displayed, fewer overlapping tiles and rotations along the direction field defined by the image edges. Edges can be user 
defined or auto-computed using a sobel filter for edge detection.

## DEMO

Open the *'mosaics.html'* in Mozilla Firefox, select an image from the drop-down list. Click the *'Generate Mosaic'* button. 

## PROGRESS

- Auto-edge detection(via open source library) done
- Tile placement point computation
  - Temporarily using tile centers (for the N-tiles).
  - Voronoi diagram generation. [ random colours, and initial points ].
  - Voronoi tesselation (75 % complete).
- User-drawn edges
  - In concept phase.
- Tile Placement
  - Implemented, with pitfalls :
    - User input not clamped in positive region.
	- Not yet clamped to perfect squares for certain image sizes.
- User selected images
  - 0% implemented, still in concept phase.