import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ transform: 'translateX(-100%)' })
        ],
          { optional: true }
        ),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-in-out', style({ transform: 'translateX(100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms ease-in-out', style({ transform: 'translateX(0)' }))
          ], { optional: true })
        ]),
        query(':enter',
          animateChild(),
          { optional: true }
        ),
      ])
    ])
  ]
})
export class ContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
