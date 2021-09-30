<!-- @format -->

<template>
	<div class="about">
		<h1>This is an about page</h1>
		<camara2 />
	</div>
</template>
<script>
	// @ is an alias to /src
	import camara2 from "@/components/onlyCamara.vue"

	export default {
		name: "About",
		components: {
			camara2,
		},
	}
</script>
