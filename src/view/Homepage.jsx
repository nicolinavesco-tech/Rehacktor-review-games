import { useLoaderData } from "react-router-dom"
import GameList from "../components/homeComponents/GameList"

export default function Homepage() {
    const { results: games } = useLoaderData();
    return (
        <>
            <section className="pt-15 container mx-auto">

                <h1 className="font-electro text-3xl  font-bold border-b-2 ">Giochi dell'anno 2026</h1>

                <div className="mt-5">
                    <GameList>
                        {games.map((game) => {
                            return (
                                <GameList.Card key={game.id} game={game} />
                            )
                        })}
                    </GameList>
                </div>

            </section>

        </>
    )
}