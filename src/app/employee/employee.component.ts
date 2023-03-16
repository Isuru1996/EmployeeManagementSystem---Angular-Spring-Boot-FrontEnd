import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  EmployeeArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  employeeName: string = '';
  employeeDesignation: string = 'Manager';
  employeeSalary: Number = 0;
  currentEmployeeID = '';

  constructor(private http: HttpClient) {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.http
      .get('http://localhost:8080/api/v1/employee/getAllEmployees')

      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.EmployeeArray = resultData;
      });
  }
  register() {
    let bodyData = {
      name: this.employeeName,
      designation: this.employeeDesignation,
      salary: this.employeeSalary,
    };
    this.http
      .post('http://localhost:8080/api/v1/employee/save', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Registered Successfully');
        this.getAllEmployee();

        this.employeeName = '';
        this.employeeDesignation = 'Manager';
        this.employeeSalary = 0;
      });
  }
  setUpdate(data: any) {
    this.employeeName = data.name;
    this.employeeDesignation = data.designation;
    this.employeeSalary = data.salary;
    this.currentEmployeeID = data.id;
  }
  UpdateRecords() {
    let bodyData = {
      id: this.currentEmployeeID,
      name: this.employeeName,
      designation: this.employeeDesignation,
      salary: this.employeeSalary,
    };

    this.http
      .put('http://localhost:8080/api/v1/employee/updateEmployee', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Registered Updateddd');
        this.getAllEmployee();
        this.employeeName = '';
        this.employeeDesignation = 'Manager';
        this.employeeSalary = 0;
        this.currentEmployeeID = '';
      });
  }
  save() {
    if (this.currentEmployeeID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }
  setDelete(data: any) {
    this.http
      .delete(
        'http://localhost:8080/api/v1/employee/deleteEmployee' + '/' + data.id,
        { responseType: 'text' }
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Deletedddd');
        this.getAllEmployee();

        this.employeeName = '';
        this.employeeDesignation = 'Manager';
        this.employeeSalary = 0;
      });
  }

  reset() {
    this.employeeName = '';
    this.employeeDesignation = 'Manager';
    this.employeeSalary = 0;
    this.currentEmployeeID = '';
  }
}
