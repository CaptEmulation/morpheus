import {
  isNumber,
} from 'lodash';
import * as selectors from './selectors';

function createMessage(utils, { name, state, expected, actual, pass }) {
  return pass
   ? () => `${this.utils.matcherHint(`.not.${name}`)}

Expected
  ${utils.printExpected(expected)}
Reveived
  ${utils.printReceived(actual)}
With state
  ${utils.printReceived(state)}`
   : () => `${utils.matcherHint(`.${name}`)}

Expected
  ${utils.printExpected(expected)}
Reveived
  ${utils.printReceived(actual)}
With state
  ${utils.printReceived(state)}`;
}

expect.extend({
  toBeNextSceneStartAngle(state, nextStartAngle) {
    const actual = selectors.nextSceneStartAngle({ scene: state });
    const pass = actual === nextStartAngle;
    const message = createMessage(this.utils, {
      expected: nextStartAngle,
      name: 'toBeNextSceneStartAngle',
      actual,
      pass,
      state,
    });
    return { actual: state, message, pass };
  },
  toHaveLoadingScenes(state, stuff) {
    const actual = selectors.loadingScenes({ scene: state });
    let pass;
    if (isNumber(stuff)) {
      pass = actual.count() === stuff;
    } else {
      pass = this.equals(actual, stuff);
    }

    const message = createMessage(this.utils, {
      name: 'toHaveLoadingScenes',
      expected: stuff,
      actual,
      pass,
      state,
    });
    return { actual: state, message, pass };
  },
  toHaveLoadedScenes(state, stuff) {
    const actual = selectors.loadedScenes({ scene: state });
    let pass;
    if (isNumber(stuff)) {
      pass = actual.count() === stuff;
    } else {
      pass = this.equals(actual, stuff);
    }

    const message = createMessage(this.utils, {
      name: 'toHaveLoadedScenes',
      expected: stuff,
      actual,
      pass,
      state,
    });
    return { actual: state, message, pass };
  },
  toHaveCurrentScene(state, stuff) {
    const actual = selectors.currentSceneData({ scene: state });
    let pass;
    if (isNumber(stuff)) {
      pass = actual && actual.sceneId === stuff;
    } else {
      pass = this.equals(actual, stuff);
    }

    const message = createMessage(this.utils, {
      name: 'toHaveCurrentScene',
      expected: stuff,
      actual,
      pass,
      state,
    });
    return { actual: state, message, pass };
  },
  toHaveBackgroundScene(state, stuff) {
    const actual = selectors.backgroundSceneData({ scene: state });
    let pass;
    if (isNumber(stuff)) {
      pass = actual && actual.sceneId === stuff;
    } else {
      pass = this.equals(actual, stuff);
    }

    const message = createMessage(this.utils, {
      name: 'toHaveBackgroundScene',
      expected: stuff,
      actual,
      pass,
      state,
    });
    return { actual: state, message, pass };
  },
  toHavePreviousScene(state, stuff) {
    const actual = selectors.previousSceneData({ scene: state });
    let pass;
    if (isNumber(stuff)) {
      pass = actual && actual.sceneId === stuff;
    } else {
      pass = this.equals(actual, stuff);
    }

    const message = createMessage(this.utils, {
      name: 'toHavePreviousScene',
      expected: stuff,
      actual,
      pass,
      state,
    });
    return { actual: state, message, pass };
  },
  toHaveDissolve(state, bool) {
    const actual = selectors.dissolve({ scene: state });
    const pass = this.equals(actual, bool);

    const message = createMessage(this.utils, {
      name: 'toHaveDissolve',
      expected: bool,
      actual,
      pass,
      state,
    });
    return { actual: state, message, pass };
  },
  toBeLive(state) {
    const actual = selectors.isLive({ scene: state });
    const pass = this.equals(actual, true);

    const message = createMessage(this.utils, {
      name: 'toBeLive',
      expected: true,
      actual,
      pass,
      state,
    });
    return { actual: state, message, pass };
  },
});
