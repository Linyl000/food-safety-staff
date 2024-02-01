<template>
	<view class="cover-img" :style="{ height: windowHeight + 'px' }">
		<camera v-if="tempImagePath === null" mode="normal" device-position="back" flash="off" :style="{ height: windowHeight + 'px' }">
			<cover-view class="controls" style="width: 100%;height: 100%;">
				<!-- 头像面 -->
				<cover-image v-if="cardType === 'front'" class="icon-w569-h828" src="https://img-blog.csdnimg.cn/20210126144225906.png" />
				<!-- 国徽面 -->
				<cover-image v-else class="icon-w569-h828" src="https://img-blog.csdnimg.cn/20210126144317636.png" />
			</cover-view>
			<cover-view v-if="tempImagePath === null" @click="takePhoto" class="take-me">拍摄</cover-view>
			<!-- <cover-view></cover-view> -->
			<canvas canvas-id="newCanvas" :style="canvasStyle2"></canvas>
			<canvas canvas-id="myCanvas" :style="iconDatas"></canvas>
		</camera>

		<!-- <canvas canvas-id="myCanvas" :style="canvasStyle1"></canvas> -->

		<!-- <canvas id="myCanvas" ></canvas> -->

		<div style=" display: flex;justify-content: center;align-items: center;height: 100vh; ">
			<image :src="tempImagePath" mode="widthFix" style="width: 750rpx;"></image>
		</div>
		<view class="bottom">
			<view class="wrap">
				<view v-if="tempImagePath !== null" style="width: 180rpx;margin-right: 30rpx;">
					<u-button text="重拍" @click="tempImagePath = null"></u-button>
				</view>
				<view v-if="tempImagePath !== null" style="width: 180rpx;margin-left: 30rpx;">
					<u-button type="primary" text="确定" @click="goBack"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cameraContext: {},
			windowHeight: null,
			windowWidth: null,
			res: null,
			iconData: null,
			caheight: 600,
			cawidth: 400,
			tempImagePath: null,
			cardType: 'front',
			dpr: 1,
			ctx: null
		};
	},
	onReady() {
		this.ctx = wx.createCanvasContext('myCanvas');
	},
	computed: {
		canvasStyle2() {
			return `position:absolute;top:0;left:0;width: ${this.caheight}px; height: ${this.cawidth}px;opacity:0;
			};`;
		},
		iconDatas() {
			if (this.iconData) {
				return `position:absolute;top:${this.iconData.top || 0}px;left:${this.iconData.left || 0}px;width: ${this.iconData.width ||
					0}px; height: ${this.iconData.height || 0}px;background:pink;opacity:0;`;
			} else {
				return '';
			}
		}
	},
	onLoad(options) {
		this.cardType = options.cardType === 'front' ? 'front' : 'back';
		if (uni.createCameraContext) {
			this.cameraContext = uni.createCameraContext();
			const listener = this.cameraContext.onCameraFrame(frame => {
				//如果不需要则注释掉
			});
		} else {
			uni.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			});
		}
	},
	created() {
		let systemInfo = uni.getSystemInfoSync();
		this.dpr = systemInfo.pixelRatio || 1;
		console.log(this.dpr);
		this.windowHeight = systemInfo.windowHeight;
		this.windowWidth = systemInfo.windowWidth;
		// this.cameraHeight = systemInfo.windowHeight;
	},
	methods: {
		takePhoto() {
			this.cameraContext.takePhoto({
				quality: 'high',
				success: res => {
					console.log('初始像数据', res);
					// 框
					const query = wx.createSelectorQuery();
					query
						.select('.icon-w569-h828')
						.boundingClientRect(res2 => {
							console.log('框数据', res2);
							this.iconData = res2;
							this.cawidth = this.iconData.width;
							this.caheight = this.iconData.height;
							// 创建 canvas 绘图上下文对象
							const ctx = wx.createCanvasContext('myCanvas');
							//	获取图片信息
							wx.getImageInfo({
								src: res.tempImagePath,
								success: info => {
									console.log('图片信息', info);
									const scaleW = info.width / this.windowWidth;
									const scaleH = info.height / this.windowHeight;
									console.log(info.width);
									console.log(info.height);
									console.log(this.windowWidth);
									console.log(this.windowHeight);
									console.log('scaleWH', scaleW, scaleH);
									// 绘制原始图片
									ctx.drawImage(
										res.tempImagePath,
										this.iconData.left * scaleW,
										this.iconData.top * scaleH,
										info.width,
										info.height,
										0,
										0,
										info.width / scaleW,
										info.height / scaleH
									);

									ctx.draw(false, () => {
										wx.canvasToTempFilePath({
											canvasId: 'myCanvas',
											destWidth: this.cawidth * wx.getSystemInfoSync().pixelRatio,
											destHeight: this.caheight * wx.getSystemInfoSync().pixelRatio,
											success: res => {
												console.log('一次临时路径生成', res.tempFilePath);
												// this.tempImagePath = res.tempFilePath;
												const newCtx = wx.createCanvasContext('newCanvas');
												wx.getImageInfo({
													src: res.tempFilePath,
													success: info => {
														console.log('图片信息2', info);

														// 先旋转后平移
														newCtx.translate(this.caheight / 2, this.cawidth / 2);
														newCtx.rotate((-90 * Math.PI) / 180);
														newCtx.translate(-this.cawidth / 2, -this.caheight / 2);
														console.log(info.width);
														console.log(info.height);
														console.log(this.cawidth);
														console.log(this.caheight);
														const scaleX = info.width / this.cawidth;
														const scaleY = info.height / this.caheight;
														console.log('scaleXY', scaleX, scaleY);
														// 裁剪并绘制
														newCtx.drawImage(info.path, 0, 0, info.width, info.height, 0, 0, info.width / scaleX, info.height / scaleY);

														newCtx.draw(false, () => {
															wx.canvasToTempFilePath({
																canvasId: 'newCanvas',
																success: res => {
																	console.log('新的临时路径', res.tempFilePath);
																	this.tempImagePath = res.tempFilePath;
																},
																fail: error => {
																	console.error(error);
																}
															});
														});
													},
													fail: err => {
														console.error('getImageInfo error', err);
													}
												});
											},
											fail: error => {
												console.error(error);
											}
										});
									});
								},
								fail: err => {
									uni.showToast({
										title: '获取图片信息失败',
										icon: 'none',
										duration: 1200
									});
								}
							});
						})
						.exec();
				},
				fail: err => {
					uni.showToast({
						title: '拍照失败，请检查系统是否授权',
						icon: 'none',
						duration: 1200
					});
				}
			});
		},
		goBack() {
			let pages = getCurrentPages(); //获取当前页面
			let beforePage = pages[pages.length - 2]; //获取上一个页面的实例

			beforePage.$vm.changeIDCard(this.tempImagePath);
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.cover-img {
	background-color: #000;
	// position: fixed;
}
.icon-w569-h828 {
	width: 569rpx; //498
	height: 828rpx;
}
.controls {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}
.take-me {
	position: fixed;
	bottom: 30rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 130rpx;
	height: 130rpx;
	border-radius: 50%;
	background-color: white;
	color: #333;
	text-align: center;
	line-height: 130rpx;
	z-index: 50;
}
.bottom {
	position: fixed;
	width: 100%;
	// height: 130rpx;
	bottom: 0;
	background-color: transparent;
	font-size: 50rpx;
	color: #fff;
	.wrap {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 130rpx;
		padding: 40rpx 73rpx;
	}
}
</style>
