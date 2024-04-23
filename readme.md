### Record Controller API

This project provides an API to manage records including adding, deleting, and fetching summary statistics for records. Below is a detailed guide on how to use the API endpoints along with instructions on testing them using Postman.

### File Descriptions

#### `controllers/recordController.js`

- This file contains controller functions for handling CRUD operations on records.
- `addRecord`: Adds a new record to the dataset.
- `deleteRecord`: Deletes a record from the dataset.
- `getSummaryStatistics`: Fetches summary statistics for salary over the entire dataset.
- `getOnContractSummaryStatistics`: Fetches summary statistics for salary for records with "on_contract" true.
- `getSummaryByDepartment`: Fetches summary statistics for salary for each department.
- `getSummaryByDepartmentSubDepartment`: Fetches summary statistics for salary for each department and sub-department combination.

#### `routes/recordRoutes.js`

- This file defines the routes for the record-related APIs using Express Router.
- Each route corresponds to a controller function defined in `recordController.js`.

#### `test/recordController.test.js`

- This file contains unit tests for the controller functions defined in `recordController.js`.
- It uses `supertest` and `chai` for testing HTTP requests and assertions, respectively.
- Tests cover scenarios such as adding a record, deleting a record, and fetching summary statistics.

#### `app.js`

- This is the main application file that configures and starts the Express server.
- It imports the routes defined in `recordRoutes.js` and sets up the server to listen on a specified port.

### Installation

1. Clone the repository:

   ```
   git clone <repository_url>
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the server:

   ```
   npm start
   ```

### API Endpoints

#### Add a New Record

- **URL:** `/records`
- **Method:** `POST`
- **Body:** JSON object with the following fields:
  - `name`: Name of the record
  - `salary`: Salary of the record
  - `department`: Department of the record
  - `sub_department`: Sub-department of the record
- **Output:** Newly added record object with a success message.
- **Test with Postman:** Send a POST request to `http://localhost:3000/records` with the JSON body containing the record details. You should receive a response with the newly added record and a success message.

#### Delete a Record

- **URL:** `/records/:name`
- **Method:** `DELETE`
- **Output:** Success message if the record is deleted successfully.
- **Test with Postman:** Send a DELETE request to `http://localhost:3000/records/:name`, where `:name` is the name of the record you want to delete. You should receive a response with a success message upon successful deletion.

#### Fetch Summary Statistics for Salary

- **URL:** `/records/summary`
- **Method:** `GET`
- **Output:** JSON object containing mean, min, and max salary over the entire dataset.
- **Test with Postman:** Send a GET request to `http://localhost:3000/records/summary`. You should receive a response with the summary statistics for salary.

#### Fetch Summary Statistics for Salary for Records with "on_contract" True

- **URL:** `/records/summary/on-contract`
- **Method:** `GET`
- **Output:** JSON object containing mean, min, and max salary for records with "on_contract" true.
- **Test with Postman:** Send a GET request to `http://localhost:3000/records/summary/on-contract`. You should receive a response with the summary statistics for salary of records with "on_contract" true.

#### Fetch Summary Statistics for Salary for Each Department

- **URL:** `/records/summary/by-department`
- **Method:** `GET`
- **Output:** JSON object containing mean, min, and max salary for each department.
- **Test with Postman:** Send a GET request to `http://localhost:3000/records/summary/by-department`. You should receive a response with the summary statistics for salary for each department.

#### Fetch Summary Statistics for Salary for Each Department and Sub-Department Combination

- **URL:** `/records/summary/by-department-sub-department`
- **Method:** `GET`
- **Output:** JSON object containing mean, min, and max salary for each department and sub-department combination.
- **Test with Postman:** Send a GET request to `http://localhost:3000/records/summary/by-department-sub-department`. You should receive a response with the summary statistics for salary for each department and sub-department combination.

### Testing with Inbuilt Tests

1. **Unit Testing with `recordController.test.js`:**
   - Open the terminal and navigate to the project directory.
   - Run the command `npx mocha tests` to execute the unit tests defined in `recordController.test.js`.
   - The tests will run, and the output will be displayed in the terminal, indicating whether each test passed or failed.

2. **Manual Testing with Postman:**
   - Open Postman and follow the instructions provided in the README for each API endpoint.
   - Send requests to each endpoint with the required parameters or body.
   - Review the responses received from the server to ensure they match the expected output.

### Conclusion

This README provides a comprehensive guide on how to use the Record Controller API, including installation instructions, details about each file in the project, API endpoints, and instructions on testing using both inbuilt unit tests and manual testing with Postman. If you encounter any issues or have questions about the application or testing process, feel free to reach out for assistance.