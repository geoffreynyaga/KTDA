/*
 * File: /home/geoff/KTDA/ui/src/index.js
 * Project: /home/geoff/KTDA/ui
 * Created Date: Saturday, May 7th 2022, 2:39:16 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
 * -----
 * Last Modified: Saturday May 7th 2022 2:39:16 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Geoffrey Nyaga Kinyua.
 * -----
 * Copyright (c) 2022 Geoffrey Nyaga Kinyua.
 */

import "./input.css";

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import React from 'react';
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesApp from "./routes/index";

const queryClient = new QueryClient();


const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
            <Router>
                <RoutesApp />
            </Router>
        </HelmetProvider>
    </QueryClientProvider>
    </React.StrictMode>
  );
}
