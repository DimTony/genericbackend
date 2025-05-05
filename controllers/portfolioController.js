const Portfolio = require("../models/portfolio");
const CustomError = require("../utils/customError");

const getPortfolio = async (req, res, next) => {
  try {
    console.log("User in request:", req.header.authorization); // Debug

    // if (!req.user || !req.user.id) {
    //   throw new CustomError(400, "User ID missing in request");
    // }

    const portfolio = await Portfolio.findOne({ id: "tonydim" });

    if (!portfolio) {
      throw new CustomError(404, "Portfolio not found");
    }

    res.status(200).json({
      status: "success",
      data: {
        portfolio,
      },
    });
  } catch (error) {
    console.error("Error in getPortfolio:", error); // Debug log

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

const createPortfolio = async (req, res, next) => {
  try {
    const { id, firstName, lastName } = req.body;

    // if (!req.user || !req.user.id) {
    //   throw new CustomError(400, "User ID missing in request");
    // }

    if (!id || !firstName || !lastName) {
      throw new CustomError(400, "Fill in required fields");
    }

    // Check if a portfolio already exists for this user
    const existing = await Portfolio.findOne({ id });
    if (existing) {
      throw new CustomError(409, "Portfolio already exists for this user");
    }

    const newPortfolio = await Portfolio.create({
      id,
      firstName,
      lastName,
    });

    res.status(201).json({
      status: "success",
      data: {
        portfolio: newPortfolio,
      },
    });
  } catch (error) {
    console.error("Error in createPortfolio:", error);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

const updatePortfolio = async (req, res, next) => {
  try {
    const { id, firstName, lastName } = req.body;

    // if (!req.user || !req.user.id) {
    //   throw new CustomError(400, "User ID missing in request");
    // }

    const updated = await Portfolio.findOneAndUpdate(
      { id },
      { $set: { firstName, lastName } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new CustomError(404, "Portfolio not found");
    }

    res.status(200).json({
      status: "success",
      data: {
        portfolio: updated,
      },
    });
  } catch (error) {
    console.error("Error in updatePortfolio:", error);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

const deletePortfolio = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new CustomError(400, "User ID missing in request");
    }

    const deleted = await Portfolio.findOneAndDelete({ id });

    if (!deleted) {
      throw new CustomError(404, "Portfolio not found");
    }

    res.status(200).json({
      status: "success",
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    console.error("Error in deletePortfolio:", error);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

const testUserEndpoint = async (req, res, next) => {
  try {
    // console.log("User in request:", req.header.authorization); // Debug

    // if (!req.user || !req.user.id) {
    //   throw new CustomError(400, "User ID missing in request");
    // }

    // const portfolio = await Portfolio.findOne({ id: "tonydim" });

    // if (!portfolio) {
    //   throw new CustomError(404, "Portfolio not found");
    // }

    res.status(200).json({
      status: "success",
      data: {
        users: [
          {
            id: 1,
            fullName: "John Doe",
            username: "johndoe",
            role: "Admin",
            country: "Nigeria",
            branchCode: "LAG001",
            status: "Active",
            requestType: "New Account",
            dateAdded: "2025-04-15",
          },
          {
            id: 2,
            fullName: "Jane Smith",
            username: "janesmith",
            role: "User",
            country: "Nigeria",
            branchCode: "ABJ002",
            status: "Inactive",
            requestType: "Password Reset",
            dateAdded: "2025-04-20",
          },
          {
            id: 3,
            fullName: "Michael Johnson",
            username: "mjohnson",
            role: "Approver",
            country: "Ghana",
            branchCode: "ACC001",
            status: "Locked",
            requestType: "Role Change",
            dateAdded: "2025-04-25",
          },
          {
            id: 4,
            fullName: "Sarah Williams",
            username: "swilliams",
            role: "User",
            country: "Nigeria",
            branchCode: "LAG005",
            status: "Active",
            requestType: "New Account",
            dateAdded: "2025-04-18",
          },
          {
            id: 5,
            fullName: "David Brown",
            username: "dbrown",
            role: "Admin",
            country: "Kenya",
            branchCode: "NAI001",
            status: "Active",
            requestType: "New Account",
            dateAdded: "2025-04-10",
          },
        ],
       
      },
    });
  } catch (error) {
    console.error("Error in getPortfolio:", error); // Debug log

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

const testRequestsEndpoint = async (req, res, next) => {
  try {
    // console.log("User in request:", req.header.authorization); // Debug

    // if (!req.user || !req.user.id) {
    //   throw new CustomError(400, "User ID missing in request");
    // }

    // const portfolio = await Portfolio.findOne({ id: "tonydim" });

    // if (!portfolio) {
    //   throw new CustomError(404, "Portfolio not found");
    // }

    res.status(200).json({
      status: "success",
      data: {
        users: [
          {
            id: 1,
            fullName: "John Doe",
            username: "johndoe",
            role: "Admin",
            country: "Nigeria",
            branchCode: "LAG001",
            status: "Active",
            requestType: "New Account",
            dateAdded: "2025-04-15",
          },
          {
            id: 2,
            fullName: "Jane Smith",
            username: "janesmith",
            role: "User",
            country: "Nigeria",
            branchCode: "ABJ002",
            status: "Inactive",
            requestType: "Password Reset",
            dateAdded: "2025-04-20",
          },
          {
            id: 3,
            fullName: "Michael Johnson",
            username: "mjohnson",
            role: "Approver",
            country: "Ghana",
            branchCode: "ACC001",
            status: "Locked",
            requestType: "Role Change",
            dateAdded: "2025-04-25",
          },
          {
            id: 4,
            fullName: "Sarah Williams",
            username: "swilliams",
            role: "User",
            country: "Nigeria",
            branchCode: "LAG005",
            status: "Active",
            requestType: "New Account",
            dateAdded: "2025-04-18",
          },
          {
            id: 5,
            fullName: "David Brown",
            username: "dbrown",
            role: "Admin",
            country: "Kenya",
            branchCode: "NAI001",
            status: "Active",
            requestType: "New Account",
            dateAdded: "2025-04-10",
          },
        ],
        requests: [
          {
            id: 1,
            fullName: "David Lee",
            username: "dlee",
            role: "User",
            requestType: "Access Request",
            branchCode: "005",
            createdDate: "2025-03-21",
            status: "Locked",
          },
          // Add more mock requests
          // ...
        ],
        roles: [
          {
            id: 1,
            adRoleName: "ADMIN_ROLE",
            role: "Administrator",
            dateAdded: "12/03/2024",
            createdBy: "N/A",
            userCount: "15",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 2,
            adRoleName: "USER_ROLE",
            role: "Standard User",
            dateAdded: "15/03/2024",
            createdBy: "N/A",
            userCount: "42",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 3,
            adRoleName: "SUPPORT_ROLE",
            role: "Support Team",
            dateAdded: "22/03/2024",
            createdBy: "N/A",
            userCount: "8",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 4,
            adRoleName: "MANAGER_ROLE",
            role: "Department Manager",
            dateAdded: "01/04/2024",
            createdBy: "N/A",
            userCount: "12",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 5,
            adRoleName: "APPROVER_ROLE",
            role: "Approver",
            dateAdded: "05/04/2024",
            createdBy: "N/A",
            userCount: "7",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 6,
            adRoleName: "AUDITOR_ROLE",
            role: "Auditor",
            dateAdded: "10/04/2024",
            createdBy: "N/A",
            userCount: "3",
            status: "Inactive",
          },
          {
            id: 7,
            adRoleName: "GUEST_ROLE",
            role: "Guest User",
            dateAdded: "15/04/2024",
            createdBy: "N/A",
            userCount: "22",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 8,
            adRoleName: "READONLY_ROLE",
            role: "Read Only",
            dateAdded: "20/04/2024",
            createdBy: "N/A",
            userCount: "5",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 9,
            adRoleName: "TEMP_ROLE",
            role: "Temporary Access",
            dateAdded: "25/04/2024",
            createdBy: "John Snow",
            userCount: "18",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 10,
            adRoleName: "API_ROLE",
            role: "API Access",
            dateAdded: "27/04/2024",
            createdBy: "N/A",
            userCount: "4",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 11,
            adRoleName: "FINANCE_ROLE",
            role: "Finance Team",
            dateAdded: "01/05/2024",
            createdBy: "N/A",
            userCount: "9",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 12,
            adRoleName: "HR_ROLE",
            role: "HR Team",
            dateAdded: "03/05/2024",
            createdBy: "N/A",
            userCount: "11",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error in getPortfolio:", error); // Debug log

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

const testRolesEndpoint = async (req, res, next) => {
  try {
    // console.log("User in request:", req.header.authorization); // Debug

    // if (!req.user || !req.user.id) {
    //   throw new CustomError(400, "User ID missing in request");
    // }

    // const portfolio = await Portfolio.findOne({ id: "tonydim" });

    // if (!portfolio) {
    //   throw new CustomError(404, "Portfolio not found");
    // }

    res.status(200).json({
      status: "success",
      data: {
        users: [
          {
            id: 1,
            fullName: "John Doe",
            username: "johndoe",
            role: "Admin",
            country: "Nigeria",
            branchCode: "LAG001",
            status: "Active",
            requestType: "New Account",
            dateAdded: "2025-04-15",
          },
          {
            id: 2,
            fullName: "Jane Smith",
            username: "janesmith",
            role: "User",
            country: "Nigeria",
            branchCode: "ABJ002",
            status: "Inactive",
            requestType: "Password Reset",
            dateAdded: "2025-04-20",
          },
          {
            id: 3,
            fullName: "Michael Johnson",
            username: "mjohnson",
            role: "Approver",
            country: "Ghana",
            branchCode: "ACC001",
            status: "Locked",
            requestType: "Role Change",
            dateAdded: "2025-04-25",
          },
          {
            id: 4,
            fullName: "Sarah Williams",
            username: "swilliams",
            role: "User",
            country: "Nigeria",
            branchCode: "LAG005",
            status: "Active",
            requestType: "New Account",
            dateAdded: "2025-04-18",
          },
          {
            id: 5,
            fullName: "David Brown",
            username: "dbrown",
            role: "Admin",
            country: "Kenya",
            branchCode: "NAI001",
            status: "Active",
            requestType: "New Account",
            dateAdded: "2025-04-10",
          },
        ],
        requests: [
          {
            id: 1,
            fullName: "David Lee",
            username: "dlee",
            role: "User",
            requestType: "Access Request",
            branchCode: "005",
            createdDate: "2025-03-21",
            status: "Locked",
          },
          // Add more mock requests
          // ...
        ],
        roles: [
          {
            id: 1,
            adRoleName: "ADMIN_ROLE",
            role: "Administrator",
            dateAdded: "12/03/2024",
            createdBy: "N/A",
            userCount: "15",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 2,
            adRoleName: "USER_ROLE",
            role: "Standard User",
            dateAdded: "15/03/2024",
            createdBy: "N/A",
            userCount: "42",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 3,
            adRoleName: "SUPPORT_ROLE",
            role: "Support Team",
            dateAdded: "22/03/2024",
            createdBy: "N/A",
            userCount: "8",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 4,
            adRoleName: "MANAGER_ROLE",
            role: "Department Manager",
            dateAdded: "01/04/2024",
            createdBy: "N/A",
            userCount: "12",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 5,
            adRoleName: "APPROVER_ROLE",
            role: "Approver",
            dateAdded: "05/04/2024",
            createdBy: "N/A",
            userCount: "7",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 6,
            adRoleName: "AUDITOR_ROLE",
            role: "Auditor",
            dateAdded: "10/04/2024",
            createdBy: "N/A",
            userCount: "3",
            status: "Inactive",
          },
          {
            id: 7,
            adRoleName: "GUEST_ROLE",
            role: "Guest User",
            dateAdded: "15/04/2024",
            createdBy: "N/A",
            userCount: "22",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 8,
            adRoleName: "READONLY_ROLE",
            role: "Read Only",
            dateAdded: "20/04/2024",
            createdBy: "N/A",
            userCount: "5",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 9,
            adRoleName: "TEMP_ROLE",
            role: "Temporary Access",
            dateAdded: "25/04/2024",
            createdBy: "John Snow",
            userCount: "18",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 10,
            adRoleName: "API_ROLE",
            role: "API Access",
            dateAdded: "27/04/2024",
            createdBy: "N/A",
            userCount: "4",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 11,
            adRoleName: "FINANCE_ROLE",
            role: "Finance Team",
            dateAdded: "01/05/2024",
            createdBy: "N/A",
            userCount: "9",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
          {
            id: 12,
            adRoleName: "HR_ROLE",
            role: "HR Team",
            dateAdded: "03/05/2024",
            createdBy: "N/A",
            userCount: "11",
            permissions: [
              { id: 1, name: "Full System Access", enabled: true },
              { id: 2, name: "User Management", enabled: true },
              { id: 3, name: "Audit Logs", enabled: true },
              { id: 4, name: "System Configuration", enabled: true },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error in getPortfolio:", error); // Debug log

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

module.exports = {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
  testUserEndpoint,
};
