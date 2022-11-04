import { useState , useContext} from "react";
import axios from 'axios'
import{ toast } from 'react-toastify'
import { Modal } from "antd";
import Link  from "next/Link";
import { UserContext } from "../context";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { useRouter } from "next/router";


export const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(name, email, password, secret);
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      });
  
      console.log("forgot password res => ", data);
  
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
  
      if (data.success) {
        setEmail("");
        setNewPassword("");
        setSecret("");
        setOk(true);
        setLoading(false);
        toast.success("Successfully changed");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
};

const ForgotPassword = () =>{

    // const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[newPassword,setNewPassword] = useState("");
    const[secret,setSecret] = useState("");
    const[ok,setOk] = useState(false);
    const[loading, setLoading] = useState(false);

    const[state] = useContext(UserContext);

    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(name,email,password,secret);
        try{
            setLoading(true);
            const {data} = await axios.post(`/forgot-password`, {
            // name,
            email,
            newPassword,
            secret,
            });
            // setName("");
            setEmail("");
            setNewPassword("");
            setSecret("");
            setOk(data.ok);
            setLoading(false);
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
                    <h1 className="regg">Forgot Password</h1>
                </div>
            </div>
            {/* {loading ? <h1>Loading</h1> : ""} */}
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <ForgotPasswordForm 
                    handleSubmit = {handleSubmit}
                    // name = {name}
                    // setName = {setName}
                    email = {email}
                    setEmail = {setEmail}
                    newPassword = {newPassword}
                    setNewPassword = {setNewPassword}
                    secret = {secret}
                    setSecret = {setSecret}
                    loading = {loading}
                    // setLoading ={setLoading}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Modal
                        title="Congratulations!"
                        open={ok}
                        onCancel= {()=> setOk(false)}
                        footer = {null}
                    >
                        <div>Password is changed</div>
                        <Link href="/login">
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
// export default handleSubmit;