import React from 'react'
import './stles.scss';
import { useSelector } from 'react-redux';
const Genres = ({data}) => {
    const {genres} = useSelector((state) => state.home);
  return (
    <div className='genres'>
        {data?.map((id) => {
          if (!genres[id]?.name) {return};
          return (
                <div key={id} className="genre">
                    {genres[id]?.name}
                </div>
            )
          
        }
    
  )
}
    </div>
  );
}
export default Genres;