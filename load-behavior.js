// Keep refreshes at the beginning of the portfolio. The terminal gains focus only when clicked.
history.scrollRestoration = 'manual';
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
});
