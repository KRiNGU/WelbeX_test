const html = document.documentElement;
const { body } = document;

export const disableScroll = () => {
  const scrollBarWidth = window.innerWidth - html.clientWidth;
  const bodyPaddingRight =
    parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) ||
    0;
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
};

export const enableScroll = () => {
  html.style.position = '';
  html.style.overflow = '';
  body.style.position = '';
  body.style.overflow = '';
  body.style.paddingRight = '';
};
