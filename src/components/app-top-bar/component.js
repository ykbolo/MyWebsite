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
                route: ''
            }, {
                name: '测评',
                route: ''
            }, {
                name: '技术',
                route: ''
            }, {
                name: '相册',
                route: ''
            }]
        }
    },
    mounted() {

    },
    methods: {}
}