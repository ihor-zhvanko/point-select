var maxDist = Math.sqrt(21833 / MAX_POINT_COUNT) * 1000;

function tryMarkers() {
    var topPoint = findTopPoint(lvivOblPolygon.coords);

    var pointCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: {
            lng: topPoint[0],
            lat: topPoint[1]
        },
        radius: maxDist// in meters
    });

    var nextPoint = topPoint;

    for (let i = 0; i < 2; ++i) {
        nextPoint = findFirstIntercept(nextPoint, lvivOblPolygon.coords).end;

        // pointCircle = new google.maps.Circle({
        //     strokeColor: '#FF0000',
        //     strokeOpacity: 0.8,''']
        //     strokeWeight: 1,
        //     fillColor: '#FF0000',
        //     fillOpacity: 0.35,
        //     map: map,
        //     center: {
        //         lng: nextPoint[0],
        //         lat: nextPoint[1]
        //     },
        //     radius: maxDist// in meters
        // });
        addSingleMarker(nextPoint[1], nextPoint[0]);
    }

    var allDist = 0;
    for (let i = 0; i < lvivOblPolygon.coords.length - 1; ++i) {
        allDist += distance(lvivOblPolygon.coords[i], lvivOblPolygon.coords[i + 1]);
    }

    var particle = Math.sqrt(lvivOblarea / MAX_POINT_COUNT);
    pushLog("Total points: " + allDist / particle);
}

function findTopPoint(points) {
    let max = Number.MIN_SAFE_INTEGER;
    let point;

    for (let i = 0; i < points.length; ++i) {
        if (points[i][1] > max) {
            max = points[i][1];
            point = points[i];
        }
    }

    return point;
}

function distance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
}

function intercepts(center, start, end) {
    let isStartInside = distance(center, start) <= degMinDist;
    let isEndOutside = distance(center, end) > degMinDist;

    let isStartOutside = distance(center, start) > degMinDist;
    let isEndInside = distance(center, end) <= degMinDist;

    if ((isStartInside && isEndOutside) || (isStartOutside && isEndInside)) {
        return true;
    }

    return false;
}

function findFirstIntercept(center, points) {
    for (let i = 0; i < points.length - 1; ++i) {
        let start = points[i];
        let end = points[i + 1];

        if (intercepts(center, start, end)) {
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