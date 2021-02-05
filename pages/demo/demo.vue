<template>
	<view class="container">
		<tki-qrcode ref="qrcode" cid="tki-qrcode-canvas" val="二维码" :size="180" unit="px" background="#000000" foreground="#ffffff"
		 pdground="#ffffff" :icon="icon" :iconSize="40" :lv="3" :onval="false" :loadMake="false" :usingComponents="true"
		 :showLoading="true" loadingText="二维码生成中" @result="qrR" />
	</view>
</template>
<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				// 二维码
				icon: "http://lipinhui.28888753.cn/IntegralShop/backstage/Pay.jsp?get_userid=4id&isPay=2",
			}
		},
		methods: {
			// 二维码
			qrR:function(){
				
			}
		}
	}
</script>
<style lang="less" scoped>
	
</style>
