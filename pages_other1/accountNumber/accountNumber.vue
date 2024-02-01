<template>
	<view>
		<div class="logins">
			<img class="lo-img" src="../../static/logins.png" alt="" />
			<u-navbar title="全民食安" bgColor="transparent" titleStyle="color:#fff"></u-navbar>
			<div class="logos">
				<img src="../../static/logos.png" alt="" />
				<span>榕食安网格员端</span>
			</div>
		</div>
		<!-- <div class="credit">信用代码</div>
		<div class="saying">
			<div class="title">优先使用政务网账户登录</div>
			<div class="content">政务网账户无法登录时，企业可通过社会信用代码直接登录</div>
		</div> -->
		<div class="login">
			<div class="label">
				<span>账号</span>
				<!-- 			<span style="color: #3E85FF;font-size: 24rpx;font-weight: 400;">【社会信用代码】</span> -->
			</div>

			<u--input placeholder="请输入账号" border="surround" v-model="mobile" fontSize="18"></u--input>
			<div class="label">
				<span>密码</span>
				<!-- 	<span style="font-size: 24rpx;font-weight: 400;">（默认为社会信用代码后七位）</span> -->
			</div>
			<u-input placeholder="请输入密码" border="surround" v-model="password" fontSize="18" :password="pwd">
				<template slot="suffix">
					<u-icon :name="pwd ? 'eye-off' : 'eye'" size="33" color="#ccc" @click="pwd = !pwd"></u-icon>
				</template>
			</u-input>
		</div>
		<div class="btn"><u-button type="primary" size="large" text="立即登录" @click="goIndex()"></u-button></div>
	</view>
</template>

<script>
import { login } from '@/api/accountNumber.js';
export default {
	data() {
		return { mobile: '', password: '', pwd: true };
	},
	computed: {
		colorBtn() {
			return this.mobile !== '' && this.password !== '';
		}
	},
	methods: {
		goIndex() {
			if (!this.colorBtn) {
				uni.$u.toast('账号或密码不能为空');
				return;
			}
			login({ mobile: this.mobile, password: this.password }).then(res => {
				if (!res.code === 0) {
					uni.$u.toast(res.msg);
					return;
				}
				uni.setStorageSync('token', res.data.accessToken);
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// });
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.logins {
	position: relative;
	height: 630rpx;
	width: 750rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.lo-img {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.logos {
		display: flex;
		flex-direction: column;
		align-items: center;
		// height: 66rpx;
		font-size: 48rpx;
		font-weight: 600;
		color: #ffffff;
		// line-height: 66rpx;
		letter-spacing: 4px;
		margin-top: 200rpx;
		img {
			width: 160rpx;
			height: 160rpx;
			margin-bottom: 20rpx;
		}
	}
}
.credit {
	font-size: 32rpx;
	text-align: center;
	margin: 44rpx auto;
	font-weight: 600;
}
.saying {
	width: 654rpx;
	height: 168rpx;
	background: #ecf5ff;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 24rpx;
	font-size: 28rpx;
	.title {
		font-size: 30rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
	}
}
.login {
	width: 654rpx;
	margin: 40rpx auto 90rpx;
	.label {
		font-size: 30rpx;
		font-weight: 600;
		margin: 18rpx auto;
	}
}
</style>
