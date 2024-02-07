import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Main from '../src/layout/Main';
import Home from '../src/pages/home/Home';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children:[
            {
                path: "/",
                element: <Home/>,
            }
        ]
    },
]);

export default router;