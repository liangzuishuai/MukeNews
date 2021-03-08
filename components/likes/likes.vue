<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {

					}
				}
			},
			types: {
				type: String,
				default: ''
			}
		},
		watch: {
			item(newVal) {
				this.like = this.item.is_like;
			}
		},
		data() {
			return {
				like: false
			}
		},
		created() {
			this.like = this.item.is_like;
		},
		methods: {
			//收藏点击事件
			likeTap() {
				// console.log("点击收藏");
				this.like = !this.like;
				this.setupdateLikes();
			},
			setupdateLikes() {
				uni.showLoading();
				this.$api.update_like({
					user_id: '5ffe6a809fea3c000182b949',
					article_id: this.item._id
				}).then(res => {
					uni.hideLoading();
					uni.showToast({
						"title": this.like ? '收藏成功' : '取消收藏',
						"icon": 'none'
					})
					// console.log(res);
					//通知其他页面改变状态
					uni.$emit('update_article', this.types)
				}).catch(err => {
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style lang="scss">
	.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		width: 20px;
		height: 20px;
		// border: 1px solid red;
	}
</style>
