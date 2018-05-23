var maxDist = Math.sqrt(21833 / MAX_POINT_COUNT) * 1000;

function tryMarkers() {
  let firstPoint = lvivOblPolygon[0];

  for(let i = 0; i < lvivOblPolygon.length - 1; ++i) {
    let circle = new Circle(Point.fromGeoPoint(lvivOblPolygon[i]), DEG_MAX_DISTANCE);
    let line = new Line(Point.fromGeoPoint(lvivOblPolygon[i]), Point.fromGeoPoint(lvivOblPolygon[i+1]));

    if(!Geometry.intersects(circle, line)) {
      continue;
    }

    let intersections = Geometry.getIntersectPoint(circle, line);
  }

  //let circle = new Circle(new Point(0, 0), 1);
  //let line = new Line(new Point(-3, 0), new Point(3, 0));
  //console.log("line length: ", line.length);

  //Geometry.getIntersectPoint(circle, line);
}

function intersects(center, radius, start, end) {
    let isStartInside = distance(center, start) <= radius;
    let isEndOutside = distance(center, end) > radius;

    let isStartOutside = distance(center, start) > radius;
    let isEndInside = distance(center, end) <= radius;

    let isCenterOnLine = (center.lat - start.lat) / (end.lat - start.lat) == (center.lng - start.lng) / (end.lng - start.lng)
    let intersectsFully = isEndOutside && isStartOutside && isCenterOnLine;

    //only these three situations could be
    if (
      (isStartInside && isEndOutside) ||
      (isStartOutside && isEndInside) ||
      intersectsFully
    ) {
        return true;
    }

    return false;
}

function findNextIntersect(center, points, j) {
    for (let i = j; i < points.length - 1; ++i) {
        let start = points[i];
        let end = points[i + 1];

        if (intercepts(center, DEG_MAX_DISTANCE, start, end)) {
            return {
                start: start,
                end: end
            }
        }
    }

    return {
        start: undefined,
        end: undefined
    }
}

function getIntersectPoint(center, radius, start, end) {
}