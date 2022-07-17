import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import cookies from "next-cookies";
import Link from "next/link";
import { unauthPage } from "../../middlewares/authorizationPage"

export async function getServerSideProps(context) {    
    await unauthPage(context);
    
    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default function Login() {
    // setFields untuk mengeset fieldnya
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    const [status, setStatus] = useState('normal')

    // Similar to componentDidMount and componentDidUpdate:
    // Secara otomatis di halaman posts karena sudah punya token
    // useEffect(() => {
    //     const token = Cookies.get('token');
    //     console.log('update')
    //     if(token) return Router.push('/posts')        
    // },[]);


    async function loginHandler(e) {
        e.preventDefault();

        setStatus('loading')

        const loginReq = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })


        if(!loginReq.ok) return setStatus('error '+loginReq.statusText);

        const loginRes = await loginReq.json()
        setStatus('Sukses')
        Cookies.set('token', loginRes.token)
        Router.push('/posts/')
    }
    
    function fieldHandler(e) {
        console.log(e.target.value);
        const name = e.target.getAttribute('name')
        // ini tempat update/ganti state
        setFields({
            ...fields, ///akan kombinasi field key yg di input dari email & password (tanpa diambil nilai terakhir)
            [name]: e.target.value  ///diisi dynamic value username & password, akan mengset key nilai terakhir
        })
    }


    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={ loginHandler.bind(this)}>
                <input name="email"
                onChange={fieldHandler.bind(this)}
                type="text" placeholder="email" /><br />

                <input name="password"
                onChange={fieldHandler.bind(this)}
                type="password" placeholder="password" /><br />

                <br />
                <button type="submit">Login</button>
                <div>Status Login: {status}</div>
                <Link href="/auth/register"><a>Register</a></Link>
            </form>
        </div>
        
    )
}