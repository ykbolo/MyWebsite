import $ from 'jquery'
// import marked from 'mark'
// import fs from 'fs'
// import bodyParser from 'body-parser'

export default {
    name: 'app-top-bar',
    props: [],
    data() {
        return {
            tabs: [{
                name: '主页',
                path: '/'
            }, {
                name: '测评',
                path: '/list/life'
            }, {
                name: '技术',
                path: '/list/tech'
            }, {
                name: '相册',
                path: '/list/game'
            }]
        }
    },
    mounted() {

    },
    methods: {}
}