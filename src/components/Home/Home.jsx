import './Home.css';
import HomeSec1 from './Sections/HomeSec1';
import SkeletonManager from './Sections/Skeleton/SkeletonManager';
import { SkeletonProvider } from './Sections/Skeleton/context/SkeletonContext';
//import xray from "../assets/xray.jpg";

function Home() {
  //const [isClicked, setIsClicked] = useState(false);
  //const [isHover, setIsHover] = useState(false);
  //const [isCompared, setIsCompared] = useState();
  //const madeComparison = () => {
  //  if (isHover == false && isClicked == true) setIsCompared(true);
  //  else setIsCompared(false);
  //  return isCompared;
  //};
  //const xRayItem = {
  //  loop: {
  //    opacity: [0, 0.6, 0],
  //    transition: {
  //      duration: 2,
  //      ease: "easeOut",
  //      repeat: 0,
  //    },
  //  },
  //};

  return (
    <>
      <div className="home">
        <HomeSec1 />
        <SkeletonProvider>
          <SkeletonManager />
        </SkeletonProvider>
      </div>
      {/*<motion.section className="xray__section">
        <div className="box" onClick={() => setIsClicked(!isClicked)}></div>
        <div className="line" />
        <div className="line2" />
        <motion.img
          className="xray__img"
          src={xray}
          alt="xray"
          animate={{
            x: "-20vw",
            y: "150vh",
            scale: 6,
            transition: { delay: 2, stiffness: 100, duration: 1 },
          }}
        />
        
        <div className="xray__img__container">
        <motion.div
          className="xray__link1"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link2"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link3"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link4"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link5"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link6"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link7"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link8"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link9"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link10"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
        <motion.div
          className="xray__link11"
          onClick={() => {
            setIsClicked(true);
            madeComparison();
          }}
          // Motion Attributes //
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          variants={xRayItem}
          animate={
            isHover
              ? { opacity: 1 }
              : isClicked
              ? { opacity: 1 }
              : isCompared
              ? { opacity: 0 }
              : "loop"
          }
          whileHover={{ opacity: 1 }}
        ></motion.div>
      </div>
      <motion.span
        className="xray__span"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHover ? 1 : isClicked ? 1 : isCompared ? 1 : 0 }}
      >
        Shoulder
      </motion.span>
      <motion.hr
        className="hr1"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHover ? 1 : isClicked ? 1 : isCompared ? 1 : 0 }}
      />
      <motion.div
        className="span__box"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClicked ? 1 : 0 }}
      >
        <b className="close" onClick={() => setIsClicked(false)}>
          X
        </b>
        <motion.span className="span1">Lorem uipsum</motion.span>
        <br />
        <span className="span1">Guardio greta oucta cremli</span>
        <br />
        <span className="span1">Rivela ipsum dolor</span>
        <br />
        <span className="span1">Lorem lorem lorem lorem</span>
        <br />
        <div className="btn__box">
          <div className="xray__btn1">Learn More</div>
          <div className="xray__btn2">Contact Us</div>
        </div>
      </motion.div> 
      </motion.section> */}
    </>
  );
}

export default Home;
