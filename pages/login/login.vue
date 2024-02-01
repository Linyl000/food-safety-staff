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
		<div class="btn-and-request">
			<div class="btn">
				<u-button
					v-if="checkboxValue1.length"
					icon="weixin-fill"
					size="large"
					color="#07c261"
					text="微信一键登录"
					:hairline="false"
					iconColor="#fff"
					openType="getPhoneNumber"
					@getphonenumber="getPhoneNumber"
				></u-button>
				<u-button
					v-else
					icon="weixin-fill"
					size="large"
					color="#07c261"
					text="微信一键登录"
					:hairline="false"
					iconColor="#fff"
					@click="goAccountNumberOrIndex(1)"
				></u-button>
			</div>
			<div class="btn"><u-button size="large" text="账号登录" @click="goAccountNumberOrIndex(2)"></u-button></div>
			<div class="request">
				<u-checkbox-group v-model="checkboxValue1">
					<u-checkbox shape="circle" label=" " activeColor="#D28950"></u-checkbox>
				</u-checkbox-group>
				<view class="text-group_1">
					<text>我已阅读并同意</text>
					<text style="color:#D28950;" @click="goUserProtocol">《用户隐私政策》</text>
					<text style="color:#D28950;" @click="goPrivacyProtocol">《用户协议》</text>
					<text>后登录</text>
				</view>
			</div>
		</div>
	</view>
</template>

<script>
import { getWeChatMobile } from '@/api/login.js';
import { ip } from '@/api/api.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	data() {
		return { checkboxValue1: [''], e: '' };
	},
	methods: {
		...mapMutations(['updateMobile']),
		getPhoneNumber(e) {
			console.log(e);
			console.log(e.detail.code);
			if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
				uni.showToast({
					icon: 'none',
					title: '您拒绝提供手机号,将无法正常使用小程序'
				});
			} else {
				this.e = JSON.stringify(e.detail.code);
				getWeChatMobile({ code: e.detail.code }).then(res => {
					console.log(res);
					if (!res.code === 0) {
						uni.$u.toast(res.msg);
						return;
					}
					uni.setStorageSync('mobile', res.data.mobile);
					this.updateMobile();
					if (res.data.id) {
						uni.switchTab({
							url: '../index/index'
						});
					} else {
						uni.navigateTo({
							url: '../../pages_other1/register/register'
						});
					}
				});
			}
		},
		goAccountNumberOrIndex(n) {
			if (!this.checkboxValue1.length) {
				uni.showToast({
					duration: 2000,
					title: '请勾选同意用户协议，隐私协议按钮',
					icon: 'none'
				});
				return;
			}
			if (n === 1) {
			} else {
				uni.navigateTo({
					url: '../../pages_other1/accountNumber/accountNumber'
				});
			}
		},
		getCode() {
			uni.showLoading({
				title: '数据加载中...',
				mask: true
			});
			const p = new Promise(resolve => {
				uni.login({
					provider: 'weixin',
					success: res => {
						console.log(res);
						resolve(res.code);
					}
				});
			});
			p.then(code => {
				//请求后端
				uni.request({
					url: ip + '/member/auth/getWeChatMobile',
					method: 'get',
					data: {
						code: code
					},
					success: cts => {
						console.log('获取手机');
						console.log(cts);
						// uni.setStorageSync('openId', cts.data.openId);
						// if (cts.statusCode !== 200 || cts.data.code !== 0) {
						// 	uni.hideLoading();
						// 	uni.showToast({
						// 		title: '服务器出错，正在尝试重连...',
						// 		icon: 'none'
						// 	});
						// 	//显示失败
						// 	setTimeout(() => {
						// 		this.getCode();
						// 	}, 2000);
						// 	return;
						// }
						// this.token = cts.data.token;
						// this.isNew = cts.data.isNew;

						// uni.setStorageSync('isNew', cts.data.isNew);
						// this.updateToken();
						// if (this.inviteCode) {
						// 	this.getGetUserInfoById();
						// }
						// app.updateWs();
						return;
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							title: '获取手机号码出错，请重试或使用账号密码登录',
							icon: 'none'
						});
						// setTimeout(() => {
						// 	this.getCode();
						// }, 2000);
						return;
					}
				});
			});
		}
	},
	goUserProtocol() {},
	goPrivacyProtocol() {}
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
.btn-login {
}
.btn-and-request {
	margin-top: 66rpx;

	.btn {
		width: 622rpx;
		height: 96rpx;
		margin: 0 auto 32rpx;
	}
	/deep/ .u-button {
		height: 100%;
	}
	.request {
		flex-direction: row;
		display: flex;
		justify-content: center;
		margin: 0 auto;
		margin-top: 20rpx;

		.text-group_1 {
			font-size: 26rpx;
			text-align: center;
			line-height: 48rpx;
			color: rgba(136, 136, 136, 1);
		}
	}
}
</style>
