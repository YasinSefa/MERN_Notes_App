import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header>
            <div class="container">
                <Link to="/">
                    <h1>NotePad</h1>
                </Link>
            </div>
        </header>
    )
}
