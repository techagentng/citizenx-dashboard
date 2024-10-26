import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/Login3')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/ForgotPassword3')));
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const PagesAbout = Loadable(lazy(() => import('views/pages/about')));
const PagesPuplication = Loadable(lazy(() => import('views/pages/landing/Publication')));
const PagesPrivacy = Loadable(lazy(() => import('views/pages/privacy')));
const PagesDisclaimer = Loadable(lazy(() => import('views/pages/disclaimer')));
const AuthResetPassword = Loadable(lazy(() => import('views/pages/authentication/ResetPassword')));


// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        },
        {
            path: '/forgot',
            element: <AuthForgotPassword />
        },
        {
            path: '/about',
            element: <PagesAbout />
        },
        {
            path: '/publication',
            element: <PagesPuplication />
        },
        {
            path: '/privacy',
            element: <PagesPrivacy />
        },
        {
            path: '/disclaimer',
            element: <PagesDisclaimer />
        },
        {
            // Dynamic route for reset password with token
            path: '/reset-password/:token', 
            element: <AuthResetPassword />
        }
    ]
};

export default LoginRoutes;
