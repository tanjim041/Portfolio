import { useState, useEffect, useCallback } from "react";

export default function useTypingEffect(titles, typingSpeed = 150, deletingSpeed = 50, pauseEnd = 1500, pauseStart = 500) {
  const [text, setText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      setText((prev) => currentTitle.substring(0, prev.length - 1));
    } else {
      setText((prev) => currentTitle.substring(0, prev.length + 1));
    }
  }, [titles, titleIndex, isDeleting]);

  useEffect(() => {
    if (!titles || titles.length === 0) return;

    const currentTitle = titles[titleIndex];
    let speed;

    if (!isDeleting && text === currentTitle) {
      speed = pauseEnd;
      const timeout = setTimeout(() => setIsDeleting(true), speed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && text === "") {
      speed = pauseStart;
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      speed = isDeleting ? deletingSpeed : typingSpeed;
    }

    const timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, titleIndex, titles, tick, typingSpeed, deletingSpeed, pauseEnd, pauseStart]);

  return text;
}
