class Geometry {
  /**
   * This function only for my needs
   * @param {Circle} circle 
   * @param {Line} line 
   * @returns {Boolean}
   */
  static intersects(circle, line) {
    let isStartInside = distance(circle.center, line.start) <= circle.radius;
    let isEndOutside = distance(circle.center, line.end) > circle.radius;

    let isStartOutside = distance(circle.center, start) > radius;
    let isEndInside = distance(circle.center, end) <= radius;

    let isCenterOnLine = line.belongs(circle.center);
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

  /**
   * 
   * @param {Circle} circle 
   * @param {Line} line
   * @returns Point
   */
  static getIntersectPoint(circle, line) {
    let r2 = circle.radius * circle.radius;

    let k1 = (line.end.y - line.start.y);
    let k2 = (line.end.x - line.start.x);
    let b = k2* line.start.y - k1 * line.start.x;

    let A = -(k1*k1 + k2*k2);
    let B = k1*k1*circle.center.y + k1*k2*circle.center.x + k2*b;
    let C = k1*k1*r2 - k1*k1*circle.center.y*circle.center.y - k1*k1*circle.center.x*circle.center.x - b*b - 2*k1*b*circle.center.x;

    let D = (B*B - A*C);

    let y1 = (-B + Math.sqrt(D)) / A;
    let y2 = (-B - Math.sqrt(D)) / A;

    let x1 = Math.sqrt(r2 - (y1-circle.center.y)*(y1-circle.center.y)) + circle.center.x;
    let x2 = -Math.sqrt(r2 - (y1-circle.center.y)*(y1-circle.center.y)) + circle.center.x;

    let root1 = new Point(x1, y1);
    let root2 = new Point(x2, y2);

    console.log("y1 = ", y1, " x1 = ", x1," y2 = ", y2, " x2 = ", x2);
    console.log("t1 = ", line.getParamenter(root1), " t2 = ", line.getParamenter(root2));

    return [root1, root2];
  }
}