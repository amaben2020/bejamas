import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import { CartProvider } from '../context/CartState';
import '../styles/globals.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ToastContainer position="top-center" />

          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </CartProvider>
  );
}

export default MyApp;
