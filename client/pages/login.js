import { useState } from "react";
import axios from 'axios'
import{ toast } from 'react-toastify'
import { Modal } from "antd";
import Link  from "next/Link";
import {useRouter} from "next/router"
import AuthForm from "../components/forms/AuthForm";

const Login = () =>{

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(name,email,password,secret);
        try{
            setLoading(true);
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
            email,
            password,
            });
            router.push("/");
        }
        catch(err){
            toast.error(err.response.data);
            setLoading(false);
        }
    };
    return (
        <div className="container-fluid">
            <div className="row py-5 text-light bg-default-image">
                <div className="col text-white text-center ">
                    <h1 className="regg">Login</h1>
                </div>
            </div>
            {/* {loading ? <h1>Loading</h1> : ""} */}
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <AuthForm 
                    handleSubmit = {handleSubmit}
                    email = {email}
                    setEmail = {setEmail}
                    password = {password}
                    setPassword = {setPassword}
                    loading = {loading}
                    page = "login"
                    // setLoading ={setLoading}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        Not yet registered?
                        <Link href="/register">
                            <a>Register</a>
                        </Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;