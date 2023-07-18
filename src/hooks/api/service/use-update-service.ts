import { useMutation } from "react-query";
import { serviceApi } from "../../../api/service";
import Service from "../../../types/Service";
import { queryClient } from "../../..";

function useUpdateService(id: number) {
  return useMutation(async (body: Service) => {
    await serviceApi.updateServiceById(body, id);
    queryClient.invalidateQueries("get-services");
  });
}

export default useUpdateService;
