import { useDispatch } from "react-redux";
import { setServices } from "../../../store/services/services-reducer";
import { serviceApi } from "../../../api/service";
import { useQuery } from "react-query";

function useGetServices() {
  const dispatch = useDispatch();

  return useQuery("get-services", serviceApi.getServices, {
    onSuccess(data) {
      dispatch(setServices(data));
    },
  });
}

export default useGetServices;
