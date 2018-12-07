import { SVG_NS, KEYS } from '../settings';
import {Board} from './Board';
import {Paddle} from './Paddle';
import {Ball} from './Ball';
import { Score } from './Score';


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

	this.gameElement = document.getElementById(this.element);
	this.board = new Board(this.width, this.height);
    //bal instantiator
    this.ball = new Ball(this.radius, this.width, this.height);

    this.paddleOne = new Paddle(this.height,this.paddleWidth,this.paddleHeight,this.boardGap,((this.height - this.paddleHeight) / 2), KEYS.a, KEYS.z
	);
	
	this.paddleTwo = new Paddle(
		this.height,
		this.paddleWidth,
		this.paddleHeight,
		(this.width - this.boardGap - this.paddleWidth),
		((this.height - this.paddleHeight) / 2), 
		KEYS.up, KEYS.down
	);

	this.score1 = new Score((this.width/4),30, this.scoreFontSize);
	this.score2 = new Score((3*(this.width/4)),30, this.scoreFontSize);
		document.addEventListener('keydown', event => {
				switch(event.key){
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
	this.gameElement.innerHTML = '';
	let svg = document.createElementNS(SVG_NS, 'svg');
	svg.setAttributeNS(null, 'width',this.width);
	svg.setAttributeNS(null, 'height', this.height);
	svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
	// svg.setAttributeNS(null, 'version', '1.1');
	this.gameElement.appendChild(svg);
	this.board.render(svg);
	this.paddleOne.render(svg, this.paddleTwo);
	this.paddleTwo.render(svg), this.paddleOne;
	this.ball.render(svg, this.paddleOne, this.paddleTwo);

	this.score1.render(svg, this.paddleOne.getScore());
	this.score2.render(svg, this.paddleTwo.getScore());

  }
}