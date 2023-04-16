import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import React, {FC} from 'react';
import {GanttDto} from "../dto/GanttDto";
import "gantt-task-react/dist/index.css";

interface GanttChartProps {
    data ?: GanttDto[]
}

export const GanttChart: FC<GanttChartProps> = ({data}) => {
    console.log(data)
    const tasks: Task[] = data!.map((activity: GanttDto, idx) => {
        return {
            start: new Date(activity.ES),
            end: new Date(activity.EF),
            id: "Task " + idx,
            name: activity.Name,
            type: "task",
            progress: 100,
        }
    })
    return <Gantt tasks={tasks} />
}
