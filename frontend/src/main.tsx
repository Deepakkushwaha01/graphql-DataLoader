import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {AppProvider} from "./AppProvider.tsx";
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
         <Provider store={store}>
        <AppProvider>
            <App/>
        </AppProvider>
        </Provider>
    </React.StrictMode>,
)