import css from "../styles/File.module.css";
import { useSelector } from "react-redux";
import FileTab from "./FileTab";
import { useEffect, useRef } from "react";

const CurrentFiles = () => {
  const trackRef = useRef();
  const sliderRef = useRef();
  const scrollAreaRef = useRef();

  const { currentFiles } = useSelector((state) => state.history);

  const getFileName = (filePath) => {
    const parts = filePath.split("/");
    return parts[parts.length - 1];
  };

  useEffect(() => {
    const track = trackRef.current;
    const slider = sliderRef.current;
    const scrollArea = scrollAreaRef.current;

    if (!track || !slider || !scrollArea) return;

    const updateScrollbar = () => {
      const { scrollWidth, clientWidth } = scrollArea;

      if (scrollWidth <= clientWidth) {
        track.style.display = "none";
        return;
      }

      track.style.display = "block";

      const scrollRatio = clientWidth / scrollWidth;
      const sliderWidth = Math.max(track.clientWidth * scrollRatio, 30);
      slider.style.width = `${sliderWidth}px`;

      const scrollLeft = scrollArea.scrollLeft;
      const maxScrollLeft = scrollWidth - clientWidth;
      const maxSliderLeft = track.clientWidth - sliderWidth;
      const sliderLeft = (scrollLeft / maxScrollLeft) * maxSliderLeft;
      slider.style.left = `${sliderLeft}px`;
    };

    const handleScroll = (e) => {
      e.preventDefault();

      const scrollAmount = e.type === 'wheel'
        ? e.deltaY
        : e.movementX * 2;
      scrollArea.scrollLeft += scrollAmount;
      updateScrollbar();
    };

    const handleMouseDown = () => {
      document.body.style.userSelect = "none";

      document.addEventListener("mousemove", handleScroll);
    };

    const handleMouseUp = () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "default";

      document.removeEventListener("mousemove", handleScroll);

      requestAnimationFrame(updateScrollbar);
    };

    const handleTrackClick = (e) => {
      if (e.target === slider) return;

      const trackRect = track.getBoundingClientRect();
      const clickPosition = e.clientX - trackRect.left;
      const sliderWidth = slider.offsetWidth;
      const maxSliderLeft = track.clientWidth - sliderWidth;
      const boundedSliderLeft = Math.max(
        0,
        Math.min(clickPosition - sliderWidth / 2, maxSliderLeft)
      );

      const scrollRatio = boundedSliderLeft / maxSliderLeft;
      const maxScrollLeft = scrollArea.scrollWidth - scrollArea.clientWidth;

      scrollArea.scrollLeft = scrollRatio * maxScrollLeft;
      updateScrollbar();
    };

    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(scrollArea);

    scrollArea.addEventListener("wheel", handleScroll, { passive: false });
    slider.addEventListener("mousedown", handleMouseDown);
    track.addEventListener("mousedown", handleTrackClick);
    document.addEventListener("mouseup", handleMouseUp);

    updateScrollbar();

    return () => {
      resizeObserver.disconnect();
      scrollArea.removeEventListener("wheel", handleScroll);
      slider.removeEventListener("mousedown", handleMouseDown);
      track.removeEventListener("mousedown", handleTrackClick);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleScroll);
    };
  }, []);

  return (
    <div className={css.wrap}>
      <div className={css.CurrentFiles} ref={scrollAreaRef}>
        {currentFiles.map((file, index) => (
          <FileTab
            key={index}
            fileName={getFileName(file.path)}
            filePath={file.path}
          />
        ))}
        <div className={css.fill} />
      </div>
      <div className={css.track} ref={trackRef}>
        <div className={css.slider} ref={sliderRef} />
      </div>
    </div>
  );
};

export default CurrentFiles;