import qs from 'qs'

const apiUrl = process.env.BASE_API
interface Config extends RequestInit{
    data?: object
}

export const http = async (
    endpoint: string,
    { data, ...customConfig }: Config = {}
) => {
    const config = {
        method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        ...customConfig
    }

    if(config.method.toUpperCase() === 'GET') {
        endpoint +=  `?${qs.stringify(data)}`
        console.log('endponit', endpoint)
    } else {
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
        const data = await response.json()
        if(response.ok){
            return data.data
        }else{
            return Promise.reject(data)
        }
    })
}

