<template>
	<view class="container">
		<view class="evaluate-wrapper bg-fff pd-b-22 pd-l-22 pd-r-22 pd-t-22">
			<view class="top dis-flex al-items-center">
				<view class="goods-icon">
					<image class="w100" :src="imageUrl+goodsImg" mode="widthFix"></image>
				</view>
				<view class="stars txt-center">
					<htz-rate v-model="ceshi1" @change="ceshiChange"></htz-rate>
					<view class="txt fon-30 mg-t-30">{{cashTxt}}</view>
				</view>
			</view>
			<textarea class="w100 box-sz fon-28" v-model="txtVal" placeholder="请输入您的评价" />
			<htz-image-upload
					:max="3" 
					v-model="ceshiData1" 
					:uploadSuccess="zidingyiSuccess" 
					action="/before/order/addCommentImages">
			</htz-image-upload>
			</view>
			<button class="btn" type="default" @click="submit">提交评论</button>
	</view>
</template>

<script>
	import htzRate from '@/components/htz-rate/htz-rate.vue';
	import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
	export default {
		data() {
			return {
				imageUrl:"",
				goodsImg:"",
				goodsId:"",
				orderId:"",
				ceshi1: 1,
				cashTxt:"差",
				txtVal:"",
				ceshiData1:[]
			}
		},
		components: {
			htzRate,
			htzImageUpload
		},
		onLoad(options) {
			this.goodsId = options.id;
			this.orderId = options.orderid;
			this.goodsImg = options.img;
			this.$nextTick(function() {
				this.imageUrl = this.$url.imageUrl;
			})
		},
		methods:{
			// 评分
			ceshiChange(val) {
				this.ceshi1 = val;
				switch(val){
					case 1:
					this.cashTxt = "差";
					break;
					case 2:
					this.cashTxt = "过得去";
					break;
					case 3:
					this.cashTxt = "一般";
					break;
					case 4:
					this.cashTxt = "好";
					break;
					default:
					this.cashTxt = "非常好";
				}
			},
			// 图片上传
			zidingyiSuccess(res){//推荐用这种方法，解析上传成功结果
				 let _res = JSON.parse(res.data);
				 console.log("上传成功",_res)
				 if (_res.status == "success") {
					 return {
						 success: true,
						 url: 'http://lipinhui.28888753.cn/' + _res.url
					 }
				 } else {
					 return {
						 success: false,
						 url: ''
					 }
				 }
			},
			submit(){
			    const that = this;
				let userid = uni.getStorageSync('wxUserInfo');
				let arr = [];
				that.ceshiData1.forEach(item=>{
					item = item.split(".cn");
					arr.push(item[1])
				})
				let prams = {
					commentLabelid :that.ceshi1,
					commentPic :arr.toString(),
					belongComId:Number(that.goodsId),
					belongOrderId :Number(that.orderId),
					belongUserid :userid.id,
					commentContent:that.txtVal
				}
				that.$http('/order/saveOrderComment',prams,'post').then(function(res){
					if(res.statusCode==200){
						uni.showToast({
						    title: '评论成功',
						    duration: 2000
						});
						setTimeout(()=>{
							uni.redirectTo({
								url:'/pages/user/index'
							})
						},2000)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #f6f6f6;
	}
	.container{
		padding: 32rpx 22rpx;
		.evaluate-wrapper{
			padding-bottom: 184rpx;
			.top{
				.goods-icon{
					width: 112rpx;
					height: 112rpx;
					margin-right: 66rpx;
				}
				.stars{
					width: 73%;
					.txt{
						width: 100%;
						color: #ffa200;
					}
				}
			}
			textarea{
				height: 234rpx;
				background-color: #ebeaea;
				padding: 44rpx 38rpx;
				color: #b7b6b6;
				margin-top: 100rpx;
				margin-bottom: 84rpx;
			}
		}
		.btn{
			width: 100%;
			height: 83rpx;
			line-height: 83rpx;
			background-color: #f1351a;
			border-radius: 10rpx;
			font-size: 32rpx;
			color: #ffffff;
			margin-top: 166rpx;
		}
	}
</style>
