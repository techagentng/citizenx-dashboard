import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// other pages routing
const Privacy = Loadable(lazy(() => import('views/pages/privacy')));
const Disclaimer = Loadable(lazy(() => import('views/pages/disclaimer')));
const Cookies = Loadable(lazy(() => import('views/pages/cookies')));
const Terms = Loadable(lazy(() => import('views/pages/terms')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/ForgotPassword3')));
// const DeepLink = Loadable(lazy(() => import('views/deep')));
// ==============================|| PUBLICATION ROUTING ||============================== //

const PrivacyRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MinimalLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/privacy',
            element: <Privacy />
        },
        {
            path: '/forgot',
            element: <AuthForgotPassword />
        },
        {
            path: '/disclaimer',
            element: <Disclaimer />
        },
        {
            path: '/terms',
            element: <Terms />
        },
        {
            path: '/cookies',
            element: <Cookies />
        },
        // {
        //     path: "/preview/post/:id",
        //     element: <DeepLink />,
        // },
    ]
};

export default PrivacyRoutes;
