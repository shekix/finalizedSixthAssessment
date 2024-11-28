import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { HomeComponent } from '../components/home/home.component';
import { MyInfoComponent } from '../components/my-info/my-info.component';
import { AllUsersComponent } from '../components/all-users/all-users.component';
import { ChatComponent } from '../components/chat/chat.component';
import { authorizeGuard } from '../services/authorize.guard';
import { NotfoundComponent } from '../components/notfound/notfound.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
    },
    {
        path:'register',
        component:RegistrationComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'home',
        component:HomeComponent,
        canActivate:[authorizeGuard],
        canActivateChild:[authorizeGuard],
        children : [
            { 
                path: 'myinfo', 
                component: MyInfoComponent,
                
            },
            {
                path:'allusers',
                component:AllUsersComponent,
                
            },
            {
                path:'chat',
                component:ChatComponent,
                
            }
        ]
    },
    {
        path:'**',
        component:NotfoundComponent
    }
];
