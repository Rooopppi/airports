import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'
import { setupStore } from './store'
import { Provider } from 'react-redux'

const preloadedState = {}
const store = setupStore(preloadedState)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

if (module.hot !== undefined) {
  module.hot.accept()
}
