import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// other pages routing
const Write = Loadable(lazy(() => import('views/pages/publication/Write')));


// ==============================|| PUBLICATION ROUTING ||============================== //

const PublicationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/publication/write',
            element: <Write />
        },
        
    ]
};

export default PublicationRoutes;
