import React, { useContext, useState } from 'react';

import GlobalContext from '../utils/globalContext';
import useFirstLayoutEffect from '../hooks/useFirstEffect';

import MotionSceneTargets from './MotionScene.Targets';
import MotionSceneSources from './MotionScene.Sources';

export const SceneContext = React.createContext();

export function MotionScene(props) {
  const [animated, setAnimated] = useState(false);
  const { store } = useContext(GlobalContext) || {};
  const { exitView } = store || {};

  useFirstLayoutEffect(() => {
    if (props.scrollUpOnEnter) {
      window.scrollTo(0, 0);
    }
  }, [props.scrollUpOnEnter]);

  return (
    <SceneContext.Provider value={{ sceneName: props.name }}>
      {exitView === props.name && !animated
        ? <MotionSceneTargets setAnimated={setAnimated} {...props} />
        : <MotionSceneSources {...props} />}
    </SceneContext.Provider>
  );
}

export default MotionScene;
