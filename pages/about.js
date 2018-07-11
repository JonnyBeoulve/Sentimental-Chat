import React, { Component } from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';

/*========================================================================
// An about page for Sentimental Chat.
========================================================================*/
class About extends Component {

    render() {

        /*========================================================================
        // Describe the app and provided links for more information.
        ========================================================================*/
        return (
            <Layout>
                <main className="container-fluid position-absolute h-100" style={{backgroundColor: '#2A275E'}}>
                <div className="row position-absolute w-100 h-100">
                        <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center px-5">
                            <div className="px-5 mx-5">
                                <span className="d-block w-100 text-light" style={{marginTop: -50}}>
                                    <h1 style={{color: '#fff'}}>About</h1>
                                    <p style={{color: '#fff'}}>Sentimental Chat is a real-time chat web app that includes sentiment analysis with Next.js server-side rendering and a Node/Express based back-end.</p>
                                    <p style={{color: '#fff'}}>To view code and more information, check out the official repository: <a href="https://github.com/JonnyBeoulve/Sentimental-Chat" target="_blank"><img src="http://pluspng.com/img-png/github-free-icon-512.png" style={{ height: 40, marginLeft: 20, cursor: 'pointer' }}></img></a></p>
                                    <Link href={{ pathname: '/' }}>Return to Sentimental Chat</Link>
                                </span>
                            </div>
                        </section>
                    </div>
                </main>
            </Layout>
        );
    }
}

export default About;