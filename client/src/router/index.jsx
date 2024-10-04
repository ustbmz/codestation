import { Route, Routes, Navigate } from "react-router-dom";

// 引入页面
import Issues from '../pages/Issues';
import IssueDeatil from '../pages/IssueDeatil'
import Books from '../pages/Books';
import Interviews from '../pages/Interviews';
import AddIssuePage from '../pages/AddIssue'
import SearchPage from '../pages/SearchPage'
import Personal from '../pages/Personal'

import NotFound from '../components/NotFound'; // 引入 NotFound 组件

function RouteConfig() {
    return (
      <Routes>
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<IssueDeatil />} />
        <Route path="/books" element={<Books />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/addIssue" element={<AddIssuePage />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/Personal" element={<Personal />} />
        <Route path="/" element={<Navigate replace to="/issues" />} />
        <Route path="*" element={<NotFound />} /> {/* 添加 NotFound 路由 */}
      </Routes>
    )
}

export default RouteConfig;
