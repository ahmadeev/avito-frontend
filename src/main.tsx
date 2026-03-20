import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home/Home.tsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import FallbackPage from './pages/FallbackPage/FallbackPage.tsx';
import './api/index.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalProvider } from './contexts/global/provider.tsx';

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
        errorElement: <FallbackPage />,
    },
]);

await enableMocking();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </GlobalProvider>
    </StrictMode>,
);

async function enableMocking() {
/*    if (import.meta.env.DEV) {
        const { worker } = await import('./mocks/browser.ts');

        await worker.start();
    }*/

    const { worker } = await import('./mocks/browser.ts');

    await worker.start({
        serviceWorker: {
            url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
        },
    });
}
