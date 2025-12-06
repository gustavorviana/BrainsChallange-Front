import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layouts/MainLayout";
import TableLayout from "@/components/TableLayout";
import Pagination from "@/components/Pagination";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { eventsService, EEventResponseType } from "@/services/events.service";
import type { StudentEventResponse } from "@/services/types/event.types";
import { TableTd, TableTh, TableTr } from '@/components/tables/TableComponents';

function getStatusText(status: string | null): string {
  if (!status) return 'Não respondido';
  
  switch (status) {
    case EEventResponseType.Accepted:
      return 'Aceito';
    case EEventResponseType.Declined:
      return 'Recusado';
    case EEventResponseType.TentativelyAccepted:
      return 'Aceito com ressalvas';
    case EEventResponseType.Organizer:
      return 'Organizador';
    case EEventResponseType.NotResponded:
      return 'Não respondido';
    default:
      return 'Não respondido';
  }
}

function getStatusColor(status: string | null): string {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  switch (status) {
    case EEventResponseType.Accepted:
      return 'bg-green-100 text-green-800';
    case EEventResponseType.Declined:
      return 'bg-red-100 text-red-800';
    case EEventResponseType.TentativelyAccepted:
      return 'bg-yellow-100 text-yellow-800';
    case EEventResponseType.Organizer:
      return 'bg-blue-100 text-blue-800';
    case EEventResponseType.NotResponded:
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function StudentEvents() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<EEventResponseType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<StudentEventResponse[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadEvents = async (page: number = 1) => {
    if (!studentId) return;

    setIsLoading(true);
    try {
      const params: {
        page?: number;
        studentId?: string;
        startDate?: string;
        endDate?: string;
        status?: EEventResponseType;
      } = {
        page,
        studentId,
      };

      if (startDate) {
        params.startDate = new Date(startDate).toISOString();
      }
      if (endDate) {
        params.endDate = new Date(endDate).toISOString();
      }
      if (status) {
        params.status = status;
      }

      const response = await eventsService.getStudentEvents(params);
      setEvents(response.items || []);
      setTotalPages(response.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents(1);
  }, [studentId]);

  const handleSearch = () => {
    loadEvents(1);
  };

  const handlePageChange = (page: number) => {
    loadEvents(page);
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
            <option value={EEventResponseType.Accepted}>Aceito</option>
            <option value={EEventResponseType.Declined}>Recusado</option>
            <option value={EEventResponseType.TentativelyAccepted}>Aceito com ressalvas</option>
            <option value={EEventResponseType.Organizer}>Organizador</option>
            <option value={EEventResponseType.NotResponded}>Não respondido</option>
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

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
              <TableTh>Data Início</TableTh>
              <TableTh>Data Fim</TableTh>
              <TableTh>Status</TableTh>
            </tr>
          </thead>

          <tbody className="bg-white">
            {isLoading ? (
              <TableTr>
                <TableTd colSpan={4} className="text-center py-8 text-gray-500">
                  Carregando...
                </TableTd>
              </TableTr>
            ) : events.length === 0 ? (
              <TableTr>
                <TableTd colSpan={4} className="text-center py-8 text-gray-500">
                  Nenhum evento encontrado
                </TableTd>
              </TableTr>
            ) : (
              events.map((event) => (
                <TableTr key={event.id} className="even:bg-gray-50">
                  <TableTd>{event.subject || '-'}</TableTd>
                  <TableTd>{formatDate(event.start)}</TableTd>
                  <TableTd>{formatDate(event.end)}</TableTd>
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
        {!isLoading && events.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </TableLayout>
    </MainLayout>
  );
}
