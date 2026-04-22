import { createBrowserRouter } from "react-router-dom";
import Body from "./Body";
import Login from "./pages/Login";
import  Home  from "./pages/Home";
import AdminDashBoardLayout from "./AdminDashBoardLayout";
import Room from "./pages/Room";
import AddMenuItems from "./pages/AddMenuItems";
import DailyMenu from "./pages/DailyMenu";
import Complaints from "./pages/Complaints";
import UserDashBoardLayout from "./UserDashBoardLayout";
import UserHome from "./pages/UserHome";
import UserMenuSelect from "./pages/UserMenuSelect";
import MenuOverview from "./pages/MenuOverview";
import UserComplaint from "./pages/UserComplaint";
import AdminHome from "./pages/AdminHome";
import ShowUsers from "./pages/ShowUsers";
import ProtectedRoute from "./ProtectedRoute";
import AddGroceries from "./pages/AddGroceries";
import CookDashboard from "./pages/CookDashboard";
import CookDashboardLayout from "./CookDashboardLayout";
import CookViewDailyMenu from "./pages/CookViewDailyMenu";
import AddComment from "./pages/AddComment";


export const Layout = createBrowserRouter([

    {
         path:"/",
         element:<Body/>,
         children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"login",element:<Login/>
            }
         ]
    },

    {
          element:<ProtectedRoute/>,
          children:[
            {
            path:"/admin",
            element:<AdminDashBoardLayout/>,
            children:[
                {
                    index:true,
                    element:<AdminHome/>
                },
                {   
                    path:"Room",
                    element:<Room/>
                },
                {
                    path:"users",
                    element:<ShowUsers/>
                },
                {
                    path:"addMenu",
                    element:<AddMenuItems/>
                },
                {
                    path:"add-Daily-Menu",
                    element:<DailyMenu/>
                },
                {
                    path:"complaints",
                    element:<Complaints/>
                },
                {
                    path:"addGroceries",
                    element:<AddGroceries/>
                }              
            ]
            }
          ]
    },

     {
           element:<ProtectedRoute/>,
           children:[
            {
            path:"/user",
            element:<UserDashBoardLayout/>,
            children:[
                {   
                    index:true,
                    element:<UserHome/>
                },
                {
                    path:"selectDailyMenu",
                    element:<UserMenuSelect/>
                },
                {
                    path:"menuOverview",
                    element:<MenuOverview/>
                },
                 {
                    path:"complaint",
                    element:<UserComplaint/>
                },
                {
                    path:"comment",
                    element:<AddComment/>
                }
                             
            ]
            }
           ]
    },

    {
        element:<ProtectedRoute/>,
        children:[
             {   
                    path:"/cook",
                    element:<CookDashboardLayout/>,
                    children:[
                        {
                            index:true,
                            element:<CookDashboard/>
                        },
                        {
                            path:"viewDailyMenu",
                            element:<CookViewDailyMenu/>
                        }
                    ]
                }
        ]

    }


])