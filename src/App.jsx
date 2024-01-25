import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import VerificationPage from "./pages/Verification/VerificationPage";
import {
  AuthenticatedRoutes,
  ProtectRoutes,
} from "./customHooks/protectedRoutes";
import Page404 from "./pages/404/Page404";
import MainPage from "./pages/MainPage/MainPage";
import { ThemeProvider } from "next-themes";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  useEffect(() => {
    themeCheck();
  }, []);
  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");

      setIsDark(true);
      return;
    }

    setIsDark(false);
  };

  return (
    <NextUIProvider navigate={navigate}>
      <ThemeProvider
        defaultTheme='system'
        attribute='class'
        // value={{
        //   light: lightTheme.className,
        //   dark: darkTheme.className,
        // }}
      >
        <Routes>
          <Route element={<AuthenticatedRoutes />}>
            <Route path='/login/demo' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/verify/:username' element={<VerificationPage />} />
          </Route>
          <Route element={<ProtectRoutes />}>
            <Route path='/*' element={<MainPage />} />
          </Route>
          <Route path='/404' element={<Page404 />} />

          {/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
        </Routes>
        <ToastContainer
          position='bottom-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default App;
