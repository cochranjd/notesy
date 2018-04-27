import Controller from '@ember/controller';
import EmberObject, { get, set, computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { later, next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import d3 from 'npm:d3';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 50;

const ACTIVE_MODULES_KEY = 'activeModules';

export default Controller.extend({
  canvasWidth: CANVAS_WIDTH,
  canvasHeight: CANVAS_HEIGHT,

  activeComponent: null,

  activeConfiguration: 'single',

  prefs: service(),

  configs: null,

  roots: null,
  components: null,

  globalRoot: null,

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

  register() {
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

  init() {
    this._super(...arguments);
    set(this, 'roots', ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G']);
    set(this, 'components', [
      { key: 'single', component: 'single-note', active: true },
      { key: 'multi', component: 'multi-note', active: false },
      { key: 'bend', component: 'bend-to-note', active: false },
      { key: 'scale', component: 'play-scale', active: false }]);

    set(this, 'configs', EmberObject.create());
    this.loadPrefs();
    next(this, () => {
      this.register();
    });
  },

  drawRect(width) {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.context.fillStyle = 'rgba(70, 130, 180, 0.5)';
    this.context.beginPath();
    this.context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.context.fill();

    this.context.fillStyle = 'rgba(70, 130, 180, 1)';
    this.context.beginPath();
    this.context.rect(0, 0, width, CANVAS_HEIGHT);
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
      this.drawRect((1.0 * (remaining/this.duration))*CANVAS_WIDTH);
      later(this, this.updateTick, 10);
    }
  },

  loadPrefs() {
    const prefs = get(this, 'prefs');

    const activeModules = prefs.load(ACTIVE_MODULES_KEY);
    if (activeModules) {
      const components = get(this, 'components');
      components.forEach(c => {
        c.active = activeModules.includes(c.key);
      });
    }
  },

  savePrefs() {
    const components = get(this, 'availableComponents');
    const activeModules = components.filterBy('active', true).mapBy('key');

    const prefs = get(this, 'prefs');
    prefs.save(ACTIVE_MODULES_KEY, activeModules);
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

    selectedGlobalRoot(root) {
      set(this, 'globalRoot', root);
    },

    showConfiguration(val) {
      set(this, 'activeConfiguration', val);
    },

    activeComponentChanged(componentKey, evt) {
      const isChecked = evt.target.checked;
      const availableComponents = get(this, 'availableComponents');
      const component = availableComponents.findBy('key', componentKey);
      if (component) {
        set(component, 'active', isChecked);
      }
      this.savePrefs();
    }
  }
});
