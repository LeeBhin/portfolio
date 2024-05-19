import { useState, useEffect } from 'react';
import '../styles/desktopIcon.css';

function DesktopIcon({ Icon, Name, onClick, isActive, onDoubleClick }) {
    const [isActiveState, setIsActiveState] = useState(isActive);

    useEffect(() => {
        setIsActiveState(isActive);
    }, [isActive]);

    const handleClick = () => {
        onClick(Name);
    };

    return (
        <div className={`desktopIcon ${isActiveState ? 'active' : ''}`}
            onClick={handleClick}
            onDoubleClick={onDoubleClick}
        >
            <div className="iconHover"></div>
            <div className="iconWrap">
                <img src={Icon} alt={`${Name}Icon`} />
                <div className="name">{Name}</div>
            </div>
        </div>
    );
}

export default DesktopIcon;
