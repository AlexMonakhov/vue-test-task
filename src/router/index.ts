import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SpectaclesWomen from '../views/SpectaclesWomen.vue'
import SpectaclesMen from '../views/SpectaclesMen.vue'
import SunglassesWomen from '../views/SunglassesWomen.vue'
import SunglassesMen from '../views/SunglassesMen.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/spectacles-women',
    name: 'spectacles-women',
    component: SpectaclesWomen
  },
  {
    path: '/spectacles-men',
    name: 'spectacles-men',
    component: SpectaclesMen
  },
  {
    path: '/sunglasses-women',
    name: 'sunglasses-women',
    component: SunglassesWomen
  },
  {
    path: '/sunglasses-men',
    name: 'sunglasses-men',
    component: SunglassesMen
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
