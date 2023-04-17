import React, {FC} from 'react';
import {GanttDto} from "../dto/GanttDto";
import {GanttChart} from "./GanttChart";

interface GantChartFormProps {
    ganttActivities: GanttDto[]
    isClicked: boolean
}

export const GantChartForm: FC<GantChartFormProps> = ({ganttActivities, isClicked}) =>{
    return (
        <div>
            {isClicked &&
                <>
                    <GanttChart data={ganttActivities} type={1}/>
                    <GanttChart data={ganttActivities} type={2}/>
                </>
            }
        </div>
    );
};