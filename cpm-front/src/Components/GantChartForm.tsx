import React, {FC} from 'react';
import {GanttChartType, GanttDto} from "../dto/GanttDto";
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
                    <GanttChart data={ganttActivities} type={GanttChartType.AsSoonAsPossible}/>
                    <GanttChart data={ganttActivities} type={GanttChartType.AsLateAsPossible}/>
                </>
            }
        </div>
    );
};