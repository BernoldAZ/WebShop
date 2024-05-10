import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent} from './main-page/main-page.component';
import { ProfileComponent} from './profile/profile.component';
import { HistoryComponent} from './history/history.component';
import { CartComponent} from './cart/cart.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'sign-up', component: RegisterComponent },
    { path: 'main', component: MainPageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'cart', component: CartComponent },
];
