<!-- @format -->

<template>
	<div id="TakePhotoByWeb">
		<h1>La Cámara actual es {{ nombreCamara }}</h1>
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
		name: "TakePhotoByWeb",
		data() {
			return {
				name_array: [],
				array_names: [],
				nombreCamara: "",
				video: {},
				canvas: {},
				captures: [],
				flag_all_photos: false,
				fotos_faltantes: 3,
			}
		},
		computed: {},

		methods: {
			capture() {
				if (this.captures.length <= 2) {
					this.canvas = this.$refs.canvas
					this.canvas.getContext("2d").drawImage(this.video, 0, 0, 400, 350)
					console.log(typeof canvas, typeof this.canvas)
					this.captures.push(this.canvas.toDataURL("image/png"))
				} else {
					if (this.video.active != true) {
						alert(
							`La cámara no está seleccionada o cámara fallando `,
							"Cámara no seleccionada"
						)
					} else {
						alert(
							`Solo se pueden tomar ${this.array_names.length} fotos,\n si deseas tomar otra tienes que eliminar una de ellas`,
							"Exceso de fotos"
						)
					}
				}
			},
			optionPhoto(e, i) {
				this.captures.splice(i, 1)
			},

			/**
			 * @description se encarga de asignar  la cámara  del dispositivo
			 * @param {String}  recibe el valor de que cámara se usara
			 */
			camera(face) {
				this.nombreCamara = face
				console.log(this.video)
				//Se encarga  de desactivar la cámara y ejecuta el método  store en  modelo  videoOnly
				this.stopVideoOnly()
				this.gum(face)
			},
			/**
			 * @description Se encarga de asignar la cámara delantera como trasera del dispositivo
			 * @param {String}  recibe el valor de que cámara se usara
			 */
			gum(face) {
				if (face === "user") {
					return navigator.mediaDevices
						.getUserMedia({
							video: {
								width: { min: 1280 },
								height: { min: 720 },
								facingMode: face,
							},
						})
						.then((stream) => {
							this.$refs.srcObject = stream
							this.localstream = stream
							//Se encarga de asignar stream a la variable  video del store en modelo videoOnly
						})
						.catch((e) => {
							console.log(e)
						})
				}
				if (face === "environment") {
					return navigator.mediaDevices
						.getUserMedia({
							video: {
								width: { min: 1280 },
								height: { min: 720 },
								facingMode: { exact: face },
							},
						})
						.then((stream) => {
							this.$refs.srcObject = stream
							this.localstream = stream
							//Se encarga de asignar stream a la variable  video del store en modelo videoOnly
						})
						.catch((e) => {
							console.log(e)
						})
				}
			},
			/**
			 * @description Se encarga  de activar la cámara
			 */
			async ActiveVideoOnly() {
				try {
					if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
						let stream = await navigator.mediaDevices.getUserMedia({
							video: true,
						})
						this.localStream = stream
						this.$refs.vide = stream
						this.video.srcObject = stream
					}
				} catch (error) {
					console.log(error)
				}
			},
			/**
			 * @description Se encarga  de desactivar la cámara
			 */
			async stopVideoOnly() {
				try {
					this.video.getTracks().forEach(function(track) {
						if (track.readyState == "live" && track.kind === "video") {
							track.stop()
						}
					})
				} catch (error) {
					console.log(error)
				}
			},
		},

		mounted() {
			this.captures = []
			this.video = this.$refs.video

			this.ActiveVideoOnly()
		},
		unmounted() {
			this.captures = []
			//console.log("8 - destroyed")
			//Se encarga  de desactivar la cámara y ejecuta el método  store en  modelo  videoOnly
			this.stopVideoOnly()
		},
		watch: {
			captures: function() {
				this.fotos_faltantes = 3 - this.captures.length
				if (this.captures.length == 3) {
					this.flag_all_photos = true
				} else {
					this.flag_all_photos = false
				}
			},
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
