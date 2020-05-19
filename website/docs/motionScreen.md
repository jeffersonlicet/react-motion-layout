---
id: MotionScreen
title: MotionScreen
---

Associates the components inside it to a screen. It's useful when you want to navigate using Links of react-router-dom,
since a simple view can contain multiple MotionScenes, MotionScreen helps track which of them the system has to animate.
I'ts required to indicate at least one screen.
---
You can perform one-way animations using onEnter and onExit boolean props.

``` jsx
<MotionScreen />
```

### Props

| Name          |      type     |   required |
| ------------- | :-----------: | -----:   |
| children      |   Node        | true |
| name     |   string    |   false |
| onEnter     |   boolean (defaults true)    |   false |
| onExit     |   boolean (defaults true)    |   false |
