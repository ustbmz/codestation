import { Route, Routes, Navigate } from "react-router-dom";

// 引入页面
import Issues from '../pages/Issues';
import Books from '../pages/Books';
import Interviews from '../pages/Interviews';
import AddIssuePage from '../pages/AddIssue'


function RouteConfig() {
    return (
      <Routes>
        <Route path="/issues" element={<Issues />} />
        <Route path="/books" element={<Books />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/addIssue" element={<AddIssuePage />} />
        <Route path="/" element={<Navigate replace to="/issues" />} />
      </Routes>
    )
}

export default RouteConfig;
