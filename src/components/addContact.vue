<template>
  <div>
    <v-dialog v-model="dialog" persistent class="mx-auto">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          slot="activator"
          color="amber darken-1"
          elevation="2"
          fab
          v-bind="attrs"
          v-on="on"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </template>

      <v-card class="rounded-xl dialog" elevation="20">
        <v-card-title>
          <span class="headline">{{ $t('form.title') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row
                sm="6"
                md="4"
                v-for="(val, key, index) in new_post"
                :key="key"
              >
                <v-text-field
                  type="text"
                  :placeholder="fields[index]"
                  required
                  v-model="new_post[key]"
                  :rules="rules[key]"
                  color="amber darken-1"
                ></v-text-field>
              </v-row>
            </v-form>
          </v-container>
          <small>{{ $t('form.required_text') }}</small>
        </v-card-text>
        <v-card-actions class="px-10 pb-5">
          <v-btn color="amber darken-1" @click="dialog = false">
            {{ $t('form.close_btn') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="amber darken-1" @click="$refs.form.reset()">
            {{ $t('form.reset_btn') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="amber darken-1" @click="addContact" :loading="loading">
            {{ $t('form.confirm_btn') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="createdAlert" :timeout="2000" top color="success">
      The contact has been created !
      <v-icon>mdi-pen-plus</v-icon>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    fields() {
      return Object.values(this.$i18n.messages[this.$i18n.locale].form.fields)
    }
  },
  data() {
    return {
      loading: false,
      createdAlert: false,
      dialog: false,
      new_post: {
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
      },
      rules: {
        first_name: [v => !!v || "The contact's first name is required"],
        last_name: [v => !!v || "The contact's last name is required"],
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        avatar: [v => !!v || "The contact avatar's URL is required"]
      }
    }
  },
  methods: {
    addContact: function() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$http
          .post(process.env.VUE_APP_BASE_API_URL, this.new_post)
          .then(data => {
            this.$store.commit('addPost', {
              ...this.new_post,
              id: data.body.name
            })

            this.$refs.form.reset()
            this.dialog = false
            this.loading = false

            this.createdAlert = true
          })
      }
    }
  }
}
</script>

<style scoped>
.v-dialog {
  backdrop-filter: blur(3px);
}
</style>
