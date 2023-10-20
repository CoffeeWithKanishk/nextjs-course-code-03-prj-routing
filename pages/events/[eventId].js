import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getEventById ,getFeaturedEvents} from '../../helpers/app-util'
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = props.Id

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}


export async function getStaticProps(context){
  const eventId=context.params.eventId
  const event=await getEventById(eventId)
  return{
    props:{
      Id:event
    }
  }
}


export async function getStaticPaths(){
  const allPath=await getFeaturedEvents()
  const paths=allPath.map(event=>({params:{eventId:event.id}}))
  return{
    paths:paths,
    fallback:true
  }
}

export default EventDetailPage;
