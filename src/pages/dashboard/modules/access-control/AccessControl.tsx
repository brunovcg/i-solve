import Groups from './modules/groups/Groups';
import Users from './modules/users/Users';
import DashboardLayout from '../../layout/DashboardLayout';

export default function AccessControl() {
  const modules = [
    { name: 'Usuários', component: <Users /> },
    { name: 'Grupos', component: <Groups /> },
  ];

  return <DashboardLayout modules={modules} />;
}
