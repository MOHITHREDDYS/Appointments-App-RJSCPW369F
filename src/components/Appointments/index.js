// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    starredButton: false,
    error1: '',
    error2: '',
  }

  onChangingTitle = event => {
    this.setState({title: event.target.value, error1: ''})
  }

  onChangingDate = event => {
    this.setState({date: event.target.value, error2: ''})
  }

  onClickingAdd = event => {
    event.preventDefault()

    const {title, date} = this.state
    if (title === '') {
      this.setState({error1: '*Required'})
    }
    if (date === '') {
      this.setState({error2: '*Required'})
    }
    if (title !== '' && date !== '') {
      const newAppointment = {id: uuidv4(), title, date, isStarred: false}

      this.setState(prevState => ({
        title: '',
        date: '',
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        error1: '',
        error2: '',
      }))
    }
  }

  changeStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getStarredAppointments = () => {
    this.setState(prevState => ({starredButton: !prevState.starredButton}))
  }

  getFilteredList = () => {
    const {starredButton, appointmentsList} = this.state
    const filteredList = starredButton
      ? appointmentsList.filter(
          eachAppointment => eachAppointment.isStarred === true,
        )
      : appointmentsList

    return filteredList
  }

  render() {
    const {title, date, starredButton, error1, error2} = this.state
    const filteredAppointmentList = this.getFilteredList()
    const starredButtonProps = starredButton ? 'active' : 'unactive'

    return (
      <div className="main_container">
        <div className="container">
          <div className="inputs_image_container">
            <div className="inputs_container">
              <h1 className="main_heading">Add Appointment</h1>
              <form>
                <label className="label_heading" htmlFor="title">
                  TITLE
                </label>
                <br />
                <input
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={this.onChangingTitle}
                />
                <p className="error">{error1}</p>
                <br />
                <label className="label_heading" htmlFor="date">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  placeholder="Date"
                  value={date}
                  onChange={this.onChangingDate}
                />
                <p className="error">{error2}</p>
                <br />
                <button
                  type="submit"
                  className="add_button"
                  onClick={this.onClickingAdd}
                >
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments_image"
            />
          </div>
          <hr />
          <div className="heading_button_container">
            <h1 className="main_heading">Appointments</h1>
            <button
              type="button"
              className={`${starredButtonProps} starred_button`}
              onClick={this.getStarredAppointments}
            >
              Starred
            </button>
          </div>
          <ul>
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                changeStar={this.changeStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
