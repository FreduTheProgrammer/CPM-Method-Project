import React, {FC} from 'react';
import {HomeForm} from "./HomeForm";
import {GanttDto} from "../dto/GanttDto";
import {GantChartForm} from "./GantChartForm";
interface HomeProps {}

export const Home: FC<HomeProps> = ({}) =>{
    const [ganttActivities, setGanttActivities] = React.useState<GanttDto[]>([]);
    const [isClicked, setIsClickedv2] = React.useState(false)
    return (
        <div>
            <HomeForm setGanttActivities={setGanttActivities} setIsClickedv2={setIsClickedv2}/>
            <GantChartForm ganttActivities={ganttActivities} isClicked={isClicked}/>
        </div>
    );
};