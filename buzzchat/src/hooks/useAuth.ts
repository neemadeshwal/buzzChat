import { useState } from "react";
import { LoginData, SignupData } from "../utils/types";
import { userLogin, userSignup } from "../api/authApiHandler";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"
import { useCookies } from "react-cookie";


export default function useAuth() {
    const { setLoggedInUser } = useAuthContext()

    const [_cookie, _setCookie, removeCookie] = useCookies(["token"])
    const navigate = useNavigate()

    const [loading, setLoading] = useState<"login" | "signup" | null>(null)

    const [signupData, setSignupData] = useState<SignupData>({
        fullName: "",
        email: "",
        password: "",
        cPassword: "",
        showCP: false,
        showP: false,
        imageUrl: ""

    })

    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
        showP: false
    })

    const handleSignUpDataChange = ({ key, value }: { key: string, value: string | boolean }) => {


        setSignupData(prevVal => ({ ...prevVal, [key]: value }))

    }
    const handleLoginDataChange = ({ key, value }: { key: string, value: string | boolean }) => {
        setLoginData(prevVal => ({ ...prevVal, [key]: value }))
    }



    const handleSignup = async () => {
        setLoading("signup");
        try {
            const response = await userSignup(signupData)

            if (response && response?.data) {
                setLoggedInUser({ isAuthenticated: true, user: response?.data })
                navigate("/")
                setLoading(null)

            }
        }
        catch (error) {
            console.log(error)
            toast.error(error?.toString() ?? `failed to sign up please try again`)
            setLoading(null)

        }

    }

    const handleLogin = async () => {
        setLoading("login")

        try {
            const response = await userLogin(loginData)

            if (response && response?.data) {
                setLoggedInUser({ isAuthenticated: true, user: response?.data })
                navigate("/")
                setLoading(null)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error?.toString() ?? `failed to sign up please try again`)
            setLoading(null)
        }
    }

    const handleLogout = async () => {
        await removeCookie("token")
    }


    return { signupData, handleSignUpDataChange, handleSignup, loading, loginData, handleLogin, handleLoginDataChange, handleLogout }
}