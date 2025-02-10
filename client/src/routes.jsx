import App from "./App";
// import { ErrorPage } from "./pages/ErrorPage";
import { Navbar } from "./components/Navbar";
import { ErrorPage } from "./pages/ErrorPage";

const routes = [{
  path: "/",
  element: (
    <>
      <Navbar />
      <App />
    </>
  ),
  errorElement: <ErrorPage />
}
  

]

export default routes;