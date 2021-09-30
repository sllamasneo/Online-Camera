<!-- @format -->

<template>
	<div id="TakePhotoByWeb">
		<v-row justify="center">
			<v-col cols="6" sm="6" md="5" lg="6">
				<button
					type="button"
					class="btn btn-info"
					@click="camera('environment')"
				>
					Trasera
				</button>
			</v-col>

			<v-col cols="6" sm="6" md="5" lg="6">
				<button type="button" class="btn btn-info" @click="camera('user')">
					Frontal
				</button>
			</v-col>
		</v-row>

		<div class="container_video_button">
			<video ref="video" id="video" width="400" height="350" autoplay></video>
			<canvas ref="canvas" id="canvas" width="400" height="350"></canvas>
			<button id="snap" @click="capture()">
				<h1>Tomar foto</h1>
			</button>
		</div>

		<ul>
			<li v-for="(c, i) in captures" v-bind:key="i">
				<img v-bind:src="c" height="100" v-on:click="optionPhoto(c, i)" />
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				captures: [],
				anteriorEstado: "",
			}
		},
		methods: {
			// Acceso a la webcam
			async init() {
				try {
					if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
						const stream = await navigator.mediaDevices.getUserMedia({
							video: {
								width: 400,
								height: 400,
							},
						})
						this.$refs.video.srcObject = stream
						this.video.srcObject = stream
					}
				} catch (e) {
					console.log(e)
				}
			},

			async capture() {
				// Dibuja la imagen
				this.$refs.canvas
					.getContext("2d")
					.drawImage(this.$refs.video, 0, 0, 800, 480)
				this.captures.push(this.$refs.canvas.toDataURL("image/png"))
			},

			async optionPhoto(e, i) {
				this.captures.splice(i, 1)
			},
			//Se encarga  de asignar la camara
			async camera(face) {
				try {
					if (this.anteriorEstado != face) {
						this.stopCamara()
						this.gum(face)
						this.anteriorEstado = face
					} else {
						console.log("Camara  : " + face)
					}
				} catch (error) {
					console.log(error)
				}
			},
			/**
			 * @description Se encarga de asignar la cámara delantera como trasera del dispositivo
			 * @param {String}  recibe el valor de que cámara se usara
			 */
			async gum(face) {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: face != "environment" ? face : { exact: face },
					},
				})
				this.$refs.video.srcObject = stream
				this.video = stream
			},
			async stopCamara() {
				this.video.getTracks().forEach(function(track) {
					if (track.readyState == "live" && track.kind === "video") {
						track.stop()
					}
				})
			},
		},
		mounted() {
			// Load init
			this.init()
			console.log(this.$refs.video)
		},
	}
</script>

<style scoped>
	.btn_save_photos {
		margin-bottom: 10px;
	}
	.container_video_button {
		position: relative;
	}
	.icons_camera {
		color: #d8d8d8;
		position: absolute;
		z-index: 1000;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 10vh;
	}
	#TakePhotoByWeb {
		text-align: center;
		color: #2c3e50;
		width: 100%;
		margin-top: 60px;
	}
	#video {
		background-color: #000000;
	}
	#canvas {
		display: none;
	}
	li {
		display: inline;
		padding: 5px;
	}
	@media (max-width: "600px") {
		#video {
			width: 350px;
			height: 250px;
		}
		#canvas {
			width: 350px;
			height: 250px;
		}
	}
</style>
