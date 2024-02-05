import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/shared/layout';
import HomePage from '@/pages/home';
import useUserInfo from '@/features/user/hooks/use-user-info.tsx';
import InfoPage from '@/pages/info';
import SingleEmployeePage from '@/pages/single-employee';
import LoginPage from '@/pages/login';
import RequiredAuth from '@/features/auth/components/required-auth';
import ChiefHome from '@/features/user/components/chief-home';
import EmployeeHome from '@/features/user/components/employee-home';
import TemplatePage from '@/pages/template';
import EditTaskPage from '@/pages/edit-task';
import SingleTaskPage from '@/pages/single-task';
import CreateTaskPage from '@/pages/create-task';
import SingleTemplate from '@/pages/single-template';
import CreateTemplate from '@/pages/create-template';

function App() {
  const { token } = useUserInfo();

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route element={<RequiredAuth />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="info" element={<InfoPage />} />

          <Route path="pdp">
            <Route index element={<EmployeeHome />} />
            <Route path=":id/tasks/:id" element={<SingleTaskPage />} />
            <Route path=":id/tasks/create" element={<CreateTaskPage />} />
            <Route path=":id/tasks/:id/edit" element={<EditTaskPage />} />
          </Route>

          <Route path="template">
            <Route index element={<TemplatePage />} />
            <Route path="create" element={<CreateTemplate />} />
            <Route path=":id" element={<SingleTemplate />} />
          </Route>

          <Route path="employees">
            <Route index element={<ChiefHome />} />
            <Route path=":id/tasks" element={<SingleEmployeePage />} />
            <Route path=":id/tasks/:id" element={<SingleTaskPage />} />
            <Route path=":id/tasks/create" element={<CreateTaskPage />} />
            <Route path=":id/tasks/:id/edit" element={<EditTaskPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
