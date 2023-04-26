import moment from 'moment-timezone'

export const stepFormatApple = (step) => {
  console.log('in stepFormatApple');
  let stepArray = [];
  if (step?.length) {
    const step_date = (moment(step[0].startDate).format("YYYY-MM-DD"))
    const step_count = step.reduce((sum, item) => {
      return (sum || 0) + item?.value
    }, 0)
    const step_hour = moment(step[0].startDate).hour()

    stepArray.push({
      step_count,
      step_date,
      step_hour,
      is_all_day: true
    })
  }
  return stepArray
}

export const stepFormatGoogleFit = (step) => {
  let stepArray = [];
  let now = moment()
  if (step.length === 0) {
    stepArray.push({
      step_hour: now.hour(),
      step_date: now.format("YYYY-MM-DD"),
      step_count: 0,
      is_partial: true
    })
  } else {
    step.map(item => {
      stepArray.push({
        step_hour: (moment(item.startDate).hour()),
        step_date: (moment(item.startDate).format("YYYY-MM-DD")),
        step_count: item.steps,
        is_partial: moment(item.startDate).hour() === now.hour()
      })
    })
  }
  return stepArray
}