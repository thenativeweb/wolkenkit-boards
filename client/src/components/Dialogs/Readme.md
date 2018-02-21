```js
const services = require('../../services').default;

initialState = { chosenAction: false };

const handleClick = function () {
  services.dialogs.confirm({
    title: 'Do you really want to delete the item?',
    actions: {
      confirm: 'Delete item!',
      cancel: 'Cancel'
    }
  }).
    then(action => setState({ choseAction: action }));

};

<div>
  <Dialogs />
  <Button onClick={ handleClick  }>Show confirm dialog!</Button>
  { state.choseAction ? 'You chose ' +  state.choseAction : null }
</div>
```
