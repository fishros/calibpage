export const jsonStringify = (data: unknown) => {
    let res = ''
    try {
        res = JSON.stringify(data)
    } catch(err) {
        console.warn(err)
    }
    return res
}

export const jsonParse = (data: string) => {
    let json;
    try {
        json = JSON.parse(data)
    }catch(e) {
        console.warn(e)
    }
    return json
}

export const setLocalStorage = (key: string, value: unknown) => {
    window.localStorage.setItem(key, jsonStringify(value))
}

export const getLocalStorage = (key: string) => {
    const value = window.localStorage.getItem(key)
    return jsonParse(value || '')
}


export const getQueryUrl = () => {
    const url = window.location.href;
    const queryString = url.split('?')[1];
  
    if (!queryString) {
      return {}; // 返回空对象，表示没有参数
    }
  
    const params = queryString.split('&');
    const json = {};
  
    params.forEach(param => {
      const [key, value] = param.split('=');
      // @ts-ignore
      json[key] = decodeURIComponent(value);
    });
  
    return json;
  };
  

export const formatGMT = (gmt: string) => {
    let date = new Date(gmt)
    let m = (date.getMonth() + 1), mm = '-' + (m < 10 ? '0' + m: m);
    let d = date.getDate(), dd = '-' + (d <  10 ? '0' + d : d)
    let h = date.getHours(), hh = ' ' + (h < 10 ? '0' + h : h)
    let i = date.getMinutes(), ii = ':' + (i < 10 ? '0' + i : i)
    let s = date.getSeconds(), ss = ':' + (s < 10 ? '0' + s : s)
    return date.getFullYear() + mm + dd + hh + ii + ss 
}