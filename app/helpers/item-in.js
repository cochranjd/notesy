import Helper from '@ember/component/helper';

export default Helper.extend({

  compute(params) {
    if (params === null || typeof params === 'undefined') {
      return '';
    }

    const list = params[0];
    if (!list || list.length === 0) { return false; }

    const item = params[1];
    return list.includes(item);
  }

});
