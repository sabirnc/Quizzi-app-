import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// chakra ui 
import { ChakraProvider } from '@chakra-ui/react'

//context 
import GloabalContextProvider from './ context/globalConext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render ( 
   <ChakraProvider>
      <GloabalContextProvider>
        <App />
      </GloabalContextProvider>
   </ChakraProvider>
)

        
    

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
