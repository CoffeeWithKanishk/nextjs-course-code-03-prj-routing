import axios from 'axios';


export const getAllEvents = async () => {
	const response = await axios.get(
		`https://next-project-e1ef4-default-rtdb.firebaseio.com/events/.json`
	);

      console.log("response", response.data)
    // const dat= await response.data
    // console.log(dat)
  
    

    //   const events = [] 
  
    // for(let key in dat){
    //     events.push(
    //         {
    //             id:key,
    //             ...dat[key]  
    //         }
    //     )
    // }
    // console.log(events)
    return response.data;
};




export async function getFeaturedEvents() {
    const events= await getAllEvents()
    return events.filter((event) => event.isFeatured);
  }

  export async function getEventById(id) {
    const events= await getAllEvents()
    return events.find((event) => event.id === id);
  }




  export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const events= await getAllEvents()
    let filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

  return filteredEvents;
}