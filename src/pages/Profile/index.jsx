import { Icon, Card, DateSelect } from '~/components'
import { Fragment } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useLocalStorage, useAsyncFn } from 'react-use'
import axios from 'axios'
import { format, formatISO } from 'date-fns'
import { useEffect, useState } from 'react'



export const Profile = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
    const [auth, setAuth] = useLocalStorage('auth', {})

    const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${params.username}`,

        })
        const hunches = res.data.hunches.reduce((acc, hunch) => {
            acc[hunch.gameId] = hunch
            return acc
        }, {})

        return {
            ...res.data,
            hunches
        }
    })

    const [games, fetchGames] = useAsyncFn(async (params) => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params
        })
        return res.data
    })

    const logout = () => {
        setAuth({})
        navigate('/login')
    }
    const isLoading = games.loading || loading
    const hasError = games.error || error
    const isDone = !isLoading && !hasError


    useEffect(() => {
        fetchHunches()
    }, [])


    useEffect(() => {
        fetchGames({ gameTime: currentDate })

    }, [currentDate])



    return (
        <>
            <header className="p-4 bg-red-500 text-white">
                <div className="container max-w-3xl  flex justify-between">
                    <img src="/imgs/logo-fundo-vermelho.svg" className="w-28 md:w-40" />
                    {auth?.user?.id && (
                        <div onClick={logout} className="p-2 cursor-pointer">Sair</div>
                    )}
                </div>
            </header>
            <main className='space-y-6'>
                <section id="header" className=" bg-red-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4 ">
                        <a href="/dashboard">
                            <Icon name="back" className="w-10 " />
                        </a>
                        <h3 className='text-2xl font-bold'>{user?.name} </h3>
                    </div>
                </section>

                <section id="content" className=' container max-w-3xl p-4 space-y-4 '>
                    <h2 className='text-red-500 text-xl font-bold '>Seus palpites</h2>

                    <DateSelect currentDate={currentDate} onChange={setDate} />


                    <div className='space-y-4 '>
                        {isLoading && 'Carregando jogos...'}
                        {hasError && 'Ops! Algo deu errado! '}



                        {isDone && games.value?.map(game => (
                            <Card
                                key={game.id}
                                gameId={game.id}
                                homeTeam={game.homeTeam}
                                awayTeam={game.awayTeam}
                                gameTime={format(new Date(game.gameTime), 'H:mm')}
                                homeTeamScore={user.hunches?.[game.id]?.homeTeamScore.toString() || '0'}
                                awayTeamScore={user.hunches?.[game.id]?.awayTeamScore.toString() || '0'}
                                disabled={true}

                            />
                        ))}
                    </div>


                </section>
            </main>
        </>
    )
}