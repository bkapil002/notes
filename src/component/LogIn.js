import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import{useNavigate} from 'react-router-dom'

const LogIn = () => {
    const [condition, setCondition] = useState({ email: "", password: "" });
    let history = useNavigate()
    const[error , setError] = useState()
     
    const handleChange = (e) => {
        setCondition({ ...condition, [e.target.name]: e.target.value });
    };
    const ClickSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: condition.email   ,   password: condition.password   })
        });
        const json = await response.json()  
        console.log(json)
        if(response.ok){
         localStorage.setItem('token' , json.token)
         history('/')
        }
        else{
            setError(json.error)
            // setTimeout(() => {
            //      setError('')
            // }, 3000);
        }
    }
   
    return (
        <div>
            <form onSubmit={ClickSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={condition.email} onChange={handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={condition.password} onChange={handleChange} />
                </div>
                <div >
                <h6>create new acount <Link className="link-opacity-100" to="/SignUp" type="submit">SignUp</Link></h6>
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default LogIn;
