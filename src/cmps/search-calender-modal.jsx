import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { stayService } from '../services/stay.service'
import { DatePicker } from './date-range'
import { DateRange } from 'react-date-range'

export const SearchCalenderModal = ({dateRange, handleDatesChange}) => {

      const onHandleChange = (item) => {
          console.log(item)
        const {startDate} = item.selection
        const {endDate} = item.selection
        handleDatesChange(startDate,endDate)
      }

    return <section className="search-calender-modal">
        <DateRange
            editableDateInputs={true}
            onChange={onHandleChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={['#222222']}
        />
    </section>

}
