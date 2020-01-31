import defaultLayout from '../layouts/default'
// import errors from './errors'
// import user from './user'

// let fallbackRouter = {
//   path: '*',
//   component: defaultLayout,
//   children: [
//     errors
//   ]
// }

let sharedRouter = {
  path: '/',
  component: defaultLayout,
  children: [
    {
      name: 'home',
      path: '',
      component: () => import(/* webpackChunkName: "home" */ './home')
    },
    {
      name: 'share',
      path: 'share',
      component: () => import('./share')
    },
    {
      name: 'list',
      path: 'list',
      component: () => import('./list'),
      children: [{
        name: 'tech',
        path: 'tech',
        component: () => import('./list/tech/index.vue')
      }, {
        name: 'life',
        path: 'life',
        component: () => import('./list/life/index.vue')
      }, {
        name: 'game',
        path: 'game',
        component: () => import('./list/game/index.vue')
      }

      ]
    }
  ]
}

let routes = [
  sharedRouter
]

// if (__DEV__ || __SIT__) {
// var examples = require('./examples')
// sharedRouter.children.push(examples)
// }

// 这个要放在最后
// routes.push(fallbackRouter)

export default routes
