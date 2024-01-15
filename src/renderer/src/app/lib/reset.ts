import { store } from "../store"

const resetState = ()=> {
    store.dispatch(resetState())
}

export {resetState}