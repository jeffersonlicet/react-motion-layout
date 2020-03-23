export default class createStore {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.listener = () => {};
  }

  dispatch = (action) => {
    this.state = this.reducer(this.state, action);
    this.listener();
    return action;
  }

  subscribe = (listener) => {
    this.listener = listener;
  }
}
