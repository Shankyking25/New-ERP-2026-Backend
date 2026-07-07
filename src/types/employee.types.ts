export interface CreateEmployeeInput {
  employeeId: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  designation: string;
  role: string;
  salary: number;
  joiningDate: Date;
  status: "Active" | "Inactive";
  avatar?: string;
}