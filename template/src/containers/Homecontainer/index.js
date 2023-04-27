import React, { useEffect } from 'react';
import { Text, View,  } from 'react-native';
import {CheckAppleHealth, AuthAppleHealth, getAppleHealth, getAppleHealthMulti, setting, getListActivity, AddPermission} from './lib/HealthApp/HealthData';
import moment from 'moment';
import { GET_STEP } from '../../lib/HealthApp';

const PermissionsRead = ['Height', 'SleepAnalysis']
const PermissionsWrite = []
const Methods = ['getDailyStepCountSamples', 'getSleepSamples', 'getLatestHeight']
// const getMultidata=async()=>{
//     //use data upload 
//     const data = await getAppleHealthMulti(Methods)
//     console.log('getAppleHealth Data =====>',JSON.stringify(data, null, 2));
// }



const uploadStep =async()=>{
        //use data upload 
        const data = await GET_STEP?.['com.apple.health.app']?.['step']({
            options:{
                startDate : moment().startOf('days').toISOString(true), 
                endDate : moment().endOf('days').toISOString(true), 
            },
        })
        console.log('getAppleHealth Data =====>',JSON.stringify(data, null, 2));
    }


// const gethight=async()=>{
//     //use data upload 
//     const data = await getAppleHealth({
//         methods:'getLatestHeight',
//         options:{
//             startDate:moment().startOf('days').toISOString(true),
//             endDate:moment().endOf('days').toISOString(true),
//         },
//     })
//     console.log('getLatestHeight Data =====>',JSON.stringify(data, null, 2));
// }
// const checkDevice= async() =>{
//     const app = await CheckAppleHealth()
//     console.log('CheckAppleHealth Data =====>',JSON.stringify(app, null, 2));
// }
// const checkAuth= async() =>{
//     const app = await AuthAppleHealth()
//     console.log('AuthAppleHealth Data =====>',JSON.stringify(app, null, 2));
// }


function Homecontainer() {
    // AddPermission(PermissionsRead, PermissionsWrite)
    uploadStep()
    // gethight()
    // getMultidata()
    // checkDevice()
    // checkAuth()
    return(
        <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', flex:1}}>
            <Text>Health App Sandbox</Text>
        </View>
    )
}

export default Homecontainer;