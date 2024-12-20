import Icons from "../assets/icons";
import css from "../styles/Layout.module.css";

const FileIcon = ({ extension }) => {
  let iconKey = extension.replace(".", "");

  if (iconKey === "sql" || iconKey === "accdb") {
    iconKey = "sql";
  }

  if (extension === ".vs") iconKey = "vscode";

  if (extension === "robots") iconKey = "robots";

  if (extension === ".exe") iconKey = "debug";

  const IconComponent =
    Icons[iconKey.charAt(0).toUpperCase() + iconKey.slice(1)];

  if (IconComponent) {
    return <IconComponent className={css.icon} />;
  }
};

export default FileIcon;
