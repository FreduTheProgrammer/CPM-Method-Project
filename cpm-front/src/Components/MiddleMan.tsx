import React, {FC} from 'react';
import {MiddleManForm} from "./MiddleManForm";

interface MiddleManProps {}

export const MiddleMan: FC<MiddleManProps> = ({}) =>{
    return (
        <div>
            <MiddleManForm/>
        </div>
    );
};