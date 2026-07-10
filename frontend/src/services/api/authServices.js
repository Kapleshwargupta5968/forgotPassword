import axiosInstance from "./axiosInstance";

export const Signup = async (data) => {
    try {
        const response = await axiosInstance.post("/api/auth/signup", data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const Signin = async(data) => {
    try{
        const response = await axiosInstance.post("/api/auth/signin", data);
        localStorage.setItem("hasSession", true);
        return response;
    }catch(error){
        throw error;
    }
};

export const Signout = async () => {
    try{
        const response = await axiosInstance.post("/api/auth/logout");
        localStorage.removeItem("hasSession");
        return response;
    }catch(error){
        throw error;
    }
};  