import axios from "axios";
import { API_URL } from "../constant/Constant";

export class AuthService {
  async login(user: any) {
    const body = {
      username: user.username,
      password: user.password,
    };
    const url = API_URL + "/user/login";
    const response = await axios.post(url, body);
    const userRes = response.data;
    return userRes;
  }

  async register(user: any) {
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
    return result;
  }

  async getUserByToken(token: string) {
    const body = {
      token: token,
    };
    const url = API_URL + "/user/getUser";
    const response = await axios.post(url, body);
    console.log(response.data);
    return response.data;
  }
}
