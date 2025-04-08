import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  canonical: (path, origin) => new URL(path, origin).href,
  date: (value, format, tz = 'utc') => {
    const dateObject = new Date(value);
    return dayjs(dateObject).tz(tz).format(format);
  },
  json: (value) => JSON.parse(value),
  join: (values, separator) =>
    values.filter((value) => !!value).join(separator),
  modify: function modify(obj, key, value) {
    const newObj = { ...obj };
    const [level, ...rest] = key.split('.');
    if (rest.length) {
      newObj[level] = {
        ...newObj[level],
        ...modify(newObj[level], rest.join('.'), value),
      };
    } else {
      newObj[level] =
        Array.isArray(newObj[level]) && !Array.isArray(value) ? [value] : value;
    }
    return newObj;
  },
  padStart: (value, length) => String(value).padStart(length, '0'),
  push: (array, ...items) => [...array, ...items],
  replace: (text, search, replacement) =>
    text.replace(new RegExp(search, 'g'), replacement),
  split: (value, separator) =>
    value
      .split(separator)
      .map((item) => item.trim())
      .filter((item) => !!item),
  stringify: (obj) => JSON.stringify(obj, null, 2),
  stripdate: (path, slug) =>
    slug ?? path.replace(/\d{4}-\d{2}-\d{2}_/, '').toLowerCase(),
  striptags: (html) => html.replace(/(<([^>]+)>)/gi, ''),
  tag: (articles, tag) =>
    articles.filter((article) => article.data.tags.includes(tag)),
  take: (array, count) => array.slice(0, count),
  unique: (array) => [...new Set(array)],
};
