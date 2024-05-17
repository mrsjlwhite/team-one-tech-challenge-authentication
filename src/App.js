import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {LandingPage} from './components/landing.page';
import {LoginPage} from './components/login.page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);


function App() {
  return (
    <RouterProvider router={router}> </RouterProvider>
  );
}

export default App;
