import { useParams, Link } from "react-router-dom";
import React, { useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(DataContext);

  const { id } = useParams(); //gets params
  const post = posts.find((post) => post.id.toString() === id);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);

      setPosts(postsList);
      navigate("/"); //accessing browser history with react router and serving component instead of requesting anything from server
    } catch (err) {
      if (err.response) {
        // not in 200 Response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error :${err.message}`);
      }
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postDate">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post not found</h2>
            <p>Well That's disappointing</p>
            <p>
              <Link to="/">Visit our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
