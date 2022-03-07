 const $ = (function () {
  const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject()
  if (!xhr) {
    throw new Error('您的浏览器暂不支持ajax异步请求')
  }
  function formatData(data) {
    let str = ''
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        str += `${key}=${data[key]}&`
      }
    }
    return str.replace(/&$/, '')
  }
  function _ajax(options) {
    let options = options || {},
      url = options.url,
      type = (options.type || 'GET').toUpperCase(),
      async = options.async || true,
      data = options.data || null,
      success = options.success || function () {},
      error = options.error || function () {},
      complete = options.complete || function () {}
    if (!url) {
      throw new Error('请传入请求地址')
    }
    xhr.open(url, type, async)
    if (type === 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.send(formatData(data))
    } else {
      xhr.send()
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          success(JSON.parse(xhr.responseText))
        } else {
          error(xhr.responseText)
        }
        complete()
      }
    }
  }
  return {
    ajax: function (options) {
      _ajax(options)
    },
    post: function (url, data, success, error) {
      _ajax({
        type: 'POST',
        url,
        data,
        success,
        error
      })
    },
    get: function (url, success, error) {
      _aiax({
        type: 'GET',
        url,
        success,
        error
      })
    }
  }
})()
export default $
