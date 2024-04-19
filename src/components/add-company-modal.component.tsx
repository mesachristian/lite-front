import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { addCompany, updateCompany } from "../services/company.service";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface AddCompanyModalProps {
    companyInfo: CompanyModel | null;
    onSuccess: () => void;
}

const AddCompanyModal = ({ companyInfo, onSuccess }: AddCompanyModalProps) => {


    const { register, control, handleSubmit, formState: { errors } } = useForm<CompanyModel>({
        defaultValues: companyInfo ? companyInfo : {
            nit: '',
            name: '',
            address: '',
            phone: ''
        }
    });

    const [loadingForm, setLoadingForm] = useState(false);

    const accessToken = useSelector((state: RootState) => state.auth.authData?.accessToken);

    const onSubmit: SubmitHandler<CompanyModel> = async (body: CompanyModel) => {
        setLoadingForm(true);

        if(companyInfo){
            const { error } = await updateCompany(accessToken, body);

            if (error == null) {
                onSuccess();
            }

            return;
        }

        const { error } = await addCompany(accessToken, body);

        if (error == null) {
            onSuccess();
        }

    }

    return (
        <div className="p-4 bg-body position-absolute top-50 start-50 translate-middle w-50 rounded">
            <h3>Nueva Empresa</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3 mt-5">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Nit: </span>
                    </div>

                    <Controller
                        name="nit"
                        control={control}
                        render={() => <input
                            disabled={companyInfo != null}
                            type="text"
                            className="form-control"
                            placeholder="NIT (Unico)"
                            aria-label="Nit"
                            aria-describedby="basic-addon1"
                            {...register('nit', {
                                required: 'Se requiere el nit',
                            })}
                        />}
                    />
                </div>
                {errors.nit && <span className="error-span">{errors.nit.message}</span>}

                <div className="input-group mb-3 mt-1 block">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon2">Nombre: </span>
                    </div>

                    <Controller
                        name="name"
                        control={control}
                        render={() => <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            aria-label="Nombre"
                            aria-describedby="basic-addon2"
                            {...register('name', {
                                required: 'Se requiere el nombre',
                            })}
                        />}
                    />
                </div>
                {errors.name && <span className="error-span">{errors.name.message}</span>}

                <div className="input-group mb-3 mt-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="cf-address">Direccion: </span>
                    </div>

                    <Controller
                        name="address"
                        control={control}
                        render={() => <input
                            type="text"
                            className="form-control"
                            placeholder="Direccion"
                            aria-label="Address"
                            aria-describedby="cf-address"
                            {...register('address', {})}
                        />}
                    />
                </div>

                <div className="input-group mb-3 mt-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="cf-phone">Telefono: </span>
                    </div>

                    <Controller
                        name="phone"
                        control={control}
                        render={() => <input
                            type="text"
                            className="form-control"
                            placeholder="Telefono"
                            aria-label="Phone"
                            aria-describedby="cf-phone"
                            {...register('phone', {})}
                        />}
                    />
                </div>

                <button type="submit" className="btn btn-success w-100 mt-5">
                    {
                        loadingForm && <CircularProgress color="inherit" size="1rem" />
                    }
                    {
                        !loadingForm && ( companyInfo ? 'Actualizar Empresa' : 'Agregar Empresa')
                    }
                </button>
            </form>
        </div>
    );
}

export default AddCompanyModal;