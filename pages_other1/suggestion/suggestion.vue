<template>
	<view class="su-page">
		<!-- <u-toast ref="uToast"></u-toast> -->
		<div class="box1">
			<!-- <div class="title">阳光学院校长信箱</div> -->
			<div class="title">
				<div style="text-align: center;">店铺名称XXXX</div>
				<div style="display: flex;align-items: center;margin-top: 10rpx;">
					<span style="font-size: 38rpx;">评分：</span>
					<u-rate v-model="star" :allowHalf="true" :size="36"></u-rate>
				</div>
			</div>

			<div class="content">
				<u--textarea
					v-model="value1"
					placeholder="请输入内容"
					:showConfirmBar="false"
					:count="true"
					maxlength="150"
					height="100"
				></u--textarea>
			</div>
		</div>
		<div class="box2">
			<div class="title2">
				<div class="titles">附件</div>
				<div class="say">可上传照片三张</div>
				<div class="des">5M以内</div>
			</div>
			<div class="content2">
				<!-- 上传图片 -->
				<u-upload
					:fileList="fileList1"
					@afterRead="afterRead"
					@delete="deletePic"
					name="1"
					multiple
					:maxCount="3"
					:previewFullImage="false"
					width="200rpx"
					height="200rpx"
				></u-upload>
			</div>
		</div>
		<div class="box3"><u-button type="primary" text="提交" shape="circle" size="large" @click="upAll()"></u-button></div>
	</view>
</template>

<script>
import { ip } from '@/api/api.js';
// import { add } from '@/api/all.js';
export default {
	data() {
		return {
			value1: '',
			star: '',
			//false代表上传完成/无上传
			upMediaOrImg: false,
			fileList1: []
		};
	},
	methods: {
		showToast(params) {
			this.$refs.uToast.show({
				...params,
				complete() {
					params.url &&
						uni.navigateTo({
							url: params.url
						});
				}
			});
		},
		// 删除图片
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1);
		},
		// 读取图片后的处理函数
		async afterRead(event) {
			const isLt2M = event.file[0].size / 1024 / 1024 < 5;
			if (!isLt2M) {
				// console.log('上传图片大小不能超过 5MB!');
				// this.showToast({
				// 	type: 'error',
				// 	icon: false,
				// 	message: '上传图片大小不能超过 5MB!',
				// 	iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				// });
				uni.showToast({
					title: '上传图片大小不能超过 5MB!',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let lists = [].concat(event.file);
			let fileListLen = this[`fileList${event.name}`].length;
			lists.map(item => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				});
			});
			for (let i = 0; i < lists.length; i++) {
				//直接调用上传
				const result = await this.uploadFilePromise(lists[i].url);
				let item = this[`fileList${event.name}`][fileListLen];
				this[`fileList${event.name}`].splice(
					fileListLen,
					1,
					Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					})
				);
				fileListLen++;
			}
			this.upMediaOrImg = false;
		},
		//上传图片到服务器
		uploadFilePromise(url) {
			this.upMediaOrImg = true;
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: ip + '/common/uploads',
					filePath: url,
					name: 'file',
					success: res => {
						setTimeout(() => {
							resolve(JSON.parse(res.data));
						}, 1000);
					},
					fail() {
						this.upMediaOrImg = false;
						uni.showToast({
							title: '图片上传失败',
							icon: 'none',
							duration: 2000
						});
					}
				});
			});
		},
		//
		async upAll() {
			if (this.fileList1.length === 0 && !this.value1) {
				uni.showToast({
					title: '反馈不可为空',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if (this.upMediaOrImg) {
				uni.showToast({
					title: '请先等待图片上传完成',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			uni.showLoading({
				title: '反馈内容发布中'
			});
			let mediaImgList = this.fileList1.map((item, i, arr) => {
				return { url: item.url.urls };
			});
			// let res = await add({ content: this.value1, view: mediaImgList });
			// uni.hideLoading();
			// if (res.code !== 200) {
			// 	uni.showToast({
			// 		title: '发布失败',
			// 		icon: 'none',
			// 		duration: 2000
			// 	});
			// 	return;
			// }
			// this.showToast({
			// 	type: 'success',
			// 	icon: false,
			// 	message: '发布成功!',
			// 	iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
			// });
			//
			this.value1 = '';
			this.fileList1 = [];
		}
	}
};
</script>

<style lang="less" scoped>
.su-page {
	background-color: #f6f6f6;
	min-height: 100vh;
	padding: 30rpx;
}
.box1,
.box2 {
	padding: 30rpx 40rpx;
	background-color: #fff;
	border-radius: 20rpx;
	margin-bottom: 40rpx;
	.title {
		margin-top: 20rpx;
		font-size: 42rpx;
		padding-bottom: 16rpx;
		border-bottom: 2px solid #cfcfcf;
		font-weight: 600;
	}
	.content {
		margin: 40rpx 0;
	}
}
.box2 {
	margin-bottom: 0rpx;
	.title2 {
		margin-top: 20rpx;
		padding-bottom: 16rpx;
		border-bottom: 2px solid #d8d8d8;
		display: flex;
		align-items: center;
		.titles {
			font-size: 38rpx;
			font-weight: 600;
			flex: 1;
		}
		.say {
			color: #cfcfcf;
			flex: 3;
		}
		.des {
			color: #cfcfcf;
			flex: 1;
		}
	}
	.content2 {
		margin-top: 40rpx;
	}
}
.box3 {
	width: 320rpx;
	margin: 80rpx auto 0;
}
</style>
