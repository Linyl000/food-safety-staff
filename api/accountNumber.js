import {
	post,
	get
} from '@/api/api.js'

//使用手机 + 密码登录
export function login(data) {
	return post('/member/auth/login', data)
}
