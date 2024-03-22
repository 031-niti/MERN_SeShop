import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "../hook/useAxiosSecure"
import useAuth from './useAuth';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading = [] } = useQuery({
        queryKey: ["isAdmin", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            return res.data.isAdmin;
        }
    })
    return [isAdmin, isAdminLoading]
}

export default useAdmin