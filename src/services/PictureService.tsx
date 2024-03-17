import axios from "axios";
import { API_URL } from "../constant/Constant";

export class PictureService {
  async picRank() {
    const url = API_URL + "/picture/rank";
    const response = await axios.get(url);
    return response.data;
  }

  async picRandom() {
    const url = API_URL + "/picture/random";
    const response = await axios.get(url);
    return response.data;
  }

  async picByUserID(uid:number) {
    const url = API_URL + `/picture/uid/${uid}`;
    const response = await axios.get(url);
    return response.data;
  }

  async picGraph(pid:number) {
    const url = API_URL + `/vote/trend/${pid}`;
    const response = await axios.get(url);
    return response.data;
  }

  async picVote(body: any) {
    const url = API_URL + "/vote";
    const response = await axios.post(url, body);
    return response.data;
  }

  async picUserUpload(payload: any) {
    const formData = new FormData();
    formData.append("uid", payload.uid);
    formData.append("picture", payload.picture);
    const url = API_URL + "/picture/upload";
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async picDelete(pid: any) {
    const url = API_URL + `/picture/${pid}`;
    const response = await axios.delete(url);
    return response.data;
  }
}
