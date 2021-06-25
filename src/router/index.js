import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/recommend',
    },
    {

        path: '/recommend',
        name: 'Recommend',
        component: Recommend
    },
    {
        path: '/top',
        name: 'Top',
        component: () =>
            import ('../views/Top')
    },
    {
        path: '/song/:sname',
        name: 'Song',
        props: true,
        meta: {
            hideNav: true
        },
        component: () =>
            import ('../views/Song')
    },
    {
        path: '/singer',
        name: 'Singer',
        props: true,
        component: () =>
            import ('../views/Singer')
    },
    {
        path: '/songmv/:sname',
        name: 'SongMv',
        props: true,
        meta: {
            hideNav: true,
            hideNavMv: true
        },
        component: () =>
            import ('../views/SongMv')
    },
    {
        path: '/search',
        name: 'Search',
        component: () =>
            import ('../views/Search')
    },
    {
        path: '/rankinglist/:rname',
        name: 'RankingList',
        props: true,
        meta: {
            hideNav: true
        },
        component: () =>
            import ('../views/RankingList')
    },
    {
        path: '/singersong/:iname',
        name: 'SingerSong',
        props: true,
        meta: {
            hideNav: true
        },
        component: () =>
            import ('../views/SingerSong.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router