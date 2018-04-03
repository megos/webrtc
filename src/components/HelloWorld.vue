<template>
  <v-container fluid>
    <v-form>
      <v-text-field
        name="hoge"
        label="Name"
        :counter="10"
        required
      ></v-text-field>
    </v-form>
  </v-container>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
