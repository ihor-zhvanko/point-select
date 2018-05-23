class Line {
  constructor(start, end) {
    this._start = start;
    this._end = end;
  }

  /**
   * @returns {Number}
   */
  get length() {
    return this.start.distance(this.end);
  }

  /**
   * @returns {Point} 
   */
  get start() { return this._start; }
  /**
   * @returns {Point} 
   */
  get end() { return this._end; }

  /**
   * 
   * @param {Point} point 
   */
  belongs(point) {
    let tx = (point.x - this.start.x) / (this.end.x - this.start.x);
    let ty = (point.y - this.start.y) / (this.end.y - this.start.y);

    if(tx != ty) {
      return false;
    }

    if(tx >= 0 && tx <= 1 && ty >= 0 && ty <= 1) {
      return true;
    }

    return false;
  }

  /**
   * 
   * @param {Point} point 
   */
  getParamenter(point) {
    return (point.x - this.start.x) / (this.end.x - this.start.x);
  }
}