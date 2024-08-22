import { SERVER_ENDPOINTS } from "../utils/contants"
import authFetchHandler from "./authFetchHandler"

export const getAllUsers = async (searchUserVal?: string) => {
    const response = await authFetchHandler({
        endpoint: SERVER_ENDPOINTS.USERS.GET,
        method: "POST",
        data: { search: searchUserVal }
    })
    return response?.data ?? [];

}