import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [condition, setCondition] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const handleChange = (e) => {
        setCondition({ ...condition, [e.target.name]: e.target.value });
    };

    const ClickSubmit = async (e) => {
        e.preventDefault();

        if (condition.password !== condition.cpassword) {
            setError("Passwords do not match");
            return;
        }

        const response = await fetch("http://localhost:5000/api/auth/asink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: condition.name,
                email: condition.email,
                password: condition.cpassword,
            })
        });

        const json = await response.json();
        console.log(json);

        if (response.ok) {
            localStorage.setItem('token', json.token);
            navigate('/ThankU');
        } else {
            setError(json.error);
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    }

    return (
        <div>
            <form onSubmit={ClickSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={condition.name} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={condition.email} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={condition.password} onChange={handleChange} minLength={6} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={condition.cpassword} onChange={handleChange} minLength={6} required/>
                </div>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signin;
