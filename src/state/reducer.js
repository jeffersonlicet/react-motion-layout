import update from 'immutability-helper';
import actions from './actions';

export const initialState = {
  exitView: null,
  views: {},
  screen: null,
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
        views: {
          [action.viewName]: {
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
        exitView: { $set: action.viewName },
      });
    case actions.view.setScreen:
      return update(state, {
        screen: { $set: action.screen },
      });

    case actions.view.register:
      return update(state, {
        views: { [action.viewName]: { $set: { ...initialView, screenName: action.screenName } } },
      });
    case actions.view.updateViewScreen:
      return update(state, {
        views: {
          [action.viewName]: {
            screenName: { $set: action.screenName },
          },
        },
      });

    case actions.view.remove:
      return update(state, {
        views: { $unset: [action.viewName] },
      });

    case actions.view.registerSource:
      return update(state, {
        views: {
          [action.viewName]: {
            sources: {
              [action.animationKey]: { $set: action.component },
            },
          },
        },
      });
    case actions.view.registerTarget:
      return update(state, {
        views: {
          [action.viewName]: {
            targets: {
              [action.animationKey]: { $set: action.component },
            },
          },
        },
      });
    case actions.view.deleteTarget:
      return update(state, {
        views: {
          [action.viewName]: {
            targets: { $unset: [action.animationKey] },
          },
        },
      });
    case actions.view.deleteSource:
      return update(state, {
        views: {
          [action.viewName]: {
            sources: { $unset: [action.animationKey] },
          },
        },
      });
    default:
      throw new Error();
  }
};
