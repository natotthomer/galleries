import { fetcher } from './utils'

const API = {
    newGallery: data => {
        return fetcher({
            method: 'POST', 
            url: '/api/gallery/new',
            data
        })
    },

    newUser: data => {
        return fetcher({
            url: '/api/user/new',
            method: 'POST',
            data
        })
    },

    login: data => {
        return fetcher({
            url: '/api/user/sign_in',
            method: 'POST',
            data
        })
    },

    signup: data => {
        return fetcher({
            url: '/api/user/new',
            method: 'POST',
            data
        })
    },

    logout: () => {
        return fetcher({
            url: '/api/user/sign_out',
            method: 'POST'
        })
    },
}

export default API