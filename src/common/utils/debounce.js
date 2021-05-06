const debounce = (fn, wait = 250) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

export default debounce;
