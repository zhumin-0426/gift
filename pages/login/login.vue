<template>
</template>

<script>
	export default {
		components:{
			
		},
		data() {
			return {}
		},
		onLoad(){
			this.login();
		},
		methods: {
			//登录
			login:function(){
				window.location.href = "http://lipinhui.28888753.cn/before/users/getUserCode";
			}
		}
	}
</script>

<style>
</style>
