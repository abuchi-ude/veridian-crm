import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCustomer, getCustomers } from "../customer.services";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
