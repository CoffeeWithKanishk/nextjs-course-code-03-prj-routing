import { Fragment,useState,useEffect } from 'react';
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../helpers/app-util'
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { notFound } from 'next/navigation';
import useSWR from 'swr';

function FilteredEventsPage(props) {
  const router = useRouter();
//===============used for client side fetching
  const filterData = router.query.slug;
  const fetcher = (url) => fetch(url).then((res) => res.json());


// Usage
const { data, error } = useSWR('https://next-project-e1ef4-default-rtdb.firebaseio.com/events/.json', fetcher);

  
  // const [state,setState]=useState()
  // useEffect(()=>{
  //   if(data){
  //     setState(data)
  //   }
    
  // },[data])
console.log(data)

  if (error) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }



  if (!data) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 || error
  ) {
      return (
        <Fragment>
          <ErrorAlert>
            <p>Invalid filter. Please adjust your values!</p>
          </ErrorAlert>
          <div className='center'>
            <Button link='/events'>Show All Events</Button>
          </div>
        </Fragment>
      );
    }

    const filteredEvents = data.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });




//====================================================


  //const filteredEvents = props.events

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth- 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}



export default FilteredEventsPage;
