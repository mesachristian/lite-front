import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import im from '../../assets/Wavy_Gen-01_Single-07.jpg';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { sigIn } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "../../redux/reducers/auth.reducer";

interface IFormInput {
    email: string;
    password: string;
}

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async(formData: IFormInput) => {
        setLoading(true);
        const { data } = await sigIn(formData.email, formData.password);

        if(data){
            dispatch(setAuthData({ email: data.email, accessToken: data.accessToken, role: data.role }));
            navigate('/');
        }

        setLoading(false);
    }

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8f8f8'
        }}>
            <Card sx={{
                width: '700px',
                height: '70%'
            }}>
                <Grid container spacing={0} sx={{ height: '100%' }}>
                    <Grid item xs={6}>
                        <img
                            width="100%"
                            height="100%"
                            style={{
                                objectFit: 'contain'
                            }}
                            src={im}
                            loading="lazy"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{
                            padding: '3rem 2rem'
                        }}>
                            <Typography variant="h3" component="h3">
                                ¡Bienvenido!
                            </Typography>


                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h5 style={{
                                    margin: 0,
                                    marginTop: 20,
                                    padding: 0,
                                    fontWeight: 200,
                                    color: 'gray'
                                }}>Correo electrónico</h5>

                                <Controller
                                    name="email"

                                    control={control}

                                    render={() => <input
                                        type="email"
                                        autoComplete="on"
                                        {...register('email', {
                                            required: 'Se requiere correo electrónico',
                                        })}
                                        style={{
                                            fontFamily: 'inherit',
                                            padding: '10px 15px',
                                            border: '1px solid #ccc',
                                            outline: 0,
                                            borderRadius: 4,
                                            width: '100%',
                                            color: '#141414'
                                        }} />}
                                />
                                {errors.email && <span className="error-span">{errors.email.message}</span>}

                                <h5 style={{
                                    margin: 0,
                                    marginTop: 20,
                                    padding: 0,
                                    fontWeight: 200,
                                    color: 'gray'
                                }}>Contraseña</h5>

                                <Controller
                                    name="password"

                                    control={control}

                                    render={() => <input
                                        type="password"
                                        {...register('password', {
                                            required: 'Se requiere la contraseña',
                                        })}
                                        style={{
                                            fontFamily: 'inherit',
                                            padding: '10px 15px',
                                            border: '1px solid #ccc',
                                            outline: 0,
                                            borderRadius: 4,
                                            width: '100%',
                                            color: '#141414'
                                        }} />}
                                />
                                {errors.password && <span className="error-span">{errors.password.message}</span>}

                                <button type="submit" style={{
                                    outline: 0,
                                    border: 0,
                                    marginTop: '2rem',
                                    width: '100%',
                                    background: '#263238',
                                    color: '#f9f9f9',
                                    padding: '10px 0',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    borderRadius: 5,
                                }}>
                                    {
                                        loading && <CircularProgress color="inherit" size="1rem" /> 
                                    }
                                    {
                                        !loading && 'Iniciar Sesión'
                                    }
                                </button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}

export default LoginPage;