/*
 * @author Kudzai Pius Whande
 * Utilities class for centroidal voronoi diagram progression
*/

/*
 * @param N size of image in terms of pixels.
 * @param pixel_data rgba value array for the image.
 * @param p_colors the colours that make up the vonoi regions.
 * @return Array
 * CALCULATES NEW SITES FOR EACH VORONOI REGION BY AVERAGING THE x AND y SUMS.
*/
function calc_centroids(N, r, c, pixel_data, p_colors)
{
	// variable to hold 2D Image data
	var img2d = imageData2d(pixel_data, c, r);
	//bvh(img2d);
	//console.log(img2d[2][2]);
	//console.log(img2d.length);
	//console.log(img2d[1].length);
	
	var tmp_arr = Array(0);
	var count_arr = Array(N);
				
	// Allocate space for operations
	for(var a = 0; a < /*N*/p_colors.length; a++)
	{
		tmp_arr.push([0,0]);
		count_arr[a] = 0;
	}
	//console.log(tmp_arr[N-1]);
	
	// get index of the current pixel in the array for voronoi colours
	//var my_index = multi_indexOf(p_colors, [255,0,0,255]);
	//console.log(my_index);
	/**/
	for(var i=0; i<r; i++)
	{
		// Summation of pixel x and y values
		for(var j=0; j<c; j++)
		{
			var my_index = multi_indexOf(p_colors, img2d[i][j]);
			//if(array_equal(img2d[i][j], [255,0,0,255])){console.log("Red index is : " + my_index + " ; and the tmp-arr at index[0] is : " + tmp_arr[my_index]);}
			//if(array_equal(img2d[i][j], [0,0,255,255])){console.log("Blue index is : " + my_index + " ; and the tmp-arr at index[0] is : " + tmp_arr[my_index]);}
			//if(my_index == -1){console.log("color : " + img2d[i][j] + "; fucked up -1 index, i : " + i + ", j : " + j);}
			
			if( my_index != -1)
			{
				tmp_arr[my_index] = [ (tmp_arr[my_index][0]) + i , (tmp_arr[my_index][1]) + j ];
				count_arr[my_index]++;
			}
		}
	}/**/
					
	// Average the x and y values to get centroids
	/**/for(var k = 0; k < tmp_arr.length; k++)
	{
		//tmp_arr[k] = [ (tmp_arr[k][0] / count_arr[k]), (tmp_arr[k][1] / count_arr[k]) ];
		var num_px;
		
		if( count_arr[k] == 0 ){num_px = 1;}
		else{num_px = count_arr[k] ;}
		
		tmp_arr[k] = [ Math.round(tmp_arr[k][0] / num_px), Math.round(tmp_arr[k][1] / num_px) ];
			
		// debug :
		//console.log("New Centroids : [ " + tmp_arr[k][0] + ", " + tmp_arr[k][1] + " ]");
	}/**/
	
	//console.log(count_arr);
					
	// Assign the adjusted site array to points OR RETURN THE RESULT
	//points = tmp_arr ;/**/
	return tmp_arr;
}

/*
 * @param inArray the search space.
 * @param element the search term.
 * Search for a matching array from a 2D array.
 * Return first indexOf if present, else return -1.
*/
function multi_indexOf(inArray, element)
{
	//console.log("inArray type : " + inArray.length);
	for(var i in inArray)
	{
		if( array_equal(inArray[i], element) )
		{
			return i;
		}
	}
	return -1;
}

/*
 * @param a first array
 * @param b second array
 * @return bool
 * Check if two arrays are equal
*/
function array_equal(a, b)
{
	// check faulty objects
	if(!a || !b){ return false; }
	
	// make sure lengths are equal
	if(a.length != b.length){ return false; }
	
	for(var i=0; i<b.length; i++)
	{
		// check if nested, if true, recursively check for inner array equality
		if(a[i] instanceof Array && b[i] instanceof Array)
		{
			if (!array_equals(a[i], b[i]))
			{
                return false; 
			}
		}
		else if(a[i] != b[i])
		{
			return false;
		}
	}
	
	return true;
	
}

/*
 * @param imgData the image data.
 * @param w the pixel width of the image.
 * @param h the pixel height of the image.
 * Represent 1D image data as 2D for better access.
 * WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/
function imageData2d(imgData, w, h)
{
	var new_arr = new Array(0);
	var k = 0;
	
	for(var i=0; i<h; i++)
	{
		// push a new row
		new_arr.push(new Array(0));
		
		for(var j=0; j<w; j++)
		{
			// push a column of rgba data
			new_arr[i].push(imgData.slice(k,k+4));
			k+=4;
		}
	}
	return new_arr;
}

/*
 * @param img2d the 2d image data
 * @param the number of regions
 * Create a BVH for an image
 * Divide Image into 16 regions
 * Assign an array to each region, which will contain the 
*/
function bvh(img2d)
{
	// get dimensions for width and height
	var w = img2d[0].length;
	//console.log("w : " + w);
	var h = img2d.length;
	//console.log("h : " + h);
	
	// get division bounds for the regions
	var div1 = Math.round(w/2);
	//console.log("div1 : " + div1);
	var div2 = Math.round(h/2);
	//console.log("div2 : " + div2);
	var div3a = Math.round((div1)/2);
	//console.log("div3a : " + div3a);
	var div3b = Math.round((div1+w)/2);
	//console.log("div3b : " + div3b);
	var div4a = Math.round((div2)/2);
	//console.log("div4a : " + div4a);
	var div4b = Math.round((div2+h)/2);
	//console.log("div4b : " + div4b);
	
	// define region references
	var rgn_ref = [ [0,div4a,0,div3a], [0,div4a,div3a,div1], [div4a,div2,0,div3a], [div4a,div2,div3a,div1],
		[div2,div4b,0,div3a], [0,div4a,0,div3a], [div4b,h,0,div3a], [div4b,h,div3a,div1], [0,div4a,div1,div3b], 
		[0,div4a,div3b,w], [div4a,div2,div1,div3b], [div4a,div2,div3b,w], [div2,div4b,div1,div3b], 
		[div2,div4b,div3b,w], [div4b,h,div1,div3b], [div4b,h,div3b,w]
	];
	
	// create array for holding the 16 regions
	var regions = new Array(16);
	/**/for(var i=0; i<16; i++)
	{
		regions[i] = [];
	}/**/
	
	// create array for holding the pixel directions in form of gradient, and x and y points
	var options = new Array(h);
	for(var i=0; i<h; i++)
	{
		options[i] = new Array(w);
		for(var j=0; j<w; j++)
		{
			options[i][j] = new Array(0);
		}
	}
	
	/***************************************** POPULATE THE REGIONS ***************************************/
	
	for(var ref in rgn_ref)
	{
		for( var i=rgn_ref[ref][0]; i<rgn_ref[ref][1]; i++ )
		{
			for( var j=rgn_ref[ref][2]; j<rgn_ref[ref][3]; j++ )
			{
				// if pixel is white
				/*console.log("at 0 : [" + rgn_ref[0] + "]; at 1 : [" + rgn_ref[1] + "]; at 2 : [" 
					+ rgn_ref[2] + "]; at 3 : [" + rgn_ref[3] + "]");
				console.log(" i : " + i);
				console.log(" j : " + j);/**/
				if( array_equal(img2d[i][j], [255,255,255,255]) )
				{
					// push pixel co-ordinates to the region
					//console.log(regions[ref]);
					regions[ref].push( [i, j] );
				}
			}
		}
	}
	console.log(/*"regions : " + */regions);
	
	/*****************************************************************************************************/
	
	/*********************************** CALCULATE THE DIRECTION FIELD ***********************************/
	
	// region index
	var at_rgn = 0;
	
	// pixel references
	
	
	// while there are still regions to deal with
	/**/for( var at_rgn=0; at_rgn<16; at_rgn++ )
	{
		// rows in the region
		for( var i=rgn_ref[at_rgn][0]; i<rgn_ref[at_rgn][1]; i++ )
		{
			// columns in the region
			for( var j=rgn_ref[at_rgn][2]; j<rgn_ref[at_rgn][3]; j++ )
			{
				// if the region has 0 edges/white pixels
				if(regions[at_rgn].length == 0)
				{
					//options[i][j] = new Array(0);
					// set rotation to 0 or just don't add to options array		
					options[i][j].push( [0, 0] );
					//console.log("No white pixels for this region");
				}
				else
				{
					// for the edges in the region
					for( var edge in regions[at_rgn] )
					{
						// calculate the gradient :
						var my_grad;
							
						// calculate the distance :
						var my_dist = Math.sqrt( Math.pow((img2d[i][j][0] - (regions[at_rgn])[edge][0]), 2) + Math.pow((img2d[i][j][1] - ((regions[at_rgn])[edge][1])), 2 ) );
						
						// y doesn't change
						if( j == regions[at_rgn][edge][3] ) 
						{
							// denominator becomes 0 if so zero division
							my_grad = 0;
						}
						else
						{
							my_grad = (/*img2d[i][j][0]*/j - (regions[at_rgn])[edge][1]) / (/*img2d[i][j][1]*/i - ((regions[at_rgn])[edge][0]));
						}
						
						//console.log(regions[at_rgn][edge][0]);
						if( options[i][j].length == 0 ) // if the options array is empty, just add the point and the gradient
						{
							options[i][j] = new Array(0);
							options[i][j].push([ my_grad, my_dist ]); // [ grad, dist ]/[grad] : I THINK ONLY GRAD MATTERS THOUGH, THEN TAKE THE ABSOLUTE OF IT
						}
						else
						{
							// if distance to point is the same
							if( options[i][j][0][1] == my_dist )
							{
								// 
								//options[i][j] = new Array(0);
								options[i][j].push([ my_grad, my_dist ]);
							}
							else if( Math.abs(options[i][j][0][1]) > my_dist ) // if distance to the point is shorter
							{
								// empty the current array
								options[i][j] = new Array(0);
								// push the new grad
								options[i][j].push([ my_grad, my_dist ]);
							}
						}
					}
				}
				// if still empty
				if( options[i][j].length == 0 )
				{
					options[i][j] = new Array(0);
					// set rotation to 0 or just don't add to options array		
					options[i][j].push( [0, 0] );
					//console.log("Was Empty!!!");
				}
			}
		}
		
		// increment region index
		//at_rgn++;
	}/**/
	//console.log("gradient array : ");
	//console.log((options[200][250][0])[0]);
	console.log(options);
	//console.log(img2d[101][63]);
	console.log("gradient : " + options[0][1][0][0] + "; angle : " + Math.atan(options[0][1][0][0]));
	/************************************** CONVERT THE GRADIENT TO DEGREES *********************************/
	for(var i=0; i</*options.length*/h; i++)
	{
		for(var j=0; j</*options[i].length*/w; j++)
		{
			// calculate the angle
			//console.log("i : " + i + "; j : " + j);
			//console.log(options[i][j][0]);
			var my_angle;
			if( options[i][j].length != 0 )
			{
				my_angle = Math.atan(options[i][j][0][0]);//Math.atan((options[i][j])[0]);
			}
			else
			{
				my_angle = 0;
			}
			//console.log(my_angle);
			// make sure its a number
			my_angle = my_angle || 0;
			
			// replace array at [i][j] with the angle in degrees
			options[i][j] = new Array(0); // empty array
			options[i][j].pop(); // remove the 1 element
			options[i][j].push( my_angle );
		}
	}
	/********************************************************************************************************/
	console.log(options);
	/***********************************************************************************************************************************/
	return options ;
}


/*
 * @param p the point <y,x>
 * @param l1 pair containing first point co-ordinates of the line <y,x>
 * @param l2 pair containing second point co-ordinates of the line <y,x>
 * @return distance to the closest point from given point to the line defined by the other two points
 * CALCULATE THE CLOSEST DISTANCE TO A LINE
 * USED TO LOOK FOR THE CLOSEST BV- REGION WHEN SELECTING/ORDERING BV-HIERACHIES
 * y,x co-ordinates
*/
function point_to_line(p, l1, l2)
{
	//console.log("l2 : ");
	//console.log(l2);
	dist = Math.abs( ((l2[0] - l1[0])*p[1]) - ((l2[1] - l1[1])*p[0]) + (l2[1]*l1[0]) -(l2[0]*l1[1]) ) /
			Math.sqrt( Math.pow((l1[0] - l2[0]), 2) + Math.pow((l1[1] - l2[1]), 2) );
	return dist;
}

/*
 * 1) Get smallest distance to any of the bounding lines
 * 2) Add each ref to a return array based on it's smallest distance to a bvh region
 * 3) return ordered (ref, distance) array
*/
function order_references(regions, p)
{
	//console.log("regions :");
	//console.log(regions);
	//console.log("p : ");
	//console.log(p);
	
	// array to hold [distance, reference pairs]
	var dist_ref = [];
	
	// populate with 0's
	
	var rtn_arr = [];
	var ref = 0;
	
	// regions[lines(16)][line(4)][point(2)][y|x]
	for(var x=0; x<16; x++)//(var lines in regions)
	{
		// IF THE REGION AT THIS INDEX IS EMPTY, SKIP IT :
		if(regions[x].length == 0)
		{
			// debug :
			console.log("empty region in 'order_references' method, skipping.");
			// continue to next iteration :
			continue;
		}
		
		lines = regions[x];
		
		//console.log("lines : ");
		//console.log(lines);
		
		dist_ref_tmp = 10000;
		for(var y=0; y<4; y++)//(var line in lines)
		{
			line = lines[y];
			
			// potential new distance
			//console.log("About to use point_2_line for line : ");
			//console.log(line);
			pot_dist = point_to_line(p, line[0], line[1]);
			
			if( pot_dist < dist_ref_tmp )
			{
				dist_ref_tmp = pot_dist
			}
		}
		
		// push the reference to the correct position in the array
		if( rtn_arr.length == 0 )
		{
			rtn_arr.push([0, dist_ref_tmp]);
		}
		else
		{
			for(var i=0; i<rtn_arr.length; i++)
			{
				// if tmp_distance is less than that at given item, insert at that position
				// exit this loop
				if(dist_ref_tmp < rtn_arr[i][1])
				{
					rtn_arr.splice(i, 0, [ref, dist_ref_tmp]);
					break;
				}
			}
		}
		
		// increment the reference
		ref++;
	}
	
	// return array of ordered references, and the distances.
	//console.log("ordered ref : ");
	//console.log(rtn_arr);
	return rtn_arr;
}

/*
 * @param img2d the 2d image data
 * Create a BVH for an image
 * Divide Image into 16 regions
 * Assign an array to each region, which will contain the edge pixels
*/
function bvh2(img2d)
{
	// get dimensions for width and height
	var w = img2d[0].length;
	//console.log("w at init : " + w);
	var h = img2d.length;
	//console.log("h : " + h);
	
	// get division bounds for the regions
	var div1 = Math.round(w/2);
	//console.log("div1 : " + div1);
	var div2 = Math.round(h/2);
	//console.log("div2 : " + div2);
	var div3a = Math.round((div1)/2);
	//console.log("div3a : " + div3a);
	var div3b = Math.round((div1+w)/2);
	//console.log("div3b : " + div3b);
	var div4a = Math.round((div2)/2);
	//console.log("div4a : " + div4a);
	var div4b = Math.round((div2+h)/2);
	//console.log("div4b : " + div4b);
	
	// define region references
	var rgn_ref = [ [0,div4a,0,div3a], [0,div4a,div3a,div1], [div4a,div2,0,div3a], [div4a,div2,div3a,div1],
		[div2,div4b,0,div3a], [0,div4a,0,div3a], [div4b,h,0,div3a], [div4b,h,div3a,div1], [0,div4a,div1,div3b], 
		[0,div4a,div3b,w], [div4a,div2,div1,div3b], [div4a,div2,div3b,w], [div2,div4b,div1,div3b], 
		[div2,div4b,div3b,w], [div4b,h,div1,div3b], [div4b,h,div3b,w]
	];
	
	// create array for holding the 16 regions
	var regions = new Array(16);
	/**/for(var i=0; i<16; i++)
	{
		regions[i] = [];
	}/**/
	
	// create array for holding the pixel directions in form of gradient, and x and y points
	var options = new Array(h);
	for(var i=0; i<h; i++)
	{
		options[i] = new Array(w);
		for(var j=0; j<w; j++)
		{
			options[i][j] = new Array(0);
		}
	}
	
	/***************************************** POPULATE THE REGIONS ***************************************/
	
	for(var ref in rgn_ref)
	{
		for( var i=rgn_ref[ref][0]; i<rgn_ref[ref][1]; i++ )
		{
			for( var j=rgn_ref[ref][2]; j<rgn_ref[ref][3]; j++ )
			{
				// if pixel is white
				/*console.log("at 0 : [" + rgn_ref[0] + "]; at 1 : [" + rgn_ref[1] + "]; at 2 : [" 
					+ rgn_ref[2] + "]; at 3 : [" + rgn_ref[3] + "]");
				console.log(" i : " + i);
				console.log(" j : " + j);/**/
				if( array_equal(img2d[i][j], [255,255,255,255]) )
				{
					// push pixel co-ordinates to the region
					//console.log(regions[ref]);
					regions[ref].push( [i, j] );
				}
			}
		}
	}
	//console.log("regions : ");
	console.log(/*"regions : " + */regions);
	
	/*****************************************************************************************************/
	
	/*********************************** CALCULATE THE DIRECTION FIELD ***********************************/
	
	
	/**************** GENERATE REGION BOUNDS(TO BE USED FOR BVH REGION ORDERING) ******************/
	var rgn_lines = new Array(16);
	for(var ref = 0; ref<16; ref++)
	{
		// generate bounding lines for each region, then push it to rgn_lines
		// rg_lines[ref][line(4)][point(2)][y|x]
		w = [ [ [rgn_ref[ref][0], rgn_ref[ref][2]], [rgn_ref[ref][0], rgn_ref[ref][3]] ],
			  [	[rgn_ref[ref][1], rgn_ref[ref][2]], [rgn_ref[ref][1], rgn_ref[ref][3]] ],
			  [ [rgn_ref[ref][0], rgn_ref[ref][2]], [rgn_ref[ref][1], rgn_ref[ref][2]] ],
			  [	[rgn_ref[ref][0], rgn_ref[ref][3]], [rgn_ref[ref][1], rgn_ref[ref][3]] ]
			];
		rgn_lines[ref] = w;
	}
	/*********************************************************************************************/
	
	// region index
	var at_rgn = 0;	
	
	// while there are still regions to deal with
	/**/for( var at_rgn=0; at_rgn<16; at_rgn++ )
	{
		// rows in the region
		for( var i=rgn_ref[at_rgn][0]; i<rgn_ref[at_rgn][1]; i++ )
		{
			// columns in the region
			for( var j=rgn_ref[at_rgn][2]; j<rgn_ref[at_rgn][3]; j++ )
			{
				/********** Get ordered references to each search region for closest white pixel ***********/
				// order_references(regions, p) :
				ordered = order_references(rgn_lines, [i,j]);
				/********************************************************************************************/
				
				do
				{
					//console.log("length : " + ordered.length);
					// if the region has 0 edges/white pixels
					if(regions[ordered[0][0]].length == 0)
					{
						//console.log("No white pixels for this region, moving to the next");
						
						// move pointer to next region by removing first element
						
						// QUICK FIX FOR LENGTH STUCK AT 1 :
						if(ordered.length == 1)
						{
							ordered = [];
						}
						else
						{
							tmp = ordered.splice(0, 1);
							ordered = tmp;
						}
					}
					else
					{
						// for the edges in the region
						for(var k=0; k<regions[ordered[0][0]].length; k++)//( var edge in regions[ordered[0][0]] )
						{
							//var edge = regions[ordered[0][0]][k];
							// calculate the gradient :
							var my_grad;
							
							// calculate the distance :
							//console.log(" k : " + k);
							//console.log(regions[ordered[0][0]].length);
							//console.log(regions[ordered[0][0]]);
							var my_dist = Math.sqrt( Math.pow((img2d[i][j][0] - (regions[ordered[0][0]])[k][0]), 2) + Math.pow((img2d[i][j][1] - ((regions[ordered[0][0]])[k][1])), 2 ) );
							
							// y doesn't change
							if( j == regions[ordered[0][0]][k][3] ) 
							{
								// denominator becomes 0 if so zero division
								my_grad = 0;
							}
							else
							{
								my_grad = (/*img2d[i][j][0]*/j - (regions[ordered[0][0]])[k][1]) / (/*img2d[i][j][1]*/i - ((regions[ordered[0][0]])[k][0]));
							}
							
							//console.log(regions[at_rgn][edge][0]);
							if( options[i][j].length == 0 ) // if the options array is empty, just add the point and the gradient
							{
								options[i][j] = new Array(0);
								options[i][j].push([ my_grad, my_dist ]); // [ grad, dist ]/[grad] : I THINK ONLY GRAD MATTERS THOUGH, THEN TAKE THE ABSOLUTE OF IT
							}
							else
							{
								// if distance to point is the same
								if( options[i][j][0][1] == my_dist )
								{
									// 
									//options[i][j] = new Array(0);
									options[i][j].push([ my_grad, my_dist ]);
								}
								else if( Math.abs(options[i][j][0][1]) > my_dist ) // if distance to the point is shorter
								{
									// empty the current array
									options[i][j] = new Array(0);
									// push the new grad
									options[i][j].push([ my_grad, my_dist ]);
								}
							}
						}
						// move pointer to next region by removing first element
						// QUICK FIX FOR LENGTH STUCK AT 1 :
						if(ordered.length == 1)
						{
							ordered = [];
						}
						else
						{
							tmp = ordered.splice(0, 1);
							ordered = tmp;
						}
					}
					// if still empty
					if( options[i][j].length == 0 )
					{
						options[i][j] = new Array(0);
						// set rotation to 0 or just don't add to options array		
						options[i][j].push( [0, 0] );
						//console.log("Was Empty!!!");
					}
				}
				while(ordered.length > 0)
			}
		}
		
		// increment region index
		//at_rgn++;
	}/**/
	//console.log("gradient array : ");
	//console.log((options[200][250][0])[0]);
	console.log(options);
	//console.log(img2d[101][63]);
	console.log("gradient : " + options[0][1][0][0] + "; angle : " + Math.atan(options[0][1][0][0]));
	console.log(w);
	/************************************** CONVERT THE GRADIENT TO DEGREES *********************************/
	for(var l=0; l</*options.length*/h; l++)
	{
		/* HAD TO HARDCODE W(FOR NOW, WIDTH OF "cat.jpg" IMAGE, VARIABLE LEAKING SOMEWHERE AND CHANGING TO ARRAY) */
		for(var m=0; m</*options[i].length*//*168*/img2d[0].length; m++)
		{
			// calculate the angle
			//console.log("i : " + i + "; j : " + j);
			//console.log("Actually executing this loop!!!!!!!");
			//console.log(options[i][j][0]);
			var my_angle;
			if( options[l][m].length != 0 )
			{
				my_angle = Math.atan(options[l][m][0][0]);//Math.atan((options[i][j])[0]);
			}
			else
			{
				my_angle = 0;
			}
			//console.log(my_angle);
			// make sure its a number
			my_angle = my_angle || 0;
			
			// replace array at [i][j] with the angle in degrees
			options[l][m] = new Array(0); // empty array
			options[l][m].pop(); // remove the 1 element
			options[l][m].push( my_angle );
		}
	}
	/********************************************************************************************************/
	console.log(options);
	/***********************************************************************************************************************************/
	return options ;
}

/*
 * NEEDS TO BE CHANGED : FROM STACKOVERFLOW!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Get CSS code string from a color's rgb values
*/
function rgbToHex(r, g, b)
{
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return "#" + ((r << 16) | (g << 8) | b).toString(16);
}

/*
 * Gradient function
*/
function grad(a,b)
{
	//var y_diff = b[
	return (b[1]-a[1]) / (b[0]-a[0]) ;
}

/*
 * @param renderer the renderer for the current scene
 * @param w width of the screen
 * @param h height of the screen
 * RETURNS THE DATA ARRAY FOR THE CURRENT SCREEN OUTPUT
*/
function readBack(renderer, w, h)
{
	var pixels = new Uint8Array(w * h * 4);
	renderer.gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
	
	return pixels;
}

/************************************************************* TESSALATION FUNCTION ***************************************************************/

/*
 * @param N number of initial voronoi sites
 * @param w the width of the voronoi diagram
 * @param h the height of the voronoi diagram
 * @param margin the convergence target
 * @param M the maximum number of iterations for tessalation
 * @param scene if needed, else remove
 * @param renderer if needed, else remove
 * @return 
 * FUNCTION THAT HANDLES MAIN voronoi tessalation LOOP(UNTIL CONVERGENCE)
*/
function tessalate(N, w, h, margin, M, scene, renderer)
{
	var my_sites = new generateSites(w, h, N);  // FROM GENERATION.JS, scripted as "generateSites()"
	
	// assign the sites to current points, then create variable for old sites
	var site_array = my_sites.points;
	var old_sites;
	
	// create array for site colors
	var my_colors = my_sites.colors;
	
	// create test for variable for convergence with arbitrarily high start value
	var test_limit = 10000;
	
	// keep track of iterations
	var iter_count = 1;
	
	// string for saved file first part
	var name_str = "Downloads/test";
	
	// voronoi image count
	var image_num = 0;
	
	// 1 : while ! converged
	while( test_limit > margin )
	{
		// a : draw pyramids at initial points
		populatePyramids(my_sites, N); // FROM GENERATION.JS
		
		/******* EXTRACT IMAGE DATA FROM SCREEN TO SAVED IMAGE ****/
		
		// NOTE : THE SAVE METHOD SAVES AT SCREEN RESOLUTION, BUT WHEN EXTRACTING, SEND TO CANVAS WITH
		// WIDTH AND HEIGHT SAME AS THE IMAGE, THEN EXTRACT IMAGE DATA FROM THERE, REFERENCE, SEE
		// IN MOSAIC.html
		
		// code here
		var pixel_data; // NEEDS EXTRACTION AND INSTANTIATION
		
		var tmp_canvas = document.createElement("canvas");
		tmp_canvas.setAttribute('width', w);
		tmp_canvas.setAttribute('height', h);
		
		var tmp_ctx = tmp_canvas.getContext("2d");
		
		var open_str = "";
		
		if(image_num != 0)
		{
			open_str = name_str + ".jpg";
		}
		else
		{
			open_str = name_str + "(" + image_num + ").jpg";
		}
		
		var tmp_img = document.createElement("img");
		tmp_img.setAttribute('src', open_str);
		
		// set w and h of image
		tmp_img.setAttribute('width', w);
		tmp_img.setAttribute('height', h);
		
		// draw the image onto the canvas
		ctx.drawImage(tmp_img, 0, 0);
		
		// now, get pixel data for next step
		pixel_data  = (tmp_ctx.getImageData(0,0, w, h)).data;
		
		image_num++;
		
		/**********************************************************/
		
		// b : calculate centroids of new voronoi regions, and assign current points to old array
		old_sites = site_array;
		site_array = calc_centroids(N, h, c, pixel_data, my_colors);
		
		// adjust average change(test_limit) after calculating new centroids
		test_limit = 0; // reset test_limit before calculations
		
		for(var i in site_array)
		{
			// cumulative square distance between old and new points
			test_limit += Math.sqrt( Math.pow( (site_array[i][0] - old_sites[i][0]), 2) + Math.pow( (site_array[i][1] - old_sites[i][1]), 2) );
		}
		
		// average the square distance to get the average change
		test_limit /= site_array.length;
		
		// condition to avoid infinite loops incase of faulty convergence.
		if( iter_count > M )
		{
			break;
		}
		
		// increment iteration count.
		iter_count++;
	}
	
	// return the proper sites after convergence
	return site_array;
}

/******************************************************************************************************************************************************/

/************************************************************** SAVE FUNCTION SECTION ****************************************************************/

/*
 * 
*/
function saveAsImage()
{
	var imgData, imgNode;

	try
	{
		var strMime = "image/jpeg";
		imgData = renderer.domElement.toDataURL(strMime);

		saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

	}
	catch (e)
	{
		console.log(e);
		return;
	}

}

/*
 * 
*/
var saveFile = function (strData, filename)
{
	var link = document.createElement('a');
	if (typeof link.download === 'string') 
	{
		document.body.appendChild(link); //Firefox requires the link to be in the body
		link.download = filename;
		link.href = strData;
		link.click();
		document.body.removeChild(link); //remove the link when done
	}
	else
	{
		location.replace(uri);
	}
}

function copyCanvas()
{
	renderer.render(scene, camera); 
    var imgData = renderer.domElement.toDataURL();
	
    // create a new image and add to the document
    imgNode = document.createElement("img");
    imgNode.src = imgData;
//        var link = document.createElement("a");
//        link.download = 'capture.png';
//        link.href = imgData;
//        link.click();
}
/*******************************************************************************************************************************************************/