import qs from 'qs'

const apiUrl = 'http://fishros.org:2023/ros2/calib'
interface Config extends RequestInit{
    data?: object
}

export const http = async (
    apiHost: string,
    endpoint: string,
    { data, ...customConfig }: Config = {}
) => {
    console.log(apiHost, 'apiHost')
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

    return window.fetch(`${apiHost}/${endpoint}`, config)
    .then(async response => {
        const data = await response.json()
        if(response.ok){
            return data.data
        }else{
            return Promise.reject(data)
        }
    })
}

