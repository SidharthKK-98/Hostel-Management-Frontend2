import { useGetAllUsers } from "@/hooks/ProfileHooks/useGetAllUsers"
import UserProfileCard from "../Cards/UserProfileCard";
import Pagination from "../Pagination";
import usePagination from "@/hooks/ui/usePagination";

function ShowUsers() {

    const {data:allUsers} =useGetAllUsers()

    // console.log(allUsers);
    const {
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedData,
} = usePagination({
  data: allUsers?.data || [],
  itemsPerPage: 6,
})

  return (
    <div>
       <div className="font-bold text-3xl text-center m-4">
        Residents
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            {
                paginatedData?.map((user)=>(
                    <UserProfileCard key={user._id} user={user}/>
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

export default ShowUsers