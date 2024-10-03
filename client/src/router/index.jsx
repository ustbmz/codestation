import { Route, Routes, Navigate } from "react-router-dom";

// 引入页面
import Issues from '../pages/Issues';
import IssueDeatil from '../pages/IssueDeatil'
import Books from '../pages/Books';
import Interviews from '../pages/Interviews';
import AddIssuePage from '../pages/AddIssue'
import SearchPage from '../pages/SearchPage'


function RouteConfig() {
    return (
      <Routes>
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<IssueDeatil />} />
        <Route path="/books" element={<Books />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/addIssue" element={<AddIssuePage />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/" element={<Navigate replace to="/issues" />} />
      </Routes>
    )
}

export default RouteConfig;
