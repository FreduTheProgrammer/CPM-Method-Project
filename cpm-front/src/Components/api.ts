import {API_URL} from "../config";

export const postData = async () => {
    const formData = new FormData();
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        body: formData,
    });

    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
}