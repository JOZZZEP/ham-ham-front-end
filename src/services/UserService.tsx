import axios from "axios";
import { API_URL } from "../constant/Constant";

export class UserService {
  async getAllUser() {
    const url = API_URL + "/user";
    const response = await axios.get(url);
    return response.data;
  }

  async getUserByUsername(username: string) {
    const url = API_URL + `/user/getByUsername/${username}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getUserById(id: number) {
    const url = API_URL + `/user/getById/${id}`;
    const response = await axios.get(url);
    return response.data;
  }

  async editUser(userEdit: any) {
    const formData = new FormData();
    formData.append("name", userEdit.name);
    formData.append("username", userEdit.username);
    formData.append("password", userEdit.password);
    formData.append("newPassword", userEdit.newPassword);
    formData.append("avatar", userEdit.avatar);

    const url = API_URL + `/user/edit/${userEdit.uid}`;
    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}
