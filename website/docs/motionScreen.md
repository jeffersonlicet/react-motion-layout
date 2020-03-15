---
id: MotionScreen
title: MotionScreen
---

Associates the components inside it to a screen. It's useful when you want to navigate using Links of react-router-dom,
since a simple view can contain multiple MotionScenes, MotionScreen helps track which of them the system has to animate.

``` jsx
<MotionScreen />
```

### Props

| Name          |      type     |   required |
| ------------- | :-----------: | -----:   |
| children      |   Node        | true |
| name     |   string    |   true |
