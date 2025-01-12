import Character from "./Character";
import './CharactersList.css';

const CharactersList = ({charactersData}) => (
    <ul className="characters-list">
        {
            charactersData.map(characterData => (
                <li key={characterData.id}>
                    <Character data={characterData}/>
                </li>
            ))
        }
    </ul>
);

export default CharactersList;