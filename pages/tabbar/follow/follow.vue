<template>
	<view class="folllow">
		<!-- 导航切换 -->
		<view class="follow-tab">
			<view class="follow-tab__box">
				<view @click="tab(0)" class="follow-tab__item" :class="{active:activeIndex === 0}">
					文章
				</view>
				<view @click="tab(1)" class="follow-tab__item" :class="{active:activeIndex === 1}">
					作者
				</view>
			</view>
		</view>
		<view class="folllow-list">
			<swiper class="follow-list__swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<listscroll>
						<uni-load-more v-if="list.length === 0 && !articleShow" iconType="snow" :status="loading"></uni-load-more>
						<listcard v-for="item in list" :item="item" types="follow" :key="item._id"></listcard>
						<view class="no-data" v-if="articleShow">
							暂无数据
						</view>
					</listscroll>
				</swiper-item>
				<swiper-item>
					<listscroll>
						<uni-load-more v-if="authorLists.length === 0 && !articleShow2" iconType="snow" :status="loading"></uni-load-more>
						<list-author v-for="item in authorLists" :key="item.id" :item="item"></list-author>
						<view class="no-data" v-if="articleShow2">
							暂无数据
						</view>
					</listscroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list: [],
				authorLists: [],
				articleShow: false,
				articleShow2: false,
				loading: 'loading'
			}
		},
		onLoad() {
			uni.$on('update_article', (e) => {
				// console.log("关注页面触发");
				this.get_follow();
			});
			this.getAuthor();
			this.get_follow();
			uni.$on('update_author', () => {
				this.getAuthor();
			})
		},
		methods: {
			change(e) {
				// console.log(e);
				this.activeIndex = e.detail.current
			},
			get_follow() {
				this.$api.get_follow().then(res => {
					// console.log(res);
					const {
						data
					} = res;
					this.list = data;
					console.log(this.list);
					this.articleShow = this.list.length === 0 ? true : false;
				})
			},
			tab(index) {
				this.activeIndex = index;
			},
			getAuthor() {
				this.$api.get_author().then(res => {
					// console.log(res);
					const {
						data
					} = res;
					this.authorLists = data;
					this.articleShow2 = this.authorLists.length === 0 ? true : false;
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.folllow {
		// height: 100%;
		display: flex;
		// justify-content: center;
		// align-items: center;
		flex-direction: column;
		flex: 1;
		// border: 1px solid red;
		box-sizing: border-box;

		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border-bottom: 1px #f5f5f5 solid;

			.follow-tab__box {
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px $mk-base-color solid;

				.follow-tab__item {
					width: 100%;
					display: flex;
					justify-content: center;
					color: #666;
					font-size: 14px;
					align-items: center;

					&:first-child {
						border-right: 1px $mk-base-color solid;
					}

					&.active {
						color: $mk-base-color;
					}
				}
			}
		}

		.folllow-list {
			flex: 1;
			// border: 1px solid red;
		}

		.follow-list__swiper {
			height: 100%;

			.swiper-item {
				height: 100%;
			}
		}
	}

	.no-data {
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
