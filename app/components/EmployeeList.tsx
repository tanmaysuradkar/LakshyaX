'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import EmployeeModal from './EmployeeModal';

interface Employee {
  name: string;
  department: string;
  role: string;
  status: 'Active' | 'Remote' | 'On Leave';
  avatar: string;
}

interface EmployeeListProps {
  searchTerm?: string;
  departmentFilter?: string;
  statusFilter?: string;
  sortBy?: string;
  onEditEmployee?: (employee: Employee) => void;
}

export default function EmployeeList({ 
  searchTerm = '', 
  departmentFilter = '', 
  statusFilter = '',
  sortBy = '',
  onEditEmployee
}: EmployeeListProps) {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      name: "John Doe",
      department: "Engineering",
      role: "Senior Developer",
      status: "Active",
      avatar: "https://ui-avatars.com/api/?name=John+Doe"
    },
    {
      name: "Jane Smith",
      department: "Design",
      role: "UI/UX Designer",
      status: "Remote",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith"
    },
    {
      name: "Mike Johnson",
      department: "Marketing",
      role: "Marketing Manager",
      status: "Active",
      avatar: "https://ui-avatars.com/api/?name=Mike+Johnson"
    },
    {
      name: "Sarah Wilson",
      department: "Sales",
      role: "Sales Representative",
      status: "On Leave",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();

  // Filter and sort employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchTerm === '' || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === '' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === '' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortBy) return 0;

    const [field, direction] = sortBy.split('-');
    const multiplier = direction === 'asc' ? 1 : -1;

    switch (field) {
      case 'name':
        return multiplier * a.name.localeCompare(b.name);
      case 'department':
        return multiplier * a.department.localeCompare(b.department);
      case 'status':
        return multiplier * a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const handleAddEmployee = () => {
    setSelectedEmployee(undefined);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (employeeToDelete: Employee) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.name !== employeeToDelete.name));
    }
  };

  const handleSaveEmployee = (employee: Employee) => {
    if (selectedEmployee) {
      // Edit existing employee
      setEmployees(employees.map(emp => 
        emp.name === selectedEmployee.name ? employee : emp
      ));
    } else {
      // Add new employee
      setEmployees([...employees, {
        ...employee,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}`
      }]);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEmployees.map((employee, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 relative">
                        <Image
                          className="rounded-full"
                          src={employee.avatar}
                          alt={employee.name}
                          fill
                          sizes="40px"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' :
                      employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEditEmployee?.(employee)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
      />
    </>
  );
} 