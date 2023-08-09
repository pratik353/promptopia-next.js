'use client';
import React, { useEffect, useState } from 'react';
import Prompts from './Prompts';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => (
        <Prompts  
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const  [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleChange = () => {

  };

  useEffect(()=>{
    const fetchPost = async() => {
      const response  = await fetch('/api/prompt');
      console.log(response);
      const data = await response.json();
      setPosts(data);
    };

    fetchPost();
  },[])

  return (
   <section className='feed'>
    <form className='relative w-full flex-center'>
      <input type="text"
      placeholder='search for a tag or a username'
      value={searchText}
      onChange={handleChange}
      required
      className='search_input peer'
      />
    </form>
    <PromptCardList
      data={posts}
      handleTagClick={()=>{}}
    />
   </section>
  )
}

export default Feed