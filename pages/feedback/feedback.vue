<template>
	<view>
		<view class="feedback-title">意见反馈：</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题"></textarea>
		</view>
		<view class="feedback-title">反馈图片:</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imageList" :key="index">
				<view class="close-icon" @click="delImage(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view class="feedback-image-item" v-if="imageList.length<5" @click="addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback_btn" type="primary" @click="submit"> 提交反馈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList:[],
				maxLength:5,
				feedBackImages:[],
				content:''
			}
		},
		methods: {
			delImage(index){
				this.imageList.splice(index,1)
			},
			addImage(){
				let that =this;
				const nowCount=this.maxLength-this.imageList.length
				console.log("choose image")
				uni.chooseImage({
					count:nowCount,
					success:(res)=> {
						const tempfilePath= res.tempFilePaths;
						tempfilePath.forEach((item,index)=>{
							if(index <nowCount){
								this.imageList.push({
									url:item
								})
							}						

						})
						console.log(res)
					}
				})
			},
		
			async submit(){
				if(!this.content){
					uni.showToast({
						title:'请输入反馈内容!',
						icon:'none'
					})
					
					
					return
				}
				
				uni.showLoading();
				let imagePath=[]
				for(let i =0 ;i<this.imageList.length;i++){
					let filePath = await this.uploadFiles(this.imageList[i])
					imagePath.push(filePath)
				}
				
				
				this.updateFeedBack({
					content:this.content,
					feedBackImages:imagePath
				})
				uni.hideLoading()
			},
			async uploadFiles(filePath){
				const result =await uniCloud.uploadFile({
					cloudPath:filePath.url,
					filePath:filePath.url,
				}).catch(err=>{
					uni.hideLoading()
				})
				return result.fileID;
			},
			updateFeedBack({content,feedBackImages}){
				this.$api.update_feedback({
					content,feedBackImages
					}).then(res=>{
					uni.showToast({
						title:'反馈提交成功!',
						icon:'none'
					})
					
					// setTimeout(()=>{
					// 	uni.switchTab({
					// 		url:'/pages/tabbar/my/my'
					// 	})
					// },1000)

				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						title:'反馈提交失败!',
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title{
		margin: 15px;
		font-size: 14px;
		margin-bottom: 0;
		color: #666;
	}
	.feedback-content{
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px #eee solid;
		
		.feedback-textarea{
			font-size: 12px;
			width: 100%;
			height: 100px;
		}
	}
	.close-icon{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 0;
		top: 0;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background-color: #ff5a5f;
		z-index: 2;
	}
	
	.feedback-image-box{
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		.feedback-image-item{
			width: 33.33%;
			position: relative;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;
			
			.image-box{
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 5px;
				border: 1px #eee solid;
				border-radius: 5px;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.feedback_btn{
		margin: 0 15px;
		background-color: $mk-base-color;
	}
</style>
