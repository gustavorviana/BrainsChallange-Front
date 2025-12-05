import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import TableLayout from "../components/TableLayout";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { TableTd, TableTh, TableTr } from '../components/tables/TableComponents';

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const people = [
    { id: "1", name: "João Silva", email: "joao@email.com" },
    { id: "2", name: "Maria Oliveira", email: "maria@email.com" }
  ];

  const handleSearch = () => {
    console.log("Buscando por:", searchTerm);
  };

  const filteredPeople = people.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onViewEvents = (id: string) => {
    navigate(`/students/${id}/events`);
  };

  const searchSlot = (
    <div className="flex gap-2">
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Buscar por nome ou email..."
        />
      </div>
      <button
        type="button"
        onClick={handleSearch}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Pesquisar
      </button>
    </div>
  );

  return (
    <MainLayout>
      <TableLayout 
        title="Estudantes" 
        description="Lista de estudantes da instituição"
        searchSlot={searchSlot}
      >
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
            {filteredPeople.map((person) => (
              <TableTr key={person.id} className="even:bg-gray-50">
                <TableTd>{person.name}</TableTd>
                <TableTd>{person.email}</TableTd>
                <TableTd>05/12/2025</TableTd>
                <TableTd className="pr-4 pl-3 sm:pr-3">
                  <button
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    onClick={() => onViewEvents(person.id)}
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
