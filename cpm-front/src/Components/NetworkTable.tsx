import React, {FC} from 'react';
import {TableForm} from "./TableForm";

interface TableProps {}

export const NetworkTable: FC<TableProps> = ({}) =>{
    return (
        <div>
            <TableForm/>
        </div>
    );
};