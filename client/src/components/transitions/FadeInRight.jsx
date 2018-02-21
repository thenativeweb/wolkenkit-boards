import anime from 'animejs';
import defaults from './defaults';
import React from 'react';
import { Transition } from 'react-transition-group';

const handleEnter = function (node) {
  anime({
    targets: node,
    opacity: [ 0, 1 ],
    translateX: [ '-25%', 0 ],
    duration: defaults.duration,
    easing: defaults.easing
  });
};

const handleExit = function (node) {
  anime({
    targets: node,
    opacity: [ 1, 0 ],
    translateX: [ 0, '-25%' ],
    duration: defaults.duration,
    easing: defaults.easing
  });
};

const FadeInRight = props => (
  <Transition
    key={ props.key }
    in={ props.in }
    appear={ true }
    mountOnEnter={ true }
    unmountOnExit={ true }
    onEnter={ handleEnter }
    onExit={ handleExit }
    timeout={ defaults.duration }
  >
    { props.children }
  </Transition>
);

export default FadeInRight;
