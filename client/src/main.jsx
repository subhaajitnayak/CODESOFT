import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { initializeAuth } from './redux/authSlice';
import './index.css'
import App from './App.jsx'

// Initialize auth state from localStorage
store.dispatch(initializeAuth());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
