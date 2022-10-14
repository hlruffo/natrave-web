
import { Icon, Input } from '~/components'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'


const validationSchema = yup.object().shape({

    email: yup.string().email('Informe um email válido').required('Digite seu email'),
    password: yup.string().required('Informe sua senha'),
})

export const Login = () => {
    const [auth, setAuth] = useLocalStorage('auth', {})
    const formik = useFormik({
        onSubmit: async (values) => {

            const res = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/login',
                auth: {
                    username: values.email,
                    password: values.password
                }
            })

            setAuth(res.data)

            /* localStorage.setItem('auth', JSON.stringify(res.data))*/
            /*localStorage.getItem('auth', JSON.parse(auth)) para pegar o objeto sem strings*/

        },
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema
    })

    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />

    }

    return (
        <div>
            <header className=" p-4 border-b border-red-300">
                <div className="container max-w-xl flex justify-center  ">
                    <img src="/imgs/logo-fundo-branco.svg" className="w-32 md:w-40" />
                </div>
            </header>
            <main className=" container max-w-xl p-4">
                <div className="p-4 flex space-x-4 items-center">
                    <a href="/">
                        <Icon name="back" className="h-6" />
                    </a>
                    <h2 className="text-xl font-bold">Entre na sua conta</h2>
                </div>
                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    <Input
                        type="text"
                        name="email"
                        label="Seu e-mail"
                        placeholder="Digite o seu e-mail"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email} />

                    <Input
                        type="password"
                        name="password"
                        label="Sua senha"
                        placeholder="Digite sua senha"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password} />

                    <button
                        type="submit"
                        className="block text-center text-white bg-red-500 px-6 py-3 w-full rounded-xl disabled:opacity-50"
                        disabled={!formik.isValid || formik.isSubmitting}>
                        {formik.isSubmitting ? 'Carregando... ' : 'Entrar'}
                    </button>

                </form>



            </main>
        </div>
    );
}