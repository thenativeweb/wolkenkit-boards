const NavigationService = function () {
  //
};

NavigationService.prototype.getMenuItemsForLocation = function (location) {
  const items = [];
  const pathItems = location.pathname.split('/').filter(item => item !== '');

  switch (pathItems[0]) {
    case 'board': {
      items.push({ label: 'Clean up board', id: 'board-clean-up' });
      break;
    }
    default:
      break;
  }

  return items;
};

export default new NavigationService();
