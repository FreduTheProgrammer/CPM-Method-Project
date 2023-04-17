import React from 'react';
import './App.css';
import { MantineProvider } from '@mantine/core';
import {Routing} from "./Components/Routing";
import {BrowserRouter} from "react-router-dom";
import {Notifications} from "@mantine/notifications";

function App() {
  return (
      <BrowserRouter>
          <MantineProvider withGlobalStyles withNormalizeCSS>
                <Notifications/>
                    <Routing/>
          </MantineProvider>
      </BrowserRouter>
  );
}

export default App;
