import { lazy } from 'react';


export default lazy(() => import('./App.content').then((component) => ({
    default: component.AppContent,
})));