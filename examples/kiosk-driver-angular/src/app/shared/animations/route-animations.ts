import { transition, trigger, AnimationMetadata, query, style, animate, animateChild } from '@angular/animations';
import { environment } from '../../../environments/environment';

/**
 * We can define any number of steps we want in different arrays, here we have "ALL" the steps and "NONE" of the steps.
 */
const ANIMATION_STEPS_NONE: AnimationMetadata[] = [];
const ANIMATION_STEPS_ALL: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  query(
    ':enter',
    [style({ opacity: 0 })],
    { optional: true }
  ),
  query(
    ':leave',
    [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))],
    { optional: true }
  ),
  query(
    ':enter',
    [
      style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 })),
      query('@*', animateChild(), { optional: true })
    ],
    { optional: true }
  )];

  /**
   * When the animation is created for the component we can check what the environment is and then make a decision on what sort of
   * animation, if any, that we want.
   */
export const routeAnimations = trigger('pageTransition', [
  transition('* => *', environment.ANIMATIONS ? ANIMATION_STEPS_ALL : ANIMATION_STEPS_NONE),
]);
