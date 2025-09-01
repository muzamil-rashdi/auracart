// Key in localStorage to store users
const USERS_KEY = "app_users";

// Helper to load users
const loadUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Helper to save users
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register new user
export const register = async (values) => {
  const users = loadUsers();
  const exists = users.find((u) => u.email === values.email);

  if (exists) {
    throw new Error("Email already registered");
  }

  const newUser = {
    name: values.name,
    email: values.email,
    password: values.password, // ⚠️ plain text (for demo only)
  };

  users.push(newUser);
  saveUsers(users);

  return { user: newUser, token: "fake-jwt-token" };
};

// Login user
export const login = async ({ email, password }) => {
  const users = loadUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return { user, token: "fake-jwt-token" };
};
