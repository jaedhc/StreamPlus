import './SignUp.css'
import play from '../../../assets/play.svg'
import { useState } from 'react';
import axios from 'axios';

export function SignUp({onClose, setUid, onLogin}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState(false);


    const handleSetUid = (value) => {
        setUid(value);
    }

    const handleSignUp = async() => {
        try{
            const API_URL = import.meta.env.VITE_API_URL;

            const response = await axios.post(`${API_URL}/register`,{
                name: username,
                email: email,
                password: password
            });

            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('id', response.data.user.id);
            handleSetUid(response.data.token)
            setStatus(false);
        }catch(error){
            console.error(error)
            setStatus(true);
        }
    }

    const handleSubmit = (evento) => {
        evento.preventDefault();
        handleSignUp();
    } 
    
    return(
        <div className='sg-background' onClick={onClose}>
            <div className='sg-content' onClick={(e) => e.stopPropagation()} on>
            <div className='sg-content-logo'>
                    <h2 className='sg-content-logo-text'>STREAMING PLUS</h2>
                    <img className='sg-content-logo-img' src={play} alt='logo'/>
                </div>
                <form className='sg-content-form' onSubmit={handleSubmit}>
                    <p className='sg-content-label'>Email</p>
                    <input 
                        className='sg-content-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        type='email' 
                        placeholder='Correo electrónico'/>
                    {status && <p className='sg-content-error'>Revise los campos de nuevo</p>}
                    <p className='sg-content-label'>Nombre de usuario</p>
                    <input 
                        className='sg-content-input'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        type='name' 
                        placeholder='Nombre de usuario'/>
                    {status && <p className='sg-content-error'>Revise los campos de nuevo</p>}
                    <p className='sg-content-label'>Contraseña</p>
                    <input 
                        className='sg-content-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        type='password' 
                        placeholder='Contraseña'/>
                    {status && <p className='sg-content-error'>Revise los campos de nuevo</p>}
                    <p className='sg-content-signup' onClick={onLogin}>Ya tienes cuenta? Inicia Sesión</p>
                    <button className='sg-content-button' type='submit'>Registrarse</button>
                </form>
            </div>
        </div>
    )
}