import { ReactNode } from 'react';
import { cn } from '../../utils/tailwindUtils';

interface TableBaseComponentProps {
    children?: ReactNode;
    className?: string;
}

export function TableTr(props: TableBaseComponentProps) {
    return (<tr className={cn("even:bg-gray-50", props.className)}>
        {props.children}
    </tr>);
}

export function TableTh(props: TableBaseComponentProps) {
    return (<th scope="col" className={cn('px-3 py-3.5 text-left text-sm font-semibold text-gray-900', props.className)}>
        {props.children}
    </th>);
}

export function TableTd(props: TableBaseComponentProps) {
    return (<td className={cn("px-3 py-4 text-sm whitespace-nowrap text-gray-500", props.className)}>
        {props.children}
    </td>);
}
