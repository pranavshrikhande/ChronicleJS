import React, { useState, useEffect, useContext } from "react";
import DataContext from "./context/DataContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "./api/posts";
import { format } from "date-fns";

const EditPost = () => {
  const navigate = useNavigate();

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const {
    posts,

    setPosts,
  } = useContext(DataContext);

  const handleEdit = async (id) => {
    //we need to have new state for edit body and title
    const datetime = format(new Date(), "MMMM dd, yyyy pp");

    const updatedBody = { id, title: editTitle, datetime, body: editBody };

    try {
      const response = await api.put(`/posts/${id}`, updatedBody);

      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
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

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post: </label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}{" "}
      {!editTitle && (
        <>
          <h2>Post not found</h2>
          <p>Well That's disappointing</p>
          <p>
            <Link to="/">Visit our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
