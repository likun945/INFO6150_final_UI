import { useState } from 'react';
import { backend_url } from '../config';
const useRequest = (url, options = {}) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const request = async (body = null, params) => {
        setIsLoading(true);
        setError(null);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const defaultUrl = `${backend_url}/api`;
        let paramsStr = '?'
        for( let i in params) {
            paramsStr += `${i}=${params[i]}`
        }
        const paramsUrl = paramsStr.length > 1 ? url + paramsStr : url
        try {
            const response = await fetch(defaultUrl + paramsUrl, {
                ...options,
                headers: { ...defaultHeaders, ...options.headers },
                body: body ? JSON.stringify(body) : null,
            });

            if (!response.ok) {
                const errorBody = await response.json();
                const error = new Error(errorBody.message || 'Network response was not ok');
                error.status = response.status; // 添加状态码到错误对象
                throw error;
            }
            const result = await response.json();
            setIsLoading(false);
            return result; // Return the data directly
        } catch (err) {
            console.log(err)
            setError(err);
            setIsLoading(false);
            throw err; // Rethrow the error so it can be caught by the caller
        }
    };
    
    return { error, isLoading, request };
};

export default useRequest;
