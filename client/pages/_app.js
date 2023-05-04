import '@/styles/globals.scss';
import { AuthContextProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NProgress from 'nprogress';
import Router from 'next/router';
import "nprogress/nprogress.css";

export default function App({ Component, pageProps }) {

  const queryClient = new QueryClient();

  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
  })

  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done(false);
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
