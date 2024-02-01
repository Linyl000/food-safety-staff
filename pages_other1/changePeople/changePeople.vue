<template>
	<view class="pages">
		<u-form labelPosition="top" :model="form" ref="uForm" labelWidth="300" :rules="rules">
			<u-form-item label="姓名" required prop="name">
				<u-input v-model="form.name" border="surround" placeholder="请填写姓名"></u-input>
			</u-form-item>
			<u-form-item label="身份证号" required prop="idCardNumber">
				<u-input v-model="form.idCardNumber" border="surround" prop="idCardNumber" placeholder="请填写身份证" @blur="getAge"></u-input>
			</u-form-item>
			<u-form-item label="年龄" required prop="age">
				<u-input v-model="form.age" border="surround" placeholder="年龄根据身份证自动识别" readonly></u-input>
			</u-form-item>
			<!-- 	<u-form-item label="性别" required><u-input v-model="form.sex" border="surround" prop="sex"  placeholder="性别根据身份证自动识别" readonly></u-input></u-form-item> -->
			<u-form-item label="电话号码" required prop="phoneNumber">
				<u-input v-model="form.phoneNumber" border="surround" placeholder="请填写电话号码"></u-input>
			</u-form-item>
			<u-form-item label="所属商户" required prop="merchantId">
				<u-input v-model="userInfo.nickname" border="surround" readonly></u-input>
			</u-form-item>
			<u-form-item label="职位" required @click="showZw = true" prop="positionId">
				<u-picker
					:show="showZw"
					:columns="columnsZw"
					@cancel="showZw = false"
					@confirm="changeZw"
					title="职位"
					keyName="key"
					immediateChange
				></u-picker>
				<u-input readonly border="surround" placeholder="点击选择职位" v-model="linshiZw"></u-input>
			</u-form-item>
			<u-form-item label="入职时间" required prop="entryDate" @click="showRzsj = true">
				<u-datetime-picker :show="showRzsj" mode="date" @cancel="showRzsj = false" @confirm="changeRzsj"></u-datetime-picker>
				<u-input readonly border="surround" placeholder="请选择入职时间" v-model="form.entryDate"></u-input>
			</u-form-item>
			<u-form-item label="上传健康证照片" required prop="healthCertificatePhotoUrl">
				<Cropping @upload="doUploadCard" ref="cropping2" :needCamera="false" />
				<view style="position: relative;">
					<!-- 		form.healthCertificatePhotoUrl ? previewImage(form.healthCertificatePhotoUrl) : goCropping2();-->
					<img
						:src="form.healthCertificatePhotoUrl ? form.healthCertificatePhotoUrl : '../../static/front.png'"
						alt=""
						style="width: 574rpx;height: 364rpx;"
						@click="
							form.healthCertificatePhotoUrl ? previewImage(form.healthCertificatePhotoUrl) : (showAction = true);

							cardType = 'front';
						"
					/>
					<div
						v-if="form.healthCertificatePhotoUrl"
						style="position: absolute; top: 0rpx; left: 514rpx;"
						@click="form.healthCertificatePhotoUrl = null"
					>
						<u-icon name="close-circle-fill" size="30"></u-icon>
					</div>
				</view>
			</u-form-item>
		</u-form>
		<u-action-sheet
			:actions="list"
			title="请选择上传方式"
			:show="showAction"
			@select="selectClick"
			@close="showAction = false"
			:closeOnClickOverlay="true"
			:closeOnClickAction="true"
		></u-action-sheet>
		<div class="btn"><u-button type="primary" size="large" text="提交" @click="submit"></u-button></div>
	</view>
</template>

<script>
import { employeesUpdate, employeesCreate, employeesGet } from '@/api/people.js';
import Cropping from '@/components/cropping/cropping.vue';
import { ip } from '@/api/api.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	components: {
		Cropping,
		...mapState(['userInfo'])
	},
	data() {
		return {
			form: {
				name: '',
				age: '',
				// sex: '',
				phoneNumber: '',
				idCardNumber: '',
				merchantId: '',
				positionId: '',
				entryDate: '',
				healthCertificatePhotoUrl: ''
			},
			rules: {
				//校验默认强制string
				name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
				// sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
				age: [{ required: true, type: 'integer', message: '请输入数字为整数的年龄', trigger: 'blur' }],
				phoneNumber: [{ required: true, message: '请输入电话', trigger: 'blur' }],
				idCardNumber: [{ required: true, message: '请输入身份证号', trigger: 'blur', len: 18 }],
				positionId: [{ required: true, message: '请选择职位', trigger: 'blur' }],
				positionId: [{ validator: this.validatePositionId, trigger: 'blur' }],
				entryDate: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
				healthCertificatePhotoUrl: [{ required: true, message: '请上传健康证', trigger: 'blur' }]
			},
			showAction: false,
			showZw: false,
			showRzsj: false,
			columnsZw: [],
			columnsRzsj: [],
			cardType: 'front',
			list: [{ name: '从手机相册选择' }, { name: '拍照' }],
			i: null,
			positionList: []
		};
	},
	onLoad(op) {
		console.log(op.i);
		if (op.i.id) {
			this.i = i;
			this.employeesGet();
		}
		this.getList();
		//商户id不可变
		this.$set(this.form, 'merchantId', this.userInfo.id);
	},
	computed: {
		linshiZw() {
			const item = this.positionList.find(item => item.id === this.form.positionId);
			return item ? item.key : '';
		}
	},
	methods: {
		employeesGet() {
			employeesGet({ id: this.i.id }).then(res => {
				if (!res.code === 0) {
					uni.$u.toast(res.msg);
					return;
				}
				this.form = ress.data;
			});
		},
		getAge() {
			const idCardNumber = this.form.idCardNumber;
			if (idCardNumber && idCardNumber.length === 18) {
				const birthYear = parseInt(idCardNumber.substr(6, 4));
				const currentYear = new Date().getFullYear();
				this.$set(this.form, 'age', parseInt(currentYear - birthYear));
			} else {
				this.$set(this.form, 'age', '错误');
			}
		},
		getList() {
			this.positionList = [{ key: 'a', id: '1' }, { key: 'b', id: '2' }, { key: 'c', id: '3' }, { key: 'd', id: '4' }];
			this.columnsZw.push(this.positionList);
		},
		changeRzsj(e) {
			const date = new Date(e.value);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			this.$set(this.form, 'entryDate', `${year}-${month}-${day}`);
			this.showRzsj = false;
		},
		changeZw(e) {
			this.$set(this.form, 'positionId', e.value[0].id);
			this.showZw = false;
		},
		submit() {
			console.log(this.form);
			this.$refs.uForm
				.validate()
				.then(res => {
					if (this.i.id) {
						employeesUpdate(this.form).then(res => {
							if (!res.code === 0) {
								uni.$u.toast(res.msg);
								return;
							}
							uni.$u.toast('更新成功');
						});
					} else {
						employeesCreate(this.form).then(res => {
							if (!res.code === 0) {
								uni.$u.toast(res.msg);
								return;
							}
							uni.$u.toast('新建成功');
						});
					}
				})
				.catch(errors => {
					uni.$u.toast('校验失败');
				});
		},
		//健康证
		async doUploadCard(rsp) {
			const result = await this.uploadFilePromise(rsp.path);
			this.$set(this.form, 'healthCertificatePhotoUrl', result.data);
		},

		async changeIDCard(url) {
			const result = await this.uploadFilePromise(url);
			this.$set(this.form, 'healthCertificatePhotoUrl', result.data);
		},
		goCropping2() {
			this.$refs.cropping2.fChooseImg(1, {
				selWidth: '632upx',
				selHeight: '400upx',
				inner: true
			});
		},
		selectClick(i) {
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
		// 上传相关
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
						url: result
					})
				);
				fileListLen++;
			}
			//上传好的视频就是fileList 列表
			this.upMediaOrImg = false;
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
		previewImage(i) {
			uni.previewImage({
				urls: [i]
			});
		}
	}
};
</script>

<style lang="scss" scoped></style>
