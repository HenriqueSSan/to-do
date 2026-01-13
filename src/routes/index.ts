import { createBrowserRouter } from 'react-router';
import { IndexPage } from './+index';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: IndexPage,
  },
]);
