import { Slot } from 'expo-router';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function HomeLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Slot />
        </QueryClientProvider>
    )

}