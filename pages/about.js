import React from 'react';
import Layout from '../components/Layout';

export default () => (
  <Layout page="About">
    <div className="hero">
      <h1 className="title">About</h1>
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
  `}</style>
  </Layout>
);