import React, {FC} from 'react';
import {Home} from "./Home";
import {useRoutes} from "react-router-dom";

interface RoutingProps {}

const publicRoutes =[
    {
        path:'/',
        element:<Home/>
    }
]


export const Routing: FC<RoutingProps> = ({}) =>{
    return useRoutes(publicRoutes)
};