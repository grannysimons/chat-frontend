import React, { Component } from 'react'
import auth from '../lib/auth-service';
import spinner from '../images/loading.gif';

export const AuthContext = React.createContext(
  // authStore // default value
);

export const { Provider, Consumer }  = AuthContext.Consumer;

export const withAuth = () => (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {(authStore) => {
            return <Comp 
              isLogged={authStore.isLogged}
              user={authStore.user}
              logout={authStore.logout}
              setUser={authStore.setUser}
              {...this.props} />
          }}
        </Consumer>
      )
    }    
  }
}

const style = {
  loadingContainer: {
    width: '100%',
    textAlign: 'center',
    padding: '300px 0',
  }
}

export default class AuthProvider extends Component {
  state = {
    isLogged: false,
    user: {},
    status: 'loading'
  }

  setUser = (user) => {
    this.setState({
      isLogged: true,
      user,
    })
  }

  logoutUser = () =>{
    auth.logout()
      .then(() => {
        this.setState({ 
          isLogged: false,
          user: {},
        });
      })
      .catch( error => console.log(error))
  }

  componentDidMount() {
    auth.me()
      .then((user) => {
        if(user.error)
        {
          this.setState({ 
            isLogged: false,
            user: {},
            status: 'loaded'
          });
        }
        else
        {
          this.setState({
            isLogged: true,
            user,
            status: 'loaded'
          });
        }
      })
      .catch((error) => {
        this.setState({ 
          isLogged: false,
          user: {},
          status: 'loaded'
        });
      })
  }

  render() {
    const { isLogged, user, status } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <div className="loadingContainer" style={style.loadingContainer}><img src={spinner} alt="txat app"/></div>
      default:
        return (
          <Provider value={{ isLogged, user, logout: this.logoutUser, setUser: this.setUser }}>
            {children}
          </Provider>    
        );
    }
  }
}
