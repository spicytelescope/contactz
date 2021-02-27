<template>
  <v-app-bar app color="purple lighten-1" class="px-auto">
    <v-toolbar-title class="headline" @click="$store.state.query = ''">
      <router-link exact to="/">
        <div class="hidden-xs-only">
          <span class="font-weight-thin">Con</span>
          <span class="font-weight-bold">TACTZ</span>
        </div>
        <div class="hidden-sm-and-up">
          <img src="../assets/favicon.png" />
        </div>
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn
      outlined
      color="amber darken-1"
      @click="$store.commit('shuffleContacts')"
      ><span class="hidden-ms-and-up"><v-icon>mdi-shuffle</v-icon></span>
      <span class="hidden-xs-only">{{ $t('shuffle') }}</span></v-btn
    >
    <v-spacer></v-spacer>

    <v-text-field
      hide-details
      :label="$t('search')"
      prepend-icon="mdi-magnify"
      single-line
      color="amber darken-1"
      v-model="$store.state.query"
    ></v-text-field>
    <v-spacer></v-spacer>
    <Popup />
    <v-spacer></v-spacer>
    <v-menu bottom left :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-switch
            color="amber darken-1"
            v-model="$vuetify.theme.dark"
            inset
            :label="$t('settings.theme')"
          ></v-switch>
        </v-list-item>
        <v-list-item>
          <v-switch
            color="amber darken-1"
            @click="changeLocale"
            :label="`${language.text}`"
            inset
            v-model="language_switch"
          ></v-switch>
          <v-avatar small class="rounded-xl mx-auto">
            <img :src="language.icon" alt="flag" />
          </v-avatar>
          <img />
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.headline a {
  text-decoration: none;
  color: black;
}
</style>
<script>
import Popup from './addContact.vue'
import enIcon from 'svg-country-flags/svg/gb.svg'
import frIcon from 'svg-country-flags/svg/fr.svg'

export default {
  components: { Popup },
  computed: {
    language() {
      return this.language_switch
        ? { text: 'Français', icon: frIcon, key: 'fr' }
        : { text: 'English', icon: enIcon, key: 'en' }
    }
  },
  data() {
    return {
      language_switch: false
    }
  },
  methods: {
    changeLocale() {
      this.$i18n.locale = this.language.key
    }
  }
}
</script>
