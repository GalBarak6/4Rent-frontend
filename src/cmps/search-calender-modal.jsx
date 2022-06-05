import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { stayService } from '../services/stay.service'
import { DatePicker } from './date-range'
import { DateRange } from 'react-date-range'

export const SearchCalenderModal = () => {
    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(new Date().getTime() + (120 * 60 * 60 * 1000)), //tomorrow
          key: 'selection',
        },
      ])

    // const onHandleDates = (startDate, endDate) => {
    //     console.log(startDate);
    //     console.log(endDate);
        // setDateRange(prevDates => ({ ...prevDates, startDate, endDate }))
    // }

    return <section className="search-calender-modal">
        {/* <DatePicker onHandleDates={onHandleDates}/> */}
        <DateRange
            editableDateInputs={true}
            // onChange={onHandleChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={['#222222']}
        />
    </section>

}
