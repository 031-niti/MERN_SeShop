import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Main from '../src/layout/Main';
import Home from '../src/pages/home/Home';
import ProductList from '../src/pages/shop/ProductList';
import SignUp from '../src/components/SignUp';
import SignIn from '../src/components/SignIn';
import UpdataProfile from '../src/pages/dashboard/UpdataProfile';
import PrivateRouter from '../src/PrivateRouter/PrivateRouter';
import Cart from '../src/pages/cart/Cart';

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
            },
            {
                path: "/carts",
                element: <Cart />,
            }
        ],
    },
    {
        path: "dashboard",
        element:
            <PrivateRouter>
                <DashboardLayout />
            </PrivateRouter>,
        children: [
            {
                path: "users",
                element: <User />
            },
            {
                path: "add-product-item",
                element: <AddProductItem />
            },
            {
                path: "all-product-items",
                element: <AllProductItems />
            },
            {
                path: "update-item/:id",
                element: <UpdateItem />
            },
            {
                path: "",
                element:
                    <Dashboard />
            }
        ]
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