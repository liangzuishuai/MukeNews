<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsList: [],
				article_id: '',
				pageSize: 5,
				page: 1,
				loading: 'loading'
			}
		},
		onLoad(query) {
			console.log(query);
			this.article_id = query.id;
			this.getComments();
		},
		onReachBottom() {
			if (this.loading == 'noMore') return;
			console.log("上拉处理");
			this.page++;
			this.getComments();

		},
		methods: {
			//获取评论列表
			getComments() {
				this.$api.get_comments({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res);
					const {
						data
					} = res;
					if (data.length === 0) {
						this.loading = 'noMore'
						return
					}
					let oldFormData = JSON.parse(JSON.stringify(this.commentsList));
					oldFormData.push(...data)
					this.commentsList = oldFormData;	
				})
			},
		}
	}
</script>

<style lang="scss">
	.comments-content {
		padding: 0 15px;
	}
</style>
