<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex md3 offset-md1>
        <v-layout row wrap>
          <v-flex d-flex md12>
            <v-card>
              <v-card-text>
                Your peer ID is {{peerId}}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex md12>
            <v-card>
              <v-card-text>
                <v-select
                  :items="audios"
                  v-model="selectedAudio"
                  label="Audio input"
                  single-line
                  @change="onChange"
                ></v-select>
                <v-select
                  :items="videos"
                  v-model="selectedVideo"
                  label="Video input"
                  single-line
                  @change="onChange"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-card-text>
                  Screen share settings
                </v-card-text>
                <v-btn icon @click.native="show = !show">
                  <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-slide-y-transition>
                <v-card-text v-show="show">
                  <v-text-field
                    label="Width (px)"
                    v-model="width"
                  ></v-text-field>
                  <v-text-field
                    label="Height (px)"
                    v-model="height"
                  ></v-text-field>
                  <v-text-field
                    label="Frame Rate (fps)"
                    v-model="frameRate"
                  ></v-text-field>
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-flex>
          <v-flex d-flex md12>
            <v-card>
              <v-card-text>
                <v-text-field
                  label="Call ID or Room ID"
                  v-model="callId"
                  required
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="callByName"
                  color="success"
                >
                  Call
                </v-btn>
                <v-btn
                  @click="close"
                  color="error"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex d-flex md12>
            <v-card>
              <v-card-title>
                Your video
              </v-card-title>
              <v-card-media>
                <video
                  id="my-video"
                  muted="true"
                  autoplay
                  playsinline
                  controls
                ></video>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md8>
        <v-card>
          <v-card-media>
            <video
              id="their-video"
              autoplay
              playsinline
              controls
            ></video>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import Peer from 'skyway-js'
import { key } from '../credentials'

export default {
  props: [ 'name' ],
  data () {
    return {
      peer: {},
      screenShare: {},
      peerId: '',
      callId: '',
      show: false,
      width: 600,
      height: 400,
      frameRate: 24,
      audios: [],
      videos: [{
        text: 'None',
        value: null
      },
      {
        text: 'Screen share',
        value: 'screenShare'
      }],
      selectedAudio: '',
      selectedVideo: '',
      localStream: null,
      existingCall: null
    }
  },
  mounted: function () {
    this.peer = new Peer(this.name, {
      key: key,
      debug: 3
    })

    this.screenShare = ScreenShare.create({ debug: true })

    this.peer.on('open', () => {
      this.peerId = this.peer.id
    })

    // Receiving a call
    this.peer.on('call', call => {
      // Answer the call automatically (instead of prompting user) for demo purposes
      call.answer(this.localStream)
      this.receive(call)
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
            `Camera  ${this.videos.length - 1}`,
            value: deviceInfo.deviceId
          })
        }
      }
    })
  },
  methods: {
    onChange: function () {
      Vue.nextTick(() => {
        // See. https://github.com/vuejs/vue/issues/293#issuecomment-265716984
        if (this.selectedVideo === 'screenShare') {
          if (!this.screenShare.isScreenShareAvailable()) {
            alert('Screen Share cannot be used. Please install the Chrome extension.')
            return
          }

          this.screenShare.start({
            width: this.width,
            height: this.height,
            frameRate: this.frameRate,
            audio: this.selectedAudio
          }).then(stream => {
            document.getElementById('my-video').srcObject = stream
            this.localStream = stream

            if (this.existingCall) {
              this.existingCall.replaceStream(stream)
            }
          })
        } else {
          const constraints = {
            audio: this.selectedAudio ? {deviceId: {exact: this.selectedAudio}} : false,
            video: this.selectedVideo ? {deviceId: {exact: this.selectedVideo}} : false
          }
          navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            document.getElementById('my-video').srcObject = stream
            this.localStream = stream

            if (this.existingCall) {
              this.existingCall.replaceStream(stream)
            }
          }).catch(err => {
            console.error(err)
          })
        }
      })
    },
    callByName: function () {
      this.receive(this.peer.call(this.callId, this.localStream))
    },
    receive: function (call) {
      this.close()
      call.on('stream', stream => {
        const el = document.getElementById('their-video')
        el.srcObject = stream
        el.play()
      })
      this.existingCall = call
    },
    close: function () {
      if (this.existingCall) {
        this.existingCall.close()
      }
    }
  }
}
</script>

<style scoped>
video {
  width: 100%;
}
</style>
