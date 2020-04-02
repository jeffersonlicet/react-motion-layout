---
id: MotionScene
title: MotionScene
---

Orchestrates the animation, renders the components into the portal, changes the opacity of the container and tracks the scroll to update the relative position of each rect. You can provide a easing prop to define how
you want the animation to be
``` jsx
<MotionScene />
```

### Props

| Name          |      type     |   required |
| ------------- | :-----------: | -----:   |
| children      |   Node        | true |
| scrollUpOnEnter     |   boolean    |   false |
| name     |   string    |   true  |
| easing     |   string    |   false  |