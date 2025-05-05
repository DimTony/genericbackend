const CustomError = require("../utils/customError");
const TestUser = require("../models/test/user");
const TestRole = require("../models/test/role");

const mockUsers = [
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
];

const mockRequests = [
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
  // Add more mock requests here if needed
];

const mockRolesData = [
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
];

// === CONTROLLERS ===

exports.createUser = async (req, res) => {
  try {
    const {
      fullName,
      username,
      role,
      country,
      branchCode,
      status,
      requestType,
      dateAdded,
    } = req.body;

    // if (
    //   !fullName ||
    //   !username ||
    //   !role ||
    //   !country ||
    //   !branchCode ||
    //   !status ||
    //   !requestType
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Missing required user fields",
    //   });
    // }

    // const existingUser = await TestUser.findOne({ username });
    // if (existingUser) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "Username already exists",
    //   });
    // }

    const newUser = new TestUser({
      fullName,
      username,
      role,
      country,
      branchCode,
      status: 'Inactive',
      requestType,
      dateAdded: dateAdded || new Date().toISOString().split("T")[0],
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating user",
    });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await TestUser.find();
    return res.status(200).json({ success: true, data: users });


    // const count = parseInt(req.query.count) || 45;
    // const result = [];

    // for (let i = 0; i < count; i++) {
    //   const baseUser = mockUsers[i % mockUsers.length];
    //   result.push({
    //     ...baseUser,
    //     id: i + 1,
    //     username: `${baseUser.username}${Math.floor(i / mockUsers.length) + 1}`,
    //     branchCode: `${baseUser.branchCode.slice(0, -1)}${(i % 9) + 1}`,
    //     dateAdded: new Date(2025, 3, 1 + (i % 30)).toISOString().split("T")[0],
    //   });
    // }

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error in testUserEndpoint:", error);
    handleError(res, error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await TestUser.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.bulkCreateUsers = async (req, res) => {
  try {
    const { users } = req.body;

    

    if (!Array.isArray(users) || users.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user payload" });
    }

    // Optionally remove `id` from each object if coming from mock data
    // const cleanUsers = users.map(({ id, ...rest }) => rest);

    const createdUsers = await TestUser.insertMany(users, {
      ordered: false,
    });

    return res.status(201).json({ success: true, data: createdUsers });
  } catch (error) {
    console.error("Bulk creation error:", error);

    // Handle duplicate key errors gracefully
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Duplicate username(s) found." });
    }

    return res
      .status(500)
      .json({ success: false, message: "Server error during bulk creation." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // or use req.body depending on your routing
    const updateFields = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "user ID is required for update",
      });
    }

    const user = await TestUser.findOne({ id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Optional: restrict updates to only allowed fields
    const allowedFields = [
      "fullName",
      "role",
      "country",
      "branchCode",
      "status",
      "requestType",
      "dateAdded",
    ];

    allowedFields.forEach((field) => {
      if (updateFields[field] !== undefined) {
        user[field] = updateFields[field];
      }
    });

    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating user",
    });
  }
};


exports.getAllRequests = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 45;
    const result = [];

    for (let i = 0; i < count; i++) {
      const baseRequest = mockRequests[i % mockRequests.length];
      result.push({
        ...baseRequest,
        id: i + 1,
        fullName: `${baseRequest.fullName}${
          Math.floor(i / mockRequests.length) + 1
        }`,
        branchCode: `${baseRequest.branchCode.slice(0, -1)}${(i % 9) + 1}`,
        dateAdded: new Date(2025, 3, 1 + (i % 30)).toISOString().split("T")[0],
      });
    }

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error in testRequestsEndpoint:", error);
    handleError(res, error);
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await TestRole.find();
    return res.status(200).json({ success: true, data: roles });


    // res.status(200).json({
    //   status: "success",
    //   data: mockRolesData,
    // });
  } catch (error) {
    console.error("Error in testRolesEndpoint:", error);
    handleError(res, error);
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await TestRole.findById(req.params.id);
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });

    return res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error("Error fetching role:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.bulkCreateRoles = async (req, res) => {
  try {
    const { roles } = req.body;

    if (!Array.isArray(roles) || roles.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid roles payload" });
    }

    const createdRoles = await TestRole.insertMany(roles, {
      ordered: false,
    });

    return res.status(201).json({ success: true, data: createdRoles });
  } catch (error) {
    console.error("Bulk creation error:", error);

    // Handle duplicate key errors gracefully
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Duplicate username(s) found." });
    }

    return res
      .status(500)
      .json({ success: false, message: "Server error during bulk creation." });
  }
};




// === ERROR HANDLER ===

const handleError = (res, error) => {
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
};
