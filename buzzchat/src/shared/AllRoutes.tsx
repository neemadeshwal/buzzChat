import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Auth from "../components/Auth/Auth";
import { Suspense } from "react";

const AllRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:chatId" element={<App />} />,
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
