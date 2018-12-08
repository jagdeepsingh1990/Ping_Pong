import { SVG_NS, KEYS } from '../settings';
import { Board } from './Board';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Score } from './Score';
import { Winner } from './Winner';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.boardGap = 10;
    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.radius = 8;
    this.pause = false;
    this.scoreFontSize = 38;
    this.winnerFontSize = 26;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    //bal instantiator
    this.ball = new Ball(this.radius, this.width, this.height);
    this.ballThree = new Ball(this.radius, this.width, this.height);
    this.ballTwo = new Ball(this.radius, this.width, this.height);

    this.paddleOne = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z
    );

    this.paddleTwo = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down
    );

    this.score1 = new Score(this.width / 4, 30, this.scoreFontSize);
    this.score2 = new Score(3 * (this.width / 4), 30, this.scoreFontSize);
    this.winner = new Winner(
      120,
      this.height / 2 - 40,
      this.winnerFontSize,
      'Winner Player: 1'
    );
    this.winner2 = new Winner(
      120,
      this.height / 2 - 40,
      this.winnerFontSize,
      'Winner Player: 2'
    );
    this.Restart = new Winner(
      80,
      140,
      this.winnerFontSize,
      'Press SPACE  To Restart'
    );

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case KEYS.space:
          this.pause = !this.pause;
          break;
      }
    });
  }

  render() {
    if (this.pause) {
      return;
    }
    this.gameElement.innerHTML = ' ';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);

    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.paddleOne.render(svg, this.paddleTwo);
    this.paddleTwo.render(svg, this.paddleOne);
    this.ball.render(svg, this.paddleOne, this.paddleTwo);
    this.ballTwo.render(svg, this.paddleOne, this.paddleTwo);
    this.ballThree.render(svg, this.paddleOne, this.paddleTwo);

    if (this.paddleOne.score === 4 || this.paddleTwo.score === 4) {
      this.paddleOne.score = 0;
      this.paddleTwo.score = 0;
      this.pause = true;
      if (this.paddleOne.score === 4) {
        this.winner.render(svg);
        this.Restart.render(svg);
      } else {
        this.winner2.render(svg);
        this.Restart.render(svg);
      }
    }

    this.score1.render(svg, this.paddleOne.score);
    this.score2.render(svg, this.paddleTwo.score);
  }
}
