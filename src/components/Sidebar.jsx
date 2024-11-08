import { VscEllipsis } from "react-icons/vsc";
import css from "../styles/Layout.module.css";

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className={css["sidebar-title"]}>
        <span className={css["sidebar-title-txt"]}>탐색기</span>
        <div className={`${css["icon-bg"]} ${css.ellipsis}`}>
          <VscEllipsis />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;