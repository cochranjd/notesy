import Service from '@ember/service';

export default Service.extend({

  load(key) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }

    return null;
  },

  save(key, value) {
    const valueStr = JSON.stringify(value);
    localStorage.setItem(key, valueStr);
  }
});
