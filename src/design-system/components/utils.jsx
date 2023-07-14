import classNames from 'classnames';

export const cn = (...props) => {
  return classNames(...props);
};

export const klogger = ([...message], type = 'log') => {
  switch (type) {
    case 'error':
      console.error(...message);
      break;
    case 'warn':
      console.warn(...message);
      break;
    case 'log':
    default:
      console.log(...message);
      break;
  }
};
