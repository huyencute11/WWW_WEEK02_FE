import { useCallback, useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppDispatch } from "../../hooks/hook";
import { getReportDaily } from "./slice";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";

const Report = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<Dayjs | null>(dayjs("2023-09-17"));
  useEffect(() => {
    console.log("value " + value);
  }, [value]);
  // const formattedDate = value ? value.format('YYYY-MM-DD') : '';
  // useEffect(()=>{
  // }, [value])
  const handleReport = useCallback(() => {
    if (value) {
      const formattedDate = value.format("YYYY-MM-DD");
      dispatch(getReportDaily(formattedDate));
    }
  }, [dispatch, value]);
  
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
          <DatePicker
            label="Controlled picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button variant="contained" onClick={handleReport}>
        Report
      </Button>
    </>
  );
};

export default Report;
