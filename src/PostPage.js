import { useParams, Link } from 'react-router-dom'
import React, {  useContext } from "react";
import DataContext from "./context/DataContext";

const PostPage = () => {
  const {posts, handleDelete } = useContext(DataContext)
 
  const {id} = useParams(); //gets params
  const post = posts.find(post=> (post.id).toString() === id);
 
  return (
<main className='PostPage'>
  <article className="post">
    {post && 
      <>
        <h2>{post.title}</h2>
        <p className="postDate">{post.datetime}</p>
        <p className="postDate">{post.body}</p>
        <Link to={ `/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
        <button className="deleteButton" onClick={()=> handleDelete(post.id)}>Delete Post</button>
      </>
    }
    { !post &&
      <>
      <h2>Post not found</h2>
        <p >Well That's disappointing</p>
        <p><Link to="/">Visit our Homepage</Link></p>
        
      </>
    }
  </article>
  </main>
  )
}

export default PostPage