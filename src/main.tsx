import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {ProSidebarProvider} from 'react-pro-sidebar';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import App from './App';
import {Loading} from './components/organisms/Loading/Loading';
import {AuthProvider} from './context/auth-and-perm/AuthProvider';
import {LanguageContextProvider} from './context/language';
import {LoadingContextProvider} from './context/loading';
import './index.css';
import './query.css';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {refetchOnWindowFocus: false},
    },
});

if ('serviceWorker' in navigator) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js', { updateViaCache: 'none' })
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    }
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <LoadingContextProvider>
            <LanguageContextProvider>
                <BrowserRouter>
                    <AuthProvider>
                        <HelmetProvider>
                            <ProSidebarProvider>
                                <Suspense fallback={<Loading mainTitle='جاري التحميل'/>}>
                                    <App/>
                                </Suspense>
                            </ProSidebarProvider>
                        </HelmetProvider>
                    </AuthProvider>
                </BrowserRouter>
            </LanguageContextProvider>
        </LoadingContextProvider>
    </QueryClientProvider>
);
