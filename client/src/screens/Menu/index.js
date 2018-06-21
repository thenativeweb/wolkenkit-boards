import menu from '../../state/menu';
import { observer } from 'mobx-react';
import React from 'react';
import { MenuItem, SidebarMenu } from '../../components';

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
  </SidebarMenu>
);

export default observer(MainMenu);
