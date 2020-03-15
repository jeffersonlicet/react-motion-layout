---
id: useMotion
title: useMotion
---

Returns a function that accepts a callback to exec after animation is started.

``` jsx
useMotion(viewName: string)
```

### Example
``` jsx
const [toggled, setToggled] = useState(false);
const withTransition = useMotion('jeff-profile');

const callback = () => setToggled(!toggled);

<div onClick={withTransition(updateView(callback))}> Toggle with animation </div>
```