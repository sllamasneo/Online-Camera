/** @format */

import Vuex from "vuex"
// modules stores
import videoOnlyModule from "@/store/modules/videoOnly.js"

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		//realTimeStore: moduleIO,
		videoOnly: videoOnlyModule,
	},
})
