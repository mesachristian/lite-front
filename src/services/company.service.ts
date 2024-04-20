import { callExternalApi } from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_SERVER_URL + "/company";

export const getCompanies = async(accessToken: string) => {
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

export const getCompaniesWithProducts = async(accessToken: string) => {
    const config = {
        url: `${apiServerUrl}/get-all`,
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

export const addCompany = async(accessToken: string, body: CompanyModel) => {
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

export const updateCompany = async(accessToken: string, body: CompanyModel) => {
    const config = {
        url: `${apiServerUrl}/update/${body.nit}`,
        method: "PUT",
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

export const deleteCompany = async(accessToken: string, nit: string) => {
    const config = {
        url: `${apiServerUrl}/${nit}`,
        method: "DELETE",
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