import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import TableLayout from "../components/TableLayout";
import Pagination from "../components/Pagination";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { studentsService } from "../services/students.service";
import type { StudentResponse } from "../services/types/student.types";
import { formatDateBr } from '../utils/dateUtils';
import { TableTd, TableTh, TableTr } from '../components/tables/TableComponents';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadStudents = async (page: number = 1, search?: string) => {
    setIsLoading(true);
    try {
      const response = await studentsService.getStudents({
        page,
        search: search || undefined,
      });
      setStudents(response.items || []);
      setTotalPages(response.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro ao carregar estudantes:", error);
      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents(1);
  }, []);

  const handleSearch = () => {
    loadStudents(1, searchTerm);
  };

  const handlePageChange = (page: number) => {
    loadStudents(page, searchTerm);
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
            {isLoading ? (
              <TableTr>
                <TableTd colSpan={4} className="text-center py-8 text-gray-500">
                  Carregando...
                </TableTd>
              </TableTr>
            ) : students.length === 0 ? (
              <TableTr>
                <TableTd colSpan={4} className="text-center py-8 text-gray-500">
                  Nenhum estudante encontrado
                </TableTd>
              </TableTr>
            ) : (
              students.map((student) => (
                <TableTr key={student.id} className="even:bg-gray-50">
                  <TableTd>{student.name || '-'}</TableTd>
                  <TableTd>{student.email || '-'}</TableTd>
                  <TableTd>{formatDateBr(student.createdAt)}</TableTd>
                  <TableTd className="pr-4 pl-3 sm:pr-3">
                    <Link
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      to={`/students/${student.id}/events`}
                    >
                      Ver eventos
                    </Link>
                  </TableTd>
                </TableTr>
              ))
            )}
          </tbody>
        </table>
        {!isLoading && students.length > 0 && (
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
