import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getUsers,
} from "../api/adminUserApi";

import type {
    AdminUser,
} from "../types/adminUser";


interface UseAdminUsersOptions {
    search: string;
    pageSize?: number;
}


export function useAdminUsers({
    search,
    pageSize = 20,
}: UseAdminUsersOptions) {

    const [users, setUsers] =
        useState<AdminUser[]>([]);

    const [totalCount, setTotalCount] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);


    const fetchUsers =
        useCallback(async () => {

            try {

                setLoading(true);
                setError(null);

                const result =
                    await getUsers(
                        search,
                        currentPage,
                        pageSize
                    );

                setUsers(result.users);

                setTotalCount(
                    result.totalCount
                );

                setTotalPages(
                    result.totalPages
                );

            } catch {

                setError(
                    "Failed to load users."
                );

            } finally {

                setLoading(false);
            }

        }, [
            search,
            currentPage,
            pageSize,
        ]);


    useEffect(() => {

        void fetchUsers();

    }, [fetchUsers]);


    return {
        users,

        totalCount,
        totalPages,

        currentPage,
        setCurrentPage,

        loading,
        error,

        refetch: fetchUsers,
    };
}

