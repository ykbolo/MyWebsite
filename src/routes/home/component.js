export default {
    data() {
        return {
            imgurl: ''
        }
    },
    components: {},
    methods: {

    },
    mounted() {
        setInterval(() => {
            let randomNum = Math.ceil(Math.random() * 100);
            this.imgurl = `http://ezreal-yk.cn/photos/${randomNum}.jpg`
        }, 2000)

    }
}