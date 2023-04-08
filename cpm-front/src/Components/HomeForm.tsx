import React, {FC} from 'react';
import {NetworkTable} from "./NetworkTable";
import {NetworkImage} from "./NetworkImage";
import "../Styles/HomeFormStyles.css"

interface HomeFormProps {
}

export const HomeForm: FC<HomeFormProps> = ({}) =>{
    return (
        <div className={"home-container"}>
            <div className={"home-children"}>
                <NetworkTable/>
            </div>
            <div className={"home-children"}>
                <NetworkImage/>
            </div>
        </div>
    );
};