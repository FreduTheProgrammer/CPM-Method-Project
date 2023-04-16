import {TableDto} from "../dto/TableDto";
import ky from "ky";
import {API_URL} from "../config";

export const postData = (data: TableDto[]) => {
    const formatData = data.map(item => ({
        ...item,
        duration: typeof item.duration === "number" ? item.duration : Number(item.duration)
    }));

    return ky.post(`/api/cpm`, {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formatData)
    })
        .then(response => response.text())
        .then(data => JSON.parse(data))
        .catch(error => {
            console.error(error);
        })
};

export const getImage = async (imgHash: string): Promise<Blob> =>{
    const response = await fetch(`${API_URL}/image/${imgHash}.png`);
    return await response.blob();
}

// export const postData = async (data: TableDto[]) => {
//     await fetch(`${API_URL}/cpm`, {
//         method: 'POST',
//         headers: {
//             ContentType: 'application/json'
//         },
//         body: JSON.stringify(data)
//     }).then(response =>{
//         if(response.ok){
//             return response.text();
//         }else{
//             throw new Error(`Request failed, status code ${response.status}`)
//         }
//     }).catch(error =>{
//         console.log(error);
//     })
//     // const imageBlob = await response.blob();
//     // return URL.createObjectURL(imageBlob);
// }