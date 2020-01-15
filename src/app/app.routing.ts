import { Routes } from '@angular/router';
import { RegistrationComponent} from './registration/registration.component';
import { ForgotPasswordComponent} from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TareasComponent } from './tareas/tareas.component';
import { UserGuard } from './guards/user.guard';
import { AdminMainComponent } from './admin/main/admin-main.component';
import { AdminGuard } from './guards/admin.guard';
import { ModeratorGuard } from './guards/moderator.guard';
import { ProjectsComponent } from './projects/projects.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { ListComponent } from './requests/list/list.component';
import { TechRequestListComponent } from './tech/tech-request-list/tech-request-list/tech-request-list.component'
import { EngineerRequestListComponent } from './engineer/engineer-request-list/engineer-request-list.component';



export const appRoutes: Routes = [
    // Guest (0)
    { path: '', component: HomeComponent, data:{title: 'Home'}, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, data:{title: 'Login'} },
    { path: 'registration', component: RegistrationComponent, data:{title: 'Registration'}},
    { path: 'forgot', component: ForgotPasswordComponent, data:{title: 'Forgot'}},


    // tech (1)
    { path: 'tareas', component: TareasComponent, data:{title: 'Tasks'}, canActivate: [AuthGuard, UserGuard]},
    { path: 'TechRequestList', component: TechRequestListComponent, data:{title: 'List of my Requests'}, canActivate: [AuthGuard, UserGuard]},
    

    // eng (2)
    { path: 'projects', component: ProjectsComponent, data:{title: 'Projects'}, canActivate: [AuthGuard, ModeratorGuard]},
    { path: 'requestForm', component: RequestFormComponent, data: {title: 'Request Form'}, canActivate: [AuthGuard, ModeratorGuard]},
    {path: 'EngineerRequestList', component: EngineerRequestListComponent, data: {title: 'List of Requests', canActivate: [AuthGuard]}},

    // Supervisor (3)
    {path: 'SupervisorRequestList', component: ListComponent, data: {title: 'List of Requests'}, canActivate: [AuthGuard, UserGuard]},


    //admin
    { path: 'admin', component: AdminMainComponent, data:{title: 'Admin'}, canActivate: [AuthGuard, AdminGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];;