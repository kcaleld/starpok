import { useState, useEffect } from 'react';

type Error = {
    message: string;
}

const useApi = <T extends unknown>(baseUrl: string, endpoint: string): [T | null, boolean, Error | null] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            let nextUrl = `${baseUrl}${endpoint}`;

            setLoading(true);

            try {
                const response = await fetch(nextUrl);
                const data = await response.json();
                setData(data.results || data);
            } catch (err) {
                const errorObj: Error = new Error('Failed to fetch data from Star Wars API');
                setError(errorObj);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [baseUrl, endpoint]);

    return [data, loading, error];
};

export default useApi;