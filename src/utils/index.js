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