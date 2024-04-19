import { Box, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LoadingComponent } from "../../components";
import { getProducts } from "../../services/product.service";

const ProductsPage = () => {

    const [products, setProducts] = useState<ProductModel[] | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { accessToken, role } = useSelector((state: RootState) => state.auth.authData);

    const loadInitData = async () => {
        const { data, error } = await getProducts(accessToken);
        
        if(data){
            setProducts(data);
        }

        if(error){
            console.log(error);
        }
    }

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        loadInitData().catch(console.log);
    }, []);
    
    if (products == null) {
        return <LoadingComponent />
    }

    return (
        <Box sx={{ padding: '2rem' }}>
            <h2>Productos</h2>

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
                        <th scope="col">Código</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Características</th>
                        <th scope="col">Precio en varias monedas.</th>
                        <th scope="col">Empresa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((p) => {
                            return (
                                <tr key={p.code}>
                                    <td scope="row">{p.code}</td>
                                    <td>{p.name}</td>
                                    <td>{p.characteristics}</td>
                                    <td>
                                        {p.price.join("-")}
                                    </td>
                                    <td>{p.companyName}</td>
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