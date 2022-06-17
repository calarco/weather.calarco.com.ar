export async function getLocation(ip: string) {
    const data = await fetch(
        `http://ip-api.com/json/${ip}?lang=es&fields=49361`
    )
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            return { message: error };
        });

    if (data.status === "success") {
        return {
            country: data.country,
            city: data.city,
            lat: data.lat,
            lon: data.lon,
        };
    } else {
        throw { message: data.message };
    }
}
