import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout";
import { routes } from "../utils";

import { Route, Routes } from "react-router-dom";

const index = () => {
  return (
    <Layout>
      <Routes>
        {routes.map((routes) => {
          const { path, element, id } = routes;
          return <Route exact path={path} element={element} key={id} />;
        })}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default index;
