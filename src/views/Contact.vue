<template>
  <v-container fluid class="mx-auto">
    <v-card class="rounded-xl pa-4" elevation="20">
      <v-layout column align-center>
        <v-flex class="pa-4"
          ><v-avatar size="avatarSize" color="red">
            <img :src="contact.avatar" alt="alt" class="img" />
          </v-avatar>
        </v-flex>
        <v-flex class="text-h2 font-weight-thin font-italic">
          {{ prefix }}
          {{ contact.first_name }}
          {{ contact.last_name.toUpperCase() }} />
        </v-flex>
        <v-subheader class="text-h4 font-weight-light">
          <a class="mail_link" :href="`mailto:${contact.email}`">
            {{ contact.email }}</a
          ></v-subheader
        >
        <v-card-text class="text-justify subtitle-1 font-weight-light">{{
          $t('contact.lorem')
        }}</v-card-text>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      prefix: '<'
    }
  },
  computed: {
    contact() {
      return this.$store.state.contacts.filter(
        c => c.id == this.$route.params.id
      )[0]
    }
  }
}
</script>

<style scoped>
.mail_link {
  text-decoration: none;
}

.img {
  max-width: 100px;
  max-height: 98px;
}
</style>
