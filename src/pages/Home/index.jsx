//const Title = ({ children, ...props }) => (
//  <h1{...props}>{children}</h1>
//)
// note que acima a tag  h1 é declarada de forma diferente de html
//note que as tags abaixo estão com letras maiusculas "title" padrão tailwind
//note a declaração do background color é realizada dentro da classe da div -> recurso tailwind ver documentação
//export function App() {
//  return (
//    <div className="bg-red-500">
//     <Title>Olá Mundo</Title>
//      <Title>Olá Mundo2</Title>
//      <Title>Olá Mundo3</Title>
//    </div>
//  )
//}



// era a pasta app

import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Home() {
    const [auth] = useLocalStorage('auth', {})
    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />

    }

    return ( // h-screen define full screen

        <div className="min-h-screen w-screen  bg-red-700 text-white p-4 flex flex-col items-center space-y-6 md:h-screen">

            <header className="container flex justify-center max-w-5xl p-4">
                <img src="/imgs/logo-fundo-vinho.svg" className="w-30" />
            </header>


            <div className="container  max-w-5xl p-4 flex flex-1 flex-col items-center space-y-6  md:flex-row md:space-y-0 md:space-x-6">

                <div className="md:flex-1 flex justify-center">
                    <img src="/imgs/photo.png" className="full max-w-md" />
                </div>

                <div className="md:flex-1 flex flex-col space-y-6">
                    <h1 className="text-3xl text-center md:text-left font-bold">Dê o seu palpite para a copa do mundo do Qatar!</h1>
                    <a href="/signup" className="text-center text-red-700 text-xl  bg-white px-8 py-4 rounded-xl">Criar minha conta</a>
                    <a href="/login" className="text-center text-white text-xl border border-white px-8 py-4 rounded-xl">Fazer login</a>
                </div>
            </div>
        </div>

    );
}
