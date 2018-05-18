import backend from '../../state/backend';
import menu from '../../state/menu';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './Menu.css';
import { Brand, ThemeProvider } from 'thenativeweb-ux';
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

    <ThemeProvider theme='wolkenkit'>
      <div className={ styles.Footer }>
        <Brand.PoweredBy product='wolkenkit' />
        <div className={ styles.Sponsors }>
          <Brand.MadeBy partner={{ name: 'Intuity', href: 'https://www.intuity.de' }} />
        </div>
      </div>
    </ThemeProvider>
  </SidebarMenu>
);

export default observer(MainMenu);
