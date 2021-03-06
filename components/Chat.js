import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import Link from 'next/link';

import ChatMessage from './ChatMessage';

const SAD_EMOJI = [55357, 56864];
const HAPPY_EMOJI = [55357, 56832];
const NEUTRAL_EMOJI = [55357, 56848];

/*========================================================================
// This component contains logic for chat.
========================================================================*/
class Chat extends Component {

    /*========================================================================
    // Store the name of the current chatroom, an array of chat messages,
    // and a boolean for determining whether to show the menu or chat.
    ========================================================================*/
    constructor() {
        super();
        this.state = {
            chatroom: '',
            chats: [],
            showMenu: true,
        };
    }

    /*========================================================================
    // Create Pusher object to provide API reference to Pusher services.
    ========================================================================*/
    componentDidMount() {
        this.pusher = new Pusher(process.env.PUSHER_APP_KEY, {
            cluster: process.env.PUSHER_APP_CLUSTER,
            encrypted: true
        });
    }

    /*========================================================================
    // Disconnect from pusher when component is unmounted.
    ========================================================================*/
    componentWillUnmount() {
        this.pusher.disconnect();
    }

    /*========================================================================
    // This will handle subscription to the various chat channels that
    // Sentimental Chat offers. First, we will unregister the current
    // subscription if one exists before resetting chat state and setting
    // a name for chatroom. Then, we will subscribe to the corresponding
    // channel and create bindings to Pusher.
    ========================================================================*/
    handleChangeChannel = channelName => {
        if (this.state.chatroom.length > 0) this.pusher.unsubscribe(this.state.chatroom);

        this.channel = this.pusher.subscribe(channelName);
        
        this.setState({ 
            chatroom: channelName,
            chats: [],
            showIntroHeader: true,
        });

        this.channel.bind('new-message', ({ chat = null }) => {
            const { chats } = this.state;
            chat && chats.push(chat);
            this.setState({ 
                chats,
                showMenu: false 
             });
        });

        axios.post('/messages')
            .then(response => {
                const chats = response.data.messages;
                this.setState({ 
                    chats,
                    showMenu: false 
                });
            })
            .catch(error => {
                console.log('Messages fetch failed. ' + error);
            });
    }

    /*========================================================================
    // Handle event when user has a chat message and presses enter to send
    // it to the server.
    ========================================================================*/
    handleKeyUp = evt => {
        const value = evt.target.value;
  
        if (evt.keyCode === 13 && !evt.shiftKey) {
          const { activeUser: user } = this.props;
          const chat = { user, message: value, timestamp: + new Date };
          const room = this.state.chatroom;
  
          evt.target.value = '';
          axios.post('/message', {
              chat, 
              room
          });
        }
    }
  
    /*========================================================================
    // The Chat div is rendered on the right-side of the screen. Initially,
    // it will display a top bar that instructs the user to 'Select a 
    // Chatroom', with a selection of rooms along with an About and Signout
    // button. Once a user selects a chatroom, change the top bar to show
    // a profile avatar, the name of the chatroom, and a menu button.
    // Below is a list of chat messages within that chatroom. Upon clicking
    // the menu button, display the same chatroom, about, and signout buttons
    // as during the introduction.
    ========================================================================*/
    render() {
        return (
            this.props.activeUser && <Fragment>
                { this.state.chatroom 
                    ? <div className="border-bottom border-gray w-100 align-items-center bg-white" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 90 }}>
                        <img src="https://i.pinimg.com/originals/56/f0/c7/56f0c7de57fdae6d0a9ddc43448b6dff.png" alt="Default avatar PNG" style={{ height: 60, marginLeft: 20 }}>
                        </img>
                        <h2 className="text-dark mb-0 mx-4 px-2">
                            { (this.state.showMenu)
                                ? <Fragment>
                                    Menu
                                </Fragment>
                                : <Fragment>
                                    {this.state.chatroom}
                                </Fragment> }
                        </h2>
                        <img onClick={e => this.setState(prevState => ({ showMenu: !prevState.showMenu }))} src="https://www.shareicon.net/data/512x512/2017/02/09/878626_gear_512x512.png" alt="Gear cog PNG" style={{ height: 60, marginRight: 20, cursor: 'pointer' }}>
                        </img>
                    </div>
                    : <div className="border-bottom border-gray w-100 align-items-center bg-white" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 90 }}>
                        <img src="http://pixsector.com/cache/0688783e/avbf566659ab2bdf82f87.png" alt="Down arrow PNG" style={{ height: 60, marginRight: 20 }}>
                        </img>
                        <h2 className="text-dark mb-0 mx-4 px-2">
                            <Fragment>
                                Select a Chatroom
                            </Fragment>   
                        </h2>
                        <img src="http://pixsector.com/cache/0688783e/avbf566659ab2bdf82f87.png" alt="Down arrow PNG" style={{ height: 60, marginRight: 20 }}>
                        </img>
                    </div> }
                { (!this.state.showMenu)
                    ? <Fragment>
                        <div className="px-4 pb-4 w-100 d-flex flex-row flex-wrap align-items-start align-content-start position-relative" style={{ height: 'calc(95% - 180px)', overflowY: 'scroll' }}>{this.state.chats.map((chat, index) => {
                            const previous = Math.max(0, index - 1);
                            const previousChat = this.state.chats[previous];
                            const position = chat.user === this.props.activeUser ? "right" : "left";
                            const isFirst = previous === index;
                            const inSequence = chat.user === previousChat.user;
                            const hasDelay = Math.ceil((chat.timestamp - previousChat.timestamp) / (1000 * 60)) > 1;
                            const mood = chat.sentiment > 0 ? HAPPY_EMOJI : (chat.sentiment === 0 ? NEUTRAL_EMOJI : SAD_EMOJI);
                            return (
                                <Fragment key={index}>
                                    { (isFirst || !inSequence || hasDelay) && (
                                        <div className={`d-block w-100 font-weight-bold text-dark mt-4 pb-1 px-1 text-${position}`} style={{ fontSize: '1.2rem' }}>
                                            <span>
                                                {chat.user || 'Anonymous'}
                                            </span>
                                        </div>
                                    ) }
                                    <div className={`d-block w-100 mt-2 pb-1 px-1 text-${position}`} style={{ fontSize: '1.5rem' }}>
                                        <span>
                                            {String.fromCodePoint(...mood)}
                                        </span>
                                    </div>
                                    <ChatMessage message={chat.message} position={position} />
                                </Fragment>
                            );
                        })}</div>
                        <div className="border-top border-gray w-100 px-4 d-flex align-items-center bg-light" style={{ minHeight: 90 }}>
                            <textarea className="form-control px-3 py-2" onKeyUp={this.handleKeyUp} placeholder="Enter a chat message" style={{ resize: 'none' }}></textarea>
                        </div>
                    </Fragment>
                    : <Fragment>
                        <div className="w-100 align-items-center" style={{ display: 'flex', flexDirection: 'column', height: 'auto', color: '#FFF' }}>
                            <button onClick={() => this.handleChangeChannel('General-Chat')} style={{ display: 'block', width: '40%', margin: '5px', padding: '20px', backgroundColor: '#2A275E', color: '#fff', border: 'none', cursor: 'pointer' }}>General Chat</button>
                            <button onClick={() => this.handleChangeChannel('Gamer-Chat')} style={{ display: 'block', width: '40%', margin: '5px', padding: '20px', backgroundColor: '#2A275E', color: '#fff', border: 'none', cursor: 'pointer' }}>Gamer Chat</button>
                            <button onClick={() => this.handleChangeChannel('Technology-Chat')} style={{ display: 'block', width: '40%', margin: '5px', padding: '20px', backgroundColor: '#2A275E', color: '#fff', border: 'none', cursor: 'pointer' }}>Technology Chat</button>
                            <button onClick={() => this.handleChangeChannel('RL-Chat')} style={{ display: 'block', width: '40%', margin: '5px', padding: '20px', backgroundColor: '#2A275E', color: '#fff', border: 'none', cursor: 'pointer' }}>RL Chat</button>
                            <button onClick={() => this.handleChangeChannel('Introduction-Chat')} style={{ display: 'block', width: '40%', margin: '5px', padding: '20px', backgroundColor: '#2A275E', color: '#fff', border: 'none', cursor: 'pointer' }}>Introduction Chat</button>
                        </div>
                        <div className="w-100 align-items-center" style={{ display: 'flex', flexDirection: 'column', height: 'auto', color: '#FFF' }}>
                            <Link href={{ pathname: '/about' }}><button style={{ display: 'block', width: '40%', margin: '5px', padding: '20px', backgroundColor: '#2A275E', color: '#fff', border: 'none', cursor: 'pointer' }}>About</button></Link>
                            <button onClick={this.props.signout} style={{ display: 'block', width: '40%', margin: '5px', padding: '20px', backgroundColor: '#2A275E', color: '#fff', border: 'none', cursor: 'pointer' }}>Signout</button>
                        </div>
                    </Fragment> }
            </Fragment> 
        )
    }
}

export default Chat;