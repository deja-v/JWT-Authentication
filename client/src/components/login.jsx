import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	async function loginUser(event) {
		event.preventDefault()

        const response = await fetch("http://localhost:8000/user/login",{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password
			}),
			// credentials: "true"
		})
		const data = await response.json()
		// if(response.status == 200){
		// 	cookies.set('jwt', data.user)
		// 	// console.log('email', data.email)
		//   }
		
		if(data.user){
			alert("login successful")
			localStorage.setItem("user",data.user)
			window.location.href = '/dashboard'
		}
		else {
			alert("please check email or password")
		}
			
		
	}

	useEffect(()=>{
		localStorage.clear()
	},[])

	return (
		// <div>
		// 	<h1>Login</h1>
		// 	<form onSubmit={loginUser}>
        //         <label htmlFor="Email">Email : </label>
		// 		<input
		// 			value={email}
		// 			onChange={(e) => setEmail(e.target.value)}
		// 			type="email"
		// 			placeholder="Email"
		// 		/>
		// 		<br />
        //         <label htmlFor="password">Password : </label>
		// 		<input
		// 			value={password}
		// 			onChange={(e) => setPassword(e.target.value)}
		// 			type="password"
		// 			placeholder="Password"
		// 		/>
		// 		<br />
		// 		<input type="submit" value="Login" />
		// 	</form>
		// </div>

		<div className="wrapper signIn">
			<div className="form">
				<div className="heading">LOGIN</div>
				<form>
					<div className='email-login'>
						<label htmlFor="e-mail">Email</label>
						<input onChange={(e) => setEmail(e.target.value)} type="email" id="e-mail" placeholder="Enter you mail" />
					</div>
					<div className='password-login'>
						<label htmlFor="password">Password</label>
						<input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Enter your password" />
					</div>
					<button type="submit" onClick={loginUser}>
						Submit
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/register"> Sign Up </Link>
				</p>
			</div>
		</div>
	)
}

export default App