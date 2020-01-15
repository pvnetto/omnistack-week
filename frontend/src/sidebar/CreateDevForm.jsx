import React, { useState, useEffect } from 'react';

const CreateDevForm = ({ addDev }) => {

    const [name, setName] = useState("");
    const [techs, setTechs] = useState("");
    const [githubUser, setGithubUser] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                console.log(error);
            },
            {
                timeout: 30000
            },
        )
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();
        console.log("Submitting");

        const response = await fetch('http://localhost:3333/devs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                github_username: githubUser,
                techs: techs,
                latitude: latitude,
                longitude: longitude
            })
        });

        const newDev = await response.json();

        setGithubUser("");
        setTechs("");
        addDev(newDev);
    }

    return (
        <form onSubmit={submitForm}>

            <div className="form-block">
                <label htmlFor="github_user">Usuário do Github</label>
                <input value={githubUser} onChange={(e) => setGithubUser(e.target.value)} name="github_user" type="text" required />
            </div>

            <div className="form-block">
                <label htmlFor="techs">Tecnologias</label>
                <input value={techs} onChange={(e) => setTechs(e.target.value)} name="techs" type="text" required />
            </div>

            <div className="form-group">
                <div className="form-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input value={latitude} onChange={(e) => setLatitude(e.target.value)} name="latitude" type="text" required />
                </div>
                <div className="form-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input value={longitude} onChange={(e) => setLongitude(e.target.value)} name="longitude" type="text" required />
                </div>
            </div>

            <div className="form-block">
                <button type="submit">Salvar</button>
            </div>
        </form>
    );
};

export default CreateDevForm;