import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';

class Home extends Component {
  render() {
    return (
      <Layout page="Home">
        <div className="hero">
          <h1 className="title">Welcome to Bookshop</h1>
        </div>
        <style jsx>{`
            .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
        `}
        </style>
      </Layout>
    );
  }
}

export default connect()(Home);
