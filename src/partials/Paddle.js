import {SVG_NS , KEYS} from '../settings';


export class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.up = up;
    this.down = down;
    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
      if (event.key === KEYS.x) {
        if (this.height >= 30) {
          this.height = this.height * 0.91;
        }
      }
        if (event.key === KEYS.l) {
          if (this.height <= 70)
          this.height = this.height * 1.1;
        
      
    }
        switch(event.key){
            case this.up:
            this.y = Math.max(10, this.y - this.speed);
            break;
            case this.down:
            this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
            break;
        }

      

    })
  }
   
  coordinates(){
    const leftX = this.x;
    const rightX = this.x + this.width;
    const topY = this.y;
    const bottomY = this.y + this.height;
    return [leftX, rightX, topY, bottomY];
  }
  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null,'height', this.height);
    rect.setAttributeNS(null,'fill', 'white');
    rect.setAttributeNS(null,'x', this.x);
    rect.setAttributeNS(null,'y',this.y);
    svg.appendChild(rect);

  }
}
