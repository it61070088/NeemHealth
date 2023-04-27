import { getAppleHealth } from "./ApplyHealth";
import { stepFormatApple } from "../Format/stepFormat";
import { activityFormat } from "../Format/activityFormat";
export const GET_STEP = {
    "com.apple.health.app":{
        'step': ({options}) => getAppleHealth({
            methods:'getDailyStepCountSamples',
            options,
            format:(v) => stepFormatApple(v)
        }),
    
    }
}

export const GET_ACTIVITY = {
    "com.apple.health.app":{
        'step': ({options}) => getAppleHealth({
            methods:'getDailyStepCountSamples',
            options,
            format:(v) => stepFormatApple(v)
        }),
        'activity_walking': ({options}) => getAppleHealth({
            methods:'getSamples',
            options:{ ...options, ype: 'Workout', unit: ' mile' },
            format:(v) => activityFormat(v)
        }),
        'activity_cycling': ({options}) => getAppleHealth({
            methods:'getSamples',
            options:{ ...options, ype: 'Workout', unit: ' mile' },
            format:(v) => activityFormat(v)
        }),
        'activity_swimming': ({options}) => getAppleHealth({
            methods:'getSamples',
            options:{ ...options, ype: 'Workout', unit: ' mile' },
            format:(v) => activityFormat(v)
        }),
        'activity_yoga': ({options}) => getAppleHealth({
            methods:'getSamples',
            options:{ ...options, ype: 'Workout', unit: ' mile' },
            format:(v) => activityFormat(v)
        }),
        'activity_outdoor_running': ({options}) => getAppleHealth({
            methods:'getSamples',
            options:{ ...options, ype: 'Workout', unit: ' mile' },
            format:(v) => activityFormat(v)
        }),
        'sleep': ({options}) => getAppleHealth({
            methods:'getSleepSamples',
            options,
            format:(v) => format(v)
        }),

    
    }
}