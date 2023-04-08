import React from 'react';
import './App.css';
import { MantineProvider } from '@mantine/core';
import {Routing} from "./Components/Routing";
import {BrowserRouter} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
          <MantineProvider withGlobalStyles withNormalizeCSS>
              <Routing/>
          </MantineProvider>
      </BrowserRouter>
  );
}

export default App;
