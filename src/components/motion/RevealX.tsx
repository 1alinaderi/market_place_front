import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { ReactHTML, HTMLAttributes } from "react";

type RevealXProps = {
    head?: boolean;
    className?: string;
  };

const RevealX:React.FunctionComponent<RevealXProps> = ({  children, head }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();
  

  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",        
        height: "100%",
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: head ? -75 : 75 ,y: head ? 0 :1 },
          visible: { opacity: 1, x: 0 ,y:0},
        }}
        style={{
          height: "100%",
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {children}
      </motion.div>
      {!head && (
        <motion.div
          variants={{ hidden: { right: 0 }, visible: { right: "100%" } }}
          initial="hidden"
          animate={slideControls}
          transition={{ duration: 0.5, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 4,
            bottom: 4,
            left: 0,
            right: 0,
            background: "var(--brand)",
            zIndex: 20,
          }}
        />
      )}
    </div>
  );
};

export default RevealX;
