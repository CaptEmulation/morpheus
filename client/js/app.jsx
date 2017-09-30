/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import qs from 'query-string';
import keycode from 'keycode';

// Loads all modules
import 'morpheus';

// Then pull out the stuff we need
import { actions as sceneActions } from 'morpheus/scene';
import { actions as gamestateActions } from 'morpheus/gamestate';
import { Game, actions as gameActions } from 'morpheus/game';
import {
  actions as inputActions,
} from 'morpheus/input';
import store from 'store';

const qp = qs.parse(location.search);

function resizeToWindow() {
  store.dispatch(gameActions.resize({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
}

window.onload = () => {
  store.dispatch(gameActions.resize({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
  store.dispatch(gameActions.createUIOverlay());
  store.dispatch(gameActions.setCursor(0));
  store.dispatch(gamestateActions.fetchInitial())
    .then(() => store.dispatch(sceneActions.startAtScene(qp.scene || 100000)));
  render(
    <Provider store={store}>
      <Game />
    </Provider>,
    document.getElementById('root'),
  );
  window.addEventListener('resize', () => {
    resizeToWindow();
  });

  document.addEventListener('keydown', (event) => {
    store.dispatch(inputActions.keyDown(keycode.names[event.which]));
  });

  document.addEventListener('keyup', (event) => {
    store.dispatch(inputActions.keyUp(keycode.names[event.which]));
  });
};
