<<<<<<< HEAD
const app = Vue.createApp({
    data() {
        return {
            greeting: ''
        }
    },
    
    mounted() {
        this.setGreeting()
    },

    methods: {
        setGreeting() {
            const hour = new Date().getHours()
            if (hour < 12) {
                this.greeting = 'Selamat Pagi'
            }
            else if (hour < 18) {
                this.greeting = 'Selamat Sore'
            }
            else {
                this.greeting = 'Selamat Malam'
            }
        }
    }
})
app.mount('#app')
=======
const app = Vue.createApp({
    data() {
        return {
            greeting: ''
        }
    },
    
    mounted() {
        this.setGreeting()
    },

    methods: {
        setGreeting() {
            const hour = new Date().getHours()
            if (hour < 12) {
                this.greeting = 'Selamat Pagi'
            }
            else if (hour < 18) {
                this.greeting = 'Selamat Sore'
            }
            else {
                this.greeting = 'Selamat Malam'
            }
        }
    }
})
app.mount('#app')
>>>>>>> 0502e7c99e052c539a9c48de8b044e208a6b5f39
