import createReducer from 'utils/createReducer';
import {
  merge,
} from 'lodash';
import {
  SCENE_SET_BACKGROUND_SCENE,
  SCENE_SET_CURRENT_SCENE,
  SCENE_DO_ENTERING,
  SCENE_DO_EXITING,
  SCENE_DO_ACTION,
  SCENE_DO_ENTER,
  SET_NEXT_START_ANGLE,
} from './actionTypes';

const reducer = createReducer('scene', {
  backgroundScene: null,
  currentScene: null,
  previousScene: null,
  status: 'null',
  nextStartAngle: 0,
}, {
  [SET_NEXT_START_ANGLE](state, { payload: nextStartAngle }) {
    return {
      ...state,
      nextStartAngle,
    };
  },
  [SCENE_SET_BACKGROUND_SCENE](state, { payload: scene }) {
    return {
      ...state,
      backgroundScene: scene,
    };
  },
  [SCENE_SET_CURRENT_SCENE](state, { payload: scene }) {
    return {
      ...state,
      previousScene: state.currentScene,
      currentScene: scene,
    };
  },
  [SCENE_DO_ENTERING](state) {
    return {
      ...state,
      status: 'entering',
    };
  },
  [SCENE_DO_EXITING](state) {
    return {
      ...state,
      status: 'exiting',
    };
  },
  [SCENE_DO_ENTER](state) {
    return {
      ...state,
      status: 'live',
    };
  },
  [SCENE_DO_ACTION](state) {
    return {
      ...state,
      status: 'action',
    };
  },
});

export default reducer;