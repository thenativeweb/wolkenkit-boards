import { observer } from 'mobx-react';
import React from 'react';
import services from '../services';
import state from '../state';
import { withRouter } from 'react-router-dom';
import { Brand, Icon } from 'wolkenkit-ux';
import { collapse, expand } from '../actions/menu';
import { MenuItem, SidebarMenu } from '../components';

class BoardMenu extends React.Component {
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
            <MenuItem key={ item.id } id={ item.id } onClick={ this.handleMenuItemClicked }>
              { item.label }
            </MenuItem>
          ))
        }
        <MenuItem
          id='log-out'
          onClick={ this.handleMenuItemClicked }
        >
          Log out
        </MenuItem>

        <div className='ui-sidebar-menu__footer'>
          <div>Powered by</div>
          <div><a href='https://www.wolkenkit.io'><Brand size='s' /></a></div>
          <div style={{ marginTop: 10, paddingTop: 15, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>Made with <Icon name='heart' color='highlight' size='xs' type='inline' /> by <a className='sponsor' href='https://www.thenativeweb.io'>the native web</a> and <a className='sponsor' href='https://www.intuity.de'>Intuity</a>.</div>
        </div>
      </SidebarMenu>
    );
  }
}

export default withRouter(observer(BoardMenu));
