import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Main from '../src/layout/Main';
import Home from '../src/pages/home/Home';
import ProductList from '../src/pages/shop/ProductList';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children:[
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/shop",
                element: <ProductList />,
            }
        ],
    },
]);

export default router;