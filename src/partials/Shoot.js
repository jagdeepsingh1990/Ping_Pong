import { SVG_NS } from '../settings';

export class Shoot {
  constructor(radius, s, w, paddle1, paddle2) {
    this.radius = radius;

    this.direction = 1;
    this.paddle1 = paddle1;
    this.paddle2 = paddle2;
    this.s = s;
    this.w = w;
    this.x = -20;
    this.y = 0;
    this.fired = true;
    document.addEventListener('keydown', event => {
      
      switch (event.key) {
        case this.s:
          this.radius = radius;
          this.reset(paddle1, this.direction);
          break;
        case this.w:
          this.radius = radius;
          this.reset(paddle2, -this.direction);
          break;
      }
    });
  }

  paddleCollision(paddle1, paddle2) {
    if (this.vx > 0) {
      let hitBool = false;
      const [left, right, top, bottom] = paddle2.coordinates();
      if (this.x + this.radius > left && this.y <= bottom && this.y >= top) {
        hitBool = true;
      }
      if (hitBool) {
        if (paddle2.height > 10) {
          hitBool = false;
          this.vx = 0;
          this.radius = 0;
          paddle2.height -= 5;
          this.fired = true;
        }
      }
    } else {
      let hitBool1 = false;
      const [left, right, top, bottom] = paddle1.coordinates();
      if (this.x - this.radius <= right && this.y <= bottom && this.y >= top) {
        hitBool1 = true;
      }

      if (hitBool1) {
        if (paddle1.height > 10) {
          hitBool1 = false;
          this.vx = 0;
          this.radius = 0;
          paddle1.height -= 5;
          this.fired = true;
        }
      }
    }
  }

  reset(paddle, direction) {
    if (this.fired === true){
      this.fired = false;
    this.x = paddle.x + paddle.width;
    this.y = paddle.y + paddle.height / 2;
    this.vy = 0;
    this.vx = direction * (6 - Math.abs(this.vy));
  }
}

  render(svg, paddle1, paddle2) {
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', 'red');
    if (this.vx) {
      this.x += this.vx;
    }

    this.paddleCollision(paddle1, paddle2);
    svg.appendChild(circle);
  }
}
