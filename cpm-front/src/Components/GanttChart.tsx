import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import React, {FC} from 'react';
import {GanttDto, GanttChartType} from "../dto/GanttDto";
import "gantt-task-react/dist/index.css";


interface GanttChartProps {
    data : GanttDto[],
    type: GanttChartType
}

export const GanttChart: FC<GanttChartProps> = ({data, type}) => {
    console.log(data)
    const currentDate = new Date();
    const tasks: Task[] = data!.map((activity: GanttDto, idx) => {
        return {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay() 
            + type === GanttChartType.AsSoonAsPossible ? activity.ES : activity.LS),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay() 
            + type == GanttChartType.AsLateAsPossible ? activity.EF : activity.LF),
            id: activity.Name,
            name: activity.Name,
            type: "task",
            progress: 100,
            dependencies: activity.Predecessors
        }
    })
    return <Gantt tasks={tasks} viewMode={ViewMode.Day}/>
}
