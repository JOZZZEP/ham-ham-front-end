import axios from "axios";
import { API_URL } from "../constant/Constant";

export class UserService {

  async getAllUser(){
    const url = API_URL + "/user";
    const response = await axios.get(url);
    return response.data;
  }

  async getUserByUsername(username: string){
    const url = API_URL + `/user/getByUsername/${username}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getUserById(id: number){
    const url = API_URL + `/user/getById/${id}`;
    const response = await axios.get(url);
    return response.data;
  }
}