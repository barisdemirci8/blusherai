"use client";

import { useEffect, useRef } from "react";

const keyWords: string[] = ["select", "prompt", "edit"];

export default function AnimatedKeyword() {
  const animatedRef = useRef<HTMLHeadingElement>(null);

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text: string, i: number, fnCallback: () => void) {
    // chekc if text isn't finished yet
    if (i < text.length && animatedRef.current) {
      // add next character to h1
      animatedRef.current.innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == "function") {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }

  // start a typewriter animation for a text in the dataText array
  function startTextAnimation(i: number) {
    if (typeof keyWords[i] == "undefined") {
      setTimeout(function () {
        startTextAnimation(0);
      }, 20000);
    }

    // check if dataText[i] exists
    if (i < keyWords[i].length) {
      // text exists! start typewriter animation
      typeWriter(keyWords[i], 0, function () {
        // after callback (and whole text has been animated), start next text
        startTextAnimation((i + 1) % keyWords.length);
      });
    }
  }

  useEffect(() => {
    startTextAnimation(0);
  }, []);

  return (
    <div className="inline-block w-36">
      <h1
        ref={animatedRef}
        className="inline-block animate-blink border-r-4 border-r-black"
      >
        {keyWords[0]}
      </h1>
    </div>
  );
}
