function tryMarkers() {
  var STEPS_X = 9,
      STEPS_Y = 7,
      
      resultPoints = [],
      
      points = LVIV_POLYGON.map(x => Point.fromGeoPoint(x)),

      minX = Math.min(...points.map(x => x.x)),
      minXPoint = points.find(x => x.x == minX),
      geoMinXPoint = Point.toGeoPoint(minXPoint),
      
      maxX = Math.max(...points.map(x => x.x)),
      maxXPoint = points.find(x => x.x == maxX),
      geoMaxXPoint = Point.toGeoPoint(maxXPoint),
      
      minY = Math.min(...points.map(x => x.y)),
      minYPoint = points.find(x => x.y == minY),
      geoMinYPoint = Point.toGeoPoint(minYPoint),
  
      maxY = Math.max(...points.map(x => x.y)),
      maxYPoint = points.find(x => x.y == maxY),
      geoMaxYPoint = Point.toGeoPoint(maxYPoint),
      deltaX = (maxXPoint.x - minXPoint.x) / STEPS_X,
      deltaY = (maxYPoint.y - minYPoint.y) / STEPS_Y;
  
  addSingleMarker(geoMinXPoint);
  addSingleMarker(geoMaxXPoint);
  addSingleMarker(geoMinYPoint);
  addSingleMarker(geoMaxYPoint);
  
  makeYGrid(STEPS_X, minXPoint, maxXPoint, 2);
  makeXGrid(STEPS_Y, minYPoint, maxYPoint, 2);
  
  var pointsInsideCount = 0;
  for(let i = 0; i <= STEPS_X; ++i) {
    for(let j = 0; j <= STEPS_Y; ++j) {
      var point = new Point(minXPoint.x + i * deltaX, minYPoint.y + j*deltaY);
      if(Geometry.isPointInside(points, point)) {
        pointsInsideCount++;
        addSingleMarker(Point.toGeoPoint(point));
        resultPoints.push(Point.toGeoPoint(point));
      }
    }
  }
  
  pushLog('Points count: ' + pointsInsideCount);
  var str = resultPoints
    .concat([geoMinXPoint, geoMaxXPoint, geoMinYPoint, geoMaxYPoint])
    .map(x => x.lat + ',' + x.lng)
    .join('\n');
  
  document.getElementsByClassName('points')[0].innerHTML = str;
}


function makeYGrid(steps, minXPoint, maxXPoint, height) {
  height = 2;
  var delta = (maxXPoint.x - minXPoint.x) / steps,
      from, to;
  
  for(var i = 1; i < steps; ++i) {
    from = new Point(maxXPoint.x - i * delta, maxXPoint.y - height);
    to   = new Point(maxXPoint.x - i * delta, maxXPoint.y + height);
    
    addPolyline([Point.toGeoPoint(from), Point.toGeoPoint(to)]);
  }
}

function makeXGrid(steps, minYPoint, maxYPoint, height) {
  height = 2;
  var delta = (maxYPoint.y - minYPoint.y) / steps,
      from, to;
  
  for(var i = 1; i < steps; ++i) {
    from = new Point(maxYPoint.x + height, maxYPoint.y - i * delta);
    to   = new Point(maxYPoint.x - height, maxYPoint.y - i * delta);
    
    addPolyline([Point.toGeoPoint(from), Point.toGeoPoint(to)]);
  }
}

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      