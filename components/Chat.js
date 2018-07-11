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
    // Chat strings will be stored in the chats array.
    ========================================================================*/
    constructor() {
        super();
        this.state = {
            chatroom: 'chat-room',
            chats: [],
            showMenu: false
        };
    }

    /*========================================================================
    // Upon mount connect to Pusher and perform channel subscription.
    ========================================================================*/
    componentDidMount() {
        this.pusher = new Pusher(process.env.PUSHER_APP_KEY, {
            cluster: process.env.PUSHER_APP_CLUSTER,
            encrypted: true
        });

        this.channel = this.pusher.subscribe(this.state.chatroom);

        this.channel.bind('new-message', ({ chat = null }) => {
            const { chats } = this.state;
            chat && chats.push(chat);
            this.setState({ chats });
        });

        /*========================================================================
        // Retrieve all chat messages for this conversation stored on Pusher.
        ========================================================================*/
        this.pusher.connection.bind('connected', () => {
            axios.post('/messages')
                .then(response => {
                    const chats = response.data.messages;
                    this.setState({ chats });
                });
        });
    }
    /*========================================================================
    // Disconnect from pusher when component is unmounted.
    ========================================================================*/
    componentWillUnmount() {
        this.pusher.disconnect();
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
  
          evt.target.value = '';
          axios.post('/message', chat);
        }
    }
  
    /*========================================================================
    // Display user's name and chat section. Each chat message is mapped
    // between the header and message box. Upon clicking the gear on the
    // top right of the screen display a menu with buttons instead.
    ========================================================================*/
    render() {
        return (
            this.props.activeUser && <Fragment>
                <div className="border-bottom border-gray w-100 align-items-center bg-white" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 90 }}>
                    <img src="https://i.pinimg.com/originals/56/f0/c7/56f0c7de57fdae6d0a9ddc43448b6dff.png" style={{ height: 60, marginLeft: 20 }}></img>
                        { (!this.state.showMenu)
                            ? <Fragment><h2 className="text-dark mb-0 mx-4 px-2">{this.props.activeUser}</h2></Fragment>
                            : <Fragment><h2 className="text-dark mb-0 mx-4 px-2">Menu</h2></Fragment> }
                    <img onClick={e => this.setState(prevState => ({ showMenu: !prevState.showMenu }))} src="https://www.shareicon.net/data/512x512/2017/02/09/878626_gear_512x512.png" style={{ height: 60, marginRight: 20, cursor: 'pointer' }}></img>
                </div>
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
                                        <div className={`d-block w-100 font-weight-bold text-dark mt-4 pb-1 px-1 text-${position}`} style={{ fontSize: '0.9rem' }}>
                                            <span className="d-block" style={{ fontSize: '1.6rem' }}>
                                                {String.fromCodePoint(...mood)}
                                            </span>
                                            <span>
                                                {chat.user || 'Anonymous'}
                                            </span>
                                        </div>
                                    ) }
                                    <ChatMessage message={chat.message} position={position} />
                                </Fragment>
                            );
                        })}</div>
                        <div className="border-top border-gray w-100 px-4 d-flex align-items-center bg-light" style={{ minHeight: 90 }}>
                            <textarea className="form-control px-3 py-2" onKeyUp={this.handleKeyUp} placeholder="Enter a chat message" style={{ resize: 'none' }}></textarea>
                        </div>
                    </Fragment>
                    : <div className="px-2 pb-2 d-flex flex-row flex-wrap align-items-start position-relative" style={{ height: 'calc(95% - 180px)' }}>
                        <Link href={{ pathname: '/about' }}><button style={{ display: 'block', margin: '20px', padding: '30px', backgroundColor: '#2A275E', color: '#fff', border: 'none', cursor: 'pointer' }}>About</button></Link>
                        <button onClick={this.props.signout} style={{ display: 'block', margin: '20px', padding: '30px', backgroundColor: '#2A275E', color: '#fff', border: 'none', cursor: 'pointer' }}>Signout</button>
                    </div> }
            </Fragment> 
        )
    }
}

export default Chat;