import { createHashRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout/RootLayout";
import { UsersPage } from "../pages/UsersPage/UsersPage";
import { UserEditPage } from "../pages/UserEditPage/UserEditPage";

export const router = createHashRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <UsersPage /> },
            { path: "users/:userId/edit", element: <UserEditPage /> },
        ],
    },
]);
