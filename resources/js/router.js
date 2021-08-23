import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/pages/Index.vue'
import session from '../js/session'

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
          requiredAuth: true,
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
          requiredAuth: true,
        },
      },
      {
        path: 'userchangepassword',
        name: 'userchangepassword',
        component: () => import('../views/pages/UserChangePassword.vue'),
        meta: {
          text: 'User',
          breadcrumb: [
            { text: 'User management' },
            { text: 'User change password', name: 'userchangepassword' },
          ],
          requiredAuth: true,
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
          requiredAuth: true,
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
          requiredAuth: true,
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
          requiredAuth: true,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    session
      .getSession()
      .then((res) => {})
      .catch((err) => {
        router.push({ path: '/login' })
      })
  }

  next()
})

export default router
