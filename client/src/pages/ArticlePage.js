import React from 'react'
import { useLocation } from 'react-router-dom'
import Article from '../components/article/Article';
import Navbar from '../components/Navbar';
import '../components/article/article.css'

function ArticlePage() {
  const location = useLocation()
  const { post } = location.state;
  return (
    <div className='ArticlePage'>
      <Navbar />
      <Article post={post} />
    </div>
  )
}

export default ArticlePage