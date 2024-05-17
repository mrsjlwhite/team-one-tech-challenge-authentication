import "./App.css";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Navigate,
} from "react-router-dom";

import { fakeAuthProvider } from "./auth";

import { LandingPage } from "./components/landing.page";
import { LoginPage } from "./components/login.page";

let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function useAuth() {
  return React.useContext(AuthContext);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <div />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/landing",
        element: (
          <RequireAuth>
            <LandingPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}> </RouterProvider>
    </AuthProvider>
  );
}

export default App;
