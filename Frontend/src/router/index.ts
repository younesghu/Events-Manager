import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import LoginView from '@/views/Authentication/LoginView.vue'
import RegisterView from '@/views/Authentication/RegisterView.vue'
import CalendarView from '@/views/CalendarView.vue'
import BasicChartView from '@/views/Charts/BasicChartView.vue'
import FormElementsView from '@/views/Forms/FormElementsView.vue'
import FormLayoutView from '@/views/Forms/FormLayoutView.vue'
import SettingsView from '@/views/Pages/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TablesView from '@/views/TablesView.vue'
import AlertsView from '@/views/UiElements/AlertsView.vue'
import ButtonsView from '@/views/UiElements/ButtonsView.vue'
import HomeView from '@/views/Dashboard/HomeView.vue'
import CreateEventView from '@/views/Dashboard/CreateEventView.vue'
import EventDetailsView from '@/views/Dashboard/EventDetailsView.vue'
import MyEventsView from '@/views/Dashboard/MyEventsView.vue'
import EventRequestsView from '@/views/Dashboard/EventRequestsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'events Dashboard',
      requiresAuth: true
    }
  },
  {
    path: '/events-me',
    name: 'eventsMe',
    component: MyEventsView,
    meta: {
      title: 'events Me',
      requiresAuth: true
    }
  },
  {
    path: '/events/:id',
    name: 'event-details',
    component: EventDetailsView,
    meta: {
      title: 'events Details',
      requiresAuth: true
    },
    props: true,
  },
  {
    path: '/event-create',
    name: 'eventCreate',
    component: CreateEventView,
    meta: {
      title: 'events Create',
      requiresAuth: true
    }
  },
  {
    path: '/events-requests',
    name: 'eventRequests',
    component: EventRequestsView,
    meta: {
      title: 'events Requests',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Register'
    }
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  document.title = `Vue.js ${to.meta.title} | Events Manager`

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login if the route requires auth and the user is not authenticated
    next({ name: 'login' })
  } else if (authStore.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    // Redirect to home if the user is authenticated and trying to access login or register
    next({ name: 'home' })
  } else {
    // Otherwise, proceed to the requested route
    next()
  }
})

export default router
