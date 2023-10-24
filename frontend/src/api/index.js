import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000" });
export const api = {
  login: (email, password) => API.post("/auth/login", { email, password }),
  signup: (email, password) => API.post("/auth/signup", { email, password }),
  getSelf: (params) => API.get("/users/user", { params }),
  getAllUsers: (params) => API.get("/users/users", { params }),
  matchUser: (params) => API.put("/users/match", {}, { params }),
  getMatchedUsers: (params) => API.get("/users/matched", { params }),
  getPendingUsers: (params) => API.get("/users/pending", { params }),
  getRejectedUsers: (params) => API.get("/users/reject", { params }),
  updateUser: (newOb, params) =>
    API.put("/users/user", { formData: newOb }, { params }),
  rejectUser: (params) => API.put("/users/reject", {}, { params }),
  unrejectUser: (params) => API.put("/users/unreject", {}, { params }),
  getMessages: (params) => API.get("/messages", { params }),
  postMessage: (message) => API.put("/messages", { message }),
  getResume: (params) => API.get("/users/resume", { params }),
  deleteUser: (params) => API.delete("/users/delete", { params }),
  // getSkillBasedUsers: (params)=>API.get("/users/skillbased",{params}),
};
