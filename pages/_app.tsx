import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from '../context/CartState';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-center" />
        <Component {...pageProps} />
      </QueryClientProvider>
    </CartProvider>
  );
}

export default MyApp;
