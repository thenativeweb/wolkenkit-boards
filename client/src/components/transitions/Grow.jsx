import anime from 'animejs';
import defaults from './defaults';
import React from 'react';
import { Transition } from 'react-transition-group';

const handleEnter = function (node) {
  anime({
    targets: node,
    opacity: [ 0, 1 ],
    scaleY: [ 0.5, 1 ],
    duration: defaults.duration,
    easing: defaults.easing
  });
};

const handleExit = function (node) {
  anime({
    targets: node,
    opacity: [ 1, 0 ],
    scaleY: [ 1, 0 ],
    duration: defaults.duration,
    easing: defaults.easing
  });
};

const Grow = props => (
  <Transition
    key={ props.key }
    in={ props.in }
    appear={ false }
    mountOnEnter={ true }
    unmountOnExit={ true }
    onEnter={ handleEnter }
    onExit={ handleExit }
    timeout={ defaults.duration }
  >
    { props.children }
  </Transition>
);

export default Grow;
