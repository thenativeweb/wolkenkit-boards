const settings = {
  get (key) {
    return window.localStorage.getItem(`settings.${key}`);
  },

  set (key, value) {
    if (!value) {
      return window.localStorage.removeItem(`settings.${key}`);
    }

    return window.localStorage.setItem(`settings.${key}`, value);
  }
};

export default settings;
