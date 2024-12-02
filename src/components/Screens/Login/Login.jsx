import './Login.css'
import play from '../../../assets/play.svg'
import { useState } from 'react';

import axios from 'axios';

export function Login({onClose, setUid, onSignUp}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(false);


    const handleSetUid = (value) => {
        setUid(value);
    }

    const handleLogin = async(email, password) => {
        try{
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${API_URL}/login`,{
                email: email,
                password: password
            });

            const id = response.data.user.id;
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('id', id);
            //const userCredential = await signInWithEmailAndPassword(auth, email, password)
            //const user = userCredential.user;
            //console.log("Usuario autenticado: ", user);
            handleSetUid(id);
            setStatus(false);
        } catch(error) {
            setStatus(true);
            console.error("Error al iniciar sesión: ", error);
        }
    }

    const handleSubmit = (evento) => {
        evento.preventDefault();
        handleLogin(email,password)
    } 

    return(
        <div className='lg-background' onClick={onClose}>
            <div className='lg-content' onClick={(e) => e.stopPropagation()} on>
                <div className='lg-content-logo'>
                    <h2 className='lg-content-logo-text'>STREAMING PLUS</h2>
                    <img className='lg-content-logo-img' src={play} alt='logo'/>
                </div>
                <form className='lg-content-form' onSubmit={handleSubmit}>
                    <p className='lg-content-label'>Email</p>
                    <input 
                        className='lg-content-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        type='email' 
                        placeholder='Correo electrónico'/>
                    {status && <p className='lg-content-error'>Revise los campos de nuevo</p>}
                    <p className='lg-content-label'>Contraseña</p>
                    <input 
                        className='lg-content-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        type='password' 
                        placeholder='Contraseña'/>
                    {status && <p className='lg-content-error'>Revise los campos de nuevo</p>}
                    <p className='lg-content-signup' onClick={onSignUp}>No tienes cuenta? Registrate aquí</p>
                    <button className='lg-content-button' type='submit'>Iniciar Sesión</button>
                </form>
            </div>
        </div>
    )
}