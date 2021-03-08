<template>
	<view class="home">
		<!-- 自定义组件 -->
		<navbar></navbar>
		<tabs :tablist="tabList" @tab="tabclick" :tabIndex="tabIndex"></tabs>
		<!-- 滚动内容 -->
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	import listscroll from '../../../components/listscroll/listscroll.vue'
	import listcard from '../../../components/listcard/listcard.vue'
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex: 0,
				activeIndex: 0,
			}
		},
		onLoad() {
			uni.$on('labelChange', (res) => {
				this.tabList = [];
				this.tabIndex = 0;
				this.activeIndex = 0;
				this.getLabel();
			})
		},
		computed: {
			...mapState(['userinfo'])
		},
		watch: {
			userinfo(newVal) {
				this.getLabel();
			}
		},
		methods: {
			getLabel() {
				// console.log(this.$api);
				this.$api.get_labe({
					type: 'all'
				}).then((res) => {
					// console.log(res);
					const {
						data
					} = res;
					// console.log('标签', data);
					this.tabList = data.filter(item => item.current == true);
					this.tabList.unshift({
						name: '全部'
					})
				});
			},
			tabclick({
				data,
				index
			}) {
				// console.log(data, index);
				this.activeIndex = index;
				// console.log('index',index);
			},
			change(current) {
				// console.log("当前swiper的值", current);
				this.tabIndex = current;
				this.activeIndex = current;
			}
		},
		components: {
			listscroll,
			listcard
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;

	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		// border: 1px solid red;
		.home-list {
			flex: 1;
			box-sizing: border-box;
			// border: 1px solid red;
		}
	}
</style>
