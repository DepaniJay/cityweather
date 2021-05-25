
const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const dataHide = document.querySelector('.middle_layer');
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const getCurrentDay = ()=>{
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let currentDay = new Date();
    let day = weekday[currentDay.getDay()];
    return day;
};
day.innerText = getCurrentDay();


const getCurrentDate = ()=>{
    let d = new Date();
    let date = d.getDate();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    let currentMonth = month[d.getMonth()];
    return `${date} ${currentMonth}`;
};

today_date.innerText = getCurrentDate();



const getInfo = async (e)=>{
    e.preventDefault();
    let cityValue = cityName.value;
    
    if(cityValue === ""){
        dataHide.classList.add('data_hide');
        city_name.innerText = "Please write the city name before search";
    }else{
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=d2c6412406c415b7cf0f8bb466926f70`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            dataHide.classList.remove('data_hide');
            // console.log(arrData);
            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            temp.innerHTML = `${arrData[0].main.temp}<sup>o</sup>C`;

            // condition to check sunny or cloudy
            const tempMood = arrData[0].weather[0].main;
            if(tempMood == 'Clear'){
                temp_status.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
            }else if(tempMood == 'Clouds'){
                temp_status.innerHTML = `<i class="fas fa-cloud" style="color: #f1f2f6;"></i>`;
            }else if(tempMood == 'Rain'){
                temp_status.innerHTML = `<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>`;
            }else{
                temp_status.innerHTML = `<i class="fas fa-cloud" style="color: #f1f2f6;"></i>`;
            }

        } catch (error) {
            if(error){
                dataHide.classList.add('data_hide');
                city_name.innerText = "Please enter city name properly";
            }
        }

    }
};

submitBtn.addEventListener('click',getInfo);