import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
    // setFields untuk mengeset fieldnya
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    const [status, setStatus] = useState('normal')

    async function RegisterHandler(e) {
        //bakal mencegah action method form
        e.preventDefault();
        console.log(fields)
        setStatus('loading')

        const registerReg = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'                
            }
        });

        if(!registerReg.ok) return setStatus('error ' + registerReg.status)

        const registerRes = await  registerReg.json();
        setStatus('sukses')
    }

    function fieldHandler(e) {
        console.log(e.target.value);
        const name = e.target.getAttribute('name')
        // ini tempat update/ganti state
        setFields({
            ...fields, ///akan kombinasi field key yg di input dari email & password tanpa ini hanya diambil nilai terakhir
            [name]: e.target.value  ///diisi dynamic value username & password, akan mengset key nilai terakhir
        })
    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={ RegisterHandler.bind(this)}>
                <input name="email"
                onChange={fieldHandler.bind(this)}
                type="text" placeholder="email" /><br />

                <input name="password"
                onChange={fieldHandler.bind(this)}
                type="password" placeholder="password" /><br />

                <br />
                <button type="submit">Register</button>
            </form>
            <div>Status insert data: {status}</div>
            <Link href="/auth/login"><a>Login</a></Link>
        </div>
        
    )
}