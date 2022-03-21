export default (function (BASE_URL) {
  console.log(BASE_URL);
  const xhr = new XMLHttpRequest();
  if (!xhr) throw new Error('浏览器不支持发起异步请求');

  // 处理 Data
  function formatData(data) {
    let str = '';
    for (const key in data) {
      str += key + '=' + data[key] + '&';
    }
    return str.replace(/&$/, '');
  }

  // 封装请求过程
  function _doAjax(option) {

    // 初始化请求参数
    let opt = option || {},
      method = (option.method || 'GET').toUpperCase(),
      async = option.async || true,
      url = option.url,
      data = option.data || null,
      error = option.error || function () { },
      success = option.success || function () { },
      complete = option.complete || function () { };
  
    if (!url) throw new Error('未传入 URL');
    if (url) {
      url = BASE_URL + url;
    }
    // 设置请求
    xhr.open(method, url, async);
    // 根据 type 发送指定类型请求
    console.log(data);
    xhr.send(method === 'GET' ? null : data);
    // 监听请求状态
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log('服务端响应的数据', xhr.responseText);
        success(JSON.parse(xhr.responseText));
      } 
      if (xhr.status === 404) error();
      complete();
    }
  }

  return {
    ajax: function (option) {
      _doAjax(option);
    },
    get: function (url, callback) {
      _doAjax({ method: 'GET', url: url, success: callback });
    },
    post: function (url, data, callback) {
      _doAjax({ method: 'POST', url: url, data: data, success: callback });
    }
  }
});

