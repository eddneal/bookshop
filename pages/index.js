import React, { Component } from 'react';
import Layout from '../components/Layout';
import bookSearch from '../api/googleBooksHandler';

export default class extends Component {
  static async getInitialProps() {
    return bookSearch()
      .then(response => response)
      .catch(error => console.log(error));
  }

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
