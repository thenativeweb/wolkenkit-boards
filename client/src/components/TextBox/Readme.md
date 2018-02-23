
```js
initialState = { value: 'foo' };
<TextBox
  name='host'
  value={ state.value }
  placeholder='local.wolkenkit.io'
  onChange={event => setState({ value: event.target.value })}
/>
```

```js
initialState = { port: '3000' };
<TextBox
  name='host'
  value={ state.value }
  type='port'
  placeholder='3000'
  onChange={event => setState({ port: event.target.value })}
/>
```

```js
initialState = { value: 'This TextBox is disabled' };
<TextBox
  value={ state.value }
  disabled={ true }
  onChange={event => setState({ port: event.target.value })}
/>
```
