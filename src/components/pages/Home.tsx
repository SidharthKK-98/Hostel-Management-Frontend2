import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {  ShieldCheck, UtensilsCrossed, MessageSquareText, ArrowDown } from "lucide-react";

import ViewCommentCard from "../Cards/ViewCommentCard";
import { useGetComments } from "@/hooks/CommentHooks/useGetComments";
import usePagination from "@/hooks/ui/usePagination";
import Pagination from "../Pagination";

type OutletContextType = {
  setFromHome: React.Dispatch<React.SetStateAction<boolean>>;
};

function Home() {
  const { setFromHome } = useOutletContext<OutletContextType>();
  const { data: comments } = useGetComments();

  useEffect(() => {
    setFromHome(true);

    return () => setFromHome(false);
  }, [setFromHome]);

  const features = [
    {
      id: 1,
      heading: "Admin control",
      description:
        "Manage rooms, food, daily menus, and payments from one dashboard.",
      image: "./sheild1.png",
      icon: <ShieldCheck className="h-6 w-6 text-violet-600" />,
      bg: "bg-violet-100",
    },
    {
      id: 2,
      heading: "Digital menu & billing",
      description:
        "Residents pay only for what they consume — automatic daily billing.",
      image: "./kinfe.png",
      icon: <UtensilsCrossed className="h-6 w-6 text-emerald-600" />,
      bg: "bg-emerald-100",
    },
    {
      id: 3,
      heading: "Complaint resolution",
      description:
        "Complaints submitted instantly and routed to the right person with no delay.",
      image: "./complaint.png",
      icon: <MessageSquareText className="h-6 w-6 text-orange-600" />,
      bg: "bg-orange-100",
    },
  ]

  
   const {
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedData,
} = usePagination({
  data: comments?.data || [],
  itemsPerPage: 3,
})

  return (
    <div className="bg-white text-black">
      {/* HERO SECTION */}
      <section className="min-h-screen border-b">
        {/* NAVBAR */}
        <div className="flex items-center justify-between border-b px-6 py-5 lg:px-14">
          <div className="flex items-center gap-3">
           

          </div>

          
        </div>

        {/* HERO CONTENT */}
        <div className="grid min-h-[calc(100vh-90px)] items-center gap-14 px-6 py-10 lg:grid-cols-2 lg:px-14">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-gray-50 px-5 py-2 text-sm text-gray-700">
              ✨ Hostel management, simplified
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-tight lg:text-7xl">
              Manage your hostel,
              <span className="block text-violet-600">simplified.</span>
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-9 text-gray-600">
              Rooms, meals, payments, and complaints — all in one clean,
              easy-to-use dashboard built for hostel owners.
            </p>

           
          </div>

          {/* RIGHT CARD */}
          <div className="mx-auto w-full max-w-xl rounded-[32px] border bg-gray-50 p-6 shadow-sm">
            <div className="space-y-5">
              {/* USER CARD 1 */}
              <div className="flex items-center justify-between rounded-3xl border bg-white p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
                    JT
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Jenny Thomas</h3>
                    <p className="text-gray-500">Room 2 · Fees due</p>
                  </div>
                </div>

                <div className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600">
                  Unpaid
                </div>
              </div>

              {/* USER CARD 2 */}
              <div className="rounded-3xl border bg-white p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                      AK
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Anjali Kumari</h3>
                      <p className="text-gray-500">Room 5 · All clear</p>
                    </div>
                  </div>

                  <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-600">
                    Paid
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
                    <span>Mess usage</span>
                    <span>81 / 100</span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 w-[81%] rounded-full bg-violet-600" />
                  </div>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-3xl border bg-white p-5 text-center">
                  <h3 className="text-3xl font-bold">24</h3>
                  <p className="mt-1 text-gray-500">Residents</p>
                </div>

                <div className="rounded-3xl border bg-white p-5 text-center">
                  <h3 className="text-3xl font-bold">3</h3>
                  <p className="mt-1 text-gray-500">Complaints</p>
                </div>

                <div className="rounded-3xl border bg-white p-5 text-center">
                  <h3 className="text-3xl font-bold">₹8.4k</h3>
                  <p className="mt-1 text-gray-500">Collected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL BUTTON */}
        <div className="flex justify-center pb-6">
          <a
            href="#features"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-700 text-white shadow-lg transition hover:scale-105"
          >
            <ArrowDown className="h-6 w-6" />
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="min-h-screen border-b px-6 py-20 lg:px-14"
      >
        <div className="mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-gray-50 px-5 py-2 text-sm text-gray-700">
            ⊞ Features
          </div>

          <h2 className="text-4xl font-bold lg:text-6xl">
            Everything your hostel needs
          </h2>

          <p className="mt-4 text-xl text-gray-500">
            One platform for all the moving parts of daily hostel operations.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-[32px] border bg-white p-8 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg}`}
              >
                {feature.icon}
              </div>

              <h3 className="text-3xl font-semibold">{feature.heading}</h3>

              <p className="mt-5 text-xl leading-9 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section
        id="review"
        className="min-h-screen px-6 py-20 lg:px-14"
      >
        <div className="mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-gray-50 px-5 py-2 text-sm text-gray-700">
            ⭐ Reviews
          </div>

          <h2 className="text-4xl font-bold lg:text-6xl">
            What residents say
          </h2>

          <p className="mt-4 text-xl text-gray-500">
            Feedback from hostel residents using the platform daily.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {paginatedData?.map((comment) => (
            <ViewCommentCard comment={comment} key={comment._id} />
          ))}
        </div>

         <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
}

export default Home;