import React, {FC} from 'react';
import {Home} from "./Home";
import {useRoutes} from "react-router-dom";
import {MiddleMan} from "./MiddleMan";
import {WhichApplication} from "./WhichApplication";

interface RoutingProps {
}


const routes =[
    {
        path:"/",
        element: <WhichApplication/>,
        children:[
            {
                path:'/cpm',
                element:<Home/>
            },
            {
                path:'/middle',
                element:<MiddleMan/>
            }
        ]
    }
]

export const Routing: FC<RoutingProps> = ({}) =>{
    return useRoutes(routes);
};