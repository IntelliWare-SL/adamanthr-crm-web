import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import '../../antdstyle.css';
import EditEmployee from '../../../_components/modelbox/Editemployee';
import AddEmployee from '../../../_components/modelbox/AddEmployee';
import Header from '../../../initialpage/Sidebar/header';
import Sidebar from '../../../initialpage/Sidebar/sidebar';
import { useSelector } from 'react-redux';

const EmployeesList = () => {
	const [menu, setMenu] = useState(false);
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

	const renderEmployeeTable = () => {
		const columns = [
			{
				title: 'Employee ID',
				dataIndex: 'employee_id',
				sorter: (a, b) => a.employee_id - b.employee_id,
			},
			{
				title: 'Name',
				render: (text, record) => (
					<span>{record.first_name + ' ' + record.last_name}</span>
				),
				sorter: (a, b) => a.first_name - b.first_name,
			},
			{
				title: 'Designation',
				dataIndex: 'designation',
				sorter: (a, b) => a.designation - b.designation,
			},
			{
				title: 'Gender',
				dataIndex: 'gender',
				sorter: (a, b) => a.gender - b.gender,
			},
			{
				title: 'Email',
				dataIndex: 'email',
			},

			{
				title: 'Contact No',
				dataIndex: 'contact_no',
			},

			{
				title: 'Joined Date',
				dataIndex: 'date_of_join',
				render: (text, record) => (
					<span>{new Date(record.date_of_join).toLocaleDateString()}</span>
				),
				sorter: (a, b) => a.date_of_join.length - b.date_of_join.length,
			},
			{
				title: 'Status',
				dataIndex: 'status',
				sorter: (a, b) => a.status - b.status,
			},
			{
				title: 'Action',
				render: (text, record) => (
					<div className="dropdown dropdown-action text-end">
						<a
							href="#"
							className="action-icon dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
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
				),
			},
		];

		return (
			<div className="table-responsive">
				<Table
					className="table-striped"
					pagination={{
						total: employees.data.length,
						showTotal: (total, range) =>
							`Showing ${range[0]} to ${range[1]} of ${total} entries`,
						showSizeChanger: true,
						onShowSizeChange: onShowSizeChange,
						itemRender: itemRender,
					}}
					style={{ overflowX: 'auto' }}
					columns={columns}
					// bordered
					dataSource={employees.data}
					rowKey={(record) => record.id}
				/>
			</div>
		);
	};

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
								{/* /Search Filter */}
								<div className="row">
									<div className="col-md-12">{renderEmployeeTable()}</div>
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
				<EditEmployee />
				{/* /Edit Employee Modal */}
				{/* Delete Employee Modal */}
				<div
					className="modal custom-modal fade"
					id="delete_employee"
					role="dialog"
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-body">
								<div className="form-header">
									<h3>Delete Employee</h3>
									<p>Are you sure want to delete?</p>
								</div>
								<div className="modal-btn delete-action">
									<div className="row">
										<div className="col-6">
											<a href="" className="btn btn-primary continue-btn">
												Delete
											</a>
										</div>
										<div className="col-6">
											<a
												href=""
												data-bs-dismiss="modal"
												className="btn btn-primary cancel-btn"
											>
												Cancel
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Delete Employee Modal */}
			</div>
		</div>
	);
};

export default EmployeesList;
