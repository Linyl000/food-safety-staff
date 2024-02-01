<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		// 小程序自动更新
		if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function() {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
					updateManager.onUpdateFailed(function() {
						// 新的版本下载失败
						wx.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
						});
					});
				}
			});
		} else {
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，可能无法使用某些功能，请升级到最新微信版本后重试。'
			});
		}
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
.pages {
	padding: 32rpx;
}
/*每个页面公共css */
.btn {
	width: 600rpx;
	height: 84rpx;
	margin: 20rpx auto;
	.u-button {
		height: 100% !important;
	}
}
.btn2 {
	position: fixed;
	bottom: 100rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 600rpx;
	height: 84rpx;
}
</style>
