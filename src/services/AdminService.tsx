import axios from "axios";
import { API_URL } from "../constant/Constant";

export class AdminService {
  async getTimeRandom() {
    const url = API_URL + "/admin/getTimeRandom";
    const response = await axios.get(url);
    return response.data;
  }

  async updateTimeRandom(uid:number, time:number) {
    const body = {
      "uid":uid,
      "time":time
    }
    const url = API_URL + `/admin/updateTimeRandom`;
    const response = await axios.put(url, body);
    return response.data;
  }
}
