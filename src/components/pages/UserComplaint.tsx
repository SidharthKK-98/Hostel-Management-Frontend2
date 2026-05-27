import { useGetComplaintHistory } from "@/hooks/ComplaintHooks/useGetComplaintHistory"
import PostComplaintCard from "../Cards/PostComplaintCard"
import ShowComplaint from "../Cards/ShowComplaint";
import usePagination from "@/hooks/ui/usePagination";
import Pagination from "../Pagination";

function UserComplaint() {

  const {data:complaintHistory} = useGetComplaintHistory()
  const fromUser = true

  const {
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedData,
} = usePagination({
  data: complaintHistory?.data || [],
  itemsPerPage: 3,
})
  

  return (
    <div className="p-4">
        <div className="m-10 ">
            <PostComplaintCard/>
        </div>
        <h1 className="text-center font-semibold my-2">Complaint History</h1>
        <div className="lg:grid grid-cols-3 gap-4">
          {
            paginatedData?.map((complaint)=>(
              <ShowComplaint key={complaint._id} complaint={complaint} fromUser={fromUser}/>
            )) 
          }
        </div>

         <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={setCurrentPage}
        />

    
    </div>
    
  )
}

export default UserComplaint