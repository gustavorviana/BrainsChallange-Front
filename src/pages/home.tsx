import MainLayout from "../components/Layouts/MainLayout";
import TableLayout from "../components/TableLayout";

import { TableTd, TableTh, TableTr } from '../components/tables/TableComponents';

export default function Home() {
  const people = [
    { id: "1", name: "João Silva", email: "joao@email.com" },
    { id: "2", name: "Maria Oliveira", email: "maria@email.com" }
  ];

  const onEdit = (id: string) => {
    console.log("Editar usuário:", id);
  };

  return (
    <MainLayout>
      <TableLayout title="Estudantes" description="Lista de estudantes da instituição">
        <table className="relative min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <TableTh>Nome</TableTh>
              <TableTh>E-mail</TableTh>
              <TableTh>Data de cadastro</TableTh>
              <TableTh>Ações</TableTh>
            </tr>
          </thead>

          <tbody className="bg-white">
            {people.map((person) => (
              <TableTr key={person.id} className="even:bg-gray-50">
                <TableTd>{person.name}</TableTd>
                <TableTd>{person.email}</TableTd>
                <TableTd>05/12/2025</TableTd>
                <TableTd className="pr-4 pl-3 sm:pr-3">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    onClick={() => onEdit(person.id)}
                  >
                    Ver eventos
                  </button>
                </TableTd>
              </TableTr>
            ))}
          </tbody>
        </table>
      </TableLayout>
    </MainLayout>
  );
}
