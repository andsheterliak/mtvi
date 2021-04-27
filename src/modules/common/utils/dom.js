export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const focusContainer = (container) => {
  container.setAttribute('tabindex', '0');
  container.focus();
  container.removeAttribute('tabindex');
};
