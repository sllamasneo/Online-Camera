/** @format */
/**
 * @Author salvador llamas
 * @Date 2021/09/20
 * @Update 2021/09/22
 * @Description  Se encarga  de guardar todos los métodos, variables  referentes  a viedoOnly
 */
const videoOnly = {
	namespaced: true,
	state: {
		video: {},
		previousData: "si jala vuex",
	},

	mutations: {
		/**
		 * @description Se encarga  de activar la cámara
		 */
		async ActiveVideoOnly(state) {
			try {
				if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
					let stream = await navigator.mediaDevices.getUserMedia({
						video: true,
					})
					state.video.srcObject = stream
					state.video = stream
				}
			} catch (error) {
				console.log(error)
			}
		},
		/**
		 * @description Se encarga  de desactivar la cámara
		 */
		stopVideoOnly(state) {
			try {
				state.video.getTracks().forEach(function(track) {
					if (track.readyState == "live" && track.kind === "video") {
						track.stop()
					}
				})
			} catch (error) {
				console.log(error)
			}
		},
		/**
		 * @description Asigna el valor a la cámara actual
		 *@param {data}  recibe el valor de la cámara actual
		 */
		addValueVideoOnly(state, data) {
			state.video = data
		},

		/**
		 * @description Asigna el valor a @previousData
		 *@param {data}  recibe el valor de la cámara actual
		 */
		addPreviousData(state, data) {
			//console.log("si estoy entrando correctamente " + data)
			state.previousData = data
		},
	},
	actions: {
		/**
		 * @description Se encarga de ejecutar el método    @stopVideoOnly
		 */
		stopVideoOnly: async function({ commit }) {
			commit("stopVideoOnly")
		},
		/**
		 * @description Se encarga de ejecutar el método    @addValueVideoOnly
		 *@param {object}  recibe el valor de la cámara actual
		 */
		addValueVideoOnly: async function({ commit }, data) {
			commit("addValueVideoOnly", data)
		},
		/**
		 * @description Se encarga de ejecutar el método    @addValueVideoOnly
		 *
		 */
		ActiveVideoOnly: async function({ commit }) {
			commit("ActiveVideoOnly")
		},
		/**
		 * @description Se encarga de ejecutar el método    @addPreviousData
		 *@param {boolean}  Es el dato registrado anterior  recibido
		 */
		addPreviousData: async function({ commit }, data) {
			commit("addPreviousData", data)
		},
	},
	getters: {},
}
export default videoOnly
