// 引入 vue vuex
import Vue from 'vue';
import Vuex from 'vuex';
//插入
Vue.use(Vuex);

//实例初始化
const store = new Vuex.Store({
	state: {
		userinfo: uni.getStorageInfoSync("USERINOF") || {},
		historyLists: uni.getStorageSync("__history") || []
	},
	mutations: {
		SET_USER_INFO(state, userinfo) {
			state.userinfo = userinfo;
		},
		//储存历史记录
		SET_HISTORY_LISTS(state, history) {
			state.historyLists = history
		},
		// 清空历史记录
		CLEAR_HISTORY(state) {
			state.historyLists = [];
		}
	},	
	actions: {
		set_userinfo({
			commit
		}, userinfo) {
			uni.setStorageSync("USERINFO", userinfo)
			commit('SET_USER_INFO', userinfo)
		},
		set_history({
			commit,
			state
		}, history) {
			let list = state.historyLists;
			// console.log(list);
			list.unshift(history);

			uni.setStorageSync('__history', list);
			commit('SET_HISTORY_LISTS', list)
		},
		clearHistory({
			commit
		}) {
			// uni.getStorageSync('__history', []);
			uni.removeStorageSync('__history');
			commit('CLEAR_HISTORY');
		}
	}
})

//导出
export default store
