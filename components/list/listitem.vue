<template>
	<listscroll class="list-scroll" @loadmore="loadmore">
		<view>
			<listcard :mode="item.mode" :item="item" v-for="item in list" :key="item._id"></listcard>
		</view>
		<uni-load-more v-if="list.length>4 || list.length == 0" iconType="snow" :status="load.loading || 'loading'"></uni-load-more>
	</listscroll>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			load: {
				type: Object,
				default () {
					return {
						loading: "loading"
					}
				}
			}
		},
		methods: {
			loadmore() {
				this.$emit('loadmore');
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
