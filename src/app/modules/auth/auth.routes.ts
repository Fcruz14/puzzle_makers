import { Routes } from '@angular/router';
import { Auth } from './auth';

export const authRoutes: Routes = [
    
    {
        path:'',
        component:Auth,
        children:[
            {
                path:'login',
                loadComponent:()=>import('./pages/login/login').then(m=>m.Login)
            },
            {
                path:'register',
                loadComponent:()=>import('./pages/register/register').then(m=>m.Register)
            }
        ]
    }
];
