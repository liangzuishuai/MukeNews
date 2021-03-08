<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{is_edit?'完成':'编辑'}}</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content__item" v-for="(item,index) in labelList" :key="item._id">
					{{item.name}}
					<uni-icons v-if="is_edit" @click="del(index)" type="clear" size="20" color="red" class="icons-close"></uni-icons>
				</view>
				<view class="no-data" v-if="labelList.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view @click="add(index)" class="label-content__item" v-for="(item,index) in list" :key="item._id">
					{{item.name }}
				</view>
				<view class="no-data" v-if="list.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				labelList: [],
				list: [],
				loading: true
			}
		},
		/* a */
		onLoad() {
			// 自定义事件
			// emit() {
			// 	  uni.$emit('labelChange', 'uni-app');
			// },
			this.getLabel()
		},
		methods: {
			editLabel() {
				if (this.is_edit) {
					this.is_edit = false;
					this.setUpdataLabel(this.labelList)
				} else {
					this.is_edit = true;
				}
			},
			getLabel() {
				this.loading = true;
				this.$api.get_labe({
					type: 'all'
				}).then(res => {
					console.log(res);
					const {
						data
					} = res;
					console.log(data);
					this.labelList = data.filter(item => item.current);
					this.list = data.filter(item => !item.current);
					console.log(this.labelList);
					this.loading = false;
				})
			},
			//删除
			del(index) {
				this.list.push(this.labelList[index]);
				this.labelList.splice(index, 1);
			},
			//添加
			add(index) {
				if (!this.is_edit) return;
				this.labelList.push(this.list[index]);
				this.list.splice(index, 1);
			},
			//设置标签
			setUpdataLabel(label) {
				console.log(label);
				let newArrIds = []
				label.forEach(item => {
					newArrIds.push(item._id)
				})
				uni.showLoading();
				console.log(newArrIds);
				this.$api.updata_label({
					label: newArrIds
				}).then(res => {
					const {
						data
					} = res;
					uni.hideLoading();
					uni.showToast({
						title: "更新成功",
						icon: "none"
					})
					uni.$emit('labelChange');
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content__item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;

					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}

	.no-data {
		width: 100%;
		text-align: center;
		padding: 50px 0;
		color: #999;
		font-size: 14px;
	}
</style>
