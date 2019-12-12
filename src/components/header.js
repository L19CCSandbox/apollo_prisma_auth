import React from 'react';
import {useAuth0} from '../contexts/auth0-context';
import {Link} from 'react-router-dom'
import './Header.css'
import {useQuery} from '@apollo/react-hooks';
import GET_USERS from '../graphql/users.query';

export default function Header() {
  const {isLoading, user, loginWithRedirect, logout} = useAuth0();
  const {data, loading, error} = useQuery(GET_USERS);

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>Error: {JSON.stringify(error)}</p>
  }

  if(user && data){
    console.log(data);
  }

  return (
    <header>
        <nav className='navbar is-dark'>
            <div className='container'>
                <div className='navbar-menu is-active'>
                    {/* logo */}
                    <div className='navbar-brand'>
                        <button className='navbar-item'>Community Calendar</button>
                    </div>

                    {/* menu items */}
                    <div className='navbar-end'>
                        {/* if there is no user, show the login button */}
                        {!isLoading && !user && (
                            <button onClick={loginWithRedirect} className='navbar-item'>
                                Login
                            </button>
                        )}

                        {/* if there is a user, show user name and logout button */}
                        {!isLoading && user && (
                            <>
                                <button className='navbar-item'>{user.name}</button>
                                <button
                                    onClick={() => logout({returnTo: window.location.origin})}
                                    className='navbar-item'
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    </header>
  )
}
