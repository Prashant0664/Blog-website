import React from 'react'
import { useLocation } from 'react-router-dom'
import Article from '../components/article/Article';
import Navbar from '../components/Navbar';
import '../components/article/article.css'

function ArticlePage() {
  const location = useLocation()
  const { post } = location.state;
  if(location.state.ooo){
    return (
      <div className='ArticlePage'>
        <Navbar /> 
        <Article post={location.state.ooo} />
      </div>)
  }else {
    return (
      <div className='ArticlePage'>
        <Navbar /> 
        <Article post={post} />
      </div>)
  }
}

export default ArticlePage