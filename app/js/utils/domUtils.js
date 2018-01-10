/* eslint-disable import/prefer-default-export  */
export const getFirstFocusableParent = (element) => {
  if (element.tagName.toLowerCase() === 'input' || element.hasAttribute('tabindex')) {
    return element;
  }

  return element.parentElement ? getFirstFocusableParent(element.parentElement) : null;
};
