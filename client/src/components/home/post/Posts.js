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
  const [loadError, setLoadError] = useState(false);
  const [loaded, setLoaded] = useState(false);
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
      if (!data || !Array.isArray(data.posts)) {
        setLoadError(true);
        return;
      }
      setLoadError(false);
      setLoaded(true);
      dispatch({ type: "SET_POSTS", payload: data.posts })
      setActivePage(activePage + 1);
      setTotalPost(data.total);
    } catch (error) {
      // console.log(error);
      // console.log(error);
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
        posts.length > 0 && (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            <b>Looks like You have reached to the end.?!</b>
          </p>
        )
      }
    >
      {(posts.length === 0 && loadError) ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Couldn't load posts. Please check that the server is running and try again.
        </p>
      ) : (posts.length === 0 && loaded) ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No posts yet. Be the first to write one!
        </p>
      ) : (posts.length === 0) ? (
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