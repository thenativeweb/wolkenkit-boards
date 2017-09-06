import { observer } from 'mobx-react';
import React from 'react';
import services from '../services';
import state from '../state';
import styles from './MainMenu.css';
import { withRouter } from 'react-router-dom';
import { Brand, Icon } from 'wolkenkit-ux';
import { collapse, expand } from '../actions/menu';
import { MenuItem, SidebarMenu } from '../components';

class MainMenu extends React.Component {
  constructor (props) {
    super(props);

    this.handleMenuItemClicked = this.handleMenuItemClicked.bind(this);
  }

  handleMenuItemClicked (id) {
    const { boardsApi } = services;
    const { history } = this.props;

    switch (id) {
      case 'log-out':
        boardsApi.auth.logout();
        history.push('/');
        window.location.reload();
        break;
      default:
        services.eventbus.emit('main-menu::clicked', id);
        break;
    }
  }

  render () {
    const { location } = this.props;

    return (
      <SidebarMenu
        isExpanded={ state.isMenuExpanded }
        onCollapse={ collapse }
        onExpand={ expand }
      >
        {
          services.navigation.getMenuItemsForLocation(location).map(item => (
            <MenuItem key={ item.id } size='m' id={ item.id } onClick={ this.handleMenuItemClicked }>
              { item.label }
            </MenuItem>
          ))
        }
        <MenuItem
          id='log-out'
          size='m'
          onClick={ this.handleMenuItemClicked }
        >
          Log out
        </MenuItem>

        <div className={ styles.Footer }>
          <div>Powered by</div>
          <div><a href='https://www.wolkenkit.io'><Brand size='s' /></a></div>
          <div className={ styles.Sponsors }>
            Made with <Icon name='heart' color='highlight' size='xs' type='inline' /> by <a className={ styles.Sponsor } href='https://www.thenativeweb.io'>the native web</a> and <a className={ styles.Sponsor } href='https://www.intuity.de'>Intuity</a>.
          </div>
        </div>
      </SidebarMenu>
    );
  }
}

export default withRouter(observer(MainMenu));
