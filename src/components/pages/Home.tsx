import { useEffect } from "react";
import Card from "../Card"
import { useOutletContext } from "react-router-dom";
import ViewCommentCard from "../Cards/ViewCommentCard";
import { useGetComments } from "@/hooks/CommentHooks/useGetComments";


type OutletContextType={
        setFromHome:React.Dispatch<React.SetStateAction<boolean>>
    }

function Home() {

      const { setFromHome } = useOutletContext<OutletContextType>();
      const {data:comments} = useGetComments()


 useEffect(() => {

    setFromHome(true);

    return ()=>setFromHome(false)

  }, [setFromHome]); 
  
  const features = [
        {
            id:1,heading:"Admin",description:"Manage rooms,food,daily menu,payments",image:"./sheild1.png"
        },
         {
            id:2,heading:"Digital Menu & Billing",description:"Users spent only for what they consumed",image:"./kinfe.png"
        },
        {
            id:3,heading:"Complaint solve",description:"Complaint can send immediately and solve by no delay",image:"./complaint.png"
        },
        
    ]

  return (
    <div className="flex flex-col ">
        <section className=" h-screen grid grid-cols-2 p-5 ">
            <div className="">
                <img src="./hostel-managment2.png" alt="photo" className="rounded-lg h-full " />
            </div>
            <div className="flex  items-center text-3xl font-semibold mx-auto">
                <h2>
                    Manage Your Hostel, Simplyfied
                </h2>
            </div>
        </section>

        <section id="features" className="h-screen flex justify-center items-center bg-accent">
            
            <div className="lg:flex h-1/2 lg:h-auto">
            
                {
                features.map((feature)=>(
                    <Card 
                    type="feature" key={feature.id} heading={feature.heading} description={feature.description} image={feature.image}/>
                ))
            }
            </div>
            
        </section>

        <section id="review" className="h-screen">
            <div className="h-screen flex justify-center items-center ">
                    <div className="lg:flex h-1/2 lg:h-auto">
                        {
                        comments?.data.map((comment)=>(
                            <ViewCommentCard comment={comment}
                            key={comment._id} />
                        ))
                    }
                    </div>
            
            </div>
        </section>
    </div>
  )
}

export default Home