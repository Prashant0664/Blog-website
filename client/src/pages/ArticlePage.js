import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Article from '../components/article/Article';
import Navbar from '../components/Navbar';
import { getarticle, increaseView } from '../helpers/index'
import '../components/article/article.css'
function ArticlePage() {
  const navigate = useNavigate();
  const [post, setpost] = useState({});
  const { postID } = useParams();
  useEffect(() => {
    const init = async () => {
      await increaseView(postID);
      try {
        const dt = await getarticle(postID);
        if (dt.response && (dt.response.status === 404 || dt.response.status === 400)) {
          navigate("/404");
        }
        setpost(dt.msg);
        return;
      }
      catch (error) {
        if (error.msg == "!article") {
          navigate("/404");
        }
        else if (error.msg == "!user") {
          navigate("/404");
        }
        else if (error.msg === "error") navigate("/404");
        // console.log(error);
        return;
      }
    };
    init();
  }, [])
  if (!post || post.image === undefined || post.length === 0) {
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
  else
    return (
      <div className='ArticlePage'>
        <Navbar />
        <Article post={post} __id={postID} />
      </div>
    )
  // const location = useLocation()
  // const { post } = location.state;
  // if(location.state.ooo){
  //   return (
  //     <div className='ArticlePage'>
  //       <Navbar /> 
  //       <Article post={location.state.ooo} />
  //     </div>)
  // }else {
  //   return (
  //     <div className='ArticlePage'>
  //       <Navbar /> 
  //       <Article post={post} />
  //     </div>)
  // }
}

export default ArticlePage