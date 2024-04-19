import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_SERVER_URL + "/auth";

export const sigIn = async(email: string, password: string) => {
    const config = {
        url: `${apiServerUrl}/login`,
        method: "POST",
        data: { email, password },
        headers: {
            "content-type": "application/json",
        }
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
}