<template>
  <v-overlay
    v-if="$store.state.contacts.length === 0"
    :value="$store.state.contacts.length === 0"
  >
    <v-progress-circular
      indeterminate
      color="amber darken-1"
      size="100"
    ></v-progress-circular>
  </v-overlay>

  <div v-else class="home">
    <v-container grid-list-xs>
      <transition-group name="list">
        <v-flex
          xs12
          class="mx-auto my-10 contact"
          v-for="contact in contacts.filter(
            c =>
              c.first_name.match($store.state.query) ||
              c.last_name.match($store.state.query)
          )"
          :key="contact.id"
        >
          <v-card elevation="20" shaped class="card rounded-xl pa-4">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  {{ contact.email }}
                </div>
                <v-list-item-title class="headline mb-1"
                  >{{ contact.first_name }}
                  <span class="text-uppercase"> {{ contact.last_name }}</span>
                </v-list-item-title>
                <v-list-item-subtitle
                  >#{{
                    contact.id.slice(1, contact.id.length)
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-avatar rounded tile size="80" color="grey"
                ><v-img :src="contact.avatar"></v-img
              ></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn outlined :to="`/contact/${contact.id}`">
                {{ $t('card.info_btn') }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :loading="loadingDelete"
                color="red"
                class="ma-2 white--text"
                @click="deleteContact(contact.id)"
              >
                {{ $t('card.delete_btn') }}
                <v-icon right>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </transition-group>
    </v-container>

    <v-snackbar v-model="deleteAlert" :timeout="2000" top color="success">
      The contact has been sucessfuly removed !
      <v-icon>mdi-delete</v-icon>
    </v-snackbar>

    <v-btn
      fab
      color="amber darken 1"
      elevation="8"
      large
      bottom
      right
      fixed
      @click="
        $vuetify.goTo(0, {
          duration: duration,
          offset: offset,
          easing: easing
        })
      "
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    contacts() {
      return this.$store.state.contacts
    }
  },
  data() {
    return {
      duration: 1000,
      offset: 0,
      easing: 'easeInOutQuad',
      deleteAlert: false,
      loadingDelete: false
    }
  },
  methods: {
    deleteContact: function(contact_id) {
      this.loadingDelete = true
      this.$http
        .delete(
          `${process.env.VUE_APP_BASE_API_URL.slice(0, -5)}/${contact_id}.json`
        )
        .then(() => {
          this.loadingDelete = false
          this.$store.commit('deleteContact', contact_id)
          this.deleteAlert = true
        })
    }
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.list-move {
  transition: transform 1s;
}

.card {
  border: solid black 1px;
}
/* .contact :hover {
  transform: scale(1.05);
} */
</style>
