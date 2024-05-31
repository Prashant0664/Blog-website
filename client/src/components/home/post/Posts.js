import React, { useEffect, useState } from "react";
import "./post.css";
import { getAllPost } from "../../../helpers";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { DotLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
// import { Puff}

function Posts({category}) {
  const LIMIT = 6;
  const [totalPosts, setTotalPost] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch()
  const { posts } = useSelector(state => ({ ...state }))
  useEffect(() => {
    if (posts.length === 0) {
      x();
    }
  }, []);

  const x = async () => {
    try {
      // setUser(datad.user)
      const data = await getAllPost(activePage, LIMIT, category);
      dispatch({ type: "SET_POSTS", payload: data.posts })
      setActivePage(activePage + 1);
      setTotalPost(data.total);
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={x}
      hasMore={posts.length < totalPosts}
      loader={
        <div className="loader-container">
          <PuffLoader color="#000" size={8} className="loader" />
        </div>
      }
      endMessage={
        posts.length && (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            <b>Looks like You have reached to the end.?!</b>
          </p>
        )
      }
    >
      {(posts && posts.length === 0) ? (
        <div className="post_loader">
          <PuffLoader color="black" />
        </div>
      ) : (

        <div className="posts_container">
          {posts.map((post, i) => {

            return <PostCard post={post} key={i} type={"main"}
            />;
          })}
        </div>
      )}
    </InfiniteScroll>
  );
}

export default Posts; 