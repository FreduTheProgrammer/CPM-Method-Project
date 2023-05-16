import React, {FC} from 'react';
import { Paper, Button } from '@mantine/core';
import "../Styles/RoutingStyle.css"
import {Routing} from "./Routing";
import {Link, Outlet} from "react-router-dom";

interface WhichApplicationProps {
}

export const WhichApplication: FC<WhichApplicationProps> = ({}) =>{

    return (
        <div className={"App"}>
            <Paper className={"application-container"} shadow="lg" radius="lg" p="lg" withBorder>
                <h2> BOiL</h2>
                <Link style={{textDecoration:"none", color:"black"}} to={"/cpm"}>CPM app</Link>
                <Link style={{textDecoration:"none", color:"black"}} to={"/middle"}>Middle Man application</Link>
            </Paper>
            <Outlet/>
        </div>
    );
};