import backend from '../../state/backend';
import menu from '../../state/menu';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './Menu.css';
import { Brand, Icon } from 'wolkenkit-ux';
import { MenuItem, SidebarMenu } from '../../components';

const handleMenuItemClicked = function (id) {
  switch (id) {
    case 'log-out':
      backend.disconnect();
      break;
    default:
      break;
  }
};

const MainMenu = () => (
  <SidebarMenu
    isExpanded={ menu.state.isExpanded }
    onCollapse={ () => menu.collapse() }
    onExpand={ () => menu.expand() }
  >
    {
      menu.state.items.map(item => (
        <MenuItem key={ item.id } size='m' id={ item.id } onClick={ id => item.onSelect(id) }>
          { item.label }
        </MenuItem>
      ))
    }
    <MenuItem
      id='log-out'
      size='m'
      onClick={ handleMenuItemClicked }
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

export default observer(MainMenu);
