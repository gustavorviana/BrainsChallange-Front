import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import TableLayout from "../components/TableLayout";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { TableTd, TableTh, TableTr } from '../components/tables/TableComponents';

type EEventResponseType = 'Accepted' | 'Declined' | 'Pending' | null;

interface Event {
  id: string;
  name: string;
  date: string;
  status: EEventResponseType;
}

function getStatusText(status: EEventResponseType): string {
  switch (status) {
    case 'Accepted':
      return 'Aceito';
    case 'Declined':
      return 'Recusado';
    case 'Pending':
      return 'Pendente';
    default:
      return 'Pendente';
  }
}

function getStatusColor(status: EEventResponseType): string {
  switch (status) {
    case 'Accepted':
      return 'bg-green-100 text-green-800';
    case 'Declined':
      return 'bg-red-100 text-red-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
}

export default function StudentEvents() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<EEventResponseType>(null);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (startDate) {
      params.append('startDate', new Date(startDate).toISOString());
    }
    if (endDate) {
      params.append('endDate', new Date(endDate).toISOString());
    }
    if (status) {
      params.append('status', status);
    }

    console.log("Buscando eventos com parâmetros:", params.toString());
  };

  const searchSlot = (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Voltar
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data Inicial
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data Final
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status || ""}
            onChange={(e) => setStatus(e.target.value as EEventResponseType || null)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="Accepted">Aceito</option>
            <option value="Declined">Recusado</option>
            <option value="Pending">Pendente</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Pesquisar
          </button>
        </div>
      </div>
    </div>
  );

  // Dados mockados - substituir por dados da API
  const events: Event[] = [
    { id: "1", name: "Evento 1", date: "2025-01-15", status: "Accepted" },
    { id: "2", name: "Evento 2", date: "2025-01-20", status: "Pending" },
  ];

  return (
    <MainLayout>
      <TableLayout 
        title="Eventos do Estudante" 
        description={`Eventos do estudante ID: ${studentId}`}
        searchSlot={searchSlot}
      >
        <table className="relative min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <TableTh>Nome do Evento</TableTh>
              <TableTh>Data</TableTh>
              <TableTh>Status</TableTh>
            </tr>
          </thead>

          <tbody className="bg-white">
            {events.length === 0 ? (
              <TableTr>
                <TableTd colSpan={3} className="text-center py-8 text-gray-500">
                  Nenhum evento encontrado
                </TableTd>
              </TableTr>
            ) : (
              events.map((event) => (
                <TableTr key={event.id} className="even:bg-gray-50">
                  <TableTd>{event.name}</TableTd>
                  <TableTd>{event.date}</TableTd>
                  <TableTd>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}
                    >
                      {getStatusText(event.status)}
                    </span>
                  </TableTd>
                </TableTr>
              ))
            )}
          </tbody>
        </table>
      </TableLayout>
    </MainLayout>
  );
}
