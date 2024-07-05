//React router routes components

import { Route, Routes ,useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { format } from "date-fns";

function App() {

  const [posts, setPosts] = useState([])  


  const[search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const navigate = useNavigate(); //React Router v6 introduced a paradigm shift with the useNavigate hook, offering a more concise and streamlined approach to manage navigation within components. Unlike useHistory, useNavigate simplifies the navigation process by providing a single function for triggering route changes.


  useEffect(()=>{
    const filteredResults = posts.filter(
      post=> ((post.body).toLowerCase()).includes(search.toLowerCase())
      ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());

  },[posts, search])

  const handleSubmit = (e)=>{
    e.preventDefault();

    const id = posts.length ? Number(posts[posts.length-1].id) + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, body: postBody, datetime: datetime};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }



  const handleDelete=(id)=>{

    const postsList = posts.filter(post=> post.id !== id);
    setPosts(postsList);
    navigate('/'); //accessing browser history with react router and serving component instead of requesting anything from server
  }

  return (
    <div className="App">
      <Header  title="Daily Chronicles"/>
      <Nav  search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />

        <Route path="/post" element={<NewPost handleSubmit={handleSubmit} postTitle ={postTitle} setPostTitle={setPostTitle} postBody={postBody}
        setPostBody={setPostBody} />} />

        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />

        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
