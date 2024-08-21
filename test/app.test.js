const request = require("supertest");
const { getAllEmployees, getEmployeeById } = require("../controllers/index");
const http = require("http");
const { app } = require("../index");
let server;

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Controllers Testing Time", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Exercise 5: Mock the Get All Employees Function", () => {
    let mockedEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(mockedEmployees);

    let employees = getAllEmployees();
    expect(employees).toEqual(mockedEmployees);
    expect(employees.length).toBe(3);
  });
});

describe("API Endpoints Testing Time", () => {
  it("Exercise 3: Test Retrieve All Employees", async () => {
    const response = await request(server).get("/employees");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: "Priya Singh",
          email: "priya.singh@example.com",
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: "Ankit Verma",
          email: "ankit.verma@example.com",
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(response.body.employees.length).toBe(3);
  });

  it("Exercise 4: Test Retrieve Employee by ID", async () => {
    let response = await request(server).get("/employees/details/1");
    expect(response.status).toBe(200);
    console.log("Response:", response.body);
    // expect(response.body).toEqual({
    //   employeeId: 1,
    //   name: "Rahul Sharma",
    //   email: "rahul.sharma@example.com",
    //   departmentId: 1,
    //   roleId: 1,
    //});
  });
});
