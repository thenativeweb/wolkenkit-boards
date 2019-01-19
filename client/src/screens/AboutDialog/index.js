import aboutDialog from '../../state/aboutDialog';
import { observer } from 'mobx-react';
import React from 'react';
import { withStyles } from 'thenativeweb-ux/dist/styles';
import { Brand, Button, Headline, Modal, ThemeProvider } from 'thenativeweb-ux';

const styles = theme => ({
  AboutDialog: {
    width: 320
  },

  Description: {
    padding: [ theme.grid.stepSize, 0, theme.grid.stepSize * 3, 0 ]
  },

  Footer: {
    background: theme.color.brand.dark,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    'text-align': 'center',
    'padding-top': theme.grid.stepSize * 2.5,
    'font-weight': 300,

    '& > div': {
      'padding-bottom': theme.grid.stepSize * 2
    },

    '& a': {
      'text-decoration': 'none'
    }
  },

  Sponsors: {
    'margin-top': theme.grid.stepSize * 2,
    'padding-top': theme.grid.stepSize * 1.5,
    'border-top': '1px solid rgba(255, 255, 255, 0.1)'
  }
});

const AboutDialog = ({ classes }) => (
  <Modal
    isVisible={ aboutDialog.state.isVisible }
    onCancel={ () => aboutDialog.hide() }
    className={ classes.AboutDialog }
  >
    <Headline>About wolkenkit-boards</Headline>
    <div className={ classes.Description }>wolkenkit-boards is a tool for collaboratively organizing notes.</div>
    <ThemeProvider theme='wolkenkit'>
      <div className={ classes.Footer }>
        <Brand.PoweredBy product='wolkenkit' />
        <div className={ classes.Sponsors }>
          <Brand.MadeBy partner={{ name: 'Intuity', href: 'https://www.intuity.de' }} />
        </div>
      </div>
    </ThemeProvider>
    <Button autoFocus={ true } onClick={ () => aboutDialog.hide() }>Close</Button>
  </Modal>
);

export default withStyles(styles)(observer(AboutDialog));
