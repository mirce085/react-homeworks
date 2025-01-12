import './Character.css'
import {useState} from "react";
import {ModalWindow} from "./ModalWindow";

const Character = ({data}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => setIsOpen(true);

    return(
    <div className="character" onClick={() => handleClick()}>
        <div className="image">
            <img src={data?.image} alt="" />
        </div>
        <div className="name">{data?.name ?? "salam"}</div>
        <ModalWindow isOpen={isOpen} title={data?.name} onClose={() => setIsOpen(false)}>
            <div className="character">
                <div className="image">
                    <img src={data?.image} alt=""/>
                </div>
                <div>{data?.name}</div>
                <div>{data?.species}</div>
                <div>{data?.gender}</div>
            </div>
        </ModalWindow>
    </div>
    )
}

export default Character;