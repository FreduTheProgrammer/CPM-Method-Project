import {showNotification} from "@mantine/notifications";

export const goodDataNotification =()=>{
    showNotification({
        color: 'green',
        title:'Successful',
        message:'Good data from request :D'
    });
}

export const wrongDataNotification = () =>{
    showNotification({
        color:"red",
        title:"Error",
        message:"Wrong Data from request :(. Please enter correct data"
    })
}