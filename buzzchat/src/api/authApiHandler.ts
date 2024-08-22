import { SERVER_ENDPOINTS } from "../utils/contants"
import { LoginData, SignupData } from "../utils/types"
import authFetchHandler from "./authFetchHandler"

export const userSignup = async (signupData: SignupData) => {

    const response = await authFetchHandler({
        endpoint: SERVER_ENDPOINTS.AUTH.SIGNUP,
        method: "POST",
        data: {
            email: signupData?.email,
            password: signupData?.password,
            name: signupData?.fullName,
            imageUrl: signupData?.imageUrl
        }
    })

    return response
}


export const userLogin = async (loginData: LoginData) => {
    const response = await authFetchHandler({
        endpoint: SERVER_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        data: {
            email: loginData?.email,
            password: loginData?.password
        }
    })
    return response;
}