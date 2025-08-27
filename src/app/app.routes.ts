import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'todo',
        loadComponent: () => import('./todo/todo.component').then(c => c.TodoComponent)
    },
    {
        path: 'status',
        loadComponent: () => import('./parent/parent.component').then(c => c.ParentComponent)
    },
    {
        path: 'dynamic-form',
        loadComponent: () => import('./dynamic-form-parent/dynamic-form-parent.component').then(c => c.DynamicFormParentComponent)
    },
    {
        path: 'modify-biller',
        loadComponent: () => import('./modify-biller/modify-biller.component').then(c => c.ModifyBillerComponent)
    },
    {
        path: 'biller-table',
        loadComponent: () => import('./biller-table/biller-table.component').then(c => c.BillerTableComponent)
    },
    {
        path: 'verify-biller',
        loadComponent: () => import('./verify-biller/verify-biller.component').then(c => c.VerifyBillerDetailsComponent)
    },
    {
        path: 'dynamic-from-sample',
        loadComponent: () => import('./dynamic-forms-sample-app/dynamic-forms-sample-app.component').then(c => c.DynamicFormsSampleAppComponent)
    },
    {
        path: 'demo-form',
        loadComponent: () => import('./demo/demo.component').then(c => c.DemoComponent)
    },
    {
        path: '', redirectTo: '/demo-form', pathMatch: 'full'
    }
];
