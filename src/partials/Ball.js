import { SVG_NS } from '../settings';

export class Ball {
  constructor(radius, width, height, space) {
    this.radius = radius;
    this.boardheight = height;
    this.boardwidth = width;
    this.space = space;
    this.direction = 1;

    this.pong = new Audio('../../public/sounds/pong-01.wav');
    this.ping = new Audio('../../public/sounds/pong-02.wav');
    this.goal = new Audio('../../public/sounds/pong-04.wav');

    this.reset();
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case this.space:
          this.reset();
          break;
      }
    });
  }
  wallCollision(paddle1, paddle2) {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardwidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardheight;

    if (hitTop || hitBottom) {
      this.vy *= -1;
    } else if (hitLeft || hitRight) {
      this.vx *= -1;

      this.goal.play();
      if (hitLeft) {
        this.hitGoal(paddle2);
      } else {
        this.hitGoal(paddle1);
      }
    }
  }
  hitGoal(paddle) {
    paddle.score++;
    this.reset();
  }
  paddleCollision(paddle1, paddle2) {
    if (this.vx > 0) {
      const [left, right, top, bottom] = paddle2.coordinates();
      const hit =
        this.x + this.radius > left && this.y <= bottom && this.y >= top;
      if (hit) {
        this.vx *= -1 * 1;
        this.ping.play();
      }
    } else {
      const [left, right, top, bottom] = paddle1.coordinates();
      const hit =
        this.x - this.radius <= right && this.y <= bottom && this.y >= top;

      if (hit) {
        this.vx *= -1 * 1;
        this.pong.play();
      }
    }
  }

  reset() {
    this.x = this.boardwidth / 2;
    this.y = this.boardheight / 2;
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  render(svg, paddle1, paddle2,color ) {
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', color);
    this.wallCollision(paddle1, paddle2);
    this.x += this.vx;
    this.y += this.vy;
    this.paddleCollision(paddle1, paddle2);
    svg.appendChild(circle);
  }
}
