import { Routes } from '@angular/router';
import { MovieDiscoverPage } from './pages/movie-discover-page/movie-discover-page';
import { UserListsPage } from './pages/user-lists-page/user-lists-page';
import { LoginPage } from './pages/login-page/login-page';

export const routes: Routes = [
    
    {
        path:'login',
        component: LoginPage
    },
    {
        path:'popular',
        component:MovieDiscoverPage
    },
    {
        path: 'my-lists',
        component: UserListsPage
    },
    {
        path:'',
        component:MovieDiscoverPage,
        pathMatch:'full'
    }

];
