<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<listitem :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></listitem>
		</swiper-item>
	</swiper>
</template>

<script>
	import listitem from './listitem.vue'

	export default {
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {
				list: [],
				listCatchData: {},
				load: {},
				pageSize: 10
			}
		},
		components: {
			listitem
		},
		watch: {
			tab(newVal, oldVal) {
				if (newVal.length == 0) {
					return
				};
				this.listCatchData = {};
				this.load = {};
				this.getList(this.activeIndex);
			},
			activeIndex(newVal, oldVal) {
				this.activeIndex = newVal;
			}
		},
		created() {
			//tab 还没有值
			uni.$on('update_article', (e) => {
				// console.log(e);
				if (e === 'follow') {
					this.listCatchData = {};
					this.load = {};
					this.getList(this.activeIndex);
				}

			})
		},
		methods: {
			//tabs与内容联动
			change(e) {
				// console.log(e);
				const {
					current
				} = e.detail;
				this.$emit('change', current);
				//当数据不存在 或数据长度 为 0  时去请求数据
				if (!this.listCatchData[current] || this.listCatchData[current] == 0) {
					this.getList(current);
				}
			},
			//获取内容数据
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					};
				}
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					// console.log(res);
					const {
						data
					} = res;
					if (data.length === 0) {
						let oldLoad = {};
						oldLoad.loading = 'noMore';
						oldLoad.page = this.load[current].page;
						this.$set(this.load, current, oldLoad);
						//强制渲染页面
						this.$forceUpdate();
						return
					}
					//数据累加
					let oldList = this.listCatchData[current] || [];
					oldList.push(...data);
					//数据懒加载
					this.$set(this.listCatchData, current, oldList);
				})
			},
			//底部监听
			loadmore() {
				// console.log("底部");
				if (this.load[this.activeIndex].loading === 'noMore') {
					return;
				};
				this.load[this.activeIndex].page++;
				this.getList(this.activeIndex);
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
