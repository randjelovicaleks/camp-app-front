import Vue from 'vue'
import Router from 'vue-router'
import LendingPage from '../pages/LendingPage';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Search from '../pages/Search';
import CampsiteDetails from '../pages/CampsiteDetails';
import CreateCampsite from '../pages/CreateCampsite';
import Profile from '../pages/Profile';
import Statistic from '../pages/Statistic';
import ActivateAccount from '../pages/ActivateAccount';
import Reservations from '../pages/Reservations';
import Campers from '../pages/Campers';
import Caterers from '../pages/Caterers';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: '/'
		},
		{
			path: '/',
			component: LendingPage
		},
		{
			path: '/signin',
			component: Login
		},
		{
			path: '/signup',
			component: Registration
		},
		{
			path: '/search',
			component: Search
		},
		{
			path: '/details/:id',
			component: CampsiteDetails,
			name: 'details'
		},
		{
			path: '/create',
			component: CreateCampsite
		},
		{
			path: '/profile/:id',
			component: Profile,
			name: 'profile'
		},
		{
			path: '/statistic',
			component: Statistic
		},
		{
			path: '/activate-account',
			component: ActivateAccount
		},
		{
			path: '/reservations',
			component: Reservations
		},
		{
			path: '/campers',
			component: Campers
		},
		{
			path: '/caterers',
			component: Caterers
		}
	]
})

router.beforeEach((to, from, next) => {
	let token = JSON.parse(sessionStorage.getItem('token'));
	if (to.fullPath === '/search' || to.name === 'details') {
		if(!token) {				
			next('/');
		}
	} else if (to.fullPath === '/create' || to.fullPath === '/reservations') {
		if(token) {
			if (token.role.authority != 'ROLE_CATERER') {
				next('/search');
			}
		} else {
			next('/');
		}
	} else if (to.name === 'profile' || to.fullPath === '/reservations') {
		if(token) {
			if (token.role.authority != 'ROLE_CAMPER') {
				next('/search');
			}
		} else {
			next('/');
		}
	} else if (to.fullPath === '/statistic' || to.fullPath === '/campers' || to.fullPath === '/caterers') {
		if(token) {
			if (token.role.authority != 'ROLE_ADMIN') {
				next('/search');
			}
		} else {
			next('/');
		}
	} 
	if(to.fullPath === '/signin' || to.fullPath === '/signup') {
			if(token) {
				next('/search');
			}
	}
	next();
});

export default router;