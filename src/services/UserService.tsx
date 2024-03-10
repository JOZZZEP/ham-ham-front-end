import axios from "axios";
import { API_URL } from "../constant/APIEndpoint";
import { UserResponse } from "../model/UserResponse";

export class UserService {

  async getAllUser(){
    const url = API_URL + "/user";
    const response = await axios.get(url);
    const trips : UserResponse[] = response.data;
    return trips;
  }

  async getUserById(id: number){
    const url = API_URL + `/user/${id}`;
    const response = await axios.get(url);
    const trips : UserResponse[] = response.data;
    return trips;
  }
}