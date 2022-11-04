// Write your code here

import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, changeStar} = props
  const {id, title, date, isStarred} = appointmentDetails
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const day = newDate.getDate()
  const month = newDate.getMonth()

  const formattedDate = format(new Date(year, month, day), 'dd MMMM yyyy, EEEE')

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickingStar = () => {
    changeStar(id)
  }

  return (
    <li>
      <div className="title_container">
        <p className="appointment_title">{title}</p>
        <p className="date">Date: {formattedDate}</p>
      </div>
      <button
        type="button"
        className="star_button"
        onClick={onClickingStar}
        testid="star"
      >
        <img src={starImgUrl} alt="star" className="star_image" />
      </button>
    </li>
  )
}

export default AppointmentItem
