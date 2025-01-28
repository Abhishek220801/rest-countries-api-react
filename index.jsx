import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import CountryPage from "./components/CountryPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {   path: '/',
                element: <Home/>,
            },
            {
                path: '/:country',
                element: <CountryPage/>,
            }
        ]
    },
])

const root = createRoot(document.querySelector('#root'))

root.render(<RouterProvider router={router}/>);