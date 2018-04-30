import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import DrillSupportMixin from 'notesy/mixins/drill-support';

export default Component.extend(DrillSupportMixin, {
  classNames: ['row', 'w-100', 'learn-the-notes'],

  timeInMs: 5000,

  availableStrings: computed('config.strings', {
    get() {
      const configStrings = get(this, 'config.strings');
      const allStrings = get(this, 'strings');

      if (configStrings.length === 0) {
        return allStrings;
      }

      return allStrings.filter(string => configStrings.includes(string));
    }
  }).readOnly(),

  didInsertElement() {
    const roots = get(this, 'roots');
    set(this, 'selectedRoot', roots[Math.floor(Math.random() * roots.length)]);

    const availableStrings = get(this, 'availableStrings');
    set(this, 'selectedString', availableStrings[Math.floor(Math.random() * availableStrings.length)]);
    this._super(...arguments);
  }
});
