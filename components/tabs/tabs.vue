<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x="true">
			<view class="tab-scroll__box">
				<view class="tab-scroll__item" v-for="(item,index) in tablist" :key="index" @click="clickTab(item,index)" :class="{active:activeIndex === index}">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="open">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tablist: {
				type: Array,
				default () {
					return []
				}
			},
			tabIndex: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		//watch可以监听data或props值的变化
		watch: {
			tabIndex(newVal, oldVal) {
				// console.log(newVal,oldVal);
				this.activeIndex = newVal;
			}
		},
		data() {
			return {
				activeIndex: 0
			}
		},
		methods: {
			//tab切换
			clickTab(item, index) {
				// console.log(item, index);
				this.activeIndex = index;
				this.$emit('tab', {
					data: item,
					index: index
				})
			},
			//打开标签编辑页
			open(){
				uni.navigateTo({
					url:'/pages/home-label/home-label'
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		width: 100%;
		border-bottom: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;

		.tab-scroll {
			flex: 1;
			overflow: hidden;
			border: 1px solid #f3f3f3;

			.tab-scroll__box {
				display: flex;
				height: 45px;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;

				.tab-scroll__item {
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;

					&.active {
						color: $mk-base-color;
					}
				}
			}
		}

		.tab-icons {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;

			&::after {
				content: '';
				position: absolute;
			}
		}
	}
</style>
