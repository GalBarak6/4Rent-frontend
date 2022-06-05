import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { stayService } from '../services/stay.service'
import { DatePicker } from './date-range'
import { DateRange } from 'react-date-range'

export const SearchCalenderModal = ({dateRange, handleDatesChange}) => {
    // const [dateRange, setDateRange] = useState([
    //     {
    //       startDate: new Date(),
    //       endDate: new Date(),
    //       key: 'selection',
    //     },
    //   ])

      const onHandleChange = (item) => {
          console.log(item)
        // setDateRange([item.selection])
        const {startDate} = item.selection
        const {endDate} = item.selection
        handleDatesChange(startDate,endDate)
      }



    return <section className="search-calender-modal">
        {/* <DatePicker onHandleDates={onHandleDates}/> */}
        <DateRange
            editableDateInputs={true}
            onChange={onHandleChange}
            // onChange={handleDatesChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={['#222222']}
        />
    </section>

}
