import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from './pages/Dashboard.vue';
import Patients from './pages/Patients.vue';
import Calendar from './pages/Calendar.vue';
import Statistics from './pages/Statistics.vue';
import Accountancy from './pages/Accountancy.vue';
import Profile from './pages/User/Profile.vue';
import Settings from './pages/User/Settings.vue';

import Login from './pages/Login.vue';

import AppLayout from "./components/AppLayout.vue";
import { useUserStore } from './stores/user';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/dashboard',
        component: AppLayout,
        meta: {
            requireAuth: true,
        },
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/patients',
                name: 'Patients',
                component: Patients
            },
            {
                path: '/calendar',
                name: 'Calendar',
                component: Calendar
            },
            {
                path: '/statistics',
                name: 'Statistics',
                component: Statistics
            },
            {
                path: '/accountancy',
                name: 'Accountancy',
                component: Accountancy
            },
            {
                path: '/profile',
                name: 'Profile',
                component: Profile
            },
            {
                path: '/settings',
                name: 'Settings',
                component: Settings
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    if (to.meta.requireAuth && !userStore.sessionId) {
        next({ name: 'Login' });
    } else if(userStore.sessionId && (to.name === "Login")) {
        next({ name: 'Dashboard' });
    } else {
        next();
    }
})

export default router;
