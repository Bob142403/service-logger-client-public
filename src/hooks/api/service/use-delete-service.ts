import { useMutation } from "react-query";
import { serviceApi } from "../../../api/service";
import { queryClient } from "../../..";

function useDeleteService() {
  return useMutation(async (id: number) => {
    await serviceApi.deleteSeerviceById(id);
    queryClient.invalidateQueries("get-services");
  });
}

export default useDeleteService;
