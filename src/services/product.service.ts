import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_SERVER_URL + "/products";

export const getProducts = async(accessToken: string) => {
    const config = {
        url: `${apiServerUrl}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
}

export const addProduct = async(accessToken: string, body: CreateProductModel) => {
    const config = {
        url: `${apiServerUrl}/create`,
        method: "POST",
        data: body,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
}