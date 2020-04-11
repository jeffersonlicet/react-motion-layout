import React, { useContext, useMemo } from 'react';
import GlobalContext from '../utils/globalContext';
import useFirstLayoutEffect from '../hooks/useFirstEffect';

import MotionSceneTargets from './MotionScene.Targets';
import MotionSceneSources from './MotionScene.Sources';

export const SceneContext = React.createContext();

/**
 * Orchestrates the scene, deciding if the view should contain target or
 * source elements
 */
export function MotionScene(props) {
  const { store } = useContext(GlobalContext) || {};
  const { exitView } = store || {};

  useFirstLayoutEffect(() => {
    if (props.scrollUpOnEnter) {
      window.scrollTo(0, 0);
    }
  }, [props.scrollUpOnEnter]);

  const inTargetScene = useMemo(
    () => exitView === props.name,
    [exitView, props.name],
  );

  const contextValue = useMemo(() => ({
    sceneName: props.name,
    easing: props.easing,
  }), [props.easing, props.name]);

  return (
    <SceneContext.Provider value={contextValue}>
      { inTargetScene
        ? <MotionSceneTargets {...props} />
        : <MotionSceneSources {...props} />}
    </SceneContext.Provider>
  );
}

export default MotionScene;
