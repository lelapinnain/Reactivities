import React, {  } from 'react'
import ReactDOM from 'react-dom/client'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'
import './app/layout/styles.css'
import App from './app/layout/App'
import reportWebVitals from './reportWebVitals'
import { store, StoreContext } from './app/stores/store'
import { createBrowserHistory } from 'history'
import { CustomRouter } from './app/CustomRoute'

export const history = createBrowserHistory()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <CustomRouter history={history}>
        <App />
      </CustomRouter>
    </StoreContext.Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
