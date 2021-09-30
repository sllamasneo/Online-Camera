/** @format */

import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import camara2 from "@/views/About.vue"
const routes = [
	{
		path: "/Home",
		name: "Home",
		component: Home,
	},
	{
		path: "/",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: camara2,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
