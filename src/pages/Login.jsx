import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export default function Login(){
    const [form, setForm] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
        console.log("API URL:", process.env.REACT_APP_API_URL);
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,form);
        localStorage.setItem("token", res.data.token);
        navigate('/');
        }catch (err) {
  console.error(err);
  if (err.response && err.response.data && err.response.data.error) {
    alert(err.response.data.error);
  } else {
    alert("An unexpected error occurred. Check the console for more info.");
  }
}
        
    }
     const handleRegister = ()=>{
        navigate('/register')
    }
    return(<div className='flex justify-center items-center text-center h-screen w-screen'>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <h1 className='font-serif mb-[10px] w-full'>Login</h1>
                <div >
                    <input type="email" 
                    name="login_email" 
                    placeholder="email" 
                    autoComplete="new-email" 
                    required onChange={(e)=> setForm({...form, email: e.target.value})}
                    className='bg-gray-300 p-[5px] mb-[10px] rounded w-full text-black font-semibold'/><br/>

                    <input type="password" 
                    name="login_password" 
                    placeholder="password"
                     autoComplete="new-password" 
                     required onChange={(e)=> setForm({...form, password: e.target.value})}
                     className='bg-gray-300 p-[5px] mb-[10px] rounded w-full text-black font-semibold'/><br/>
                </div>
                <button type='submit' className='w-full font-semibold bg-blue-800 hover:bg-blue-900 text-white py-2 rounded '>login</button>
                <p className='self-center m-[10px]' >or</p>
                <button onClick={handleRegister} className='w-full font-semibold bg-blue-800 hover:bg-blue-900 text-white py-2 rounded '>Register</button>
                
            </form>
        </div>)
}