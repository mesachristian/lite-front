import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { addProduct } from "../services/product.service";
import { CircularProgress } from "@mui/material";
import { getCompanies } from "../services/company.service";
import Select from "react-select"

interface AddProductModalProps {
    onSuccess: () => void;
}

interface IForm{
    name: string;
    characteristics: string;
    prices: string;
    companyNitPair: { label: string; value: string };
}

const AddProductModal = ({ onSuccess }: AddProductModalProps) => {

    const [companies, setCompanies] = useState<any[]>([]);

    const { register, control, handleSubmit } = useForm<IForm>();

    const [loadingForm, setLoadingForm] = useState(false);

    const accessToken = useSelector((state: RootState) => state.auth.authData?.accessToken);

    const onSubmit: SubmitHandler<IForm> = async (body: IForm) => {

        setLoadingForm(true);

        let rb = {...body, companyNit: body.companyNitPair.value };

        const { error } = await addProduct(accessToken, rb);

        if (error == null) {
            onSuccess();
        }

    }

    const loadInitData = async () => {
        const { data } = await getCompanies(accessToken);

        if (data) {
            const x = data.map((m: any) => {
                return { value: m.nit, label: m.name }
            });
            setCompanies(x);
        }
    }

    useEffect(() => {
        loadInitData().catch(console.log);
    }, []);

    return (
        <div className="p-4 bg-body position-absolute top-50 start-50 translate-middle w-50 rounded">
            <h3>Nuevo Producto</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3 mt-5">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Nombre: </span>
                    </div>

                    <Controller
                        name="name"
                        control={control}
                        render={() => <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            aria-label="Nombre"
                            aria-describedby="basic-addon1"
                            {...register('name', {})}
                        />}
                    />
                </div>

                <div className="input-group mb-3 mt-1 block">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon2">Caracteristicas: </span>
                    </div>

                    <Controller
                        name="characteristics"
                        control={control}
                        render={() => <input
                            type="text"
                            className="form-control"
                            placeholder="Caracteristicas"
                            aria-label="Caracteristicas"
                            aria-describedby="basic-addon2"
                            {...register('characteristics', {})}
                        />}
                    />
                </div>

                <div className="input-group mb-3 mt-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="cf-address">Precios: </span>
                    </div>

                    <Controller
                        name="prices"
                        control={control}
                        render={() => <input
                            type="text"
                            className="form-control"
                            placeholder="Precios (separalos por ';' ) Ex: 1 USD; 3800 COP"
                            aria-label="Prices"
                            aria-describedby="cf-address"
                            {...register('prices', {})}
                        />}
                    />


                </div>

                <div className="input-group mb-3 mt-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="cf-address">Empresa: </span>
                    </div>
                    <Controller
                        name="companyNitPair"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={companies}
                            />
                        )}
                    />
                </div>

                <button type="submit" className="btn btn-success w-100 mt-5">
                    {
                        loadingForm && <CircularProgress color="inherit" size="1rem" />
                    }
                    {
                        !loadingForm && 'Agregar Producto'
                    }
                </button>
            </form>
        </div>
    );
}

export default AddProductModal;