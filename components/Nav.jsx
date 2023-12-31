'use client'
import React, {useState, useEffect} from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/assets/images/logo.svg'

const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdrown, setToggleDropdrown] = useState(false);

  useEffect(()=>{
    const _setProviders = async() => {
      const response = await getProviders();
      setProviders(response);
    }
    _setProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src={logo} alt='Promptopia Logo' width={30} height={30} className='object-contain'/>
        <p className='logo_text'>Promptopia</p>
      </Link>
      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>Create Post</Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link href='/profile'>
              <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile'/> 
            </Link>
          </div>
        ) : (
        <>
          {providers && 
            Object.values(providers).map(provider => (
              <button type='button' key={provider.name}
                onClick={()=>signIn(provider.id)}
                className='black_btn'
              >
                Sign In with {provider.name}
              </button>
            ))
          }
        </>
        )}
      </div>

      {/* Mobile navigattion */}
      <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className='flex'>
                <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' onClick={()=>setToggleDropdrown((prev)=> !prev)}/> 
                {toggleDropdrown && (
                  <div className='dropdown'>
                    <Link href='/profile' className='dropdown_link' onClick={()=>setToggleDropdrown(false)}>My Profile</Link>
                    <Link href='/create-prompt' className='dropdown_link' onClick={()=>setToggleDropdrown(false)}>Create Prompt</Link>
                    <button type='button' className='mt-5 w-full black_btn' onClick={()=>{
                      setToggleDropdrown(false);
                      signOut();
                    }}>Sign Out</button>
                  </div>
                )}
            </div>
          ) : (
            <>
              {providers && 
                Object.values(providers).map(provider => (
                <button type='button' key={provider.name}
                  onClick={()=>signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
              }
            </>
          )}
      </div>
    </nav>
  )
}

export default Nav