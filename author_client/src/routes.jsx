// import { ErrorPage } from "./pages/ErrorPage";
import Main from "./main";
import { ErrorPage } from "shared/pages/ErrorPage";
import HomePage from "shared/pages/HomePage";
import Login from "shared/pages/Login";
import Register from "shared/pages/Register";
import SinglePost from "shared/pages/SinglePost";
import AuthorDashboard from "./pages/AuthorDashboard";
import EditPost from "./pages/EditPost";

const routes = [
  {
    element: <Main />,
    children: [
      {
        path: '/',
        element: <AuthorDashboard/>
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
      },
      {
        path: '/edit/:single_page',
        element: <EditPost/>
      }
      

    ]
  },

  {errorElement: <ErrorPage />}

]

export default routes;