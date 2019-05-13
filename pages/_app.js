import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';

import makeStore from '../store/store';
import { setAuthData } from '../store/actions/user';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    const user = ctx.req && ctx.req.session ? ctx.req.session.decodedToken : null;
    ctx.store.dispatch(setAuthData(user));

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }

}

export default withRedux(makeStore)(MyApp);
