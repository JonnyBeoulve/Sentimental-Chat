import React, { Component } from 'react';

import Chat from '../components/Chat';
import Layout from '../components/Layout';

/*========================================================================
// The main page of the app where core functionality is contained.
========================================================================*/
class IndexPage extends Component {

    /*========================================================================
    // user will be set a value upon a name being provided. Chat functionality
    // isn't available until this occurs, and thus will default to null.
    ========================================================================*/
    state = { 
        user: null 
    }

    /*========================================================================
    // Handle 'enter' key event on name input.
    ========================================================================*/
    handleKeyUp = evt => {
        if (evt.keyCode === 13) {
            const user = evt.target.value;
            this.setState({ user });
        }
    }

    render() {
        const { user } = this.state;

        /*========================================================================
        // Inline styling.
        ========================================================================*/
        const nameInputStyles = {
            background: 'transparent',
            color: '#999',
            border: 0,
            borderBottom: '1px solid #666',
            borderRadius: 0,
            fontSize: '3rem',
            fontWeight: 500,
            boxShadow: 'none !important'
        };

        /*========================================================================
        // Initially display enter name field. Once a name has been provided,
        // display chat.
        ========================================================================*/
        return (
            <Layout>
                <main className="container-fluid position-absolute h-100 bg-dark">
                    <div className="row position-absolute w-100 h-100">
                        <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center px-5">
                            <div className="px-5 mx-5">
                                <span className="d-block w-100 h1 text-light" style={{marginTop: -50}}>
                                { user
                                    ? ( <span>
                                            <span style={{color: '#999'}}>Welcome to Sentimental Chat, </span> {user}
                                        </span>)
                                    : `Enter a username`
                                }
                                </span>
                                { !user && <input type="text" className="form-control mt-3 px-3 py-2" onKeyUp={this.handleKeyUp} autoComplete="off" style={nameInputStyles} /> }
                            </div>
                        </section>
                        <section className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-white px-0">
                            { user && <Chat activeUser={user} /> }
                        </section>
                    </div>
                </main>
            </Layout>
        );
    }
}

export default IndexPage;