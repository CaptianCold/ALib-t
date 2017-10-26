import {Component, Input, OnInit} from '@angular/core';
import {Greeter} from './greeter.model';

/**
 * Test component to sanity check from consuming app.
 */
@Component({
  selector: 'demo-greeter2',
  styleUrls: ['greeter.component.scss'],
  templateUrl: 'greeter.component.html'
})
export class GreeterComponent implements OnInit {

  @Input() name: string = 'Guest';

  greeter : Greeter;

  ngOnInit() : void {
    this.greeter = { name : `Divya` , message : `Good morning from Divya` };
  }

}
