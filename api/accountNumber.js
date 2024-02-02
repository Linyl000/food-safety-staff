import {
	post,
	get
} from '@/api/api.js'

//使用手机 + 密码登录
export function login(data) {
	return post('app-api/member/auth/login', data)
}
