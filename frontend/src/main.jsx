import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/useContext.jsx';
import { DeleteProvider } from "./context/deleteContext";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <DeleteProvider>
        <App />
      </DeleteProvider>
    </AuthProvider>
  </BrowserRouter>,
)
