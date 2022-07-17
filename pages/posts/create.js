import Router from 'next/router';
import React, { useState } from 'react'
import Navbar from '../../Components/Navbar';
import { authPage } from '../../middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);
    return {
        props: {
            token
        }
    }
}

export default function PostCreate(props) {
    const [ fields, setFields ] = useState({
        title: '',
        content: ''
    })

    const [status, setStatus] = useState('normal')

    async function createHandler(e) {
        e.preventDefault();

        setStatus('loading')
        
        const { token } = props;
        console.log(token)
        // console.log(fields)
        const create = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(fields)
        })

        if(!create.ok) return setStatus('error')

        const res = await create.json();
        // console.log(res)
        setStatus('Sukses')

        Router.push('/posts/')
    }
    function fieldHandler(e) {
        const target = e.target
        const name = target.getAttribute('name')
        const value = target.value
        console.log(name, e.target.value)

        setFields({
            ...fields,
            [name]: value
        })
    }
    return (
        <div>
            <h1>Create Posts</h1>
            <Navbar />
            <form onSubmit={ createHandler.bind(this)}>
                <input name="title"
                onChange={fieldHandler.bind(this)}
                type="text" placeholder="title" /><br />

                <textarea name="content"
                onChange={fieldHandler.bind(this)} placeholder="content" /><br />

                <br />
                <button type="submit">Create Post</button>
                <div>Status Login: {status}</div>
            </form>
        </div>
    )
}
