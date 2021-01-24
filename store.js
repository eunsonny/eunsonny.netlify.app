const { observable } = require('mobx');

const dayNightStore = observable({
  btnIsActive: false,
  btnAct () {
    this.btnIsActive = !this.btnIsActive;
  }
});

export { dayNightStore };