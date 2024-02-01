<template>
	<view class="page">
		<!-- <view class="input_1">
			<u--input placeholder="请输入原密码" v-model="username" border="none" fontSize="18" :password="usa">
				<template slot="suffix">
					<u-icon :name="usa ? 'eye-off' : 'eye'" size="33" @click="usa = !usa"></u-icon>
				</template>
			</u--input>
		</view> -->
		<view class="input_1">
			<u--input placeholder="请输入新密码" v-model="password" border="none" fontSize="18" :password="pwd">
				<template slot="suffix">
					<u-icon color="#ccc" :name="pwd ? 'eye-off' : 'eye'" size="33" @click="pwd = !pwd"></u-icon>
				</template>
			</u--input>
		</view>
		<view :class="colorBtn ? 'button_1' : 'button_2'" @click="resetPwd">确认修改</view>
	</view>
</template>

<script>
// import { resetPwd } from '@/api/changeMima.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {
			username: '',
			password: '',
			// username: '',
			// password: '',
			pwd: true,
			usa: true
		};
	},
	computed: {
		...mapState(['userInfo']),
		colorBtn() {
			return this.password !== '';
		}
	},
	methods: {
		resetPwd() {
			if (!this.password) {
				uni.showToast({
					duration: 2000,
					title: '密码输入不能为空',
					icon: 'none'
				});
				return;
			}
			resetPwd({ userId: this.userInfo.userId, password: this.password }).then(res => {
				if (res.code === 200) {
					uni.showToast({
						duration: 2000,
						title: '密码修改成功，两秒后跳转登录...',
						icon: 'none'
					});
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages_other/first-info/first-info'
						});
					}, 2000);
				} else {
					uni.showToast({
						duration: 2000,
						title: res.msg,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input_1 {
	width: 630rpx;
	margin: 40rpx 0 0 32rpx;
	padding: 0 30rpx;
	border-radius: 16rpx;
	height: 120rpx;
}
.button_1,
.button_2 {
	border-radius: 48rpx;
	width: 448rpx;
	height: 96rpx;
	margin: 40rpx auto;
	font-size: 32rpx;
	font-weight: 600;
	text-align: center;
	line-height: 96rpx;
	color: rgba(255, 255, 255, 1);
	background-color: #3c9cff;
}
.button_2 {
	background-color: #a7adbc;
}
/deep/ .u-checkbox-group--row {
	justify-content: flex-end;
	margin-right: 40rpx;
	margin-top: 20rpx;
}
/deep/.u-input {
	height: 100%;
}
.login-code-img {
	width: 200rpx;
	height: 60rpx;
}
/deep/.u-radio-group {
	flex: 0 !important;
}
/deep/.u-radio-group--row {
	margin: 40rpx 130rpx 0;
	justify-content: space-around;
	height: 120rpx;
}
</style>
