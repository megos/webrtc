<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-form v-model="valid">
          <v-card-title>
            Login
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="10"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="submit"
              :disabled="!valid"
            >
              login
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ]
    }
  },
  methods: {
    submit () {
      this.$router.push({path: 'Top', props: {name: this.name}})
    }
  }
}
</script>
