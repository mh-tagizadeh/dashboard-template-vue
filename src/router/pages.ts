export default [
	{
		name: 'home',
		path: '/',
		component: () => import("../views/HomeView.vue"),
	},
	{
		name: 'users',
		path: '/users',
		component: () => import("../views/UsersView.vue"),
	},
]