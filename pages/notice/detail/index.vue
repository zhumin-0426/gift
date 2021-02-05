<template>
	<view class="container">
		<view class="content w100 pd-r-22 pd-t-22 pd-l-22 pd-b-22 box-sz" v-html="delData">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				delData:"",
				id:""
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.initNoticeDel();
		},
		methods: {
			initNoticeDel:function(){
				console.log("A")
				const that = this;
				that.$http('/users/getUserMsgById',{id:that.id},'post').then(function(res){
					console.log("res",res);
					if(res.statusCode==200){
						that.delData = res.data.userMessageById.msgContent;
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content{
		width: 100%;
	}
</style>
