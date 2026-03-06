import { useLoaderData, useParams } from "react-router-dom";
import GameList from "../components/homeComponents/GameList";

export default function GenrePage() {
    const games = useLoaderData();
    const { slug } = useParams();

    return (
        <>
            <div className="pt-20 px-4">
                <h1 className="text-center text-3xl mb-5">Filtrato per genere: {slug}</h1>

                <GameList>
                    {games.map((game) => {

                        return <GameList.Card key={game.id} game={game} />;
                    })}

                </GameList>
            </div>

        </>
    )
}