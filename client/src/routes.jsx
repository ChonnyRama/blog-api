// import { ErrorPage } from "./pages/ErrorPage";
import Main from "./main";
import { ErrorPage } from "shared/pages/ErrorPage";
import HomePage from "shared/pages/HomePage";
import Login from "shared/pages/Login";
import Register from "shared/pages/Register";
import SinglePost from "shared/pages/SinglePost";

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