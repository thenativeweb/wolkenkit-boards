import merge from 'lodash/merge';
import wolkenkit from 'thenativeweb-ux/dist/themes/wolkenkit';

const theme = merge({}, wolkenkit, {
  color: {
    panelBackground: 'rgba(255, 255, 255, 0.95)'
  }
});

export default theme;
