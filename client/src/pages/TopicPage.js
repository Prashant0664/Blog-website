import React, { useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { getAllPost } from '../helpers';
import HomePage from './HomePage';


const TopicPage = ({user}) => {
    const { id } = useParams();
    return (
        <>
            <HomePage category={id} user={user}/>
        </>
    )
}

export default TopicPage