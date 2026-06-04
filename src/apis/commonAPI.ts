import axios,{AxiosError, type Method} from "axios";

  
 const  baseURL="https://hostel-management-backend-4jyb.onrender.com"
    // const  baseURL="http://localhost:3000"

const api = axios.create({
    baseURL,
    withCredentials:true
})


const commonAPI = async <T=unknown>(
    method:Method,
    url:string,
    data?:unknown

):Promise<T>=>{

    try{

        const {data:res} = await api({method,url,data})
        return res

    }
    catch(err:unknown){
        const axiosError = err as AxiosError<{ message?: string }>
        throw new Error(
            axiosError.response?.data?.message || "request failed"
        )
    }

}

export default commonAPI