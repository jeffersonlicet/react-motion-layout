---
id: useMotion
title: useMotion
---

Returns a function that accepts a callback to exec after animation is started.

``` jsx
useMotion(sceneName: string)
```

### Example
```jsx {8,12-17}
// item.jsx
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SharedElement, MotionScene, useMotion } from 'react-motion-layout';

export default function Item({ data }) {
  const history = useHistory();
  const withTransition = useMotion(`story-${data.id}`);
  const callback = useCallback(() => history.push(`/story/${data.id}`));

  return (
    <MotionScene name={`story-${id}`} onClick={withTransition(callback)}>
      <SharedElement.Image animationKey="big-image" src={data.image} />
      <SharedElement.Text animationKey="text-main">
        {data.text}
      </SharedElement.Text>
    </MotionScene>
  );
}
```