import compose from 'compose-function'
import { withRouter } from './with-router'
import { WithStore } from './with-store'

export const withProviders = compose(withRouter, WithStore)