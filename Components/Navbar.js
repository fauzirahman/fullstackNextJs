import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie';
import Router from 'next/router';

export default function Navbar() {
    function logoutHandler(e) {
        e.preventDefault();
        Cookies.remove(`token`)

        Router.replace('/auth/login')
    }
    return (
        <div>
            <Link href="/posts"><a>Post</a></Link>
            &nbsp; | &nbsp;
            <Link href="/posts/create"><a>Create Post</a></Link>
            &nbsp; | &nbsp;
            <a href="#" onClick={logoutHandler.bind(this)}>Logout</a>
            <br />
        </div>
    )
}
