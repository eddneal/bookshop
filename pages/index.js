import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import { loadItems } from '../store/actions';
import searchBooks from '../api/googleBooksHandler';

class Home extends Component {
  static async getInitialProps({store, isServer, pathname, query }) {
    return searchBooks()
      .then(response => store.dispatch(loadItems(response.items)))
      .catch(error => console.log(error));
  }

  render() {
    const { items } = this.props;
    return (
      <Layout page="Home">
        <div className="hero">
          <h1 className="title">Welcome to Bookshop</h1>
          <ul>
            {items && items.length && items.map(item => (
              <li key={item.id}>{JSON.stringify(item.volumeInfo.title)}</li>
              ))
            }
          </ul>
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

Home.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect()(Home);
