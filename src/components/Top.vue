<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title>
          Your peer ID is {{peerId}}
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [ 'name' ],
  data () {
    return {
      peer: {},
      peerId: ''
    }
  },
  mounted: function () {
    this.peer = new Peer(this.name, {
      key: '',
      debug: 3
    })

    this.peer.on('open', () => {
      this.peerId = this.peer.id
    })
  }
}
</script>
