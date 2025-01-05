import './Character.css'

const Character = ({data}) => (
    <div className="character">
        <div className="image">
            <img src={data?.image} alt="" />
        </div>
        <div className="name">{data?.name ?? "salam"}</div>
    </div>
);

export default Character;