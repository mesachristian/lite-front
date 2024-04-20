import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getCompaniesWithProducts } from "../../services/company.service";
import { LoadingComponent } from "../../components";

const InventoryPage = () => {

    const [companies, setCompanies] = useState<any[] | null>(null);

    const { accessToken } = useSelector((state: RootState) => state.auth.authData);

    const loadInitData = async () => {
        const { data } = await getCompaniesWithProducts(accessToken);
        setCompanies(data);
    }

    useEffect(() => {
        loadInitData().catch(console.log);
    }, []);

    if (companies == null) {
        return <LoadingComponent />
    }

    return (
        <Box sx={{ padding: '2rem' }}>
            <h2>Invetario</h2>

            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary" onClick={() => { }}>
                    <AddIcon /> Descargar pdf
                </button>

                <button type="button" className="btn btn-primary" style={{ marginLeft: 10 }} onClick={() => { }}>
                    <AddIcon /> Enviar email
                </button>
            </div>

            {
                companies.map((c) => {
                    return (
                        <div style={{ marginTop: 20 }}>
                            <h3>{c.name}</h3>

                            <table className="table table-striped mt-5">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Código</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Características</th>
                                        <th scope="col">Precio en varias monedas.</th>
                                        <th scope="col">Empresa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        c.products.map((p: any) => {
                                            return (
                                                <tr key={p.code}>
                                                    <td scope="row">{p.code}</td>
                                                    <td>{p.name}</td>
                                                    <td>{p.characteristics}</td>
                                                    <td>
                                                        {p.prices}
                                                    </td>
                                                    <td>{p.companyName}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    );
                })
            }
        </Box>
    );
}

export default InventoryPage;