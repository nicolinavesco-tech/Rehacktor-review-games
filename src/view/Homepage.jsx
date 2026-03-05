import { useLoaderData } from "react-router-dom"

export default function Homepage (){
    const games = useLoaderData();
    console.log(games);
    return (
        <>
            <h1>Homepage</h1>
        </>
    )
}