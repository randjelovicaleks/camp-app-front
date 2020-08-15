import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login';
import Registration from '../pages/Registration';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: '/'
		},
		{
			path: '/signin',
			component: Login
		},
		{
			path: '/signup',
			component: Registration
		},
	]
})