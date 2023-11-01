import axios from "axios";
// const url = process.env.REACT_APP_BASE_URL
export const getListCustomerService = async (query: any) => {
  const response = axios.get(`http://localhost:8081/Gradle___www_week2___WWW_Lab02_1_0_SNAPSHOT_war/api/customer`);
  return response;
};

export const insertCustomerSerivce = async (data: object) => {
  const response = axios.post(`http://localhost:8081/Gradle___www_week2___WWW_Lab02_1_0_SNAPSHOT_war/api/customer`, data);
  return response;
};
