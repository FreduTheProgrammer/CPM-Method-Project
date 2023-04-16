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