'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Profile from '@components/profile';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
    const {data: session} = useSession();
    const router = useRouter();
    console.log(session);
    const [posts, setPosts] = useState();

    useEffect(()=>{
        const fetchPost = async() => {
          const response  = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
        };
    
        if(session?.user.id) fetchPost();
      },[session])

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async(post) => {
      const hansConfirmed = confirm("Are you sure you want to delete this prompt");

      if(hansConfirmed ){
        try {
          const response = await fetch(`api/prompt/${post._id.toString()}`, {
            method:'DELETE'
          });

          const data = await response.json()

          if(data.success){
            const filterdPost = posts.filter((p) => p._id !== post._id);
            setPosts(filterdPost);
          }

        } catch (error) {
          console.log(error);
        }
      }
    };
    

  return (
    <Profile 
        name='My'
        desc='Welcome to your personalized profile page'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile