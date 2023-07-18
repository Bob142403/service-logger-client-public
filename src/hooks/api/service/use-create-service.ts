import { useMutation } from "react-query";
import Service from "../../../types/Service";
import { serviceApi } from "../../../api/service";
import { queryClient } from "../../..";

function useCreateService() {
  return useMutation(async (body: Service) => {
    await serviceApi.createService(body);
    queryClient.invalidateQueries("get-services");
  });
}

export default useCreateService;
