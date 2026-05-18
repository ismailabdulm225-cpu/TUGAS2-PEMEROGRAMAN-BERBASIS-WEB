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