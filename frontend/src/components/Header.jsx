import React, { useState } from 'react'
import './header.css'

export default function Header() {
    const [user, setUser] = useState(false);
    return (
        <div className='header'>
            <div className="header_user">
                <p>Hi, Guest</p>
            </div>
            <div className="header_auth">
                { user ? <button>Logout</button> : <button>Login</button>}
            </div>
        </div>
    )
}
