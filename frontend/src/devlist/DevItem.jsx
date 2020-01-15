import React from 'react';

const DevItem = ({ avatar_url, name, techs, bio, github_username }) => {
    return (
        <li className="dev-item">
            <header>
                <img src={avatar_url} alt="" />
                <div className="dev-info">
                    <h4>{name}</h4>
                    <span>{techs.join(', ')}</span>
                </div>
            </header>
            <p>{bio}</p>
            <a href={`https://github.com/${github_username}`}>Acessar perfil no Github</a>
        </li>
    );
};

export default DevItem;