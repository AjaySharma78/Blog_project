import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout} from './components/index.js'
import Verify from './pages/Verify'
import Login from './pages/Login'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Error from "./pages/Error";
import Post from "./pages/Post";
import TermsCondition from "./pages/TermsCondition";
import AllPosts from "./pages/AllPosts";
import Contact from './pages/Contact.jsx'
import { ThemeProvider } from '@material-tailwind/react'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
         path:"verify-email",
         element:<Verify/>
        },
        {
path: "/privacy-policy",
element: <TermsCondition />,
        },
        {
        path:"/contact",
        element:<Contact/>
        },

        {
            path: "*",
            element:<Error/>
        }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
