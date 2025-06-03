import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Register(){
    const [form, setForm] = useState({name:"", email:"", password:""})
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/api/auth/register", form);
            alert('registration successful');
            navigate('/login')
        } catch(err) {
            alert(err.response.data.error)
        }
    
    }
    const handleLogin = ()=>{
        navigate('/login')
    }
    return(
        <div className='flex justify-center items-center text-center h-screen w-screen'>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <h1 className='font-serif mb-[10px] w-full ' >Register</h1>
                <div>
                    <input type="text"
                     name="name"
                     placeholder="name"
                     onChange={(e)=> setForm({...form, name: e.target.value})} 
                     autoComplete='off' className='bg-gray-300 p-[5px] mb-[10px] rounded w-full text-black font-semibold' /><br/>

                    <input type="email" 
                     name="register_email" 
                     placeholder="email" 
                     autoComplete="new-email" 
                     required 
                     onChange={(e)=> setForm({...form, email: e.target.value})}
                     className='bg-gray-300 p-[5px] mb-[10px] rounded w-full text-black font-semibold'/><br/>

                    <input type="password" 
                     name="register_password" 
                     placeholder="password" 
                     autoComplete="new-password" 
                     required
                     onChange={(e)=> setForm({...form, password: e.target.value})}
                     className='bg-gray-300 p-[5px] mb-[10px] rounded w-full text-black font-semibold'/>

                </div>
                <button type='submit' className='w-full font-semibold bg-blue-800 hover:bg-blue-900 text-white py-2 rounded '>Register</button>
                <p className='self-center m-[10px]' >or</p>
                <button onClick={handleLogin} className='w-full font-semibold bg-blue-800 hover:bg-blue-900 text-white py-2 rounded '>Login</button>

            </form>
        </div>
    )

}