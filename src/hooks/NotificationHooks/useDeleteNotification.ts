
import { deleteNotification } from "@/apis/notificatinAPIs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};