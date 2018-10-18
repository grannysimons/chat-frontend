import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import ChatListElement from '../components/ChatListElement/ChatListElement';

class Private extends Component {
  state={
    chatList:[
      {name: 'Pepe', lastDate: '9/10/18 14:03', num: '2', email: 'Pepe@Pepe.com'},
      {name: 'Maria', lastDate: '9/10/18 11:24', num: '5', email: 'Maria@Maria.com'},
      {name: 'Joan', lastDate: '8/10/18 22:41', num: '1', email: 'Joan@Joan.com'},
    ],
  }
  goToChat = (email) => {
    console.log('goToChat: ',email);
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        {/* <div>Welcome {user.email}</div> */}
        <form>
          <input type="text" />
          <button><i class="fas fa-search"></i></button>
        </form>
        {this.state.chatList.map((element, index) => {
          return (<ChatListElement element={element} key={index} goToChat={this.goToChat}/>);
        })}
      </div>
    )
  }
}

export default withAuth()(Private);