import { getFeaturedEvents } from '../helpers/app-util'
import EventList from '../components/events/event-list';

function HomePage(props) {
 
  console.log("featured", props.feature);
  return (
    
    <div>
      <EventList items={props.feature} />
    </div>
  );
}

export async function getStaticProps(){
  const featured=await getFeaturedEvents()
  return{
    props:{
      feature:featured
    }
  }

}



export default HomePage;
