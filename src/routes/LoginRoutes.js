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
const Callback = Loadable(lazy(() => import('views/pages/authentication/callback')));
const PagesAbout = Loadable(lazy(() => import('views/pages/about')));
const PagesPuplication = Loadable(lazy(() => import('views/pages/landing/Publication')));
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
            path: '/auth/google/callback',
            element: <Callback />
        },
        {
            path: '/publication',
            element: <PagesPuplication />
        },
        {
            // Dynamic route for reset password with token
            path: '/reset-password/:token', 
            element: <AuthResetPassword />
        }
    ]
};

export default LoginRoutes;
