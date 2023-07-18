import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { logsApi } from "../../../api/log";
import { setLogs } from "../../../store/logs/logs-reducer";

function useGetLogs() {
  const dispatch = useDispatch();

  return useQuery("get-logs", logsApi.getLogs, {
    onSuccess(data) {
      dispatch(setLogs(data));
    },
  });
}

export default useGetLogs;
