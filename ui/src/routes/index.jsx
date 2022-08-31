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

import { Route, Routes } from "react-router-dom";

import CoachingAndMentorshipLanding from "../environment/CoachingAndMentorshipLanding";
import CreateSale from '../environment/sales/CreateSale';
import CustomSalesReportLanding from "../environment/report/CustomSalesReportLanding";
import CustomSalesReportPDF from "../environment/report/CustomSalesReportPDF";
import LMEList from "../environment/LMEList";
import LMESalesList from "../environment/SalesList";
import React from "react";
import SalesListIndividual from "../environment/SalesListIndividual";
import TrainingLanding from "../environment/TrainingLanding";
import TreeGrowingLanding from "../environment/TreeGrowingLanding";

/**
 * `<Routes>` is a component that takes in a list of `<Route>` components. Each `<Route>` component
 * takes in a `path` prop and an `element` prop. The `path` prop is a string that represents the URL
 * path that the `<Route>` component will be rendered at. The `element` prop is a React component that
 * will be rendered when the URL path matches the `path` prop
 * @returns The RoutesApp component is being returned.
 */
function RoutesApp() {
  return (
    <Routes>
      <Route path="/ui/lme/list/" element={<LMEList />} />
      <Route path="/ui/lme/sales/" element={<LMESalesList />} />
      <Route path="/ui/lme/sales/create/" element={<CreateSale />} />
      
      <Route
        path="/ui/lme/sales/individual/"
        element={<SalesListIndividual />}
      />
      <Route path="/ui/lme/cnm/" element={<CoachingAndMentorshipLanding />} />
      <Route path="/ui/lme/training/" element={<TrainingLanding />} />
      <Route path="/ui/lme/tree-growing/" element={<TreeGrowingLanding />} />
      <Route path="/ui/lme/report/" element={<CustomSalesReportLanding />} />
      <Route path="/ui/lme/report/:id/" element={<CustomSalesReportPDF />} />
    </Routes>
  );
}

export default RoutesApp;
