import { useState, useCallback } from 'react';
 
export function useApi() {
    const [data, setData] = useState(null);     // success payload
    const [message, setMessage] = useState(null);  // success message
    const [error, setError] = useState(null);   // error message (if any)
    const [loading, setLoading] = useState(false);
 
    /**
     * doRequest is the function to call in your components.
     * e.g. doRequest({ url: '/api/lehrbetriebe', method: 'GET' })
     */
    const doRequest = useCallback(
        async ({ url, method = 'GET', body = null, headers = {} }) => {
            setLoading(true);
            setError(null);
            setMessage(null);
            setData(null);
 
            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers,
                    },
                    body: body ? JSON.stringify(body) : null,
                });
 
                // If HTTP status not 2xx, parse what the server sent
                if (!response.ok) {
                    const errorJson = await response.json().catch(() => null);
                    const errorMsg =
                        (errorJson?.message) ||
                        `${response.status} | Unerwarteter Fehler beim Laden der Daten.`;
                    const error = errorJson?.data || "Unerwarteter Fehler beim Laden der Daten.";
 
                    console.log('doRequest error:', errorMsg);
                    console.log('doRequest errorJson:', errorJson);
                    console.log('doRequest error:', error);
                   
                    setError([error.error] || ['Der Server hat einen Fehler gemeldet.']);
                    return { success: false, error: errorMsg };
                }
 
                // On success status, parse
                const json = await response.json();
                // Expected: { status, message, data }
                const { status, message, data } = json;
 
                // If "status" is "error" in JSON, treat it as an error
                if (status === 'error') {
                    const errorMsg = message || 'Der Server hat einen Fehler gemeldet.';
                    console.log('doRequest error:', errorMsg);
                    setError(data || ['Der Server hat einen Fehler gemeldet.']);
                    return { success: false, error: errorMsg };
                }
 
                // Otherwise, "success"
                setMessage(message);
                setData(data);
 
                return { success: true, data };
            } catch (err) {
                // Network or unexpected error
                const errorMsg = err.message || 'Unknown network error';
                console.log('doRequest error:', errorMsg);                
                setError(['Ein unbekannter Fehler ist aufgetreten.']);
                return { success: false, error: errorMsg };
            } finally {
                setLoading(false);
            }
        },
        []
    );
 
    return { data, message, error, loading, doRequest };
}