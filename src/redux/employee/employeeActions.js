export const employeeActionTypes = {
	REGISTER_USER: 'employee/register_user',
	REGISTER_USER_SUCCESS: 'employee/register_user_success',
	REGISTER_USER_FAILED: 'employee/register_user_failed',
	ADD_EMPLOYEE_DETAILS: 'employee/add_details',
	ADD_EMPLOYEE_DETAILS_SUCCESS: 'employee/add_details_success',
	ADD_EMPLOYEE_DETAILS_FAILED: 'employee/add_details_failed',
	GET_ALL_EMPLOYEES: 'employee/get_all_employees',
	GET_ALL_EMPLOYEES_SUCCESS: 'employee/get_all_employees_success',
	GET_ALL_EMPLOYEES_FAILED: 'employee/get_all_employees_failed',
};

export function registerUser(payload) {
	return { type: employeeActionTypes.REGISTER_USER, payload };
}

export function addEmployeeDetails(payload) {
	return { type: employeeActionTypes.ADD_EMPLOYEE_DETAILS, payload };
}

export function getAllEmployees() {
	return { type: employeeActionTypes.GET_ALL_EMPLOYEES };
}
