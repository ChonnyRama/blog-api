import App from "./App";
// import { ErrorPage } from "./pages/ErrorPage";
import { Navbar } from "./components/Navbar";
import Main from "./main";
import { ErrorPage } from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

const routes = [
  {
    element: <Main />,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/:single_page',
        element: <SinglePost/>
      }
      

    ]
  },

  {errorElement: <ErrorPage />}

]

export default routes;