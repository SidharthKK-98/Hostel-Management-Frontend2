import { useGetAllUnresolvedComplaints } from "@/hooks/ComplaintHooks/useGetAllUnresolvedComplaints"
import ShowComplaint from "../Cards/ShowComplaint";
import usePagination from "@/hooks/ui/usePagination";
import Pagination from "../Pagination";



function Complaints() {
  const {data:UnresolvedComplaints} = useGetAllUnresolvedComplaints()

   const {
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedData,
} = usePagination({
  data: UnresolvedComplaints?.data || [],
  itemsPerPage: 3,
})
  
  return (
    <div className='text-black p-4'>

      <div className="font-bold text-3xl text-center m-4">
        UnResolved Complaints
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {
              paginatedData.map((complaint)=>(
                <ShowComplaint key={complaint._id} complaint={complaint} fromUser={false}/>
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

export default Complaints