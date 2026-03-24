import { useLoaderData, Link} from "react-router-dom"
import GameList from "../components/homeComponents/GameList"
import TopGamesList from "../components/homeComponents/TopGamesList";
import TopGamesCard from "../components/homeComponents/TopGamesCard";
import UpcomingGamesCard from "../components/homeComponents/UpcomingGamesCard";
import UpcomingGamesList from "../components/homeComponents/UpcomingGamesList";
import godOfWar from "../assets/god.jpg";
import gta from "../assets/gta.jpg";
import ghost from "../assets/ghost.avif";
import prince from "../assets/prince.jpg";
import readDead from "../assets/reddead.jpg";

export default function Homepage() {
    const { games, topRated, upcoming } = useLoaderData();
    return (
        <>
            <main className="pb-10">

                <section className="pt-15 container mx-auto ">

                    <h1 className="font-electro text-3xl  font-bold border-b-2 ">Games of the Year 2026</h1>
                    <div className="flex flex-col md:flex-col lg:flex-row justify-evenly">

                        <div className="mt-5">
                            <GameList>
                                {games.map((game) => {
                                    return (
                                        <GameList.Card key={game.id} game={game} />
                                    )
                                })}
                            </GameList>
                        </div>
                        <div className="bg-[#111a27] mt-5 rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col gap-4 ">

                            <h2 className="text-xs uppercase tracking-wider text-(--color-btn) pt-6 font-semibold">Ultime Notizie</h2>
                            <div className="border-b border-white/10 pb-4 flex gap-4 items-center">
                                <img src={godOfWar} alt="God of War" className="w-[110px] h-[80px] rounded-lg flex-shrink-0" />
                                <div className="flex flex-col">

                                    <Link to=""><h3 className="font-bold text-lg md:text-xl leading-tight mt-1">Red Dead Redemption torna a far parlare di sé: nuovi dettagli sul possibile remake</h3></Link>
                                    <p className="text-sm text-gray-300 mt-2 leading-6">Rockstar potrebbe essere al lavoro su una nuova versione del celebre western open world. Secondo alcune indiscrezioni..</p>
                                </div>
                            </div>
                            <div className="border-b border-white/10 pb-4 flex gap-4 items-center">
                                <img src={gta} alt="Gta" className="w-[110px] h-[80px] object-cover rounded-lg flex-shrink-0" />
                                <div className="flex flex-col">
                                    <Link to=""><h3 className="font-bold text-lg md:text-xl leading-tight mt-1">GTA VI promette un mondo di gioco enorme: emergono nuovi dettagli sul gameplay</h3></Link>
                                    <p className="text-sm text-gray-300 mt-2 leading-6">Il prossimo capitolo della serie Grand Theft Auto punta a ridefinire il genere open world. Le ultime informazioni parlano di una mappa..</p>
                                </div>
                            </div>
                            <div className="border-b border-white/10 pb-4 flex gap-4 items-center">
                                <img src={ghost} alt="Ghost of Tsushima" className="w-[110px] h-[80px]  rounded-lg flex-shrink-0" />
                                <div className="flex flex-col">
                                    <Link to=""><h3 className="font-bold text-lg md:text-xl leading-tight mt-1">Ghost of Tsushima continua a conquistare i giocatori: successo anche su nuove piattaforme</h3></Link>
                                    <p className="text-sm text-gray-300 mt-2 leading-6">L'avventura samurai di Sucker Punch rimane uno dei titoli più apprezzati degli ultimi anni. Tra combattimenti spettacolari e ambientazioni mozzafiato..</p>
                                </div>
                            </div>
                            <div className="border-b border-white/10 pb-4 flex gap-4 items-center">
                                <img src={prince} alt="Prince of Persia" className="w-[110px] h-[80px] object-cover rounded-lg flex-shrink-0" />
                                <div className="flex flex-col">


                                    <h3 className="font-bold text-lg md:text-xl leading-tight mt-1">God of War: il futuro della saga potrebbe portare Kratos verso nuove mitologie</h3>
                                    <p className="text-sm text-gray-300 mt-2 leading-6">Dopo il successo degli ultimi capitoli, molti fan si chiedono quale sarà il prossimo passo per la saga. Gli sviluppatori potrebbero esplorare nuove..</p>
                                </div>
                            </div>
                            <div className="border-b-0 border-white/10 pb-4 flex gap-4 items-center">
                                <img src={readDead} alt="Read Dead" className="w-[110px] h-[80px] object-cover rounded-lg flex-shrink-0" />
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-lg md:text-xl leading-tight mt-1">Prince of Persia torna sotto i riflettori con il nuovo capitolo della saga</h3>
                                    <p className="text-sm text-gray-300 mt-2 leading-6">La storica serie di Ubisoft è pronta a tornare con nuove meccaniche di gameplay e un rinnovato stile visivo. Il gioco promette di combinare l'azione classica con elementi moderni.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section className="pt-15 container mx-auto">
                    <h1 className="font-electro text-3xl font-bold border-b-2">Top Rated Games</h1>
                    <div className="mt-5">
                        <TopGamesList>
                            {topRated.map((game) => (
                                <TopGamesCard key={game.id} game={game} />
                            )
                            )}
                        </TopGamesList>

                    </div>
                </section>
                <section className="pt-15 container mx-auto">
                    <h1 className="font-electro text-3xl font-bold border-b-2">Upcoming Games</h1>
                    <div className="mt-5">
                        <UpcomingGamesList>
                            {upcoming.map((game) => (
                                <UpcomingGamesCard key={game.id} game={game} />
                            ))}
                        </UpcomingGamesList>

                    </div>
                </section>

            </main>
        </>
    )
}