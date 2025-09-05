import './Home.css';
import HomeSec1 from './Sections/HomeSec1';
import Skeleton from './Sections/Skeleton/Skeleton';
import { SkeletonProvider } from './Sections/Skeleton/context/SkeletonContext';
import Form from './Sections/Form/Form';
import Reviews from './Sections/Reviews/Reviews';

function Home() {
  return (
    <>
      <div className="home">
        <Form variant="sticky" />
        <HomeSec1 />
        <SkeletonProvider>
          <Skeleton />
        </SkeletonProvider>
        <Form variant="full"/>
        <Reviews/>
      </div>
    </>
  );
}

export default Home;
