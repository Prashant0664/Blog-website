import React from 'react'
import { Link } from 'react-router-dom'

const Not_found = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontWeight: 'bold' }}>404</h1>
            <p style={{ fontSize: '24px' }}>Page Not Found</p>
            <br />
            <Link to="/">GO TO HOME</Link>
            <br />
            <br />
            <a href="https://www.gitbub.com/prashant0664">Guide/Code/Owner/License</a>
            <br />
            <a href="https://www.gitbub.com/prashant0664">Developed by Prashant0664</a>
        </div>
    )
}

export default Not_found