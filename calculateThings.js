// let startDate = new Date('28/Sep/2018 15:00');
// let endDate = new Date('01/Oct/2018 20:00');





function callClickFunction()
{
let startDate = new Date(document.getElementById("startDate").value);
let endDate = new Date(document.getElementById("endDate").value);
let finalMsg = '';
// console.log(startDate + endDate);
calcPreffix=(iputVal) => {
    iputVal = iputVal.toString();
    if(iputVal.length < 2){
        iputVal = '0'+ iputVal;
    }else{
        iputVal = iputVal;
    }
return iputVal;
}

calcMonth = (month) => {
    const monArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return monArray[month];
}

calcDay = (day) =>{
    const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return weekDays[day];
}
let startDateStr = calcPreffix(startDate.getDate())+'/'+calcMonth(startDate.getMonth())+'/'+startDate.getFullYear()+' 00:00';
let endDateStr = calcPreffix(endDate.getDate()+1)+'/'+calcMonth(endDate.getMonth())+'/'+endDate.getFullYear()+' 00:00';
let wholeStartDate = new Date(startDateStr);
let wholeEndDate = new Date(endDateStr);
// console.log(wholeStartDate+' - - '+ wholeEndDate);
console.log(`Trip details between ${calcPreffix(startDate.getDate())}-${calcMonth(startDate.getMonth())}-${startDate.getFullYear()} and ${calcPreffix(endDate.getDate())}-${calcMonth(endDate.getMonth())}-${endDate.getFullYear()}`);
console.log(`Your Trip start's on a ${calcDay(startDate.getDay())} and end's on ${calcDay(endDate.getDay())}.`);

let totatDays = 0;
totatDays = Math.floor(((wholeEndDate-wholeStartDate)/(1000*60*60*24)));

let dayTimeCount = totatDays-1;
let nightTimeCount = totatDays-1;

calcStartDayTime = (Time) => {
if(Time >= 0 &&  Time <= 20){
return 1;
}
else{
return 0;
}
}

calcEndNitTime = (Time) => {
if(Time >= 20){
return 1;
}
else{
return 0;
}
}


dayTimeCount += calcStartDayTime(startDate.getHours());
nightTimeCount += calcEndNitTime(endDate.getHours());

console.log(`total trip days are :${totatDays}`);
console.log(`You gonna spend  ${dayTimeCount} days and ${nightTimeCount} nights.`);

console.log(`Things you need to pack are below`);




let dayObj,otherObj,nightObj ={};
let clothes = {
    outerWear:['shirts','pants','shorts'],
    innerWear:['undies','Baniyan','socks'],
    nightWear:['NightTop','nightshorts']
};
let toileteries = {
    Bath:['soap','Shampoo'],
    groom:['perfume','trimmer','cosmetic','sunscreen','lipbalm']
};
let accessories = {
    eyeWear:['glasses','sunnies'],
    cameras:['actionCam','DSLR','MemoryCard'],
    footWear:['sandal','shoes']
};
let mandatoryStuff = {
    walletCheck:['driving Lisence','Cash','phone Charger']
};



dayObj = {dayClothes:[clothes.outerWear,clothes.innerWear]};
nightObj = {nightClothes:[clothes.nightWear]};
otherObj = {otherObjs:[toileteries.Bath,toileteries.groom,accessories.eyeWear,accessories.cameras,accessories.footWear,mandatoryStuff.walletCheck]};
// console.log(dayObj.dayClothes[0][1]);
let totalObjList = {};
for(let i=0 ;i < dayTimeCount;i++){
for(let j = 0 ; j < (dayObj.dayClothes).length;j++){
for(let k = 0 ; k < (dayObj.dayClothes[j]).length;k++){
    // console.log(dayObj.dayClothes[j][k]);
    if(totalObjList[dayObj.dayClothes[j][k]]){
        totalObjList[dayObj.dayClothes[j][k]] += 1;
    }
    else{
        totalObjList[dayObj.dayClothes[j][k]] = 1;
    }
}
}
}

for(let i=0 ;i < nightTimeCount;i++){
    for(let j = 0 ; j < (nightObj.nightClothes).length;j++){
    for(let k = 0 ; k < (nightObj.nightClothes[j]).length;k++){
        // console.log(nightObj.nightClothes[j][k]);
        if(totalObjList[nightObj.nightClothes[j][k]]){
            totalObjList[nightObj.nightClothes[j][k]] += 1;
        }
        else{
            totalObjList[nightObj.nightClothes[j][k]] = 1;
        }
    }
    }
    }
    // console.log(otherObj.otherObjs);
    for(let i=0 ;i < 1;i++){
        for(let j = 0 ; j < (otherObj.otherObjs).length;j++){
        for(let k = 0 ; k < (otherObj.otherObjs[j]).length;k++){
            // console.log(otherObj.otherObjs[j][k]);
            if(totalObjList[otherObj.otherObjs[j][k]]){
                totalObjList[otherObj.otherObjs[j][k]] += 1;
            }
            else{
                totalObjList[otherObj.otherObjs[j][k]] = 1;
            }
        }
        }
        }

finalMsg = `${finalMsg} <br>
Trip details between ${calcPreffix(startDate.getDate())}-${calcMonth(startDate.getMonth())}-${startDate.getFullYear()} and ${calcPreffix(endDate.getDate())}-${calcMonth(endDate.getMonth())}-${endDate.getFullYear()} <br>
Your Trip start's on a ${calcDay(startDate.getDay())} and end's on ${calcDay(endDate.getDay())}. <br>
total trip days are :${totatDays} <br>
You gonna spend  ${dayTimeCount} days and ${nightTimeCount} nights. <br>
Things you need to pack are below <br>
${JSON.stringify(totalObjList)}`;
document.getElementById("demo").innerHTML = finalMsg;
console.log(finalMsg);    
}

    