import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestingView from '../views/TestingView.vue'
import LoginView from '../views/LoginView.vue'
import WorkLogView from '../views/WorkLogView.vue'
import CategoryView from '../views//category/CategoryView.vue'
import NProgress from 'nprogress';

const routes = [
  { path: '/', name: '/', components: { default: HomeView }, meta: { requiresAuth: true } },
  { path: '/testing', name: 'testing', components: { default: TestingView }, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', components: { default: LoginView }, meta: { layout: 'login' } },
  { path: '/worklog', name: 'worklog', components: { default: WorkLogView }, meta: { requiresAuth: true } },

  //category
  { path: '/category', name: 'category', components: { default: CategoryView }, meta: { requiresAuth: true } },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  // Cek apakah rute memerlukan autentikasi dan pengguna belum login
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
    // Jika belum login, arahkan ke halaman login
    next({ name: 'login' });
  } else {
    next();
  }
});

// Fungsi untuk mengecek apakah pengguna sudah login
function isLoggedIn() {
  const token = localStorage.getItem('tokenLoginDwl');
  return token !== null && token !== undefined;
}

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})


export default router
