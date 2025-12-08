import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import stylesheet from './styles/app.css?url';
import {Header} from './components/layout/Header';
import {Footer} from './components/layout/Footer';
import {AlertTriangle} from 'lucide-react';

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
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} className="text-red-600" />
          </div>
          <h1 className="font-display text-5xl font-bold text-forest-green mb-4">
            {error.status}
          </h1>
          <h2 className="text-2xl font-semibold text-neutral mb-4">
            {error.statusText || 'Page Not Found'}
          </h2>
          <p className="text-neutral/70 mb-8">
            {error.status === 404
              ? "The page you're looking for doesn't exist."
              : 'Something went wrong. Please try again later.'}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 gradient-gold text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  // Environment variable error
  const errorMessage = error?.message || '';
  const isEnvError = errorMessage.includes('environment variable') || errorMessage.includes('SHOPIFY');

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-12">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} className="text-amber-600" />
        </div>
        <h1 className="font-display text-4xl font-bold text-forest-green mb-4 text-center">
          {isEnvError ? 'Configuration Required' : 'Application Error'}
        </h1>
        
        {isEnvError ? (
          <div className="space-y-6">
            <p className="text-lg text-neutral/70 text-center">
              Your Vastara store needs Shopify credentials to connect.
            </p>
            
            <div className="bg-cream p-6 rounded-2xl">
              <h3 className="font-semibold text-lg mb-4 text-forest-green">
                Required Environment Variables:
              </h3>
              <ul className="space-y-2 text-sm font-mono">
                <li className="flex items-center gap-2">
                  <span className="text-luxury-gold">✓</span>
                  SHOPIFY_STORE_DOMAIN
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-luxury-gold">✓</span>
                  SHOPIFY_STOREFRONT_API_TOKEN
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-luxury-gold">✓</span>
                  SESSION_SECRET
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-luxury-gold">✓</span>
                  PUBLIC_STORE_URL
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
              <h4 className="font-semibold text-blue-900 mb-2">
                📝 Setup Instructions:
              </h4>
              <ol className="space-y-2 text-sm text-blue-800">
                <li><strong>1.</strong> Go to Vercel Dashboard → Your Project → Settings → Environment Variables</li>
                <li><strong>2.</strong> Add all 4 environment variables from CREDENTIALS.txt</li>
                <li><strong>3.</strong> Select Production, Preview, and Development environments</li>
                <li><strong>4.</strong> Save and redeploy your project</li>
              </ol>
            </div>

            <p className="text-center text-sm text-neutral/60">
              Check <strong>VERCEL_ENV_SETUP.md</strong> in your project for detailed instructions.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-lg text-neutral/70 text-center">
              Something unexpected happened. Please try again.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 p-6 rounded-2xl text-sm">
                <pre className="text-red-900 whitespace-pre-wrap overflow-auto">
                  {error?.stack || errorMessage}
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4 justify-center mt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 gradient-gold text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all"
          >
            Return Home
          </a>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-white border-2 border-forest-green text-forest-green px-8 py-4 rounded-full font-bold hover:bg-forest-green hover:text-white transition-all"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
