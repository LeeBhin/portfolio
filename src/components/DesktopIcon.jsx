import '../styles/desktopIcon.css'

function DesktopIcon({ Icon, Name }) {
    return (
        <div className="desktopIcon">
            <div className="iconHover"></div>
            <div className="iconWrap">
                <img src={Icon} alt={Name + 'Icon'} />
                <div className="name">{Name}</div>
            </div>
        </div>
    );
}

export default DesktopIcon;