import moment from 'moment'

const mile_to_meters = 1609.344 // 1 mile to meter

export const activityFormat = (_activities, type) => {
    let now = moment()
    let arrays = [];
    let activities = _activities?.filter((item) => item?.activityName === type)

    activities.forEach(item => {
        arrays.push({
            data_id: item?.id,
            data_type_value: item?.activityName,
            begin_at: moment(item?.start).format('YYYY-MM-DD HH:mm:ss'),
            end_at: moment(item?.end).format('YYYY-MM-DD HH:mm:ss'),
            measured_at: now.format("YYYY-MM-DD"),
            application: item?.sourceId,
            calorie: item?.calories || 0,
            distance_m: getDistance(item?.distance, item?.activityName),
            is_manual: !!item?.metadata?.HKWasUserEntered,
        })
    });
    return arrays
}

const getDistance = (distance, type) => {
    if (!distance || distance === 0) {
        return 0;
    }
    return (distance * mile_to_meters)
}