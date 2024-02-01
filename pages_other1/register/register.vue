<template>
	<view class="pages">
		<Cropping @upload="doUpload" ref="cropping" />
		<Cropping @upload="doUploadCard" ref="cropping2" :needCamera="false" />
		<div class="box1" v-if="i === 1">
			<img src="../o1_static/ruzhu.png" alt="" />
			<div class="btn2"><u-button type="primary" text="下一步" @click="i = 2"></u-button></div>
		</div>
		<div v-else>
			<u-steps :current="step">
				<u-steps-item title="填写基本信息"></u-steps-item>
				<u-steps-item title="上传审核资料"></u-steps-item>
				<u-steps-item title="完成并提交"></u-steps-item>
			</u-steps>
			<u-line margin="30rpx 0"></u-line>
			<div v-if="step === 2">
				<u-alert :description="'请检查所有信息无误后再进行提交，错误信息请返回上一步修改'" type="primary"></u-alert>
			</div>
			<u-form labelPosition="top" :model="form" ref="uForm" labelWidth="300" :rules="rules">
				<div v-if="step === 0 || step === 2" :style="{ pointerEvents: step !== 2 ? 'auto' : 'none' }">
					<div style="font-size: 24rpx;color: #A2A2A2;line-height: 2;">入驻申请账户：{{ mobile }}</div>
					<div style="font-size: 36rpx;line-height: 3;font-weight: 600;">填写基本信息</div>
					<u-form-item label="姓名" required prop="name">
						<u-input v-model="form.name" :border="surrOrNot" placeholder="请输入姓名"></u-input>
					</u-form-item>
					<u-form-item label="身份证号" required prop="idNumber">
						<u-input v-model="form.idNumber" :border="surrOrNot" placeholder="请输入身份证号"></u-input>
					</u-form-item>
					<u-form-item label="上传负责人头像" required prop="avatar">
						<view style="position: relative;">
							<image
								:src="form.avatar ? form.avatar : '../../static/up-image.png'"
								mode="widthFix"
								style="width: 170rpx;"
								@click="form.avatar ? previewImage(form.avatar) : changeAvatar('avater')"
							></image>
							<div v-if="form.avatar" style="position: absolute; top: 0rpx; left: 140rpx;" @click="form.avatar = null">
								<u-icon name="close-circle-fill" size="30"></u-icon>
							</div>
						</view>
					</u-form-item>
					<u-form-item label="上传主体负责人身份证照片" required prop="idPortraitPhoto">
						<view style="position: relative;">
							<!-- form.idPortraitPhoto ? previewImage(form.idPortraitPhoto) :goCropping2(); -->
							<img
								:src="form.idPortraitPhoto ? form.idPortraitPhoto : '../../static/front.png'"
								alt=""
								style="width: 574rpx;height: 364rpx;"
								@click="
									form.idPortraitPhoto ? previewImage(form.idPortraitPhoto) : (showAction = true);

									cardType = 'front';
								"
							/>
							<div v-if="form.idPortraitPhoto" style="position: absolute; top: 0rpx; left: 514rpx;" @click="form.idPortraitPhoto = null">
								<u-icon name="close-circle-fill" size="30"></u-icon>
							</div>
						</view>
					</u-form-item>

					<u-form-item prop="idEmblemPhoto">
						<view style="position: relative;">
							<!-- form.idEmblemPhoto ? previewImage(form.idEmblemPhoto) :  goCropping2();-->
							<img
								:src="form.idEmblemPhoto ? form.idEmblemPhoto : '../../static/back.png'"
								alt=""
								style="width: 574rpx;height: 364rpx;"
								@click="
									form.idEmblemPhoto ? previewImage(form.idEmblemPhoto) : (showAction = true);
									cardType = 'back';
								"
							/>
							<div v-if="form.idEmblemPhoto" style="position: absolute; top: 0rpx; left: 514rpx;" @click="form.idEmblemPhoto = null">
								<u-icon name="close-circle-fill" size="30"></u-icon>
							</div>
						</view>
					</u-form-item>
					<!-- </u-form> -->
				</div>
				<div v-if="step === 1 || step === 2" :style="{ pointerEvents: step !== 2 ? 'auto' : 'none' }">
					<div style="font-size: 36rpx;line-height: 3;font-weight: 600;">填写审核信息</div>
					<u-form-item label="企业名称" required prop="nickname">
						<u-input v-model="form.nickname" :border="surrOrNot" placeholder="请输入企业名称"></u-input>
					</u-form-item>

					<u-form-item label="企业识别号/社会信用代码" required prop="socialCreditCode">
						<u-input
							v-model="form.socialCreditCode"
							:border="surrOrNot"
							@blur="getMim"
							placeholder="请输入企业识别号/社会信用代码"
						></u-input>
					</u-form-item>

					<u-form-item label="经营类型" required prop="businessTypeId" @click="showJylx = true">
						<u-picker
							:show="showJylx"
							:columns="columnsJylx"
							keyName="key"
							immediateChange
							@cancel="showJylx = false"
							@confirm="changeJylx"
							title="经营类型"
						></u-picker>
						<u-input readonly :border="surrOrNot" placeholder="点击选择经营类型" v-model="linshiJylx"></u-input>
					</u-form-item>

					<u-form-item label="主体地址" required prop="mainAddressId">
						<picker mode="region" :value="form.mainAddressId" @change="onRegionChange">
							<u-input readonly :border="surrOrNot" placeholder="点击选择省市区" v-model="form.mainAddressId"></u-input>
						</picker>
					</u-form-item>

					<u-form-item label="详细地址" required prop="detailedAddress">
						<u-input v-model="form.detailedAddress" :border="surrOrNot" placeholder="请输入详细地址"></u-input>
					</u-form-item>

					<u-form-item label="简介" required prop="description">
						<u-textarea v-model="form.description" placeholder="请输入内容" count></u-textarea>
					</u-form-item>

					<u-form-item label="营业时间" required prop="businessHoursStart">
						<u-datetime-picker
							:show="showYysj1"
							v-model="form.businessHoursStart"
							mode="time"
							@cancel="showYysj1 = false"
							@confirm="showYysj1 = false"
						></u-datetime-picker>
						<div style="width:200rpx" @click="showYysj1 = true">
							<u-input readonly :border="surrOrNot" placeholder="开始营业" v-model="form.businessHoursStart"></u-input>
						</div>
					</u-form-item>
					<u-form-item prop="businessHoursEnd">
						<u-datetime-picker
							:show="showYysj2"
							v-model="form.businessHoursEnd"
							mode="time"
							@cancel="showYysj2 = false"
							@confirm="showYysj2 = false"
						></u-datetime-picker>
						<div style="width:200rpx" @click="showYysj2 = true">
							<u-input readonly :border="surrOrNot" placeholder="结束营业" v-model="form.businessHoursEnd"></u-input>
						</div>
					</u-form-item>
					<u-form-item label="监管分局" required prop="regulatorySubdivisionId" @click="showJgfj = true">
						<u-picker
							:show="showJgfj"
							:columns="columnsJgfj"
							keyName="key"
							immediateChange
							@cancel="showJgfj = false"
							@confirm="changeJgfj"
							title="监管分局"
						></u-picker>
						<u-input readonly :border="surrOrNot" placeholder="点击选择监管分局" v-model="linshiJgfj"></u-input>
					</u-form-item>
					<u-form-item label="监管人员" required prop="jgry" @click="showJgry = true">
						<u-picker
							:show="showJgry"
							:columns="columnsJgry"
							keyName="key"
							immediateChange
							@cancel="showJgry = false"
							@confirm="changeJgry"
							title="监管人员"
						></u-picker>
						<u-input readonly :border="surrOrNot" placeholder="点击选择监管人员" v-model="linshiJgry"></u-input>
					</u-form-item>
					<u-form-item label="上传商标logo" required prop="logo">
						<view style="position: relative;">
							<image
								:src="form.logo ? form.logo : '../../static/up-image.png'"
								mode="widthFix"
								style="width: 170rpx;"
								@click="form.logo ? previewImage(form.logo) : changeAvatar('logo')"
							></image>
							<div v-if="form.logo" style="position: absolute; top: 0rpx; left: 140rpx;" @click="form.logo = null">
								<u-icon name="close-circle-fill" size="30"></u-icon>
							</div>
						</view>
					</u-form-item>

					<u-form-item label="上传营业执照" required prop="businessLicensePhoto">
						<u-upload
							:fileList="fileList1"
							@afterRead="afterRead"
							@delete="deletePic"
							name="1"
							multiple
							:maxCount="1"
							width="160rpx"
							height="160rpx"
						></u-upload>
					</u-form-item>

					<u-form-item label="上传门头照片" required prop="storefrontPhoto">
						<u-upload
							:fileList="fileList2"
							@afterRead="afterRead"
							@delete="deletePic"
							name="2"
							multiple
							:maxCount="1"
							width="160rpx"
							height="160rpx"
						></u-upload>
					</u-form-item>

					<u-form-item label="上传食品经营许可证" required prop="foodBusinessLicensePhoto">
						<u-upload
							:fileList="fileList3"
							@afterRead="afterRead"
							@delete="deletePic"
							name="3"
							multiple
							:maxCount="1"
							width="160rpx"
							height="160rpx"
						></u-upload>
					</u-form-item>

					<u-form-item label="上传食品安全等级管理" required prop="foodSafetyManagementPhoto">
						<u-upload
							:fileList="fileList4"
							@afterRead="afterRead"
							@delete="deletePic"
							name="4"
							multiple
							:maxCount="1"
							width="160rpx"
							height="160rpx"
						></u-upload>
					</u-form-item>
					<!-- </u-form> -->
				</div>
			</u-form>
			<div v-if="step !== 0" class="btn"><u-button text="上一步" @click="step -= 1"></u-button></div>
			<div v-if="step === 0 || step === 1" class="btn"><u-button text="下一步" type="primary" @click="step += 1"></u-button></div>
			<div v-if="step === 2" class="btn"><u-button type="primary" text="提交" @click="submit"></u-button></div>
		</div>
		<u-action-sheet
			:actions="list"
			title="请选择上传方式"
			:show="showAction"
			@select="selectClick"
			@close="showAction = false"
			:closeOnClickOverlay="true"
			:closeOnClickAction="true"
		></u-action-sheet>
	</view>
</template>

<script>
import Cropping from '@/components/cropping/cropping.vue';
import { ip } from '@/api/api.js';
import { userInsert } from '@/api/register.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	components: {
		Cropping
	},

	// watch: {
	// 	step: function(newVal, oldVal) {
	// 		if (newVal !== oldVal && newVal > oldVal) {
	// 			wx.pageScrollTo({
	// 				scrollTop: 0,
	// 				duration: 300
	// 			});
	// 		}
	// 	}
	// },
	computed: {
		...mapState(['mobile']),
		linshiJylx() {
			const item = this.jylxList.find(item => item.id === this.form.businessTypeId);
			return item ? item.key : '';
		},
		linshiJgfj() {
			const item = this.jgfjList.find(item => item.id === this.form.regulatorySubdivisionId);
			return item ? item.key : '';
		},
		linshiJgry() {
			const item = this.jgryList.find(item => item.id === this.form.jgry);
			return item ? item.key : '';
		},
		surrOrNot() {
			return this.step === 2 ? 'none' : 'surround';
		}
	},
	data() {
		return {
			i: 1,
			step: 0,
			form: {
				name: '',
				idNumber: '',
				avatar: '',
				idPortraitPhoto: '',
				idEmblemPhoto: '',
				nickname: '',
				socialCreditCode: '',
				businessTypeId: '',
				mainAddressId: '',
				detailedAddress: '',
				description: '',
				businessHoursStart: '',
				businessHoursEnd: '',
				regulatorySubdivisionId: '',
				jgry: '',
				logo: '',
				businessLicensePhoto: '',
				storefrontPhoto: '',
				foodBusinessLicensePhoto: '',
				foodSafetyManagementPhoto: '',
				password: ''
			},
			rules: {
				name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
				idNumber: [{ required: true, message: '请输入身份证号', trigger: 'blur', len: 18 }],
				avatar: [{ required: true, message: '请上传负责人头像', trigger: 'blur' }],
				idPortraitPhoto: [{ required: true, message: '请上传身份证人像面照片', trigger: 'blur' }],
				idEmblemPhoto: [{ required: true, message: '请上传身份证国徽面照片', trigger: 'blur' }],
				nickname: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
				socialCreditCode: [{ required: true, message: '请输入企业识别号', trigger: 'blur', len: 18 }],
				businessTypeId: [{ required: true, message: '请选择经营类型', trigger: 'blur' }],
				mainAddressId: [{ required: true, message: '请输入主体地址', trigger: 'blur' }],
				detailedAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
				description: [{ required: true, message: '请输入简介', trigger: 'blur' }],
				businessHoursStart: [{ required: true, message: '请选择营业开始时间', trigger: 'blur' }],
				businessHoursEnd: [{ required: true, message: '请选择营业结束时间', trigger: 'blur' }],
				regulatorySubdivisionId: [{ required: true, message: '请输入监管分局', trigger: 'blur' }],
				jgry: [{ required: true, message: '请输入监管人员', trigger: 'blur' }],
				logo: [{ required: true, message: '请上传企业LOGO', trigger: 'blur' }],
				businessLicensePhoto: [{ required: true, message: '请上传营业执照', trigger: 'blur' }],
				storefrontPhoto: [{ required: true, message: '请上传门头照片', trigger: 'blur' }],
				foodBusinessLicensePhoto: [{ required: true, message: '请上传食品经营许可证', trigger: 'blur' }],
				foodSafetyManagementPhoto: [{ required: true, message: '请上传食品安全等级管理制度', trigger: 'blur' }]
			},
			showAction: false,
			showJylx: false,
			showYysj1: false,
			showYysj2: false,
			showJgfj: false,
			showJgry: false,
			columnsJylx: [],
			columnsYysj1: [],
			columnsYysj2: [],
			columnsJgfj: [],
			columnsJgry: [],
			jylxList: [],
			yysj1List: [],
			yysj2List: [],
			jgfjList: [],
			jgryList: [],
			list: [{ name: '从手机相册选择' }, { name: '拍照' }],
			avaType: 'avater',
			cardType: 'front',
			fileList1: [],
			fileList2: [],
			fileList3: [],
			fileList4: [],
			upMediaOrImg: false
		};
	},
	onLoad(op) {
		console.log(this.$store.state.mobile);
		console.log(this.mobile);
		// this.i = op.i === '2' ? 2 : 1;
		this.i = 2;
		this.getList();
	},
	onShow() {},
	methods: {
		getList() {
			this.jylxList = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.yysj1List = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.yysj2List = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.jgfjList = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.jgryList = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.columnsJylx.push(this.jylxList);
			this.columnsYysj1.push(this.yysj1List);
			this.columnsYysj2.push(this.yysj2List);
			this.columnsJgfj.push(this.jgfjList);
			//获取监管分局后根据监管分局去查询监管人员
			this.columnsJgry.push(this.jgryList);
		},
		previewImage(i) {
			uni.previewImage({
				urls: [i]
			});
		},
		getMim() {
			const socialCreditCode = this.form.socialCreditCode;
			if (socialCreditCode && socialCreditCode.length === 18) {
				const password = socialCreditCode.substr(12, 6);
				this.$set(this.form, 'password', password);
			} else {
				this.$set(this.form, 'password', '');
			}
		},
		//头像/logo
		changeAvatar(type) {
			this.avaType = type;
			this.$refs.cropping.fChooseImg(1, {
				selWidth: '600upx',
				selHeight: '600upx',
				inner: true
			});
		},
		async doUpload(rsp) {
			// console.log(rsp);
			// this.$set(this.form, 'avatar', rsp.path);
			const result = await this.uploadFilePromise(rsp.path);
			if (this.avaType === 'avater') {
				this.$set(this.form, 'avatar', result.data);
			} else {
				this.$set(this.form, 'logo', result.data);
			}
		},
		//身份证
		async doUploadCard(rsp) {
			// console.log(rsp);
			// this.$set(this.form, 'idPortraitPhoto', rsp.path);
			const result = await this.uploadFilePromise(rsp.path);
			if (this.cardType === 'front') {
				this.$set(this.form, 'idPortraitPhoto', result.data);
			} else {
				this.$set(this.form, 'idEmblemPhoto', result.data);
			}
		},
		async changeIDCard(url) {
			const result = await this.uploadFilePromise(url);
			if (this.cardType === 'front') {
				this.$set(this.form, 'idPortraitPhoto', result.data);
			} else {
				this.$set(this.form, 'idEmblemPhoto', result.data);
			}
		},
		//营业执照 门头照片 许可证 安全等级
		async afterRead(event) {
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
				const result = await this.uploadFilePromise(lists[i].url);
				let item = this[`fileList${event.name}`][fileListLen];

				this[`fileList${event.name}`].splice(
					fileListLen,
					1,
					Object.assign(item, {
						status: 'success',
						message: '',
						url: result.data
					})
				);
				fileListLen++;
			}
			//上传好的视频就是fileList 列表
			this.upMediaOrImg = false;
		},
		goCropping2() {
			this.$refs.cropping2.fChooseImg(1, {
				selWidth: '632upx',
				selHeight: '400upx',
				inner: true
			});
		},
		selectClick(i) {
			console.log(i);
			if (i.name === '从手机相册选择') {
				this.$refs.cropping2.fChooseImg(1, {
					selWidth: '632upx',
					selHeight: '400upx',
					inner: true
				});
			} else if (i.name === '拍照') {
				uni.navigateTo({
					url: '../../pages_other1/test/test?cardType=' + this.cardType
				});
			}
		},
		uploadFilePromise(url) {
			this.upMediaOrImg = true;
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: ip + 'app-api/infra/file/upload',
					filePath: url,
					name: 'file',
					success: res => {
						setTimeout(() => {
							resolve(JSON.parse(res.data));
						}, 1000);
					},
					fail(e) {
						this.upMediaOrImg = false;
						uni.showToast({
							title: e,
							icon: 'none'
						});
					}
				});
			});
		},
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1);
		},
		//三级联动
		onRegionChange(e) {
			this.$set(this.form, 'mainAddressId', e.detail.value.join(' '));
		},
		changeJylx(e) {
			this.$set(this.form, 'businessTypeId', e.value[0].id);
			this.showJylx = false;
		},
		changeYysj1(e) {
			this.$set(this.form, 'businessHoursStart', e.value[0]);
			this.showYysj1 = false;
		},
		changeYysj2(e) {
			this.$set(this.form, 'businessHoursEnd', e.value[0]);
			this.showYysj2 = false;
		},
		changeJgfj(e) {
			this.$set(this.form, 'regulatorySubdivisionId', e.value[0].id);
			this.showJgfj = false;
		},
		changeJgry(e) {
			this.$set(this.form, 'jgry', e.value[0].id);
			this.showJgry = false;
		},
		submit() {
			//营业执照 门头照片 经营许可证 食安等级管理
			const urls1 = this.fileList1.map(item => item.url);
			const urls2 = this.fileList2.map(item => item.url);
			const urls3 = this.fileList3.map(item => item.url);
			const urls4 = this.fileList4.map(item => item.url);
			this.$set(this.form, 'businessLicensePhoto', urls1);
			this.$set(this.form, 'storefrontPhoto', urls2);
			this.$set(this.form, 'foodBusinessLicensePhoto', urls3);
			this.$set(this.form, 'foodSafetyManagementPhoto', urls4);
			console.log(this.form);
			this.$refs.uForm
				.validate()
				.then(res => {
					userInsert(this.form).then(res => {
						if (!res.code === 0) {
							uni.$u.toast(res.msg);
							return;
						}
						uni.$u.toast('注册成功');
					});
				})
				.catch(errors => {
					uni.$u.toast('校验失败');
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.box1 {
	img {
		width: 700rpx;
		height: 700rpx;
	}
}
/deep/ .u-steps-item__wrapper {
	width: 60rpx !important;
	height: 60rpx !important;
}
/deep/.u-steps-item__wrapper__circle {
	width: 60rpx !important;
	height: 60rpx !important;
}
/deep/.u-steps-item__line--row {
	top: 32rpx !important;
}
</style>
