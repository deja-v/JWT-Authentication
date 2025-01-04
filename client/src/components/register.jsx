import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
export default function Register(){
    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()
        const response = await fetch("http://localhost:8000/user",{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password
			}),
		})
		console.log(response.status)
		if(response.status===200)
			window.location.href = '/'
		else
			alert("Error Signing up")
        
	}
	useEffect(()=>{
			localStorage.clear()
	},[])

    return (
        // <div>
		// 	<h1>Register</h1>
		// 	<form onSubmit={registerUser}>
		// 		<label htmlFor="name">Name : </label>
		// 		<input
		// 			value={name}
		// 			onChange={(e) => setName(e.target.value)}
		// 			type="text"
		// 			placeholder="Name"
		// 		/>
		// 		<br />
		// 		<label htmlFor="email">Email : </label>
		// 		<input
		// 			value={email}
		// 			onChange={(e) => setEmail(e.target.value)}
		// 			type="email"
		// 			placeholder="Email"
		// 		/>
		// 		<br />
		// 		<label htmlFor="password">Password : </label>
		// 		<input
		// 			value={password}
		// 			onChange={(e) => setPassword(e.target.value)}
		// 			type="password"
		// 			placeholder="Password"
		// 		/>
		// 		<br />
		// 		<input type="submit" value="Register" />
		// 	</form>
		// </div>
		<div className="wrapper signUp">
      
			<div className="form">
				<div className="heading">CREATE AN ACCOUNT</div>
				<form onSubmit={registerUser} >
				<div className="name-login">
					<label htmlFor="name">Name</label>
					<input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="Enter your name" />
				</div>
				<div className="email-login">
					<label htmlFor="name">E-Mail</label>
					<input onChange={(e) => setEmail(e.target.value)} type="text" id="e-mail" placeholder="Enter your mail" />
				</div>
				<div className="password-login">
					<label htmlFor="password">Password</label>
					<input
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					id="password"
					placeholder="Enter you password"
					/>
				</div>
				<button  type="submit">Submit</button>
				<h2 align="center" class="or">
					OR
				</h2>
				</form>
				<p>
				Have an account ? <Link to="/"> Login </Link>
				</p>
			</div>
		</div>
    )
}