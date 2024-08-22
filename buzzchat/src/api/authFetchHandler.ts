import axios, { AxiosRequestConfig } from "axios";
import { VITE_SERVER_URL } from "../utils/contants";

export default async function authFetchHandler<T>({
    endpoint,
    method,
    data
}: {
    endpoint: string;
    method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT"
    data: T

}) {
    console.log("serachval ", data)

    const url = `${VITE_SERVER_URL}/${endpoint}`

    const options: AxiosRequestConfig<T> = {
        withCredentials: true,
        method: method || "GET",
        data

    }

    try {
        const response = await axios(url, options)
        return response;
    }
    catch (err) {
        console.log(err)

    }
}
