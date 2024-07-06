import React, { useEffect, useContext } from "react";
import DataContext from "./context/DataContext";
import { useParams, Link } from "react-router-dom";

const EditPost = () => {
  
  const {
    posts,
    handleEdit,
    editBody,
    setEditBody,
    editTitle,
    setEditTitle,
  } = useContext(DataContext);
  
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
