import { Routes } from '@angular/router';


export const routes: Routes = [
    
    {
        path:'',
        // async loadComponent() {
        //     const m = await import('./modules/meteomatics/meteomatics');
        //     return m.Meteomatics;
        // },
        async loadComponent() {
            const m = await import('./modules/home/home/home');
            return m.Home;
        },  
    },{
        path:'auth',
        loadChildren:()=>import('./modules/auth/auth.routes').then(m=>m.authRoutes)
    },
    {
        path:'layout',
        // async loadComponent() {
        //     const m = await import('./modules/meteomatics/meteomatics');
        //     return m.Meteomatics;
        // },
        loadChildren:()=>import('./modules/layout/layout.routes').then(m=>m.layoutRoutes)
    },
    {
        path:'**',
        redirectTo:'/',
        pathMatch:'full'
    }
];
