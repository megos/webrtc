<template>
  <v-container>
    <v-row>
      <v-col
        md="3"
        offset-md="1"
      >
        <v-row>
          <v-col
            md="12"
          >
            <v-card>
              <v-card-text>
                Your peer ID is {{ peerId }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            md="12"
          >
            <v-card>
              <v-card-text>
                <v-select
                  v-model="selectedAudio"
                  :items="audios"
                  label="Audio input"
                  single-line
                  @change="onChange"
                />
                <v-select
                  v-model="selectedVideo"
                  :items="videos"
                  label="Video input"
                  single-line
                  @change="onChange"
                />
                <v-select
                  v-model="selectedCodec"
                  :items="codecs"
                  label="Video codec"
                  single-line
                />
              </v-card-text>
              <v-card-actions>
                <v-card-text>
                  Screen share settings
                </v-card-text>
                <v-btn
                  :icon="show ? 'mdi-chevron-down' : 'mdi-chevron-up'"
                  @click="show = !show"
                />
              </v-card-actions>
              <v-slide-y-transition>
                <v-card-text v-show="show">
                  <v-text-field
                    v-model="width"
                    label="Width (px)"
                    @change="onChange"
                  />
                  <v-text-field
                    v-model="height"
                    label="Height (px)"
                    @change="onChange"
                  />
                  <v-text-field
                    v-model="frameRate"
                    label="Frame Rate (fps)"
                    @change="onChange"
                  />
                  <v-select
                    v-model="mediaSource"
                    :items="mediaSourceItem"
                    label="Media source"
                    single-line
                    @change="onChange"
                  />
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-col>
          <v-col
            md="12"
          >
            <v-card>
              <v-card-text>
                <v-text-field
                  v-model="callId"
                  label="Call ID"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="success"
                  :disabled="(!callId || existingCall)"
                  @click="callByName"
                >
                  Call
                </v-btn>
                <v-btn
                  color="error"
                  @click="close"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col
            md="12"
          >
            <v-card>
              <v-card-title>
                Your video
              </v-card-title>
              <v-card-text>
                <video
                  id="my-video"
                  muted="true"
                  autoplay
                  playsinline
                  controls
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        md="7"
      >
        <v-row>
          <v-col
            md="12"
          >
            <v-card>
              <v-card-title v-if="existingCall">
                Connecting {{ existingCall.remoteId }}
              </v-card-title>
              <v-card-text>
                <video
                  id="their-video"
                  autoplay
                  playsinline
                  controls
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="300px"
    >
      <v-card>
        <v-card-title v-if="call">
          <span class="headline">Calling from {{ call.remoteId }}</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="success"
            @click="connect"
          >
            Connect
          </v-btn>
          <v-btn
            color="error"
            @click="disconnect"
          >
            Disconnect
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      color="error"
    >
      {{ errorMessage.toString() }}
      <v-btn
        variant="text"
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { nextTick } from 'vue'
import Peer from 'skyway-js'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      peer: {},
      screenShare: {},
      peerId: '',
      callId: '',
      show: false,
      dialog: false,
      width: 600,
      height: 400,
      frameRate: 24,
      mediaSource: 'window',
      audios: [],
      videos: [{
        title: 'None',
        value: null,
      },
      {
        title: 'Screen share',
        value: 'screenShare',
      }],
      codecs: ['VP8', 'VP9', 'H264'],
      mediaSourceItem: ['window', 'application', 'screen'],
      selectedAudio: '',
      selectedVideo: '',
      selectedCodec: 'VP9',
      localStream: null,
      call: null,
      existingCall: null,
      errorMessage: '',
    }
  },
  computed: {
    snackbar: {
      get() {
        return !!this.errorMessage
      },
      set() {},
    },
  },
  mounted() {
    this.peer = new Peer(this.name, {
      key: process.env.VUE_APP_SKYWAY_KEY,
      debug: 3,
    })

    this.screenShare = ScreenShare.create({ debug: true })

    this.peer.on('open', () => {
      this.peerId = this.peer.id
    })

    this.peer.on('close', () => {
      this.close()
    })

    this.peer.on('error', () => {
      this.close()
    })

    this.peer.on('disconnected', () => {
      this.close()
    })

    this.peer.on('call', (call) => {
      this.dialog = true
      this.call = call
    })

    navigator.mediaDevices.enumerateDevices()
      .then((deviceInfos) => {
        deviceInfos.forEach((deviceInfo) => {
          if (deviceInfo.kind === 'audioinput') {
            this.audios.push({
              title: deviceInfo.label
            || `Microphone ${this.audios.length + 1}`,
              value: deviceInfo.deviceId,
            })
          } else if (deviceInfo.kind === 'videoinput') {
            this.videos.push({
              title: deviceInfo.label
            || `Camera  ${this.videos.length - 1}`,
              value: deviceInfo.deviceId,
            })
          }
        })
      })
  },
  methods: {
    onChange() {
      nextTick(() => {
        // See. https://github.com/vuejs/vue/issues/293#issuecomment-265716984
        if (this.selectedVideo === 'screenShare') {
          if (!this.screenShare.isScreenShareAvailable()) {
            this.errorMessage = 'Screen Share cannot be used. Please install the Chrome extension.'
            return
          }

          this.screenShare.start({
            width: this.width,
            height: this.height,
            frameRate: this.frameRate,
            mediaSource: this.mediaSource,
          }).then((screenStream) => {
            if (this.selectedAudio) {
              const constraints = {
                audio: { deviceId: { exact: this.selectedAudio } },
                video: false,
              }
              navigator.mediaDevices.getUserMedia(constraints).then((audioStream) => {
                const stream = new MediaStream()
                screenStream.getVideoTracks().forEach((track) => stream.addTrack(track.clone()))
                audioStream.getAudioTracks().forEach((track) => stream.addTrack(track.clone()))
                this.replaceStream(stream)
              }).catch((err) => {
                this.errorMessage = err
              })
            } else {
              this.replaceStream(screenStream)
            }
          }).catch((err) => {
            this.errorMessage = err
          })
        } else {
          const constraints = {
            audio: this.selectedAudio ? { deviceId: { exact: this.selectedAudio } } : false,
            video: this.selectedVideo ? { deviceId: { exact: this.selectedVideo } } : false,
          }
          navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            this.replaceStream(stream)
          }).catch((err) => {
            this.errorMessage = err
          })
        }
      })
    },
    callByName() {
      this.receive(this.peer.call(this.callId, this.localStream, {
        videoCodec: this.selectedCodec,
      }))
    },
    connect() {
      this.dialog = false
      this.call.answer(this.localStream, {
        videoCodec: this.selectedCodec,
      })
      this.receive(this.call)
      this.call = null
    },
    disconnect() {
      this.dialog = false
      this.call.close()
      this.call = null
    },
    receive(call) {
      this.close()
      call.on('stream', (stream) => {
        const el = document.getElementById('their-video')
        el.srcObject = stream
        el.play()
      })
      this.existingCall = call
    },
    close() {
      if (this.existingCall) {
        this.existingCall.close()
        this.existingCall = null
      }
    },
    closeSnackbar() {
      this.errorMessage = ''
    },
    replaceStream(stream) {
      document.getElementById('my-video').srcObject = stream
      this.localStream = stream

      if (this.existingCall) {
        this.existingCall.replaceStream(stream)
      }
    },
  },
}
</script>

<style scoped>
video {
  width: 100%;
}
</style>
