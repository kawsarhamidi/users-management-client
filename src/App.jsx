import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [counts, setCount] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setCount(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);

    fetch('http://localhost:3000/users',{
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newCounts = [...counts, data]
        setCount(newCounts);
        form.reset();
      })

    // fetch('http://localhost:3000/users', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(user)
    // })
    // .then(res => res.json())
    // .them(data => {
    //   console.log('inside post response', data);
    // })

  }

  return (
    <>

      <h1>Users Management</h1>
      <h3>Users Management {counts.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type='text' name='name' id='' />
        <br />
        <input type='email' name='email' id='' />
        <br />
        <input type='submit' value="add user" name='' id='' />
        <br />
      </form>
      <div className="">
        {
          counts.map(count => <p key={count.id}>{count.id} : {count.name} : {count.email}</p>)
        }
      </div>
    </>
  )
}

export default App
