import Controller from '@ember/controller';
import EmberObject, { get, set, computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { later, next } from '@ember/runloop';
import d3 from 'npm:d3';

export default Controller.extend({
  activeComponent: null,

  activeConfiguration: 'single',

  configs: null,

  roots: ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'],

  globalRoot: 'C',

  components: [
    { key: 'single', component: 'single-note', active: true },
    { key: 'multi', component: 'multi-note', active: false },
    { key: 'bend', component: 'bend-to-note', active: false }],

  availableComponents: computed('components', {
    get() {
      const components = get(this, 'components');
      return components.map(c => ({
        name: c.component,
        config: `configs/${c.component}`,
        key: c.key,
        active: c.active
      }));
    }
  }).readOnly(),

  activeComponents: filterBy('availableComponents', 'active', true),

  clearActive() {
    this.duration = null;
    this.startTime = null;
    set(this, 'remainingTime', null);
    set(this, 'activeComponent', null);
  },

  register(duration) {
    next(this, () => {
      const components = get(this, 'activeComponents');
      const active = components[Math.floor(Math.random() * components.length)];
      set(this, 'activeComponent', active);
    });
  },

  activeComponentName: computed('activeComponent', {
    get() {
      const activeComponent = get(this, 'activeComponent');
      if (!activeComponent)  return null;
      return `drills/${get(activeComponent, 'name')}`;
    }
  }).readOnly(),

  activeComponentConfig: computed('activeComponent', {
    get() {
      const activeComponent = get(this, 'activeComponent');
      if (!activeComponent)  return null;
      return get(activeComponent, 'config');
    }
  }).readOnly(),

  activeComponentKey: computed('activeComponent', {
    get() {
      const activeComponent = get(this, 'activeComponent');
      if (!activeComponent)  return null;
      return get(activeComponent, 'key');
    }
  }).readOnly(),

  remainingTimeSeconds: computed('remainingTime', {
    get() {
      const remainingTime = get(this, 'remainingTime');
      if (remainingTime) {
        return (remainingTime / 1000.0).toFixed(2);
      } else {
        null;
      }
    }
  }).readOnly(),

  init() {
    set(this, 'configs', EmberObject.create());
    next(this, () => {
      this.register();
    });
  },

  drawRect(width) {
    this.context.clearRect(0, 0, 500, 25);
    this.context.fillStyle = '#8888ee';
    this.context.beginPath();
    this.context.rect(0, 0, width, 25);
    this.context.fill();

    this.context.fillStyle = '#8888ee50';
    this.context.beginPath();
    this.context.rect(0, 0, 500, 25);
    this.context.fill();
  },

  updateTick() {
    const endTime = (new Date()).getTime();
    const delta = endTime - this.startTime;

    if (delta >= this.duration) {
      this.drawRect(0);
      this.clearActive();
      this.register();
    } else {
      const remaining = (this.duration - delta);
      set(this, 'remainingTime', remaining);
      this.drawRect((1.0 * (remaining/this.duration))*500);
      later(this, this.updateTick, 10);
    }
  },

  actions: {
    startComponent(duration) {
      this.startTime = (new Date()).getTime();
      this.duration = duration;
      this.context = d3.select('canvas').node().getContext('2d');
      set(this, 'remainingTime', this.duration);
      later(this, this.updateTick, 10);
    },

    configChanged(componentName, config) {
      const configs = get(this, 'configs');
      set(configs, componentName, config);
    },

    durationChanged(componentName, duration) {
      const configs = get(this, 'configs');
      get(configs, componentName).duration = duration;
    },

    selectedGlobalRoot(root) {
      set(this, 'globalRoot', root);
    },

    showConfiguration(val) {
      set(this, 'activeConfiguration', val);
    }
  }
});
