import axios from "axios";
// const url = process.env.REACT_APP_BASE_URL
export const getListOrderService = async (query: any) => {
  const response = axios.get(
    `http://localhost:8081/Gradle___www_week2___WWW_Lab02_1_0_SNAPSHOT_war/api/order`
  );
  return response;
};
export const insertOrderService = async (data: any) => {
  const response = axios.post(
    `http://localhost:8081/Gradle___www_week2___WWW_Lab02_1_0_SNAPSHOT_war/api/order`,
    data
  );
  return response;
};

export const getOrderDetailService = async (data: any) => {
  const response = axios.get(
    `http://localhost:8081/Gradle___www_week2___WWW_Lab02_1_0_SNAPSHOT_war/api/order-detail/${data}`
  );
  return response;
};
export const getDetailProductService = async (data: any) => {
  const response = axios.get(
    `http://localhost:8081/Gradle___www_week2___WWW_Lab02_1_0_SNAPSHOT_war/api/product/detail`
  );
  return response;
};

export const insertListOrderDetailService = async (data: any) => {
  const response = axios.post(
    `http://localhost:8081/Gradle___www_week2___WWW_Lab02_1_0_SNAPSHOT_war/api/order-detail/insert-order-details`, data
  );
  return response;
};

export const getReportOrderDailyService = async (data: any) => {
  
  const response = axios.get(
    `http://localhost:8081/Gradle___www_week2___WWW_Lab02_1_0_SNAPSHOT_war/api/order/report-daily?date=${data}`, 
  );
  return response;
};
