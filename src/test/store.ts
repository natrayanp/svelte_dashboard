import {writable, get} from 'svelte/store'


export const user = writable([{nome: 'Joana'}])

export const getUser = () => get(user)
