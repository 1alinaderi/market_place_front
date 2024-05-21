import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { ReactHTML, HTMLAttributes } from "react";

type RevealProps = {
    head?: boolean;
    className?: string;
  };

const Reveal:React.FunctionComponent<RevealProps> = ({  children, head }) => {
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
        overflow: head ? "visible" : "hidden",
        
        height: "100%",
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: head ? -75 : 75 ,x: head ? 0 :1 },
          visible: { opacity: 1, y: 0 ,x:0},
        }}
        style={{
          height: "100%",
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
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

export default Reveal;
