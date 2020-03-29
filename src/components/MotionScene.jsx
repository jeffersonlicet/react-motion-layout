import React, { useContext, useState, useMemo } from 'react';
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
  const [animated, setAnimated] = useState(false);
  const { store } = useContext(GlobalContext) || {};
  const { exitView } = store || {};

  useFirstLayoutEffect(() => {
    if (props.scrollUpOnEnter) {
      window.scrollTo(0, 0);
    }
  }, [props.scrollUpOnEnter]);

  const inTargetScene = useMemo(
    () => exitView === props.name && !animated,
    [animated, exitView, props.name],
  );

  return (
    <SceneContext.Provider value={{ sceneName: props.name }}>
      { inTargetScene
        ? <MotionSceneTargets setAnimated={setAnimated} {...props} />
        : <MotionSceneSources {...props} />}
    </SceneContext.Provider>
  );
}

export default MotionScene;
