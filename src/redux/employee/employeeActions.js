export const employeeActionTypes = {
	REGISTER_USER: 'employee/register_user',
	ADD_EMPLOYEE_DETAILS: 'employee/add_details',
	REGISTER_USER_SUCCESS: 'employee/register_user_success',
	REGISTER_USER_FAILED: 'employee/register_user_failed',
	ADD_EMPLOYEE_DETAILS_SUCCESS: 'employee/add_details_success',
	ADD_EMPLOYEE_DETAILS_FAILED: 'employee/add_details_failed',
};

export function registerUser(payload) {
	return { type: employeeActionTypes.REGISTER_USER, payload };
}

export function addEmployeeDetails(payload) {
	return { type: employeeActionTypes.ADD_EMPLOYEE_DETAILS, payload };
}
