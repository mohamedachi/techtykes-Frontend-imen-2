import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';


import axiosInstance from '../utils/redux/api'


export const IndexPage = lazy(() => import('src/pages/app'));
export const InstancesPage = lazy(() => import('src/pages/instances'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const NewInstancePage = lazy(() => import('src/pages/new-instance'));
export const InstancePage = lazy(() => import('src/pages/instance'));
export const ChatPage = lazy(() => import('src/pages/chat'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const PlansPage = lazy(() => import('src/pages/plans'));
export const PaymentSuccessPage = lazy(() => import('src/pages/payment-success'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
// NEW PAGE
export const BotPages = lazy(() => import('src/pages/bot'));

// NEW PAGE
export const AddBotPage = lazy(() => import('src/pages/addbot'));
export const SharePages = lazy(() => import('src/pages/SharePage'));
export const BaseOfKnowledgePages = lazy(() => import('src/pages/baseofknowledge'));


// ----------------------------------------------------------------------

function RequireAuth({ children }) {
  const queryString = window.location.search;

    // Parse the query string
  const queryParams = new URLSearchParams(queryString);

    // Get the value of a specific query parameter
  const plan = queryParams.get('plan');
  if (!!plan) {
    localStorage.setItem('plan', plan);
  }
  const token = localStorage.getItem('token');
  if (!token) {
    console.log("HERE")
    return <Navigate to="/login" replace />;
  } else {
    axiosInstance.defaults.headers['authorization'] = `Bearer ${token}`;
    return children;
  }
}

export default function Router() {
  
  const routes = useRoutes([
    {
      element: (
        <RequireAuth>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </RequireAuth>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage />},
        { path: 'plans', element: <PlansPage /> },
        { path: 'profile', element: <ProfilePage/>},
        { path: 'chat/:botId', element: <ChatPage /> },
        { path: 'conversations', element: <InstancesPage /> },
        { path: 'instance/new', element: <NewInstancePage /> },
        { path: 'instance/:id', element: <InstancePage /> },
        { path: 'bot/*', element: <BotPages /> },
       { path: 'baseofknowledge', element: <BaseOfKnowledgePages /> },
        { path: 'add_bot', element: <AddBotPage /> },// new page
        // eslint-disable-next-line react/jsx-no-undef
        { path: "share/:botId" , element: <SharePages /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
  path: 'add_bot',
  element: <AddBotPage />,
},
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'payment/success/:id',
      element: <PaymentSuccessPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

