<!-- @format -->

<template>
	<div class="video-wrap">
		<video ref="video" id="video" width="400" height="350" autoplay></video>
		<canvas ref="canvas" id="canvas" width="400" height="350"></canvas>
	</div>
</template>
<script>
	export default {
		methods: {
			// Acceso a la webcam
			async init() {
				try {
					const stream = await navigator.mediaDevices.getUserMedia({
						audio: false,
						video: {
							width: 400,
							height: 400,
						},
					})
					this.$refs.video.srcObject = stream
					this.video.srcObject = stream
					//handleSuccess(stream)
				} catch (e) {
					console.log(e)
				}
			},
		},
		mounted() {
			this.init()
		},
	}

	// Correcto!

	// Load init

	// Dibuja la imagen
</script>
