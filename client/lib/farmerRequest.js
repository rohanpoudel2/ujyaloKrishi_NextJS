import OwnRequest from "@/components/ownRequest/OwnRequest";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '@/utils/axios';

const FarmerRequest = () => {

  const { isLoading, error, data } = useQuery(['requests'], () =>
    makeRequest.get('/requests').then((res) => {
      return res.data;
    })
  );

  console.log(data)

  return (
    <>
      {
        data?.map((request) => (
          <OwnRequest key={request.id} request={request} />
        ))
      }
    </>
  )
}

export default FarmerRequest