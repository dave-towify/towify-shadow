import {Component, OnInit} from '@angular/core';
import interact from 'interactjs';
import {Shadow} from '../shadow';
import {BoxShadowManager} from '../../../../soid-ui-util';

@Component({
  selector: 'app-shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.css']
})
export class ShadowComponent implements OnInit {
  shadows: Shadow[] = [
    {
      horizontalShadow: 0,
      verticalShadow: 0,
      blur: 10,
      spread: 10,
      color: '#468dcc'
    }, {
      horizontalShadow: 0,
      verticalShadow: 0,
      blur: 10,
      spread: 10,
      color: '#468dcc'
    }];

  shadowStyles: string[] = [];
  transformString: string;
  index = 0;
  angle = 0;
  distance = 0;
  dotX = 23;
  dotY = 13;
  rect: DOMRect = {
    bottom: 0, left: 0, right: 0, top: 0, toJSON(): any {
    },
    height: 32,
    width: 32,
    x: 0,
    y: 0
  };

  pointRect: DOMRect = {
    bottom: 0, left: 0, right: 0, top: 0, toJSON(): any {
    },
    height: 6,
    width: 6,
    x: 23,
    y: 13
  };

  boxShadowManager = new BoxShadowManager();

  constructor() {
    this.shadowStyles.push(`${this.shadows[0].horizontalShadow}px ${this.shadows[0].verticalShadow}px
     ${this.shadows[0].blur}px ${this.shadows[0].spread}px ${this.shadows[0].color}`);
    this.shadowStyles.push(`${this.shadows[1].horizontalShadow}px ${this.shadows[1].verticalShadow}px
     ${this.shadows[1].blur}px ${this.shadows[1].spread}px ${this.shadows[1].color}`);
    this.transformString = 'translate3D(23px,13px,0)';

    this.boxShadowManager.setSpinButtonRect(this.rect);
    this.boxShadowManager.setSpinPointRect(this.pointRect);
    this.boxShadowManager.spinButtonPosition = {x: 23, y: 13};
    this.boxShadowManager.offsetFix = 3;
    this.boxShadowManager.distance = 0;
  }

  ngOnInit(): void {
    interact('.dot').draggable({
      listeners: {
        move: event => {
          this.dotX += event.dx;
          this.dotY += event.dy;
          this.moveDot();
        }
      }
    });
  }

  selectDiv(index: number): void {
    this.index = index;
    this.calculateAngleAndDistance();
    this.transformDot();
    this.changeStyle();
  }

  calculateAndChangeStyle(): void {
    this.calculateHVShadow();
    this.transformDot();
    this.changeStyle();
  }

  calculateHVShadow(): void {
    const result = this.boxShadowManager.getHorizontalAndVerticalAndPositionByAngle(this.angle, this.distance);
    this.shadows[this.index].horizontalShadow = result.horizontal;
    this.shadows[this.index].verticalShadow = result.vertical;
    this.dotX = result.positionX;
    this.dotY = result.positionY;
  }

  calculateAngleAndDistance(): void {
    const result = this.boxShadowManager.getAngleAndPositionByHorizontalAndVertical(this.shadows[this.index].horizontalShadow,
      this.shadows[this.index].verticalShadow);
    this.distance = result.distance;
    this.angle = result.angle;
    this.dotX = result.positionX;
    this.dotY = result.positionY;
  }

  changeStyle(): void {
    this.shadowStyles[this.index] = `${this.shadows[this.index].horizontalShadow}px ${this.shadows[this.index].verticalShadow}px
     ${this.shadows[this.index].blur}px ${this.shadows[this.index].spread}px ${this.shadows[this.index].color}`;
  }

  moveDot(): void {
    console.log(this.dotX, this.dotY);
    this.boxShadowManager.spinButtonPosition = {x: this.dotX, y: this.dotY};
    this.boxShadowManager.distance = this.distance;
    this.boxShadowManager.getShadowAngle( result => {
      this.angle = result.angle;
      this.shadows[this.index].horizontalShadow = result.horizontalOffset;
      this.shadows[this.index].verticalShadow = result.verticalOffset;
      this.calculateAndChangeStyle();
      console.log('daoming', result);
    });
  }

  transformDot(): void {
    this.transformString = `translate3D(${this.dotX}px, ${this.dotY}px, 0)`;
  }
}
