import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueRessource from 'vue-resource'
import i18n from './plugins/i18n'

Vue.config.productionTip = false
Vue.use(vueRessource)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),

  mounted() {
    this.$http
      .get(process.env.VUE_APP_BASE_API_URL)
      .then(data => {
        return data.json()
      })
      .then(data => {
        for (let key in data) {
          data[key].id = key
          this.$store.state.contacts.push(data[key])
        }
      })
  }
}).$mount('#app')
