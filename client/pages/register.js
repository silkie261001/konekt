import { useState } from "react";


const Register = () =>{

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[secret,setSecret] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name,email,password,secret);
    }
    return (
        <div className="container-fluid">
            <div className="row py-5 bg-secondary text-light">
                <div className="col text-center">
                    <h1>Register page</h1>
                </div>
            </div>
            
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group p-1">
                            <small><label  className="text-muted"> Your Name</label></small>
                            <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            className="form-control" 
                            placeholder="Enter Name"
                            />
                        </div>

                        <div className="form-group p-1">
                            <small><label  className="text-muted">Email Id</label></small>
                            <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            className="form-control"
                            placeholder="Enter Name"/>
                        </div>

                        <div className="form-group p-1">
                            <small><label  className="text-muted">Password</label></small>
                            <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            className="form-control" 
                            placeholder="Enter Name"/>
                        </div>

                        <div className="form-group p-1">
                            <small>
                                <label className="text-muted">
                                    Pick a question
                                </label>
                            </small>
                            <select className="form-control">
                                <option >What is your favourite color</option>
                                <option >What is your best friends name</option>
                                <option >What city you born</option>
                            </select>

                            <small className="form-text text-muted">
                                You can use this to reset your password if forgotten
                            </small>

                            <div className="form-group">
                                <input 
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                type="text" 
                                className="form-control" 
                                placeholder="Your answer" />
                            </div>
                            
                            <div className="form-group  p-2">
                                <button className="btn btn-primary col-12">Submit
                            </button></div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;