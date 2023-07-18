/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import ServicePage from "../pages/ServicePage/ServicePage";
import LogPage from "../pages/LogPage/LogPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import { loader } from "./loader";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import HomePage from "../pages/HomePage/HomePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        loader={loader}
        element={<SideBar />}
        children={
          <>
            <Route path="/" loader={loader} element={<HomePage />} />
            <Route path="/log" loader={loader} element={<LogPage />} />
            <Route path="/service" loader={loader} element={<ServicePage />} />
          </>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </>
  )
);
