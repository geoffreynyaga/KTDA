/**
 * File: /home/geoff/KTDA/ui/src/routes/index.jsx
 * Project: /home/geoff/KTDA/ui
 * Created Date: Sunday, May 15th 2022, 8:43:38 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Sunday May 15th 2022 8:43:38 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 */

import React from "react";
import { Route, Routes } from "react-router-dom";
import LMEList from "../environment/LMEList";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/ui/lme/list/" element={<LMEList />} />
    </Routes>
  );
}

export default RoutesApp;
