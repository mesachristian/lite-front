import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { AddCompanyModal, LoadingComponent } from "../../components";
import { deleteCompany, getCompanies } from "../../services/company.service";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const CompanyPage = () => {

    const [companies, setCompanies] = useState<CompanyModel[] | null>(null);
    const [pickedCompany, setPickedCompany] = useState<CompanyModel | null>(null);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const { accessToken, role } = useSelector((state: RootState) => state.auth.authData);

    const handleOpenModal = () => {
        setPickedCompany(null);
        setOpenModal(true)
    };
    const handleCloseModal = () => setOpenModal(false);

    const handleOnSuccesCreate = async () => {
        setOpenModal(false);
        setCompanies(null);
        await loadInitData();
    }

    const handleDeleteCompany = async (nit: string) => {
        const { error } = await deleteCompany(accessToken, nit);

        if (error == null) {
            await loadInitData();
        }
    }

    const handleEditCompany = async (c: CompanyModel) => {
        setPickedCompany(c);
        setOpenModal(true);
    }

    const loadInitData = async () => {
        const { data, error } = await getCompanies(accessToken);
        if (data) {
            setCompanies(data);
        } else {
            console.log(error);
        }
    }

    useEffect(() => {
        loadInitData().catch(console.log)
    }, []);

    if (companies == null) {
        return <LoadingComponent />
    }

    return (
        <Box sx={{ padding: '2rem' }}>
            <h2>Empresas</h2>

            <div className="d-flex justify-content-end">
                {
                    role == 'ADMIN' &&
                    <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
                        <AddIcon /> Agregar
                    </button>
                }
            </div>

            <table className="table table-striped mt-5">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">NIT</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        companies.map((c) => {
                            return (
                                <tr key={c.nit}>
                                    <td scope="row">{c.nit}</td>
                                    <td>{c.name}</td>
                                    <td>{c.address}</td>
                                    <td>{c.phone}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEditCompany(c)}
                                            type="button"
                                            className="btn btn-info"
                                            style={{ fontSize: 17, marginRight: 7, color: '#f8f8f8' }}
                                        >
                                            <ModeEditRoundedIcon fontSize="inherit" color="inherit" />
                                        </button>
                                        <button type="button" className="btn btn-danger" style={{ fontSize: 17 }} onClick={() => handleDeleteCompany(c.nit)}>
                                            <DeleteRoundedIcon fontSize="inherit" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
            >
                <Box>
                    <AddCompanyModal companyInfo={pickedCompany} onSuccess={handleOnSuccesCreate} />
                </Box>

            </Modal>
        </Box>
    );
}

export default CompanyPage;