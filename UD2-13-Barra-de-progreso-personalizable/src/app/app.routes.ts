import { Routes } from '@angular/router';
import { CustomProgressBarComponent } from './components/custom-progress-bar-component/custom-progress-bar-component';

export const routes: Routes = [
    {
        path:'progress-bar',
        component:CustomProgressBarComponent
    },
    {
        path:'',
        component:CustomProgressBarComponent,
        pathMatch:'full'
    }
];
