import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { useStore } from 'react-redux';
import { wrapper } from 'redux/store';
import { Provider } from 'react-redux';
import interceptor from 'api/axios';

Router.events.on('routeChangeStart', (url) => {
  ReactDOM.render(
    document.getElementById('page-transition')
  );
});
Router.events.on('routeChangeComplete', (url) => {
  gtag.pageview(url);
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
});
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
});

function App({ Component, pageProps }) {
  const store = useStore();
  const router = useRouter();
  interceptor(store);
  let persistor = null;
  if (process.browser) {
    persistor = persistStore(store);
  }

  useEffect(() => {
    let comment = document.createComment(`HellCatVN`);
    document.insertBefore(comment, document.documentElement);
  }, []);

  return (
    <React.Fragment>
      {process.browser ? (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      ) : (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      )}
    </React.Fragment>
  );
}

export default wrapper.withRedux(App);
