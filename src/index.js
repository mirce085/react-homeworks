import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root, { action as rootAction, loader as rootLoader } from './routes/root';
import ErrorPage from './error-page';
import Task, { loader as contactLoader } from './routes/task';
import EditContact, { action as editAction } from './routes/edit';
import { action as deleteAction } from './routes/destroy';
import Index from './routes';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {index: true, element: <Index />},
            {
                path: '/tasks/:taskId',
                element: <Task />,
                loader: contactLoader
            },
            {
                path: '/tasks/:taskId/edit',
                element: <EditContact />,
                loader: contactLoader,
                action: editAction
            },
            {
                path: '/tasks/:taskId/destroy',
                action: deleteAction,
                errorElement: <div>Oops! There was an error.</div>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

reportWebVitals();
