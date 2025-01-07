export const getHealth = async () => {
    const response = await fetch(`http://localhost:${import.meta.env.VITE_PORT}/`)
    const data = await response.json();
    console.log(data);
    return data;
}