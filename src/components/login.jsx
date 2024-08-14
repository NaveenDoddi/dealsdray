import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
//     const navigate = useNavigate(); // Replace useHistory with useNavigate
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            fetch("http://localhost:3001/api/login/"+username)
            .then(response => response.json())
            .then((data)=> {
                console.log(data.password)
                try {
                    if(username == data.email){
                        if(password == atob(data.password)){
                            sessionStorage.setItem("user",JSON.stringify(data))
                            window.location.href = "./dashboard"
                        }else{
                            window.alert("check password")

                        }
                    }else{
                        window.alert("user not found")
                    }
                } catch (error) {
                    window.alert("user not found")
                }
            })

        } catch (err) {
            alert(err.message);
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <img src=".\logo.png" alt="Company Logo" />
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="email/username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" >Login</button>
                </form>

                <h5>new user? create account <a href="/signup">here</a></h5>
            </div>

        </div>
    );
}

export default LoginPage;
