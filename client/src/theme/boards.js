import merge from 'lodash/merge';
import { themes } from 'thenativeweb-ux';

const theme = merge({}, themes.wolkenkit, {
  color: {
    panelBackground: 'rgba(255, 255, 255, 0.95)'
  }
});

export default theme;
