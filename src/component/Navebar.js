import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let history = useNavigate()
  const LogeOut = () =>{
    localStorage.removeItem('token')
    history('login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link style={{display:'none'}} className="nav-link active " to="/">Home</Link>
              </li>
                
              <li className="nav-item">
                <Link className="nav-link" style={{display : 'none'}} to="/Thanku">thankyu</Link>
              </li> 
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
            <Link className="fa-solid fa-right-to-bracket mx-2" style={{borderInline: "none"}} to="/login" type="submit"> Login</Link>
            </form>:<button onClick={LogeOut} className='fa-solid fa-right-from-bracket'> LogOut</button> }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
