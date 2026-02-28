import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';



const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            theme="dark"
             />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
