var maxDist = Math.sqrt(21833 / MAX_POINT_COUNT) * 1000;

function random(from, to) {
  return Math.random() * (to - from) + from;
}

let points = [];
let markers = [];
let pointWasMoved = true;
let iteration = 0;
let boundingPolygon = LVIV_POLYGON.map(x => Point.fromGeoPoint(x));
for (let i = 0; i < LVIV_POLYGON.length; ++i) {
  points.push(Point.fromGeoPoint({ lat: 49.83826, lng: 24.02324 }));
}

function startBruteforce() {
  let timer = setInterval(function () {
    ++iteration;
    setLog(iteration);
    if (pointWasMoved) {
      tryMarkers();
    } else {
      clearInterval(timer);
      pushLog('Stopped bruteforcing');
    }
  }, 200)
}

function tryMarkers() {
  markers.map(x => x.setMap(null));
  pointWasMoved = false;
  for (let i = 0; i < points.length; ++i) {
    for (let j = 0; j < points.length; ++j) {
      if (i == j) continue;

      if (points[i].distance(points[j]) <= DEG_MAX_DISTANCE) {
        pointWasMoved = true;
        let cycle = 0;
        let newPoint_j;
        do {
          ++cycle;
          let vector = calcNormalizedVector(points[i], points[j], true);

          newPoint_j = vector.multiply(DEG_MAX_DISTANCE).add(points[i]);
        } while (!Geometry.isPointInside(boundingPolygon, newPoint_j));

        points[j] = newPoint_j;
      }
    }
  }


  // for (let i = 0; i < LVIV_POLYGON.length; ++i) {
  //   let p = Point.toGeoPoint(points[i]);
  //   let marker = addSingleMarker(p.lat, p.lng);
  //   markers.push(marker);
  // }
}

function calcNormalizedVector(point1, point2, randomize) {
  let vector;
  if (randomize || point1.x == point2.x && point1.y == point2.y) {
    vector = new Point(random(-1, 1), random(-1, 1));
  } else {
    vector = new Point(point2.x - point1.x, point2.y - point1.y);
  }

  vector.x = vector.x / vector.distance();
  vector.y = vector.y / vector.distance();
  return vector;
}
