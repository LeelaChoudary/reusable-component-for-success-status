import { Routes } from '@angular/router';

export const routes: Routes = [
     {
        path:'todo',
        loadComponent:()=>import('./todo/todo.component').then(c=>c.TodoComponent)
    },
         {
        path:'status',
        loadComponent:()=>import('./parent/parent.component').then(c=>c.ParentComponent)
    },
    {
        path:'',redirectTo:'/status',pathMatch:'full'
    }
];
