<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title>
          Your peer ID is {{peerId}}
        </v-card-title>
        <v-card-text>
          <v-select
            :items="audios"
            label="Audio input"
            single-line
          ></v-select>
          <v-select
            :items="videos"
            label="Video input"
            single-line
          ></v-select>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { key } from '../credentials'

export default {
  props: [ 'name' ],
  data () {
    return {
      peer: {},
      peerId: '',
      audios: [],
      videos: [],
      localStream: {},
      existingCall: {}
    }
  },
  mounted: function () {
    this.peer = new Peer(this.name, {
      key: key,
      debug: 3
    })

    this.peer.on('open', () => {
      this.peerId = this.peer.id
    })

    navigator.mediaDevices.enumerateDevices()
    .then(deviceInfos => {
      for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i]
        if (deviceInfo.kind === 'audioinput') {
          this.audios.push({
            text: deviceInfo.label ||
            `Microphone ${this.audios.length + 1}`,
            value: deviceInfo.deviceId
          })
        } else if (deviceInfo.kind === 'videoinput') {
          this.videos.push({
            text: deviceInfo.label ||
            `Camera  ${this.videos.length + 1}`,
            value: deviceInfo.deviceId
          })
        }
      }
    })
  }
}
</script>
