import React, { useState } from 'react'
import { authPage } from '../../middlewares/authorizationPage'
import Router from 'next/router';
import Navbar from '../../Components/Navbar';

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx)
    const secret = process.env.JWT_SECRET
    console.log(secret)
    //URL ini relative tergantung dari url browser
    const postReq = await fetch('http://localhost:3000/api/posts', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const posts = await postReq.json();

    // hanya bisa diliat di terminal/environment node.js
    console.log(posts)

    return {
        props: {
            token,
            posts : posts.data, // will be passed to the page component as props
        }
      }
}
export default function PostIndex(props) {    
    const [posts, setPosts] = useState(props.posts) // props.posts akan dijadikan state 'posts' yg ditampilkan ke html

    const secret = process.env.JWT_SECRET
    console.log(secret)

    // console.log(posts) //bisa dicek terminal
    async function deleteHandler(id, e) {
        e. preventDefault();

        const { token } = props;
        console.log(token)
        const ask = confirm("Apakah data ini dihapus")

        if(ask) {
            const deletePost = await fetch('/api/posts/delete/'+id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            const res = await deletePost.json();

            const postFiltered = posts.filter(post => {
                return post.id !== id && post
            })

            setPosts(postFiltered) // akan dirender ke html posts
        } 
    }

    function editHandler(id){
        Router.push('/posts/edit/'+id)
    }
    return (
        <div>
            <h1>Posts</h1>
            <Navbar />
            { posts.map(post => (
                    <div key={post.id}>
                        <h3>{ post.title } </h3>
                        <p>{ post.content}</p> 
                        <div>
                            <button onClick={editHandler.bind(this, post.id)}>Edit</button>
                            <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
                        </div>
                        <hr />
                    </div>
                )
            )}
        </div>
    )
    
}
