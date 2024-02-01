<template>
	<view @click="goLogin" class="pages">
		<img class="bg-img" src="../../static/opens.png" alt="" />
		<u-navbar title="全民食安" bgColor="transparent" titleStyle="color:#fff"></u-navbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			go: false
		};
	},
	onLoad() {
		setTimeout(() => {
			if (!this.go) {
				this.goLogin();
			}
		}, 3000);
	},
	methods: {
		goLogin() {
			this.go = true;
			uni.navigateTo({
				url: '../login/login'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	position: relative;
	min-height: 100vh;
	color: transparent;
}
.pages::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: transparent;
	z-index: -1;
}
.bg-img {
	position: absolute;
	flex-wrap: wrap;
	width: 750rpx;
	height: 1624rpx;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>
