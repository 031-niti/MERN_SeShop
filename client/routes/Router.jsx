import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Main from '../src/layout/Main';
import Home from '../src/pages/home/Home';
import ProductList from '../src/pages/shop/ProductList';
import SignUp from '../src/components/SignUp';
import SignIn from '../src/components/SignIn';
import UpdataProfile from '../src/pages/dashboard/UpdataProfile';
import PrivateRouter from '../src/PrivateRouter/PrivateRouter';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/shop",
                element:
                    <PrivateRouter>
                        <ProductList />
                    </PrivateRouter>
                ,
            }
            ,
            {
                path: "/update-profile",
                element: <UpdataProfile />,
            }
        ],
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/signin",
        element: <SignIn />
    }
]);

export default router;