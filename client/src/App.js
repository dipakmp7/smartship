import './App.css';
import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios'

function App() {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [userlist,setUserList] = useState([])

  //for update api
  const [newUserData,setNewUserData] = useState({name:'',email:'',password:''})

  useEffect(()=>{
    axios.get('http://localhost:2001').then((resp)=>{
      // console.log(resp.data);
      setUserList(resp.data)
    })
  },[])

  const submitdata = ()=>{
    axios.post('http://localhost:2001/insert',{
      name:name,
      email:email,
      password:password
    }).then((resp)=>{
      console.log(resp.data);
      // setUserList(resp.data)
    })
    setUserList([
      ...userlist,
      {name:name,email:email,password:password},
    ])
  }

  const deleteData =(id)=>{
    axios.delete(`http://localhost:2001/delete/${id}`).then((resp)=>{
    console.log(resp.data)
  })
    setUserList([
      ...userlist,
      {name:name,email:email,password:password}
    ])
  }


  const updateData = (id)=>{
    axios.put(`http://localhost:2001/update/${id}`,{
      name:name,
      email:email,
      password:password,
    }).then((resp)=>{
      console.log(resp.data)
    })
    setNewUserData([
      ...newUserData,
      {name:name,email:email,password:password},
    ])
  }

  return (
    <div className="App">
      <div className='container'>
        <h2>User Application</h2>

      <div className='container' style={{marginTop : 50}}>
      <div className='form'>
          <label>Name : </label>
          <input type='text' name='name' onChange={(e)=>{setName(e.target.value)}} required></input>
        </div>
<br/>
        <div className='form'>
          <label>Email : </label>
          <input type='email' name='email' onChange={(e)=>{setEmail(e.target.value)}} required></input>
        </div>
<br/>
<div className='form'>
          <label>Passsword : </label>
          <input type='password' name='password' onChange={(e)=>{setPassword(e.target.value)}} required></input>
        </div>
<br/>
        <div className='form'>
          <button onClick={submitdata}>Submit</button>
        </div>
        
<hr/>
        <div>
        <br/><br/>
        <div className="container">
            
            <table>
                <thead>
                    <th>ID</th>    
                    <th>Name</th>    
                    <th>Email</th>    
                    <th>Passsword</th>    
                  
                </thead>    

                <tbody>
                    {
                        userlist.map(
                            user => 
                            <tr  key={user.id}>
                                <td>{user.id}</td> 
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>

                                <td>
                                  <button onClick={()=>deleteData(user.id)}>Delete</button>
                                </td>

                                <td>
                                  <button onClick={()=>updateData(user.id)}>Update</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        </div>
      </div>
  

      </div>
    </div>
  );
}

export default App;



