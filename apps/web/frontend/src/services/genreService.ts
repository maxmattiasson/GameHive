export default async function getGenres(){
        const res = await fetch("http://localhost:3000/api/genres");
        if (!res.ok) throw new Error ("fetch genres failed");
        return res.json()
}