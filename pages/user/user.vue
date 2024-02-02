<template>
	<view class="pages">
		<div class="bg-box">
			<img class="bg" src="../../static/examine.png" alt="" />
			<div style="display: none;" class="need-login">
				<div style="width: 240rpx;height: 72rpx;"><u-button type="primary" text="点击登录" @click="goLogin()"></u-button></div>
				<div style="font-size: 24rpx;color: #FFFFFF;line-height: 2.5;">请立即登录以使用小程序</div>
			</div>
			<div class="has-login">
				<div class="top">
					<div class="shows"><img :src="userInfo.logo" alt="" /></div>
					<div class="the-name">{{ userInfo.nickName }}</div>
					<!-- 		<img src="../../static/A.png" alt="" />
					<img src="../../static/B.png" alt="" />
					<img src="../../static/C.png" alt="" />
					<img src="../../static/D.png" alt="" /> -->
				</div>
				<!-- <div style="margin-left: 96rpx;font-weight: 400;font-size: 24rpx;color: #fff;">{{ linshiJylx }}</div> -->
				<div class="bottom">
					<div>联系电话：{{ userInfo.mobile }}</div>
					<div>{{ userInfo.mainAddressId }}{{ userInfo.detailedAddress }}</div>
				</div>
				<!-- <div class="bottomimg">
					<div v-if="userInfo.status === 0" style="font-size: 48rpx;font-weight: 600;">正在审核</div>
					<div v-if="userInfo.status === 0">预计24小时内审核完毕</div>
					<div v-if="userInfo.status === -1" style="font-size: 48rpx;font-weight: 600;">审核不通过</div>
					<div>
						失败原因：{{ userInfo.mark }}
						<span style="color: #2979ff;" @click="goRegister">点击重新提交</span>
					</div>
				</div> -->
			</div>
		</div>
		<div style="font-size: 36rpx;line-height: 3;font-weight: 600;">管理中心</div>
		<div class="manage">
			<div class="manage-one" @click="goOtherPage(1)">
				<img :src="'../../static/userpeople.png'" alt="" />
				<div class="des">人员管理</div>
			</div>
			<!-- <div class="manage-one" v-for="i in 4" :key="i" @click="goOtherPage(i)">
				<img
					:src="
						i === 0
							? '../../static/userinfo.png'
							: i === 1
							? '../../static/userpeople.png'
							: i === 2
							? '../../static/P2.png'
							: '../../static/P3.png'
					"
					alt=""
				/>
				<div class="des">{{ i === 0 ? '个人中心' : i === 1 ? '人员管理' : i === 2 ? '设备管理' : '企业评价' }}</div>
			</div> -->
		</div>
		<u-line margin="20rpx 0 0 0"></u-line>
		<div style="font-size: 36rpx;line-height: 3;font-weight: 600;">设置</div>
		<u-cell-group :border="false">
			<u-cell
				:border="false"
				icon="account"
				size="large"
				title="修改密码"
				isLink
				url="/pages_other1/changeMima/changeMima"
				arrow-direction="right"
			></u-cell>
			<!-- <u-cell
				:border="false"
				icon="account"
				size="large"
				title="临时入口:外部评价"
				isLink
				url="/pages_other1/suggestion/suggestion"
				arrow-direction="right"
			></u-cell> -->
		</u-cell-group>
	</view>
</template>

<script>
import { userGet } from '@/api/user.js';

export default {
	data() {
		return {
			userInfo: {},

			jylxList: []
		};
	},
	onLoad() {
		this.getList();
		this.userGet();
	},
	computed: {
		linshiJylx() {
			const item = this.jylxList.find(item => item.id === this.userInfo.businessTypeId);
			return item ? item.key : '';
		}
	},
	methods: {
		getList() {
			this.jylxList = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
		},
		userGet() {
			userGet().then(res => {
				if (!res.code === 0) {
					uni.$u.toast(res.msg);
					return;
				}
				uni.setStorageSync('userInfo', res.data);
				this.userInfo = res.data;
			});
		},
		goLogin() {
			uni.navigateTo({
				url: '../login/login'
			});
		},
		goRegister() {
			uni.navigateTo({
				url: '../../pages_other1/register/register?i=2'
			});
		},
		goOtherPage(i) {
			uni.showToast({
				icon: 'none',
				title: '暂时未开放该功能~'
			});
			if (i === 0) {
				uni.navigateTo({
					url: '/pages_other1/userInfo/userInfo'
				});
			} else if (i === 1) {
				uni.navigateTo({
					url: '/pages_other1/people/people'
				});
			} else if (i === 2) {
				uni.showToast({
					icon: 'none',
					title: '暂时未开放该功能~'
				});
			} else {
				uni.navigateTo({
					url: '/pages_other1/evaluate/evaluate'
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.bg-box {
	position: relative;
	width: 686rpx;
	height: 360rpx;
	overflow: hidden;
	.bg {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.need-login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 654rpx;
		height: 328rpx;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 24rpx;
		margin: 16rpx;
	}
	.has-login {
		padding: 48rpx;
		.top {
			display: flex;
			font-weight: 600;
			align-items: center;
			.shows {
				width: 72rpx;
				height: 72rpx;
				// background: #505050;
				// border: 6rpx solid #ffffff;
				border-radius: 50%;
				overflow: hidden;
				// line-height: 72rpx;
				// text-align: center;
				// color: #fff;
			}
			.the-name {
				font-size: 36rpx;
				color: #fff;
				margin: 0 8rpx;
			}
			img {
				width: 48rpx;
				height: 48rpx;
			}
		}
		.bottom {
			margin-top: 70rpx;
			font-size: 24rpx;
			color: #ffffff;
			line-height: 2;
		}
		.bottomimg {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-weight: 400;
			color: #ffffff;
			line-height: 1.5;
		}
	}
}
.manage {
	display: flex;
	.manage-one {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 30rpx;
		line-height: 2;
		img {
			width: 72rpx;
			height: 72rpx;
		}
	}
}
</style>
