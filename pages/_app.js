
import { ApolloProvider } from '@apollo/client'
import client             from '../config/apollo';

import '../styles/globals.css';
import '../public/static/css/index.css';
import '../public/static/css/template-app.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../styles/buttonDemo.css';

import Header from '../components/layout/header';
import Footer from '../components/layout/footer';


function MyApp({ Component, pageProps }) {
  
  return (
    <ApolloProvider client={client}>
      <Header />
        <main>
            <Component {...pageProps} />
        </main>
      <Footer />
      </ApolloProvider>
    )
}

export default MyApp
