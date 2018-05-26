class Point {
  static get NULL_POINT() {
    return new Point(0, 0);
  }

  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get x() { return this._x; }
  set x(value) { this._x = value; }

  get y() { return this._y; }
  set y(value) { this._y = value; }

  static fromGeoPoint(geoPoint) {
    return new Point(geoPoint.lng, geoPoint.lat);
  }

  static toGeoPoint(point) {
    return {
      lng: point.x,
      lat: point.y
    }
  }

  distance(toPoint = Point.NULL_POINT) {
    return Math.sqrt(
      (toPoint.x - this.x) * (toPoint.x - this.x) +
      (toPoint.y - this.y) * (toPoint.y - this.y)
    );
  }

  /**
   * 
   * @param {Number} value 
   */
  multiply(value) {
    this.x *= value;
    this.y *= value;

    return this;
  }

  /**
   * 
   * @param {Point | Number} value 
   */
  add(value) {
    if (value instanceof Point) {
      this.x += value.x;
      this.y += value.y;
    } else {
      this.x += value;
      this.y += value;
    }

    return this;
  }
}