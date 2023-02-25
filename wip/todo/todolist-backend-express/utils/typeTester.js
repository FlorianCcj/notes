const isObject = a => (!!a) && (a.constructor === Object);
const isArray = a => (!!a) && (a.constructor === Array);
const isNumber = a => typeof i === "number" && !isNaN(a);

export { isArray, isObject, isNumber };
