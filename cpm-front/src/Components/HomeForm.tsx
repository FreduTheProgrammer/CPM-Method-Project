import React, {FC} from 'react';
import {NetworkTable} from "./NetworkTable";
import {NetworkImage} from "./NetworkImage";
import "../Styles/HomeFormStyles.css"
import {GanttDto} from "../dto/GanttDto";
import {GanttChart} from "./GanttChart";
import {GantChartForm} from "./GantChartForm";

interface HomeFormProps {
    setGanttActivities:(acivities:GanttDto[])=>void;
    setIsClickedv2:(isClicked: boolean) => void;
}

export const HomeForm: FC<HomeFormProps> = ({setGanttActivities,setIsClickedv2}) =>{
    const [imageHash, setImageHash] = React.useState('');
    const [isClicked, setIsClicked] = React.useState(false);

    setIsClickedv2(isClicked);

    return (
        <div className={"home-container"}>
            <div className={"home-children"}>
                <NetworkTable setImageHash={setImageHash} setIsClicked={setIsClicked} setGanttActivities={setGanttActivities}/>
            </div>
            <div className={"home-children"}>
                <NetworkImage hashString={imageHash} isClicked={isClicked}/>
            </div>
            <div></div>
        </div>

    );
};