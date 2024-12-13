import React from "react";

// Admin Imports
import Products from "views/admin/Products";
import AddProduct from "views/admin/Products/addProduct";
import ProductDetails from "views/admin/Products/productDetails";


const routes = [ 
  {
    name: "All Data",
    layout: "/admin",
    path: "default",
    component: <Products />,
  },
  {
    name: "Add Data",
    layout: "/admin",
    path: "add-product",
    component: <AddProduct />,
  },
  {
    name: "Edit Data",
    layout: "/admin",
    path: "edit-product/:id",
    component: <AddProduct />,
  },
  {
    name: "Data Details",
    layout: "/admin",
    path: "product-details/:id",
    component: <ProductDetails />,
  },
];
export default routes;
