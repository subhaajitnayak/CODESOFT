import ProtectedRoute from "./components/auths/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/component/Home'
import Login from "./components/auths/Login";
import Register from "./components/auths/Register";
import AdminDashboard from "./components/component/AdminDashboard";
import AdminCreateQuiz from "./components/component/AdminCreateQuiz";
import AdminUsers from "./components/component/AdminUsers";
import AdminAttempts from "./components/component/AdminAttempts";
import UserProfile from "./components/component/UserProfile";
import ResultComponent from "./components/component/ResultComponent";
import QuizComponent from "./components/component/QuizComponent";
import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/Quiz",
        element: (
            <ProtectedRoute>
                <QuizComponent />
            </ProtectedRoute>
        ),
    },
    {
        path: "/Result",
        element: (
            <ProtectedRoute>
                <ResultComponent />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/create-quiz",
        element: (
            <ProtectedRoute>
                <AdminCreateQuiz />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/users",
        element: (
            <ProtectedRoute>
                <AdminUsers />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin/attempts",
        element: (
            <ProtectedRoute>
                <AdminAttempts />
            </ProtectedRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <UserProfile />
            </ProtectedRoute>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;