import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateEmployeeDetails,
	updateUser,
} from '../../redux/employee/employeeActions';

const EditEmployee = ({ selectedId }) => {
	const isUserAccountLoading = useSelector(
		(state) => state.employee.userAccountFormLoading
	);
	const isEmployeeDetailsLoading = useSelector(
		(state) => state.employee.employeeDetailsFormLoading
	);

	const dispatch = useDispatch();
	const currentEmployee = useSelector(
		(state) => state.employee.employees
	).data.find((employee) => employee.id === selectedId);

	const formData = {
		user: {
			first_name: currentEmployee.first_name,
			last_name: currentEmployee.last_name,
			email: currentEmployee.email,
			contact_no: currentEmployee.contact_no,
			gender: currentEmployee.gender,
			status: currentEmployee.status,
			address: {
				postal_code: currentEmployee.postal_code,
				city: currentEmployee.city,
				street: currentEmployee.street,
				country: currentEmployee.country,
			},
		},
		employee_details: {
			date_of_join: currentEmployee.date_of_join.split('T')[0],
			employee_id: currentEmployee.employee_id,
			adamant_code: currentEmployee.adamant_code,
			dol: currentEmployee.dol.split('T')[0],
			designation: currentEmployee.designation,
			supervisor: currentEmployee.supervisor,
			job_location: currentEmployee.job_location,
			job_location_state: currentEmployee.job_location_state,
			on_roll: currentEmployee.on_roll,
			dob: currentEmployee.dob.split('T')[0],
			emergency_no: currentEmployee.emergency_no,
			self_aadhar_no: currentEmployee.self_aadhar_no,
			qualification: currentEmployee.qualification,
			father_name: currentEmployee.father_name,
			mother_name: currentEmployee.mother_name,
			spouse_name: currentEmployee.spouse_name,
			esic_no: currentEmployee.esic_no,
			uan: currentEmployee.uan,
			pan_no: currentEmployee.pan_no,
			account_no: currentEmployee.account_no,
			ifsc_code: currentEmployee.ifsc_code,
			bank_name: currentEmployee.bank_name,
			permanent_address: currentEmployee.permanent_address,
			correspondence_address: currentEmployee.correspondence_address,
			daily_rate: currentEmployee.daily_rate,
		},
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: formData });

	const UserAccountScreen = () => {
		const onSubmit = (data) => {
			data.user.role = 'employee';
			data.user.is_phone_verified = false;
			delete data.user.confirm_password;

			dispatch(updateUser(data.user));
		};

		return (
			<>
				<div className="pb-2">
					<h4 className="text-secondary">User account details</h4>
					<hr />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="row pt-1">
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									First Name <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('user.first_name')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Last Name <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('user.last_name')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Email <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="email"
									{...register('user.email')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Contact No. <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('user.contact_no')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Gender <span className="text-danger">*</span>
								</label>
								<select
									required
									className="select"
									{...register('user.gender')}
								>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Status <span className="text-danger">*</span>
								</label>
								<select
									required
									className="select"
									{...register('user.status')}
								>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
									<option value="deleted">Deleted</option>
								</select>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Password <span className="text-danger">*</span>
								</label>
								<input
									className="form-control"
									autoComplete="new-password"
									type="password"
									{...register('user.password')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Confirm Password <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="password"
									{...register('user.confirm_password')}
								/>
							</div>
						</div>
						<div className="col-sm-12">
							<div className="form-group">
								<label className="col-form-label">
									Street <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('user.address.street')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-md-4">
							<div className="form-group">
								<label className="col-form-label">
									City <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('user.address.city')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-md-4">
							<div className="form-group">
								<label className="col-form-label">
									Postal Code <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('user.address.postal_code')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-md-4">
							<div className="form-group">
								<label className="col-form-label">
									Country <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('user.address.country')}
								/>
							</div>
						</div>
					</div>
					<div className="submit-section pb-4">
						<button className="btn btn-primary submit-btn" type="submit">
							{isUserAccountLoading ? (
								<>
									<span
										className="spinner-border spinner-border-sm text-light"
										role="status"
										aria-hidden="true"
									></span>
									<span className="sr-only">Loading...</span>
								</>
							) : (
								'Update user account'
							)}
						</button>
					</div>
				</form>
			</>
		);
	};

	const EmployeeDetailsScreen = () => {
		const onSubmit = (data) => {
			dispatch(updateEmployeeDetails(data.employee_details));
		};

		return (
			<>
				<div className="pb-2 pt-2">
					<h4 className="text-secondary">Employee details</h4>
					<hr />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="row pt-1">
						<div className="col-sm-6 col-md-4">
							<div className="form-group">
								<label className="col-form-label">
									Date of Join <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="date"
									{...register('employee_details.date_of_join')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-md-4">
							<div className="form-group">
								<label className="col-form-label">
									Employee ID <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.employee_id')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-md-4">
							<div className="form-group">
								<label className="col-form-label">
									Adamant Code <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.adamant_code')}
								/>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label className="col-form-label">D.O.L</label>
								<input
									className="form-control"
									type="date"
									{...register('employee_details.dol')}
								/>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label className="col-form-label">
									Designation <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.designation')}
								/>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label className="col-form-label">
									Supervisor <span className="text-danger">*</span>
								</label>
								<select
									required
									className="select"
									{...register('employee_details.supervisor')}
								>
									<option value="9342650b-b9ab-45eb-b37d-bb3a9d12ac6c">
										Super Admin
									</option>
								</select>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Job Location <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.job_location')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Job Location State <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.job_location_state')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									On Roll <span className="text-danger">*</span>
								</label>
								<input
									placeholder="Adamant HR"
									required
									className="form-control"
									type="text"
									{...register('employee_details.on_roll')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Date of Birth <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="date"
									{...register('employee_details.dob')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Emergency No. <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.emergency_no')}
								/>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-form-label">
									Self Aadhar No. <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.self_aadhar_no')}
								/>
							</div>
						</div>
						<div className="col-sm-12">
							<div className="form-group">
								<label className="col-form-label">
									Qualification <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.qualification')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="form-group">
								<label className="col-form-label">
									Father Name <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.father_name')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="form-group">
								<label className="col-form-label">
									Mother Name <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.mother_name')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="form-group">
								<label className="col-form-label">
									Spouse Name <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.spouse_name')}
								/>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label className="col-form-label">
									ESIC No. <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.esic_no')}
								/>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label className="col-form-label">
									UAN <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.uan')}
								/>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="form-group">
								<label className="col-form-label">
									PAN No. <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.pan_no')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="form-group">
								<label className="col-form-label">
									Account No. <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.account_no')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-lg-3">
							<div className="form-group">
								<label className="col-form-label">IFSC Code</label>
								<input
									className="form-control"
									type="text"
									{...register('employee_details.ifsc_code')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-lg-5">
							<div className="form-group">
								<label className="col-form-label">Bank Name</label>
								<input
									className="form-control"
									type="text"
									{...register('employee_details.bank_name')}
								/>
							</div>
						</div>
						<div className="col-sm-12">
							<div className="form-group">
								<label className="col-form-label">
									Permanent Address <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.permanent_address')}
								/>
							</div>
						</div>
						<div className="col-sm-12">
							<div className="form-group">
								<label className="col-form-label">
									Correspondence Address <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="text"
									{...register('employee_details.correspondence_address')}
								/>
							</div>
						</div>
						<div className="col-sm-6 col-md-4">
							<div className="form-group">
								<label className="col-form-label">
									Daily rate <span className="text-danger">*</span>
								</label>
								<input
									required
									className="form-control"
									type="number"
									{...register('employee_details.daily_rate')}
								/>
							</div>
						</div>
					</div>
					<div className="submit-section pb-4">
						<button
							className="btn btn-primary submit-btn"
							type="submit"
							disabled={isEmployeeDetailsLoading}
						>
							{isEmployeeDetailsLoading ? (
								<>
									<span
										className="spinner-border spinner-border-sm text-light"
										role="status"
										aria-hidden="true"
									></span>
									<span className="sr-only">Loading...</span>
								</>
							) : (
								'Update employee details'
							)}
						</button>
					</div>
				</form>
			</>
		);
	};

	return (
		<>
			{/* Edit Employee Modal */}
			<div id="edit_employee" className="modal custom-modal fade" role="dialog">
				<div
					className="modal-dialog modal-dialog-centered modal-lg"
					role="document"
				>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Employee</h5>
							<button
								type="button"
								className="close"
								data-bs-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body pb-3">
							<UserAccountScreen />
							<EmployeeDetailsScreen />
						</div>
					</div>
				</div>
			</div>
			{/* /Edit Employee Modal */}
		</>
	);
};

export default EditEmployee;
