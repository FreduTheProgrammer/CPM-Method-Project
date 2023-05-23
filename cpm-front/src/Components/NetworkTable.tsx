import React, {FC} from 'react';
import {TableForm} from "./TableForm";
import {GanttDto} from "../dto/GanttDto";

interface TableProps {
    setImageHash:(hash: string) => void;
    setIsClicked: (isClicked: boolean) => void;
    setGanttActivities:(activities: GanttDto[]) => void
}

export const NetworkTable: FC<TableProps> = ({setImageHash,setIsClicked, setGanttActivities}) =>{
    return (
        <div className={"middle-man-container"}>
            <div>

            </div>
            <div>
                <TableForm setImageHashv2={setImageHash} setIsClicked={setIsClicked} setGanttActivities={setGanttActivities}/>
            </div>
        </div>
    );
};