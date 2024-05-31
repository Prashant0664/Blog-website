import React from 'react'

const Intogoogle = () => {
    const gotoauth = () => {
        window.location.href = "/auth";
    }
    return (
        <>
            <div className=''>
                <div className="auth_wrapper">
                    <div className="img">
                        <img src="/sp.gif" alt="rfe" />
                        <span>Link with Google</span>
                        <p>
                            We have found your existing account. By linking your Google account, we will switch your authentication method for accessing your <b>AllBlogs</b> App account from email address to Log in with Google. Moving forward, your credentials, personal information, and two-factor authentication will be managed by your Google account.
                        </p>
                        <br />
                    </div>
                    <div className="login-cont" >
                        <div className="social google">
                            <img src="/google.jpg" alt="google" />
                            <span>Sign Up with Google</span>
                        </div>

                    </div>
                    OR
                    <div className="" style={{ textAlign: 'center', border: "solid", padding: "6px", marginLeft: "30px", marginRight: "30px", marginTop: "4px", marginBottom: "6px", cursor: "pointer" }} onClick={() => gotoauth()}>
                        <span className=''>Cancel</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Intogoogle