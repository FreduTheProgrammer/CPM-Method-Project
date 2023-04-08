import React, {FC} from 'react';
import {HomeForm} from "./HomeForm";
interface HomeProps {}

export const Home: FC<HomeProps> = ({}) =>{
    return (
        <div>
            <HomeForm/>
        </div>
    );
};