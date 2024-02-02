import {
	post,
	get,
	put,
	del
} from '@/api/api.js'

//获得员工分页
export function employeesPage(query) {
	return get('app-api/app/employees/page', query)
}
//创建员工
export function employeesCreate(data) {
	return post('app-api/app/employees/create', data)
}
//更新员工
export function employeesUpdate(data) {
	return put('app-api/app/employees/update', data)
}
//删除员工
export function employeesDelete(data) {
	return del('app-api/app/employees/delete', data)
}
//获得某个员工详情
export function employeesGet(query) {
	return get('app-api/app/employees/get', query)
}
