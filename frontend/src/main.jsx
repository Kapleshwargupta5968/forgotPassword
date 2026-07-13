import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { PublicRoute } from "./components/common/PublicRoute";
import { Provider } from 'react-redux'
import { store } from "./app/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "signin",
        element: (
          <PublicRoute>
            <Signin />
          </PublicRoute>
        )
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        )
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        )
      },
      {
        path: "reset-password/:token",
        element: (
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        )
      },
      {
        path: "*",
        element: <Navigate to="/signin" replace />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  
  <RouterProvider router={router} />
  </Provider>
)
