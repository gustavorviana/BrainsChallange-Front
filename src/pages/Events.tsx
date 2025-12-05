import { useParams, Link } from 'react-router-dom'
import MainLayout from '../components/Layouts/MainLayout'
import TableLayout from '../components/TableLayout'
import { TableTd, TableTh, TableTr } from '../components/tables/TableComponents'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface Event {
	id: string
	title: string
	description: string
	date: string
	status: string
}

export default function Events() {
	const { studentId } = useParams<{ studentId: string }>()

	// Dados mockados - em produção viriam de uma API
	const events: Event[] = [
		{
			id: '1',
			title: 'Workshop de Programação',
			description: 'Workshop sobre fundamentos de programação',
			date: '15/12/2025',
			status: 'Confirmado'
		},
		{
			id: '2',
			title: 'Palestra sobre IA',
			description: 'Introdução à Inteligência Artificial',
			date: '20/12/2025',
			status: 'Pendente'
		},
		{
			id: '3',
			title: 'Hackathon',
			description: 'Competição de desenvolvimento',
			date: '25/12/2025',
			status: 'Confirmado'
		}
	]

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Confirmado':
				return 'bg-green-100 text-green-800'
			case 'Pendente':
				return 'bg-yellow-100 text-yellow-800'
			case 'Cancelado':
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<MainLayout>
			<TableLayout
				title="Eventos do Estudante"
				description={`Lista de eventos relacionados ao estudante ID: ${studentId || 'N/A'}`}
			>
				<table className="relative min-w-full divide-y divide-gray-300">
					<thead>
						<tr>
							<TableTh>Título</TableTh>
							<TableTh>Descrição</TableTh>
							<TableTh>Data</TableTh>
							<TableTh>Status</TableTh>
						</tr>
					</thead>

					<tbody className="bg-white">
						{events.map((event) => (
							<TableTr key={event.id} className="even:bg-gray-50">
								<TableTd>{event.title}</TableTd>
								<TableTd>{event.description}</TableTd>
								<TableTd>{event.date}</TableTd>
								<TableTd>
									<span
										className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(event.status)}`}
									>
										{event.status}
									</span>
								</TableTd>
							</TableTr>
						))}
					</tbody>
				</table>
			</TableLayout>
		</MainLayout>
	)
}

