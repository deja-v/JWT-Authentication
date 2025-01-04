import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
	const [url, setUrl] = useState('')
    const [details, setDetails] = useState([])
	const [logged, setLogged] = useState(true)
    // const [clicked, setClicked] = useState(0)
    // console.log(clicked);
    
	async function updateUrl(event) {
		event.preventDefault()
        // setClicked(prev=>prev+1)
        const user = localStorage.getItem("user")
        const response = await fetch("http://localhost:8000/api",{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${user}`
			},
			body: JSON.stringify({
				url,
                user
			}),
		})
		console.log(response.json())
        
        
	}

    useEffect(()=>{
        const token = localStorage.getItem("user");
        console.log(token)
        if(!token) {
            setLogged(false)
            return;
        }
        const headers = { 'Authorization': `Bearer ${token}` };
        async function getData(){
            const res = await fetch("http://localhost:8000/api",{headers})
            const data = await res.json()
            setDetails(data);
        }
        getData()
    },[])

    const tableElements = details? details.map((item,index)=>(
        <tr key={index}>
            <td>{index+1}</td>
            <td>http://localhost:8000/api/{item.shortId}</td>
            <td>{item.redirectUrl}</td>
            <td>{item.visitHistory.length}</td>
        </tr>
    )) :<></>

    
	return (
        
		<div>
			{logged? <div className="container">
                <h1>Create your short url</h1>
            <form onSubmit={updateUrl}>
				<input
					type="text"
					placeholder="Url"
					onChange={(e) => setUrl(e.target.value)}
				/>
				<button className='short-url' type="submit" value="create" >Create</button>
			</form>

            <Link to="/">Log Out</Link>

            <table>
                <thead>
                <tr>
                    <th>S. No.</th>
                    <th>ShortUrl</th>
                    <th>Redirect</th>
                    <th>Clicks</th>
                </tr>
                </thead>
                <tbody>
                    {tableElements}
                </tbody>
            </table>
            </div>: <><h2>You should login first!</h2><Link to="/">Click here to login</Link></>}
		</div>
	)
    
}

export default Dashboard