const noop = () => {}


/**
 * load script dynamically
 * @param {string} url 
 */
export function loadScript(url, defer = false, callback = noop) {
  let script = document.createElement('script')
  script.onload = callback
  script.src = url
  script.defer = defer
  document.body.appendChild(script)
}


export function setStyle(el, property, value) {
  el.style[property] = value
}

export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}

export function debounce(fn, delay = 300) {
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay);
  }
}

export function isEmptyObj(obj) {
  return Object.keys(obj).length === 0
}