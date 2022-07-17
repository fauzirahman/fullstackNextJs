import Router from 'next/router';
import React, { useState } from 'react'
import Navbar from '../../../Components/Navbar';
import { authPage } from '../../../middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);
    const { id } = ctx.query
    // console.log(id)
    const postReq = await fetch('http://localhost:3000/api/posts/detail/'+id, {
        headers: {            
            'Authorization': 'Bearer '+token
        }
    })

    const res = await postReq.json();
    console.log(res)
    return {
        props: {
            token,
            post: res.data
        }
    }
}

export default function PostEdit(props) {    
    console.log(props.post)
    const { post } = props;
    console.log(post.title)
    const [ fields, setFields ] = useState({
        title: post.title,
        content: post.content
    })
 

    const [status, setStatus] = useState('normal')

    async function updateHandler(e) {
        e.preventDefault();

        // console.log(fields)
        setStatus('loading')
        
        const { token } = props;
        // console.log(token)
        // console.log(fields)
        const update = await fetch('/api/posts/update/'+post.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(fields)
        })

        if(!update.ok) return setStatus('error')

        const res = await update.json();
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
            <h1>Edit Posts</h1>
            <Navbar />
            <form onSubmit={ updateHandler.bind(this)}>
                <input name="title"
                onChange={fieldHandler.bind(this)}
                type="text" placeholder="title" defaultValue={post.title} /><br />

                <textarea name="content"
                onChange={fieldHandler.bind(this)} placeholder="content" defaultValue={post.content}/><br />

                <br />
                <button type="submit">Save</button>
                <div>Status Login: {status}</div>
            </form>
        </div>
    )
}
