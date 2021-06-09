const routes = [
    {
        path: '/',
        component: () => import('../components/Login'),
        name: 'login'
    },
    {
        path: '/customers',
        meta: {
            auth: true
        },
        component: () => import('../components/Customer/CustomerIndex'),
        name: 'customers'
    },
    {
        path: '/users',
        meta: {
            auth: true
        },
        component: () => import('../components/UserIndex'),
        name: 'users'
    }
];

export  default routes;
