import React, { useState } from 'react'
import EditpostP from '../../components/write/EditorP'
import { useParams, useNavigate } from 'react-router-dom'
import { getarticle } from '../../helpers/index'
import Navbar from '../../components/Navbar'

const Editpost = () => {
    const navigate = useNavigate();
    const [post, setpost] = useState({});
    const { id } = useParams();
    React.useEffect(() => {
        x();
    }, [])
    const x = async () => {
        try {
            const dt = await getarticle(id);
            if (dt.response && (dt.response.status === 404 || dt.response.status === 400)) {
                // navigate("/404");
            }
            setpost(dt.msg);
            return;
        }
        catch (error) {
            if (error.msg == "!article") {
                // navigate("/404");
            }
            else if (error.msg == "!user") {
                // navigate("/404");
            }
            // else if (error.msg === "error") navigate("/404");
            // console.log(error);
            return;
        }
    }
    if (!post || !post.user) {
        return <>
            <br />
            <br />
            <br />
            <br />
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: 'bold' }}>Loading....</h1>
                <p style={{ fontSize: '24px' }}>You can comment, save, bookmark and download page</p>
            </div>
        </>
    }
    else {
        return (
            <>
                <div className='WritePost' >
                    <Navbar postpage />
                    <EditpostP post={post} pflag={true} />
                </div>
            </>
        )
    }
}

export default Editpost