import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/pages/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/public/Index.vue'),
  },
  {
    path: '/pages',
    component: MainPage,
    children: [
      {
        path: '',
        redirect: { name: 'dashboard' },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/pages/Dashboard.vue'),
        meta: {
          text: 'Dashboard',
          breadcrumb: [{ text: 'Dashboard', name: 'dashboard' }],
        },
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('../views/pages/Roles.vue'),
        meta: {
          text: 'Roles',
          breadcrumb: [
            { text: 'User management' },
            { text: 'Roles', name: 'roles' },
          ],
        },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../views/pages/Users.vue'),
        meta: {
          text: 'User',
          breadcrumb: [
            { text: 'User management' },
            { text: 'Users', name: 'user' },
          ],
        },
      },
      {
        path: 'expensecategory',
        name: 'expensecategory',
        component: () => import('../views/pages/ExpenseCategory.vue'),
        meta: {
          text: 'Expense Category',
          breadcrumb: [
            { text: 'Expense management' },
            { text: 'Expense Category', name: 'expense' },
          ],
        },
      },
      {
        path: 'expense',
        name: 'expense',
        component: () => import('../views/pages/Expense.vue'),
        meta: {
          text: 'Expense',
          breadcrumb: [
            { text: 'Expense management' },
            { text: 'Expense', name: 'expense' },
          ],
        },
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
