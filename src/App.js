import React, {useState} from 'react';
import 'bulma/css/bulma.css';
import {Route} from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Header from './components/header';

//apollo
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';

//auth0
import {useAuth0} from './contexts/auth0-context';

function App() {
  const {isLoading, user, loginWithRedirect, logout, getTokenSilently} = useAuth0();
  const [accessToken, setAccessToken] = useState('');

  const getAccessToken = async () => {
    try{
      const token = await getTokenSilently();
      setAccessToken(token);
    }catch(err){
      console.log(err);
    }
  };
  getAccessToken();

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000'
  });

  const authLink = setContext((_, {headers}) => {
    const token = accessToken;
    if(token){
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      };
    }else{
      return {
        headers: {
          ...headers
        }
      };
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Header/>
      <div className='hero is-info is-fullheight'>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              {!isLoading && !user && (
                <>
                  <h1>Click Below!</h1>
                  <button onClick={loginWithRedirect} className='button is-danger'>
                    Login
                  </button>
                </>
              )}
              {!isLoading && user && (
                <>
                  <h1>You are logged in!</h1>
                  <p>Hello {user.name}</p>

                  {user.picture && <img src={user.picture} alt='My Avatar'/>}
                  <hr/>

                  <button
                    onClick={() => logout({returnTo: window.location.origin})}
                    className='button is-small is-dark'
                  >
                    Logout
                  </button>
                </>
              )}
              <Route exact path='/' component={Home}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/dashboard' component={Dashboard}/>
            </div>
          </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
