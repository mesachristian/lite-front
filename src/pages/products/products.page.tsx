import { Box, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LoadingComponent } from "../../components";

const ProductsPage = () => {

    const [products, setProducts] = useState<CompanyModel[] | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const {accessToken, role} = useSelector((state: RootState) => state.auth.authData);

    const loadInitData = async () => {
        console.log(accessToken, role)
        setProducts([]);
    }

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    useEffect( () => {
        loadInitData().catch(console.log);
    },[]);
    if (products == null) {
        return <LoadingComponent />
    }

    return(
        <Box sx={{ padding: '2rem' }}>
            <h2>Empresas</h2>

            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
                    <AddIcon /> Agregar
                </button>
            </div>

            <table className="table table-striped mt-5">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">NIT</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((c) => {
                            return (
                                <tr key={c.nit}>
                                    <td scope="row">{c.nit}</td>
                                    <td>{c.name}</td>
                                    <td>{c.address}</td>
                                    <td>{c.phone}</td>
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
                    <h3>Hola</h3>
                </Box>
                
            </Modal>
        </Box>
    );
}

export default ProductsPage;