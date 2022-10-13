//const Input = ({ name, type, placeholder label }) => (
//    <div className="flex flex-col">
//        <label htmlFor={name}>{label}</label>
//        <input name={name} id={name} type={type} placeholder={placeholder} />
//    caso a propriedade tenha o mesmo nome que o parametro e só seja usado em um lugar como type e placeholder, podemos usar ...props no lugar como abaixo
//    note que como name será passado para name, id e htmlFor isso não é possível.
//</div>
//

//como os campos de inserção de email e senha serão estilizados igual, podemos definir o input como função
import { Icon, Input } from '~/components'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'


const validationSchema = yup.object().shape({
    name: yup.string().required('Preencha seu nome'),
    username: yup.string().required('Preencha seu nome de usuário'),
    email: yup.string().email('Informe um email válido').required('Digite seu email'),
    password: yup.string().required('Crie sua senha'),
})


export const Signup = () => {
    const [auth, setAuth] = useLocalStorage('auth', {})
    const formik = useFormik({
        onSubmit: async (values) => {

            const res = await axios({
                method: 'post',
                baseURL: 'https://natrave-api-chi.vercel.app/',
                url: '/users',
                data: values
            })

            console.log(res.data)

        },
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: ''
        },
        validationSchema
    })
    console.log(formik.errors)

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
                    <h2 className="text-xl font-bold">Crie sua conta</h2>
                </div>
                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        label="Seu nome"
                        placeholder="Digite o seu nome"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name} />

                    <Input
                        type="text"
                        name="username"
                        label="Seu nome de usuário"
                        placeholder="Digite um nome de usuário"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && formik.errors.username} />

                    <Input
                        type="text"
                        name="email"
                        label="Seu e-mail"
                        placeholder="Digite o seu e-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email} />

                    <Input
                        type="password"
                        name="password"
                        label="Sua senha"
                        placeholder="Digite sua senha"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password} />

                    <button
                        type='submit'
                        className="block text-center text-white bg-red-500 px-6 py-3 w-full rounded-xl disabled:opacity-50"
                        disabled={!formik.isValid || formik.isSubmitting}>
                        {formik.isSubmitting ? 'Criando conta... ' : 'Criar minha conta'}
                    </button>

                </form>



            </main>
        </div>
    );
}