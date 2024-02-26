import { ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from "../store"

export const withStore = (component: ()=> ReactNode) => ():JSX.Element => {
    return(
        <Provider store={store}>
            {component()}
        </Provider>
    )
}