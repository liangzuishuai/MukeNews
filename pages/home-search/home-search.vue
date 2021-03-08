<template>
	<view class="home">
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
		<view class="home-list">
			<view v-if="is_history" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text @click="clear" class="label-clear">清空</text>
				</view>
				<view v-if="historyLists.length > 0" class="label-content">
					<view @click="openHistory(item)" class="label-content_item" v-for="(item,index) in historyLists" :key="index">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<!-- <button type="default" @click="testBtn">添加历史记录</button> -->
			<listscroll v-else class="list-scroll">
				<uni-load-more v-if="loading" status="loading" type="snow"></uni-load-more>
				<view v-if="searchList.length > 0" class="">
					<listcard @click="setHistory" :item="item" v-for="item in searchList" :key="item._id"></listcard>
				</view>
				<view v-if="searchList.length === 0 && !loading" class="no-data">
					没有搜索到相关数据
				</view>
			</listscroll>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				// historyLists: []
				is_history: true,
				searchList: [],
				value: '',
				loading: false
			}
		},
		computed: {
			...mapState(['historyLists', 'clearHistory'])
		},
		onLoad() {

		},
		methods: {
			change(value) {
				if (!value) {
					clearTimeout(this.timer);
					this.mark = false;
					this.getSearch(value);
					return;
				}
				//做标记
				if (!this.mark) {
					this.mark = true;
					this.timer = setTimeout(() => {
						this.mark = false;
						this.getSearch(value);
					}, 1000);
				}
			},
			testBtn() {
				this.$store.dispatch('set_history', {
					name: "test"
				})
			},
			//获取内容数据
			getSearch(value) {
				if (!value) {
					this.searchList = [];
					this.is_history = true;
					return;
				} else {
					this.is_history = false;
				}
				this.loading = true;
				this.$api.get_search({
					value
				}).then(res => {
					const {
						data
					} = res;
					this.loading = false;
					this.searchList = data;
				})
			},
			setHistory(item) {
				let norepetition = this.norepetition(this.historyLists, 'name');
				if (!norepetition) {
					this.$store.dispatch('set_history', {
						name: this.value
					})
				}
			},
			norepetition(arr, key) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i][key] == this.value) {
						return 1;
					}
				}
			},
			openHistory(item) {
				this.value = item.name;
				this.getSearch(this.value);
			},
			clear() {
				this.$store.dispatch('clearHistory');
				uni.showToast({
					title: "清空完成"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;

		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5;

				.label-title {
					color: $mk-base-color;
				}

				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content_item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}

	.no-data {
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		color: #666;
		font-size: 12px;
	}
</style>
