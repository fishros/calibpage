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
    let url = "", query = ''
    url = window.location.href
    query = url?.split('?')[1]?.split('=')[1]
    return query
}