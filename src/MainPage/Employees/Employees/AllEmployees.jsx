import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Avatar_01 } from '../../../Entryfile/imagepath';
import AddEmployee from '../../../_components/modelbox/AddEmployee';
import EditEmployee from '../../../_components/modelbox/EditEmployee';
import DeleteEmployee from '../../../_components/dialogs/DeleteEmployee';
import Header from '../../../initialpage/Sidebar/header';
import Sidebar from '../../../initialpage/Sidebar/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../../../redux/employee/employeeActions';

const AllEmployees = () => {
	const [menu, setMenu] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const dispatch = useDispatch();
	const isEmployeeDataLoading = useSelector(
		(state) => state.employee.employeesLoading
	);
	const employees = useSelector((state) => state.employee.employees);

	const toggleMobileMenu = () => {
		setMenu(!menu);
	};

	useEffect(() => {
		if ($('.select').length > 0) {
			$('.select').select2({
				minimumResultsForSearch: -1,
				width: '100%',
			});
		}
	});

	useEffect(() => {
		if (employees == null) {
			dispatch(getAllEmployees());
		}
	}, []);

	const renderEmployeeCards = () =>
		employees.data.map((employee) => (
			<div
				className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
				key={employee.id}
			>
				<div className="profile-widget">
					<div className="profile-img">
						<Link to="/app/profile/employee-profile" className="avatar">
							<img src={Avatar_01} alt="" />
						</Link>
					</div>
					<div className="dropdown profile-action">
						<a
							href="#"
							className="action-icon dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							onClick={() => {
								setSelectedId(employee.id);
							}}
						>
							<i className="material-icons">more_vert</i>
						</a>
						<div className="dropdown-menu dropdown-menu-right">
							<a
								className="dropdown-item"
								href="#"
								data-bs-toggle="modal"
								data-bs-target="#edit_employee"
							>
								<i className="fa fa-pencil m-r-5" /> Edit
							</a>
							<a
								className="dropdown-item"
								href="#"
								data-bs-toggle="modal"
								data-bs-target="#delete_employee"
							>
								<i className="fa fa-trash-o m-r-5" /> Delete
							</a>
						</div>
					</div>
					<h4 className="user-name m-t-10 mb-0 text-ellipsis">
						<Link to="/app/profile/employee-profile">
							{employee.first_name + ' ' + employee.last_name}
						</Link>
					</h4>
					<div className="small text-muted">{employee.designation}</div>
				</div>
			</div>
		));

	return (
		<div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
			<Header onMenuClick={(value) => toggleMobileMenu()} />
			<Sidebar />
			<div className="page-wrapper">
				<Helmet>
					<title>Employees - Adamant HR</title>
					<meta name="description" content="Login page" />
				</Helmet>
				{/* Page Content */}
				<div className="content container-fluid">
					{/* Page Header */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Employee</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/app/main/dashboard">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active">Employee</li>
								</ul>
							</div>
							<div className="col-auto float-end ml-auto">
								<a
									href="#"
									className="btn add-btn"
									data-bs-toggle="modal"
									data-bs-target="#add_employee"
								>
									<i className="fa fa-plus" /> Add Employee
								</a>
								{employees && employees.data.length > 0 && (
									<div className="view-icons">
										<Link
											to="/app/employee/allemployees"
											className="grid-view btn btn-link active"
										>
											<i className="fa fa-th" />
										</Link>
										<Link
											to="/app/employee/employees-list"
											className="list-view btn btn-link"
										>
											<i className="fa fa-bars" />
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
					{/* /Page Header */}
					{/* Search Filter */}
					{isEmployeeDataLoading ? (
						<div className="text-center p-4">
							<span
								className="spinner-border spinner-border-lg"
								role="status"
								aria-hidden="true"
							></span>
							<span className="sr-only">Loading...</span>
						</div>
					) : employees ? (
						employees.data.length > 0 ? (
							<div>
								<div className="row filter-row">
									<div className="col-sm-6 col-md-3">
										<div className="form-group form-focus">
											<input type="text" className="form-control floating" />
											<label className="focus-label">Employee ID</label>
										</div>
									</div>
									<div className="col-sm-6 col-md-3">
										<div className="form-group form-focus">
											<input type="text" className="form-control floating" />
											<label className="focus-label">Employee Name</label>
										</div>
									</div>
									<div className="col-sm-6 col-md-3">
										<div className="form-group form-focus select-focus">
											<select className="select floating">
												<option>Select Designation</option>
												<option>Web Developer</option>
												<option>Web Designer</option>
												<option>Android Developer</option>
												<option>Ios Developer</option>
											</select>
											<label className="focus-label">Designation</label>
										</div>
									</div>
									<div className="col-sm-6 col-md-3">
										<a href="#" className="btn btn-success btn-block w-100">
											{' '}
											Search{' '}
										</a>
									</div>
								</div>
								{/* Search Filter */}
								<div className="row staff-grid-row">
									{renderEmployeeCards()}
								</div>
							</div>
						) : (
							<div className="text-center p-4">
								<h4 className="text-secondary fw-light">No employees found</h4>
							</div>
						)
					) : (
						<div className="text-center p-4">
							<h4 className="text-secondary fw-light">No data found</h4>
						</div>
					)}
				</div>
				{/* /Page Content */}
				{/* Add Employee Modal */}
				<AddEmployee />
				{/* /Add Employee Modal */}
				{/* Edit Employee Modal */}
				{selectedId && <EditEmployee selectedId={selectedId} />}
				{/*{selectedUser && <EditEmployee currentData={selectedUser} />}*/}
				{/* /Edit Employee Modal */}
				{/* Delete Employee Modal */}
				{selectedId && <DeleteEmployee selectedId={selectedId} />}
				{/* /Delete Employee Modal */}
			</div>
		</div>
	);
};

export default AllEmployees;
