import AppleHealthKit from 'react-native-health';
import moment from 'moment';

const PERMS = AppleHealthKit.Constants.Permissions;
const ReadPERMS = [PERMS.StepCount,PERMS.Steps]
const WRITEPERMS = []
        export const HealthConfig = {
            permissions: {
                read: ReadPERMS,
                write : WRITEPERMS
            }
        }

        export const AddPermission= async(permread, permwrite) =>{
            await permread.map((type)=>{ReadPERMS.push(PERMS?.[type])})
            await permwrite?.map((type)=>{WRITEPERMS.push(PERMS?.[type])})
            console.log('==============================');
            console.log("Add Permisstion Success", JSON.stringify(ReadPERMS, null, 2), JSON.stringify(WRITEPERMS, null, 2));
            console.log('==============================');
        }
    
        export const CheckAppleHealth = async () => {

            return new Promise((resolve, reject) => {
                AppleHealthKit.isAvailable((err, results1) => {
                    if (err) {
                        console.log("error isAvailable Healthkit: ", err);
                        resolve({ success: false, ...results1 })
                    }
                    console.log('in CheckAppleHealth');
                    AppleHealthKit.getAuthStatus(HealthConfig, (err, results2) => {
                        if (err) {
                            console.log("error getAuthStatus Healthkit: ", err);
                            resolve({ success: false })
                        }
                        resolve({ success: true, ...results2, HealthConfig})
                    })
                })
            })

        }

        export const AuthAppleHealth = () => {
            return new Promise((resolve, reject) => {
                AppleHealthKit.initHealthKit(HealthConfig, (err, results) => {
                    if (err) {
                        console.log("error initializing Healthkit: ", err);
                        resolve({ success: false, response: { error: err?.message } })
                    }
                    console.log(results);
                    resolve({ success: true })
                })
            })
        }

        export const getAppleHealth = async({
            methods,
            options,
            format
        }) => {
            console.log('poisdjfposdjofdkjfosfj;ds');
            return new Promise((resolve, reject) => {
                AppleHealthKit.initHealthKit(HealthConfig, (err, results) => {
                    if (err) {
                        console.log("error initializing Healthkit: ", err);
                        resolve({ success: false, response: { error: err?.message } })
                    }
                        AppleHealthKit?.[methods]({
                        startDate: options.startDate,
                        endDate: options.endDate,
                        // period: 60,
                        // unit: "Step(s)",
                        includeManuallyAdded: true,
                        ascending: true
        
                        }, (err, results) => {
                            if (err) {
                                console.log(`error ${methods} health-kit => `, err);
                                resolve({ success: false, value: [] })
                            }
                            else {
                                console.log(`data ${methods} health-kit =>`, JSON.stringify(results, null, 2))
                                resolve({ success: true, type: methods, data: format?.(results)||results})
                            }
                        });

                })
            })
        }

        export const getAppleHealthMulti = async(
            methods,
        ) => {
            
            return new Promise((resolve, reject) => {
                AppleHealthKit.initHealthKit(HealthConfig, (err, results) => {
                    if (err) {
                        console.log("error initializing Healthkit: ", err);
                        resolve({ success: false, response: { error: err?.message } })
                    }
                    const list = {}
                    
                    methods.map((type)=>
                    {
                        AppleHealthKit?.[type]({
                        startDate: moment().startOf('days').toISOString(true),
                        endDate: moment().endOf('days').toISOString(true),
                        // period: 60,
                        // unit: "Step(s)",
                        includeManuallyAdded: true,
                        ascending: true
        
                        }, (err, results) => {
                            if (err) {
                                console.log(`error ${type} health-kit => `, err);
                                resolve({ success: false, value: [] })
                            }
                            else {
                                // console.log(`data ${type} health-kit =>`, JSON.stringify(results, null, 2))
                                // resolve({ success: true, value: stepFormatApple(results) }) 
                                list.type = type
                                list.data = results
                                // resolve({ success: true, type: type, value: results })
                                console.log('in else',JSON.stringify(list, null, 2));
                            }
                        });
                    })
                    console.log('fdfdddf',list);
                    resolve({ success: true, value: list })


                })
            })
        }

