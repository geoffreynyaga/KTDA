/*
 * File: /home/geoff/KTDA/ui/src/index.js
 * Project: /home/geoff/KTDA/ui
 * Created Date: Saturday, May 7th 2022, 2:39:16 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Saturday May 7th 2022 2:39:16 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import { QueryClient, QueryClientProvider } from "react-query";

import { HelmetProvider } from "react-helmet-async";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesApp from "./routes/index";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <Router>
        <RoutesApp />
      </Router>
    </HelmetProvider>
  </QueryClientProvider>
);
