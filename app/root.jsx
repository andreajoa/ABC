import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import stylesheet from './styles/app.css?url';
import {Header} from './components/layout/Header';
import {Footer} from './components/layout/Footer';

export const links = () => [
  {rel: 'stylesheet', href: stylesheet},
  {
    rel: 'preconnect',
    href: 'https://cdn.shopify.com',
  },
  {
    rel: 'preconnect',
    href: 'https://shop.app',
  },
];

export function Layout({children}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

