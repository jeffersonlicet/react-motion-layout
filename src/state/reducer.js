import update from 'immutability-helper';
import actions from './actions';

export const initialState = {
  exitView: null,
  scenes: {},
  screen: null,
  exitScroll: null,
};

const initialView = {
  targets: {},
  sources: {},
  screenName: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.view.updateSourceRect:
      return update(state, {
        scenes: {
          [action.sceneName]: {
            sources: {
              [action.animationKey]: {
                rect: { $set: action.rect },
              },
            },
          },
        },
      });
    case actions.view.setExitView:
      return update(state, {
        exitView: { $set: action.sceneName },
      });
    case actions.view.setScreen:
      return update(state, {
        screen: { $set: action.screen },
      });
    case actions.view.setExitScroll:
      return update(state, {
        exitScroll: { $set: action.exitScroll },
      });

    case actions.view.register:
      return update(state, {
        scenes: { [action.sceneName]: { $set: { ...initialView, screenName: action.screenName } } },
      });
    case actions.view.updateViewScreen:
      return update(state, {
        scenes: {
          [action.sceneName]: {
            screenName: { $set: action.screenName },
          },
        },
      });

    case actions.view.remove:
      return update(state, {
        scenes: { $unset: [action.sceneName] },
      });

    case actions.view.registerSource: {
      if (state.scenes[action.sceneName]) {
        return update(state, {
          scenes: {
            [action.sceneName]: {
              sources: {
                [action.animationKey]: { $set: action.component },
              },
            },
          },
        });
      }

      return update(state, {
        scenes: {
          [action.sceneName]: {
            $set: {
              ...initialView,
              screenName: action.screenName,
              sources: {
                [action.animationKey]: action.component,
              },
            },
          },
        },
      });
    }
    case actions.view.registerTarget: {
      if (!state.scenes[action.sceneName]) {
        console.warn('Registering targets on not registered scene');
        return update(state, {
          scenes: {
            [action.sceneName]: {
              $set: {
                ...initialView,
                screenName: action.screenName,
                sources: {
                  [action.animationKey]: action.component,
                },
              },
            },
          },
        });
      }
      return update(state, {
        scenes: {
          [action.sceneName]: {
            targets: {
              [action.animationKey]: { $set: action.component },
            },
          },
        },
      });
    }
    case actions.view.deleteTarget:
      return update(state, {
        scenes: {
          [action.sceneName]: {
            targets: { $unset: [action.animationKey] },
          },
        },
      });
    case actions.view.deleteSource:
      return update(state, {
        scenes: {
          [action.sceneName]: {
            sources: { $unset: [action.animationKey] },
          },
        },
      });
    default:
      throw new Error();
  }
};
