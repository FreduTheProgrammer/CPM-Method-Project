import React, {FC} from 'react';

interface NetworkImageProps {
    hashString: string;
    isClicked: boolean;
}

export const NetworkImage: FC<NetworkImageProps> = (props) =>{
    return (
        <div>
            {props.isClicked && <img alt={"Sth is wrong with image hash"} src={`${props.hashString}`} style={{width:"100%",height:"50%",margin:"0 0"}}/>}
        </div>
    );
};