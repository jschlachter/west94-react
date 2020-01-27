const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
}

const variationName = (name, value) => {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
export { classNames, variationName };
