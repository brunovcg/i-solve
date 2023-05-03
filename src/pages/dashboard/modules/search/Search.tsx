import DashboardLayout from '../../layout/DashboardLayout';
import Entregas from './modules/Entregas';
import Vendas from './modules/Vendas';

export default function ProcessRunner() {
  const modules = [
    { name: 'Entregas', component: <Entregas /> },
    { name: 'Vendas', component: <Vendas /> },
  ];
  return <DashboardLayout modules={modules} />;
}
