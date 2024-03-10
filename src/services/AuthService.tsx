import axios from "axios";
import { API_URL } from "../constant/APIEndpoint";
import { UserResponse } from "../model/UserResponse";

export class AuthService {
  async login(user: UserResponse) {
    const body = {
      username: user.username,
      password: user.password,
    };
    const url = API_URL + "/user/login";
    const response = await axios.post(url, body);
    const userRes: UserResponse = response.data;
    console.log(userRes);
    return userRes;
  }

  async register(user: UserResponse) {
    const formData = new FormData();
    if (user.name) {
      formData.append("name", user.name);
    }
    formData.append("username", user.username);
    formData.append("password", user.password);
    if (user.avatar) {
      formData.append("avatar", user.avatar);
    }

    const url = API_URL + "/user/register";
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const result = response.data;
    console.log(result);

    return result;
  }
}
