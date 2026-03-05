import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useEffect } from "react";

export default function Header() {
    useEffect(()=>{
        const slider = document.querySelector('.slider');

        function activate(e){
            const items = document.querySelectorAll('.item');

            if(e.target.matches('.next')){
                slider.append(items[0]);
            }

            if(e.target.matches('.prev')){
                slider.prepend(items[items.length -1]);
            }
        }
        document.addEventListener('click', activate);
        return()=>{
            document.removeEventListener('click', activate);
        };
    }, []);

    return (
        <>
            <header className="rev-header">
                <ul className='slider'>
                    <li className='img0 item'>
                        <div className='content'>
                            <h2 className='title text-3xl'>Monster Hunter Wilds</h2>
                            <p className='description font-semibold'> Monster Hunter Wilds è il nuovo capitolo della celebre serie di Capcom. I giocatori esploreranno vasti ecosistemi dinamici dove i mostri interagiscono tra loro e con l’ambiente. Con nuove armi, creature gigantesche e un mondo ancora più vivo, il gioco promette cacce epiche sia in single player che in cooperativa.  </p>
                            <button>Read More</button>
                        </div>
                    </li>
                    <li className='img1 item'>
                        <div className='content'>
                            <h2 className='title'>Resident Evil 9</h2>
                            <p className='description font-semibold'> Resident Evil 9 continua la celebre saga horror di Capcom con una nuova storia ambientata in un mondo oscuro e pieno di misteri. I giocatori dovranno affrontare creature terrificanti, risolvere enigmi e sopravvivere in ambienti sempre più pericolosi mentre scoprono la verità dietro una nuova minaccia biologica.  </p>
                            <button>Read More</button>
                        </div>
                    </li>
                    <li className='img2 item'>
                        <div className='content'>
                            <h2 className='title text-3xl'>Wolverine</h2>
                            <p className='description font-semibold'> Sviluppato da Insomniac Games, Marvel’s Wolverine racconta la storia del celebre mutante Logan. Il gioco promette combattimenti intensi, una narrazione più matura e un gameplay dinamico che sfrutta gli iconici artigli di Wolverine. </p>
                            <button>Read More</button>
                        </div>
                    </li>
                    <li className='img3 item'>
                        <div className='content'>
                            <h2 className='title text-3xl'>Mass Effect</h2>
                            <p className='description font-semibold'>
                                Il prossimo capitolo della saga di Mass Effect riporta i giocatori nello spazio per una nuova avventura galattica. Il gioco continuerà la storia dell’universo creato da BioWare con nuove missioni, alleanze e decisioni che influenzeranno il destino della galassia.
                            </p>
                            <button>Read More</button>
                        </div>
                    </li>
                    <li className='img4 item'>
                        <div className='content'>
                            <h2 className='title text-3xl'>The Witcher IV</h2>
                            <p className='description font-semibold'>
                                Il nuovo capitolo della saga di The Witcher apre una nuova trilogia ambientata nello stesso universo fantasy. Con un motore grafico completamente rinnovato e un mondo aperto ancora più grande, i giocatori esploreranno terre pericolose affrontando mostri e scelte morali complesse.
                            </p>
                            <button>Read More</button>
                        </div>
                    </li>
                    <li className='img5 item'>
                        <div className='content'>
                            <h2 className='title text-3xl'>Pragmata</h2>
                            <p className='description font-semibold'> Pragmata è un misterioso gioco sviluppato da Capcom ambientato in un futuro distopico. I giocatori esploreranno una stazione lunare insieme a una misteriosa ragazza androide mentre cercano di scoprire cosa è successo alla colonia umana.  </p>
                            <button>Read More</button>
                        </div>
                    </li>
                </ul>
                <nav className='nav'>
                    <ion-icon className='btn prev' name="arrow-back-outline"><GrFormPrevious /></ion-icon>
                    <ion-icon className='btn next' name="arrow-forward-outline"><MdNavigateNext /></ion-icon>
                </nav>
            </header>
        </>

    )
}


