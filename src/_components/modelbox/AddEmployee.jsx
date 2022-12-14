import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	addEmployeeDetails,
	registerUser,
} from '../../redux/employee/employeeActions';

const AddEmployee = () => {
	const isUserAccountLoading = useSelector(
		(state) => state.employee.userAccountFormLoading
	);
	const isEmployeeDetailsLoading = useSelector(
		(state) => state.employee.employeeDetailsFormLoading
	);
	const createdAccountUid = useSelector(
		(state) => state.employee.createdAccountUid
	);

	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const UserAccountScreen = () => {
		const onSubmit = (data) => {
			data.user.role = 'employee';
			data.user.is_phone_verified = false;
			delete data.user.confirm_password;

			dispatch(registerUser(data.user));
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
						<button
							className="btn btn-primary submit-btn"
							type="submit"
							disabled={isUserAccountLoading || createdAccountUid}
						>
							{isUserAccountLoading ? (
								<>
									<span
										className="spinner-border spinner-border-sm text-light"
										role="status"
										aria-hidden="true"
									></span>
									<span className="sr-only">Loading...</span>
								</>
							) : createdAccountUid ? (
								'User account created'
							) : (
								'Create user account'
							)}
						</button>
					</div>
				</form>
			</>
		);
	};

	const EmployeeDetailsScreen = () => {
		const onSubmit = (data) => {
			data.employee_details.id = createdAccountUid;
			dispatch(addEmployeeDetails(data.employee_details));
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
								'Add employee details'
							)}
						</button>
					</div>
				</form>
			</>
		);
	};

	return (
		<>
			{/* Add Employee Modal */}
			<div id="add_employee" className="modal custom-modal fade" role="dialog">
				<div
					className="modal-dialog modal-dialog-centered modal-lg"
					role="document"
				>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add Employee</h5>
							<button
								type="button"
								className="close"
								data-bs-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">??</span>
							</button>
						</div>
						<div className="modal-body pb-3">
							<UserAccountScreen />
							{createdAccountUid && <EmployeeDetailsScreen />}
						</div>
					</div>
				</div>
			</div>
			{/* /Add Employee Modal */}
		</>
	);
};

export default AddEmployee;
