import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvider } from './context/dataContext.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <DataContextProvider>
      <App />
    </DataContextProvider>
    </BrowserRouter>
)
