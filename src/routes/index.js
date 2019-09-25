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
      name: 'about-me',
      path: 'about-me',
      component: () => import('./about-me')
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
