import { useState, useContext } from "react";
import axios from 'axios'
import{ toast } from 'react-toastify'
import { Modal } from "antd";
import Link  from "next/Link";
import {useRouter} from "next/router"
import AuthForm from "../components/forms/AuthForm";
import {UserContext} from "../context"

const Login = () =>{

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[loading, setLoading] = useState(false);

    const[state, setState] = useContext(UserContext);

    
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(name,email,password,secret);
        try{
            setLoading(true);
            const {data} = await axios.post(`/login`, {
            email,
            password,
            });
            //update context
            setState({
                user:data.user,
                token: data.token,
            });
            // save in local stroage
            window.localStorage.setItem('auth',JSON.stringify(data));
            router.push("/");
        }
        catch(err){
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    if(state && state.token) router.push("/");
    
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

            <div className="row">
                <div className="col">
                <div className="text-center">
                        <Link href="/forgot-password">
                            <a className="text-danger">Forgot Password</a>
                        </Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;