import { Routes } from '@angular/router';
import { Layout } from './layout';

export const layoutRoutes: Routes = [
    
    {
        path:'',
        component:Layout,
        // children:[
        //     {
        //         path:'login',
        //         loadComponent:()=>import('./pages/login/login').then(m=>m.Login)
        //     },
        //     {
        //         path:'register',
        //         loadComponent:()=>import('./pages/register/register').then(m=>m.Register)
        //     }
        // ]
    }
];
