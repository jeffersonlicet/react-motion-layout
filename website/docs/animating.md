---
id: animating
title: Animating Components
---

Let's build together an example of how to use Motion Layout.
We are going to build a simple feed and a story view using react router.

### 1 Use the Motion Layout Provider
Motion Layout Provider is responsible for providing the state management.
```jsx {6,15}
// app.js
...
import { MotionLayoutProvider } from 'react-motion-layout';

ReactDOM.render(
  <MotionLayoutProvider>
    <Switch>
      <Route path="/story/:storyId">
        <Story />
      </Route>
      <Route path="/">
        <Feed />
      </Route>
    </Switch>
  </MotionLayoutProvider>,
  document.getElementById("root")
);
```

### 2 Create some placeholder stories
```jsx
// stories.js
export const items = [
  {
    id: 1,
    text: 'Hello world',
    image: 'https://images.unsplash.com/photo-1506824959579-0a01750f66de?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=100',
  },
  {
    id: 2,
    text: 'Hello world',
    image: 'https://images.unsplash.com/photo-1506824959579-0a01750f66de?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=100',
  },
];
```

### 3 Create the Feed View
Since this is an individual screen, we wrap it using MotionScreen to clean registered elements when
abandoning this screen.
```jsx
// feed.jsx
...
import { MotionScreen } from 'react-motion-layout';
import { items } from './stories';
import Item from './Item';

export default function Feed() {
  return (
    <MotionScreen>
      {items.map((data, i) => <Item data={data} key={i} />)}
    </MotionScreen>
  );
}
```

### 4 Create the Item View
Each item will be wrapped with a **MotionScene**.
A **MotionScene** is a component that contains **SharedElements**.

**SharedElements** are the components that we will animate. They must have an unique key called *animationKey*, we use that key to find a matching SharedElement when changing the views.
___
**MotionScene** accepts an onClick property, in this case we are using the **withTransition** hook, that will trigger the animation
and then will change the route using the history hook provided by react-router-dom.

> You can also use the withTransition hook to animate route changes and state changes, for example, if you render two different components based on some condition.

```jsx {8,12-17}
// item.jsx
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SharedElement, MotionScene, useMotion } from 'react-motion-layout';

export default function Item({ data }) {
  const history = useHistory();
  const withTransition = useMotion(`story-${data.id}`);
  const callback = useCallback(() => history.push(`/story/${id}`));

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

### 5 Create the Story View
The Story View is wrapped by a MotionScene as well, when navigating, those scenes will match and the declared SharedComponents will perform the animation.

```jsx {0}
// story.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { SharedElement, MotionScene, MotionScreen } from 'react-motion-layout';

import { items } from './stories';

export default function Story() {
  const { storyId } = useParams();
  const { image, text } = items[storyId];

  return (
    <MotionScreen>
      <MotionScene name={`story-${storyId}`} scrollUpOnEnter>
        <SharedElement.Text animationKey="text-main">
          {text}
        </SharedElement.Text>
        <SharedElement.Image animationKey="big-image" src={image} />
      </MotionScene>
    </MotionScreen>
  );
}
```

## And that's it
Now when you click on any item of the feed it should animate using the shared components we'd just defined.

> Motion Layout will automatically detect the target and source properties to create a smooth animation.

## See more examples:

[Chat Example](https://codesandbox.io/s/chat-example-dyyy1)

[Gallery Example](https://codesandbox.io/s/instagram-example-b6gkm)