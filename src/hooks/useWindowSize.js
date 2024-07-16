import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); //this runs at load time

    //how to  get the values continue  to adjust when window is resized

    window.addEventListener("resize", handleResize);

    //Now it only adds once, we need to do something to prevent memory leak in application, i.e remove event listener
    //useEffect has cleanup function that only runs when dependency change for useEffect

    // const cleanUp = ()=>{
    //     console.log('runs if a useEffect dependency changes')
    //     window.removeEventListener("resize", handleResize);
    // }

    //return cleanUp;
    return ()=> window.removeEventListener("resize", handleResize);
}, []);

return windowSize;
};

export default useWindowSize;
