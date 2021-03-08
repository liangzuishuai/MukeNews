<template>
	<view>
		<uni-load-more status="loading" iconType="snow" v-if="lists.length == 0 && !articleShow"></uni-load-more>
		<listcard v-for="item in lists" :item="item" :key='item.id'></listcard>
		<view class="no-data" v-if="articleShow">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [],
				articleShow: false
			}
		},
		onLoad() {
			this.get_my_article();
		},
		methods: {
			get_my_article() {
				this.$api.get_my_article().then(res => {
					console.log(res);
					this.articleShow = true;
					const {
						data
					} = res;
					this.lists = data;
					this.articleShow = this.lists.length === 0 ? true : false;
				})
			}
		}
	}
</script>

<style>

</style>
