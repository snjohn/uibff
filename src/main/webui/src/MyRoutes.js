/*
Ref: https://hygraph.com/blog/routing-in-react
MyRoutes is used in App.js
*/
import { Route, Routes } from 'react-router-dom';
import React from 'react';

export const MyRoutes = () => {
    const Dashboard = React.lazy(() => import('./components/Dashboard'));
    const FormLayoutDemo = React.lazy(() => import('./components/FormLayoutDemo'));
    const InputDemo = React.lazy(() => import('./components/InputDemo'));
    const FloatLabelDemo = React.lazy(() => import('./components/FloatLabelDemo'));
    const InvalidStateDemo = React.lazy(() => import('./components/InvalidStateDemo'));
    const ButtonDemo = React.lazy(() => import('./components/ButtonDemo'));
    const TableDemo = React.lazy(() => import('./components/TableDemo'));
    const ListDemo = React.lazy(() => import('./components/ListDemo'));
    const TreeDemo = React.lazy(() => import('./components/TreeDemo'));
    const PanelDemo = React.lazy(() => import('./components/PanelDemo'));
    const RequestListDemo = React.lazy(() => import('./components/RequestListDemo'));
    const TaskListDemo = React.lazy(() => import('./components/TaskListDemo'));
    const MyDashboardDemo = React.lazy(() => import('./components/MyDashboardDemo'));
    const MyUserListDemo = React.lazy(() => import('./components/MyUserListDemo'));
    const MyCommonCrud = React.lazy(() => import('./components/MyCommonCrud'));
    const OverlayDemo = React.lazy(() => import('./components/OverlayDemo'));
    const MediaDemo = React.lazy(() => import('./components/MediaDemo'));
    const MenuDemo = React.lazy(() => import('./components/MenuDemo'));
    const MessagesDemo = React.lazy(() => import('./components/MessagesDemo'));
    const FileDemo = React.lazy(() => import('./components/FileDemo'));
    const ChartDemo = React.lazy(() => import('./components/ChartDemo'));
    const MiscDemo = React.lazy(() => import('./components/MiscDemo'));
    const Documentation = React.lazy(() => import('./components/Documentation'));
    const IconsDemo = React.lazy(() => import('./utilities/IconsDemo'));
    const BlocksDemo = React.lazy(() => import('./components/BlocksDemo'));
    const CrudDemo = React.lazy(() => import('./pages/CrudDemo'));
    const CalendarDemo = React.lazy(() => import('./pages/CalendarDemo'));
    const TimelineDemo = React.lazy(() => import('./pages/TimelineDemo'));
    const Invoice = React.lazy(() => import('./pages/Invoice'));
    const Help = React.lazy(() => import('./pages/Help'));
    const EmptyPage = React.lazy(() => import('./pages/EmptyPage'));

    return(
        <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/formlayout" element={<FormLayoutDemo />} />
                <Route path="/input" element={<InputDemo />} />
                <Route path="/floatlabel" element={<FloatLabelDemo />} />
                <Route path="/invalidstate" element={<InvalidStateDemo />} />
                <Route path="/button" element={<ButtonDemo />} />
                <Route path="/table" element={<TableDemo />} />
                <Route path="/list" element={<ListDemo />} />
                <Route path="/tree" element={<TreeDemo />} />
                <Route path="/panel" element={<PanelDemo />} />
                <Route path="/requestlist" element={<RequestListDemo />} />
                <Route path="/tasklist" element={<TaskListDemo />} />
                <Route path="/mydashboard" element={<MyDashboardDemo />} />
                <Route path="/myuserlist" element={<MyUserListDemo />} />
                <Route path="/mycommoncrud" element={<MyCommonCrud />} />
                <Route path="/overlay" element={<OverlayDemo />} />
                <Route path="/media" element={<MediaDemo />} />
                <Route path="/menu/*" element={<MenuDemo />} />
                <Route path="/messages" element={<MessagesDemo />} />
                <Route path="/file" element={<FileDemo />} />
                <Route path="/chart" element={<ChartDemo />} />
                <Route path="/blocks" element={<BlocksDemo />} />
                <Route path="/misc" element={<MiscDemo />} />
                <Route path="/icons" element={<IconsDemo />} />
                <Route path="/crud" element={<CrudDemo />} />
                <Route path="/timeline" element={<TimelineDemo />} />
                <Route path="/calendar" element={<CalendarDemo />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/help" element={<Help />} />
                <Route path="/empty" element={<EmptyPage />} />
                <Route path="/documentation" element={<Documentation />} />
            </Routes>
        </React.Suspense>
    )
}
export default MyRoutes;