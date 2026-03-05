export async function getAllGamesLoader(){
    const promise = await fetch('https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2024-01-01,2024-12-30');
    const json = await promise.json();
    return json;
}