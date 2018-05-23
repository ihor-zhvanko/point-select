class Circle {
  /**
   * 
   * @param {Point} center 
   * @param {Number} radius 
   */
  constructor(center, radius) {
    this._center = center;
    this._radius = radius;
  }

  /**
   * @returns Point
   */
  get center() { return this._center; }

  /**
   * @returns Number
   */
  get radius() { return this._radius; }
}