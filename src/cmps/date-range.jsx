import React, { useState } from 'react'
import { DateRange } from 'react-date-range'

export function DatePicker() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)), //tomorrow
      key: 'selection',
    },
  ])
  const [toggleCalender, setToggleCalender] = useState(false)

  const onHandleChange = (item) => {
    setDateRange([item.selection])
  }

  const convert = (str) => {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2)
    return [date.getFullYear(), month, day].join("-")
  }

  return (
    <>
      <div onClick={() => setToggleCalender((prevToggle) => !prevToggle)}>
        <input type="date" name='startDate' value={convert(dateRange[0].startDate)} onChange={onHandleChange} className="check-date checkin" />
        <input type="date" name='endDate' value={convert(dateRange[0].endDate)} onChange={onHandleChange} className="check-date checkout" />
      </div>
      {toggleCalender && <DateRange
        onChange={onHandleChange}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
      />}
    </>
  )
}